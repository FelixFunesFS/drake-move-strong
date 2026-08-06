import { jsPDF } from 'jspdf';
import { INTAKE_SCHEMA, IntakeAnswers, isFieldVisible, detailKey } from '@/components/intake/schema';

const MARGIN = 48;
const LINE = 14;

const TEAL = [11, 74, 82] as const;
const GOLD = [242, 181, 68] as const;
const INK = [26, 26, 26] as const;
const MUTED = [110, 110, 110] as const;

export function buildIntakePdf(answers: IntakeAnswers): jsPDF {
  const doc = new jsPDF({ unit: 'pt', format: 'letter' });
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const contentW = pageW - MARGIN * 2;
  let y = MARGIN;

  const submittedAt = new Date();

  const ensure = (needed: number) => {
    if (y + needed > pageH - MARGIN) {
      doc.addPage();
      y = MARGIN;
    }
  };

  const text = (
    value: string,
    opts: { size?: number; style?: 'normal' | 'bold'; color?: readonly number[]; indent?: number } = {},
  ) => {
    const { size = 10, style = 'normal', color = INK, indent = 0 } = opts;
    doc.setFont('helvetica', style);
    doc.setFontSize(size);
    doc.setTextColor(color[0], color[1], color[2]);
    const lines = doc.splitTextToSize(value, contentW - indent) as string[];
    lines.forEach((line) => {
      ensure(LINE);
      doc.text(line, MARGIN + indent, y);
      y += LINE;
    });
  };

  const sectionHeading = (title: string) => {
    ensure(46);
    y += 10;
    doc.setFillColor(TEAL[0], TEAL[1], TEAL[2]);
    doc.rect(MARGIN, y - 12, contentW, 22, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(255, 255, 255);
    doc.text(title.toUpperCase(), MARGIN + 8, y + 3);
    y += 26;
  };

  const qa = (question: string, answer: string) => {
    ensure(LINE * 2);
    text(question, { size: 9, color: MUTED });
    text(answer && answer.trim() ? answer : '—', { size: 10.5, style: 'bold', indent: 10 });
    y += 4;
  };

  /* ------------------------------------------------------------- header */
  doc.setFillColor(TEAL[0], TEAL[1], TEAL[2]);
  doc.rect(0, 0, pageW, 74, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(255, 255, 255);
  doc.text('DRAKE FITNESS', MARGIN, 34);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.setTextColor(GOLD[0], GOLD[1], GOLD[2]);
  doc.text('Client Intake, Agreement & Waiver', MARGIN, 54);
  y = 100;

  text(`Submitted: ${submittedAt.toLocaleString('en-US', { timeZone: 'America/New_York' })} ET`, {
    size: 9,
    color: MUTED,
  });
  text('2 Avondale Ave, Charleston, SC 29407  •  (843) 817-5420  •  ddrake311@gmail.com', {
    size: 9,
    color: MUTED,
  });
  y += 6;

  /* -------------------------------------------------------------- body */
  INTAKE_SCHEMA.forEach((step) => {
    const visible = step.fields.filter((f) => isFieldVisible(f, answers));
    if (!visible.length) return;
    sectionHeading(step.title);

    visible.forEach((f) => {
      if (f.t === 'legal') {
        ensure(30);
        text(f.q, { size: 10.5, style: 'bold' });
        f.legal?.forEach((block) => {
          if (block.type === 'h') {
            text(block.text, { size: 9.5, style: 'bold', color: MUTED });
          } else {
            text(block.text, { size: 8.5, color: MUTED });
          }
        });
        y += 6;
        return;
      }

      if (f.t === 'ack') {
        qa(f.q, answers[f.k] === 'Yes' ? 'Accepted' : 'Not accepted');
        return;
      }

      if (f.t === 'sig') {
        const data = answers[f.k];
        ensure(120);
        text(f.q, { size: 9, color: MUTED });
        if (typeof data === 'string' && data.startsWith('data:image')) {
          const w = 220;
          let h = 70;
          try {
            const props = doc.getImageProperties(data);
            if (props?.width && props?.height) {
              h = Math.min(80, Math.max(34, (props.height / props.width) * w));
            }
            doc.addImage(data, 'PNG', MARGIN + 10, y - 2, w, h);
          } catch {
            /* ignore malformed signature data */
          }
          doc.setDrawColor(200, 200, 200);
          doc.line(MARGIN + 10, y + h, MARGIN + 10 + w, y + h);
          y += h + 8;
          text(`Signed ${submittedAt.toLocaleDateString('en-US')}`, { size: 8.5, color: MUTED, indent: 10 });

        } else {
          text('—', { size: 10.5, style: 'bold', indent: 10 });
        }
        y += 6;
        return;
      }

      if (f.t === 'group') {
        text(f.q, { size: 9, color: MUTED });
        f.items?.forEach((item) => {
          qa(item.q, (answers[item.k] as string) || 'Not answered');
        });
        return;
      }

      const raw = answers[f.k];
      const value = Array.isArray(raw) ? (raw.length ? raw.join(', ') : 'None') : (raw as string) || '';
      qa(f.q, value);

      if (f.t === 'yn' && raw === 'Yes' && f.ynDetail) {
        qa(f.ynDetail, (answers[detailKey(f.k)] as string) || '');
      }
    });
  });

  /* ------------------------------------------------------------- footer */
  const pages = doc.getNumberOfPages();
  for (let i = 1; i <= pages; i += 1) {
    doc.setPage(i);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(MUTED[0], MUTED[1], MUTED[2]);
    doc.text(`Drake Fitness client intake — page ${i} of ${pages}`, MARGIN, pageH - 24);
  }

  return doc;
}

export function intakeFileName(answers: IntakeAnswers): string {
  const name = String(answers.name || 'client')
    .trim()
    .replace(/[^a-z0-9]+/gi, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase();
  const date = new Date().toISOString().slice(0, 10);
  return `drake-fitness-intake-${name || 'client'}-${date}.pdf`;
}
