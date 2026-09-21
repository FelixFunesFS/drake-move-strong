/**
 * PunchPass schedule readers.
 *
 * Two independent readers run against the same fetched page so a PunchPass
 * redesign cannot take the schedule down on its own:
 *   A. parseScheduleFromHtml  — the visual calendar-list markup (all dates, includes spots left)
 *   B. parseScheduleFromJsonLd — the embedded schema.org ItemList of Events (layout-independent)
 */

export const SCHEDULE_URL = 'https://drakefitness.punchpass.com/classes';

export interface ClassData {
  class_name: string;
  class_date: string;
  start_time: string;
  end_time: string | null;
  duration_minutes: number;
  location: string | null;
  instructor: string | null;
  spots_remaining: number | null;
  spots_total: number | null;
  is_online: boolean;
  punchpass_url: string | null;
  raw_time_string: string | null;
}

// Instructors PunchPass sometimes omits — filled in by class name
export const DEFAULT_INSTRUCTORS: Record<string, string> = {
  'kettlebell flow': 'David',
  ruckathon: 'David',
  yoga: 'Misty',
};

const decode = (s: string) =>
  s
    .replace(/&amp;/g, '&')
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

function parseTime(raw: string): { hours: number; minutes: number } | null {
  const m = raw.match(/(\d{1,2}):(\d{2})\s*(am|pm)?/i);
  if (!m) return null;
  let hours = parseInt(m[1]);
  const minutes = parseInt(m[2]);
  const period = m[3]?.toLowerCase();
  if (period === 'pm' && hours !== 12) hours += 12;
  if (period === 'am' && hours === 12) hours = 0;
  return { hours, minutes };
}

const fmt = (h: number, m: number) =>
  `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:00`;

function parseDuration(raw: string | null): number {
  if (!raw) return 60;
  let total = 0;
  const hr = raw.match(/(\d+(?:\.\d+)?)\s*hour/i);
  const min = raw.match(/(\d+)\s*min/i);
  if (hr) total += Math.round(parseFloat(hr[1]) * 60);
  if (min) total += parseInt(min[1]);
  return total || 60;
}

const isOnlineFrom = (title: string, location: string | null, attendanceMode?: string) =>
  /zoom|online|virtual/i.test(title) ||
  /zoom|online|virtual/i.test(location || '') ||
  /online/i.test(attendanceMode || '');

/** Reader A — visual calendar-list markup. */
export function parseScheduleFromHtml(html: string): ClassData[] {
  const classes: ClassData[] = [];
  const dateSections = html.split(/<section id="date-(\d{4}-\d{2}-\d{2})"/);

  for (let i = 1; i < dateSections.length; i += 2) {
    const classDate = dateSections[i];
    const block = dateSections[i + 1] || '';
    const rows = block.split(/<li class="calendar-list-instance-row/).slice(1);

    for (const row of rows) {
      const timeMatch = row.match(/<time[^>]*>([^<]+)<\/time>/i);
      const titleMatch = row.match(/list-instance-row-title[^>]*>([\s\S]*?)<\/div>/i);
      if (!timeMatch || !titleMatch) continue;

      const parsed = parseTime(timeMatch[1]);
      if (!parsed) continue;

      const title = decode(titleMatch[1]);
      if (!title) continue;

      const hrefMatch = row.match(/href="(https:\/\/[^"]*\/classes\/\d+)"/i);
      const instructorMatch = row.match(/name="user"[^>]*><\/wa-icon>([^<]*)/i);
      const durationMatch = row.match(/name="clock"[\s\S]{0,160}?wa-text-nowrap">([^<]+)</i);
      const locationMatch = row.match(/name="location-dot"[^>]*><\/wa-icon>([^<]*)/i);
      const spotsMatch = row.match(/(\d+)\s*spots?\s*left/i);
      const isFull = /\b(class is full|sold out|waitlist)\b/i.test(row);

      const duration = parseDuration(durationMatch ? durationMatch[1] : null);
      const endTotal = parsed.hours * 60 + parsed.minutes + duration;
      const location = locationMatch ? decode(locationMatch[1]) || null : null;

      classes.push({
        class_name: title,
        class_date: classDate,
        start_time: fmt(parsed.hours, parsed.minutes),
        end_time: fmt(Math.floor(endTotal / 60) % 24, endTotal % 60),
        duration_minutes: duration,
        location,
        instructor: instructorMatch ? decode(instructorMatch[1]) || null : null,
        spots_remaining: spotsMatch ? parseInt(spotsMatch[1]) : isFull ? 0 : null,
        spots_total: null,
        is_online: isOnlineFrom(title, location),
        punchpass_url: hrefMatch ? hrefMatch[1] : null,
        raw_time_string: decode(timeMatch[1]),
      });
    }
  }

  return classes;
}

/** Local date/time parts from an ISO string that carries its own offset. */
function localParts(iso: string) {
  const m = iso.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/);
  if (!m) return null;
  return {
    date: `${m[1]}-${m[2]}-${m[3]}`,
    hours: parseInt(m[4]),
    minutes: parseInt(m[5]),
  };
}

/** Reader B — embedded schema.org ItemList of Events. Survives visual redesigns. */
export function parseScheduleFromJsonLd(html: string): ClassData[] {
  const classes: ClassData[] = [];
  const blocks = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)];

  for (const block of blocks) {
    let parsed: unknown;
    try {
      parsed = JSON.parse(block[1].trim());
    } catch {
      continue;
    }

    const nodes = Array.isArray(parsed) ? parsed : [parsed];
    for (const node of nodes) {
      const list = (node as { itemListElement?: unknown[] })?.itemListElement;
      if (!Array.isArray(list)) continue;

      for (const entry of list) {
        const item = ((entry as { item?: unknown }).item ?? entry) as Record<string, unknown>;
        if (item?.['@type'] !== 'Event') continue;

        const start = typeof item.startDate === 'string' ? localParts(item.startDate) : null;
        const name = typeof item.name === 'string' ? decode(item.name) : '';
        if (!start || !name) continue;

        const end = typeof item.endDate === 'string' ? localParts(item.endDate) : null;
        const duration = end
          ? (end.hours * 60 + end.minutes - (start.hours * 60 + start.minutes) + 1440) % 1440 || 60
          : 60;

        const performer = item.performer as { name?: string } | undefined;
        const place = item.location as { name?: string } | undefined;
        const location = place?.name ? decode(place.name) : null;
        const attendanceMode =
          typeof item.eventAttendanceMode === 'string' ? item.eventAttendanceMode : undefined;

        classes.push({
          class_name: name,
          class_date: start.date,
          start_time: fmt(start.hours, start.minutes),
          end_time: end ? fmt(end.hours, end.minutes) : null,
          duration_minutes: duration,
          location,
          instructor: performer?.name ? decode(performer.name) : null,
          spots_remaining: null,
          spots_total: null,
          is_online: isOnlineFrom(name, location, attendanceMode),
          punchpass_url: typeof item.url === 'string' ? item.url : null,
          raw_time_string: null,
        });
      }
    }
  }

  return classes;
}

export const conflictKey = (c: ClassData) =>
  `${c.class_date}|${c.start_time}|${c.class_name}|${c.is_online}`;

/**
 * Merges both readers. Reader A wins on conflicts (it carries spots left),
 * reader B adds anything A missed and keeps the near-term schedule alive
 * if A stops matching after a redesign.
 */
export function mergeReaders(
  primary: ClassData[],
  secondary: ClassData[],
): { classes: ClassData[]; source: string } {
  const byKey = new Map<string, ClassData>();
  for (const c of primary) byKey.set(conflictKey(c), c);

  let addedFromSecondary = 0;
  for (const c of secondary) {
    const key = conflictKey(c);
    if (!byKey.has(key)) {
      byKey.set(key, c);
      addedFromSecondary++;
    }
  }

  const source =
    primary.length === 0
      ? 'jsonld-only'
      : addedFromSecondary > 0
      ? `html+jsonld(${addedFromSecondary})`
      : 'html';

  return { classes: [...byKey.values()], source };
}

export function applyDefaultInstructors(classes: ClassData[]) {
  for (const c of classes) {
    if (c.instructor) continue;
    const name = c.class_name.toLowerCase();
    for (const [key, instructor] of Object.entries(DEFAULT_INSTRUCTORS)) {
      if (name.includes(key)) {
        c.instructor = instructor;
        break;
      }
    }
  }
}

export async function fetchSchedulePage(): Promise<string> {
  const res = await fetch(SCHEDULE_URL, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (compatible; DrakeFitnessSync/1.0)',
      Accept: 'text/html',
      'Cache-Control': 'no-cache',
    },
  });
  if (!res.ok) throw new Error(`PunchPass returned HTTP ${res.status}`);
  return await res.text();
}

/**
 * Plausibility guard rails. Returns a reason string when the parsed result
 * looks wrong enough that we should keep the existing schedule instead.
 */
export function validateParsedSchedule(
  classes: ClassData[],
  previousCount: number,
): string | null {
  if (classes.length === 0) {
    return 'No classes parsed from the PunchPass page — the page layout may have changed again.';
  }

  if (previousCount >= 10 && classes.length < previousCount / 2) {
    return `Only ${classes.length} classes parsed, down from ${previousCount} on the last successful refresh — refusing to overwrite the schedule.`;
  }

  const today = new Date();
  const withinWeek = classes.filter((c) => {
    const d = new Date(`${c.class_date}T12:00:00`);
    const days = (d.getTime() - today.getTime()) / 86400000;
    return days >= -1 && days <= 7;
  });
  if (withinWeek.length === 0) {
    return 'No classes found for the next 7 days — refusing to overwrite the schedule.';
  }

  if (classes.every((c) => !c.instructor)) {
    return 'Every parsed class is missing an instructor — the reader only partially matched the page.';
  }

  if (classes.every((c) => !c.punchpass_url)) {
    return 'Every parsed class is missing a booking link — the reader only partially matched the page.';
  }

  return null;
}
