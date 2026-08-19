/**
 * Drake Fitness client intake — question schema.
 * Ported verbatim from the studio's paper/HTML intake form.
 * Edit wording here; the wizard, validation and PDF all read from this file.
 */

export type FieldType =
  | 'text'
  | 'tel'
  | 'email'
  | 'date'
  | 'textarea'
  | 'choice'
  | 'yn'
  | 'scale'
  | 'checks'
  | 'group'
  | 'legal'
  | 'ack'
  | 'sig';

export interface LegalBlock {
  type: 'h' | 'p';
  text: string;
}

export interface IntakeField {
  k: string;
  t: FieldType;
  q: string;
  req?: boolean;
  hint?: string;
  /** autocomplete attribute */
  ac?: string;
  /** render at half width on md+ */
  half?: boolean;
  /** options for choice / checks */
  o?: string[];
  /** scale endpoint labels */
  lo?: string;
  hi?: string;
  /** label of the follow-up field revealed when the answer is "Yes" */
  ynDetail?: string;
  /** only show when another field has this value */
  showIf?: { k: string; v: string };
  /** yes/no matrix rows */
  items?: { k: string; q: string }[];
  /** legal copy */
  legal?: LegalBlock[];
}

export interface IntakeStep {
  name: string;
  title?: string;
  sub?: string;
  fields: IntakeField[];
}

export const INTAKE_SCHEMA: IntakeStep[] = [
  {
    name: 'Contact',
    title: 'Contact information',
    sub: 'So David can reach you and keep your file straight.',
    fields: [
      { k: 'name', t: 'text', q: 'Full name', req: true, ac: 'name' },
      { k: 'sex', t: 'choice', q: 'Sex', req: true, o: ['Female', 'Male', 'Prefer not to say'] },
      { k: 'dob', t: 'date', q: 'Date of birth', req: true, ac: 'bday' },
      { k: 'address', t: 'text', q: 'Street address', req: true, ac: 'street-address' },
      { k: 'city', t: 'text', q: 'City', req: true, ac: 'address-level2', half: true },
      { k: 'state', t: 'text', q: 'State', req: true, ac: 'address-level1', half: true },
      { k: 'zip', t: 'text', q: 'ZIP', req: true, ac: 'postal-code', half: true },
      { k: 'cell', t: 'tel', q: 'Cell phone', req: true, ac: 'tel', half: true },
      { k: 'home', t: 'tel', q: 'Home phone', hint: 'Optional', half: true },
      { k: 'work', t: 'tel', q: 'Work phone', hint: 'Optional', half: true },
      { k: 'email', t: 'email', q: 'Email address', req: true, ac: 'email' },
      {
        k: 'emergName',
        t: 'text',
        q: 'Emergency contact — name',
        req: true,
        half: true,
      },
      { k: 'emergPhone', t: 'tel', q: 'Emergency contact — phone', req: true, half: true },
    ],
  },
  {
    name: 'Medical',
    title: 'Medical history',
    sub: 'Have you ever experienced any of the following?',
    fields: [
      {
        k: 'grpA',
        t: 'group',
        q: 'Have you ever experienced:',
        items: [
          { k: 'bp', q: 'High blood pressure' },
          { k: 'heart', q: 'Heart trouble' },
          { k: 'circ', q: 'Circulation problems' },
          { k: 'seiz', q: 'Seizures' },
          { k: 'dizzy', q: 'Dizzy spells' },
          { k: 'vision', q: 'Problems with vision' },
          { k: 'asthma', q: 'Asthma' },
          { k: 'diab', q: 'Diabetes' },
        ],
      },
      { k: 'otherIll', t: 'yn', q: 'Any other illness?', req: true, ynDetail: 'Please describe' },
      {
        k: 'cardiac',
        t: 'yn',
        q: 'Do you or anyone in your family have a cardiac condition?',
        req: true,
        ynDetail: 'Who, and what condition?',
      },
      { k: 'allergies', t: 'yn', q: 'Do you have any allergies?', req: true, ynDetail: 'Please list them' },
      { k: 'rx', t: 'yn', q: 'Are you taking any prescription medication?', req: true, ynDetail: 'Please list' },
      { k: 'otc', t: 'yn', q: 'Are you taking any over-the-counter medication?', req: true, ynDetail: 'Please list' },
      {
        k: 'surgery',
        t: 'yn',
        q: 'Have you ever had surgery?',
        req: true,
        ynDetail: 'Date, type of procedure, and outcome',
      },
      { k: 'backpain', t: 'yn', q: 'Have you ever had back pain?', req: true, ynDetail: 'Date of last episode' },
    ],
  },
  {
    name: 'Body',
    title: 'Injuries & therapies',
    fields: [
      {
        k: 'ortho',
        t: 'yn',
        q: 'Do you have, or have you had, any injuries or orthopedic problems?',
        hint: 'Joint, bone, muscle, ligament, etc.',
        req: true,
        ynDetail: 'Please elaborate',
      },
      {
        k: 'imaging',
        t: 'yn',
        q: 'Have you had any x-rays, MRIs or other imaging studies?',
        req: true,
        ynDetail: 'What, and when?',
      },
      { k: 'orthotics', t: 'yn', q: 'Do you have orthotics (shoe inserts)?', req: true },
      {
        k: 'therapies',
        t: 'checks',
        q: 'Have you ever had any of the following therapies?',
        hint: 'Select all that apply — or leave blank for none.',
        o: [
          'Physical therapy',
          'Chiropractic',
          'Massage',
          'Acupuncture',
          'Feldenkrais',
          'Rolfing',
          'Alexander technique',
        ],
      },
      {
        k: 'altHealing',
        t: 'yn',
        q: 'Have you undergone any other alternative healing methods?',
        req: true,
        ynDetail: 'Please describe',
      },
      { k: 'pregnant', t: 'yn', q: 'Are you currently pregnant?', showIf: { k: 'sex', v: 'Female' } },
      {
        k: 'children',
        t: 'yn',
        q: 'Have you borne children?',
        showIf: { k: 'sex', v: 'Female' },
        ynDetail: 'How many?',
      },
      {
        k: 'menstruate',
        t: 'yn',
        q: 'Do you menstruate?',
        showIf: { k: 'sex', v: 'Female' },
        ynDetail: 'Date of last cycle',
      },
    ],
  },
  {
    name: 'Nutrition',
    title: 'Nutrition & habits',
    fields: [
      {
        k: 'mealsWhere',
        t: 'choice',
        q: 'Where do you eat most of your meals?',
        req: true,
        o: ['Home', 'Restaurant', 'Other'],
      },
      { k: 'mealsWho', t: 'text', q: 'When eating at home, who prepares your meals?', req: true },
      {
        k: 'fastfood',
        t: 'text',
        q: 'How often do you eat at fast food restaurants?',
        req: true,
        hint: 'e.g. "twice a week"',
      },
      { k: 'breakfast', t: 'yn', q: 'Do you eat breakfast?', req: true },
      { k: 'nutritionist', t: 'yn', q: 'Have you ever seen a nutritionist or registered dietician?', req: true },
      { k: 'multivit', t: 'yn', q: 'Do you take a multi-vitamin or multi-mineral?', req: true },
      {
        k: 'supps',
        t: 'yn',
        q: 'Do you take any other nutritional supplements?',
        req: true,
        ynDetail: 'Please list',
      },
      {
        k: 'cravings',
        t: 'yn',
        q: 'Do you consistently crave any particular food?',
        req: true,
        ynDetail: 'Which food?',
      },
      { k: 'water', t: 'text', q: 'How much water do you drink each day?', req: true },
      { k: 'waterType', t: 'choice', q: 'The water I drink is primarily:', req: true, o: ['Tap', 'Bottled', 'Filtered'] },
      {
        k: 'alcohol',
        t: 'yn',
        q: 'Do you drink alcohol?',
        req: true,
        ynDetail: 'On average, how many drinks per day / week?',
      },
      { k: 'dietsoda', t: 'yn', q: 'Do you drink diet soda or other diet drinks?', req: true },
      {
        k: 'carbonated',
        t: 'yn',
        q: 'Do you drink carbonated beverages?',
        req: true,
        ynDetail: 'On average, how many per day / week?',
      },
      {
        k: 'caffeine',
        t: 'yn',
        q: 'Do you drink caffeinated beverages?',
        req: true,
        ynDetail: 'On average, how many per day / week?',
      },
      { k: 'gum', t: 'yn', q: 'Do you chew gum?', req: true },
      { k: 'tvbed', t: 'yn', q: 'Do you watch TV in bed?', req: true },
      {
        k: 'sleep',
        t: 'choice',
        q: 'How many hours, on average, do you sleep per night?',
        req: true,
        o: ['Less than 6', '6–7', '7–8', 'More than 8'],
      },
      { k: 'rested', t: 'yn', q: 'When you wake, do you feel well rested?', req: true },
      {
        k: 'tobacco',
        t: 'yn',
        q: 'Do you smoke or use tobacco products?',
        req: true,
        ynDetail: 'What, and how much?',
      },
    ],
  },
  {
    name: 'Lifestyle',
    title: 'Lifestyle & fitness',
    fields: [
      { k: 'occupation', t: 'text', q: 'What is your occupation?', req: true },
      { k: 'marital', t: 'choice', q: 'I am:', req: true, o: ['Single', 'Married', 'Divorced', 'Widowed'] },
      { k: 'stressCareer', t: 'scale', q: 'How stressful is your career?', req: true, lo: '1 = low', hi: '10 = high' },
      {
        k: 'stressLife',
        t: 'scale',
        q: 'How stressful is your personal life?',
        req: true,
        lo: '1 = low',
        hi: '10 = high',
      },
      { k: 'stressTech', t: 'textarea', q: 'Do you practice any stress reduction techniques?', req: true },
      {
        k: 'sportsHS',
        t: 'yn',
        q: 'Did you play sports in high school or college?',
        req: true,
        ynDetail: 'Which sports?',
      },
      {
        k: 'exNow',
        t: 'yn',
        q: 'Do you currently get regular physical exercise?',
        req: true,
        ynDetail: 'What do you do, and how often?',
      },
      {
        k: 'exPast',
        t: 'yn',
        q: 'If not currently — have you exercised regularly in the past?',
        showIf: { k: 'exNow', v: 'No' },
      },
      {
        k: 'enjoy',
        t: 'textarea',
        q: 'What kind of sports, activities or exercise do you enjoy most?',
        req: true,
      },
      { k: 'overweight', t: 'yn', q: 'Are you overweight?', req: true },
      {
        k: 'rHealth',
        t: 'scale',
        q: 'Rate your current overall physical health',
        req: true,
        lo: '1 = poor',
        hi: '10 = excellent',
      },
      {
        k: 'rFitness',
        t: 'scale',
        q: 'Rate your current overall physical fitness',
        req: true,
        lo: '1 = poor',
        hi: '10 = excellent',
      },
      { k: 'rFlex', t: 'scale', q: 'Rate your flexibility', req: true, lo: '1 = poor', hi: '10 = excellent' },
      { k: 'rStrength', t: 'scale', q: 'Rate your strength levels', req: true, lo: '1 = poor', hi: '10 = excellent' },
      { k: 'rBalance', t: 'scale', q: 'Rate your balance', req: true, lo: '1 = poor', hi: '10 = excellent' },
      { k: 'rCoord', t: 'scale', q: 'Rate your coordination', req: true, lo: '1 = poor', hi: '10 = excellent' },
      { k: 'bestHealth', t: 'textarea', q: 'When were you in your best overall physical health?', req: true },
      { k: 'recreation', t: 'textarea', q: 'What do you do for recreation?', req: true },
    ],
  },
  {
    name: 'Goals',
    title: 'Your goals',
    sub: 'This is the part David reads most closely. Be specific.',
    fields: [
      {
        k: 'goal1',
        t: 'text',
        q: 'Objective 1',
        req: true,
        hint: 'Something you want to accomplish by working with David.',
      },
      {
        k: 'goal1i',
        t: 'scale',
        q: 'How important is objective 1?',
        req: true,
        lo: '1 = not important',
        hi: '10 = most important thing in my life',
      },
      { k: 'goal2', t: 'text', q: 'Objective 2', req: true },
      {
        k: 'goal2i',
        t: 'scale',
        q: 'How important is objective 2?',
        req: true,
        lo: '1 = not important',
        hi: '10 = most important thing in my life',
      },
      { k: 'goal3', t: 'text', q: 'Objective 3', req: true },
      {
        k: 'goal3i',
        t: 'scale',
        q: 'How important is objective 3?',
        req: true,
        lo: '1 = not important',
        hi: '10 = most important thing in my life',
      },
      { k: 'willingDo', t: 'textarea', q: 'What are you willing to do to reach your goals?', req: true },
      {
        k: 'willingGive',
        t: 'textarea',
        q: 'What are you willing to give up in order to reach your goals?',
        req: true,
      },
      { k: 'support', t: 'textarea', q: 'Who is willing to support you in the pursuit of your goals?', req: true },
      { k: 'heardAbout', t: 'text', q: 'How did you hear about Drake Fitness?', req: true },
    ],
  },
  {
    name: 'Agreement',
    title: 'Agreement & waiver',
    sub: 'Please read both documents in full before signing.',
    fields: [
      {
        k: 'legal1',
        t: 'legal',
        q: 'Client Agreement',
        legal: [
          {
            type: 'p',
            text: 'I understand that the intention of Drake Fitness is to provide individual, comprehensive exercise and performance programs designed to restore and improve health and function of the body. I understand that David Drake will recommend the services of other health care practitioners, and in order to maximize my program\u2019s effectiveness, it will be necessary to follow up with those practitioners. I am aware that the path that I am embarking on is in no way a quick fix, but a long pathway back to optimal health and function. I accept that my involvement is a serious commitment and will require a dedicated effort on my part to reach my personal goals. I understand that my failure to implement any part of my program will severely reduce my chances of long-term success.',
          },
          { type: 'h', text: 'Purchase Information' },
          {
            type: 'p',
            text: 'Payment is expected at the conclusion of each session unless other arrangements have been made. Payment is for services rendered and should not be considered a membership fee. Personal Training Sessions cost $125/hour. Discounted packages: 10 \u00d7 $115 = $1,150 and 20 \u00d7 $105 = $2,100. KB Strong group class prices can be seen at www.drake.fitness.',
          },
          { type: 'h', text: 'Sessions & Scheduling' },
          {
            type: 'p',
            text: 'Clients are responsible for scheduling their sessions and will be charged for the sessions scheduled. If a client is late, they will be billed for the session and use the remaining time available. There is a required 24-hour cancellation notice for all scheduled sessions. Should you fail to do so, Drake Fitness reserves the right to charge the full cost of the session. Should your trainer miss a scheduled session you will be owed a complimentary session at no additional charge.',
          },
          { type: 'h', text: 'Customer\u2019s Right To Cancel' },
          {
            type: 'p',
            text: 'Your satisfaction is guaranteed. Should you choose to discontinue, or be unable to continue your sessions and activities with Drake Fitness for whatever reason and there is a remainder of pre-paid sessions, simply request in writing a refund for those sessions. A refund will be provided within thirty (30) days. South Carolina state law allows one year to complete pre-paid sessions. After this time you will forfeit any right to get a refund and Drake Fitness reserves the right to refuse fulfillment of remaining sessions.',
          },
          { type: 'h', text: 'Liability' },
          {
            type: 'p',
            text: 'Buyer fully understands and agrees that in using the facilities and services of Drake Fitness and the independent contractors at the facility there is a possibility of accidental or other physical injury. Buyer agrees that he/she will not hold Drake Fitness, or any representative thereof, responsible in any way for any injuries or damages. Buyer must read and sign the \u201cNotice of Waiver and Assumption of Risk\u201d below before undergoing assessment and training with Drake Fitness.',
          },
        ],
      },
      { k: 'ack1', t: 'ack', q: 'I have read and agree to the Client Agreement above.', req: true },
      { k: 'sig1', t: 'sig', q: 'Signature', req: true, hint: 'Sign with your finger, stylus or mouse.' },
      { k: 'printName1', t: 'text', q: 'Name (print)', req: true, ac: 'name' },
      {
        k: 'legal2',
        t: 'legal',
        q: 'Notice of Waiver and Assumption of Risk',
        legal: [
          { type: 'p', text: 'Please read carefully.' },
          {
            type: 'p',
            text: 'By signing this document I acknowledge that I have consulted with my doctor and he/she has approved my entry into a program of progressive physical fitness. I further acknowledge that I have voluntarily chosen to participate in Drake Fitness\u2019s program of physical exercise, which is designed to enhance the musculo-skeletal and cardio-respiratory systems. I understand the possible strenuous nature of the program and the possibility of adverse physiological reactions which, in limited circumstances, can cause, among other conditions, high blood pressure, fainting, heart attack, and death. This is why Drake Fitness expects you to check with your doctor and inform us of any health concerns and medications. I also understand that all exercise has an inherent risk but is still highly recommended by health professionals for most people.',
          },
          {
            type: 'p',
            text: 'By signing this document, I assume all risk regarding my health and well being and hold harmless of any responsibility Drake Fitness, its instructors and employees. I also waive any right or claim against Drake Fitness, its owners, instructors and employees to sue them or hold them liable for any adverse impact to my health.',
          },
          {
            type: 'p',
            text: 'I have read this carefully and understand I am giving up potential legal rights and sign it of my own free will and with full informed consent and knowledge.',
          },
        ],
      },
      {
        k: 'ack2',
        t: 'ack',
        q: 'I have read the Notice of Waiver and Assumption of Risk and I accept it of my own free will.',
        req: true,
      },
      {
        k: 'sig2',
        t: 'sig',
        q: 'Signature',
        req: true,
        hint: 'Please sign again to accept the waiver specifically.',
      },
    ],
  },
];

export type IntakeAnswers = Record<string, string | string[]>;

/** Fields that should be hidden based on current answers. */
export function isFieldVisible(field: IntakeField, answers: IntakeAnswers): boolean {
  if (!field.showIf) return true;
  return answers[field.showIf.k] === field.showIf.v;
}

/** The detail key used when a yes/no answer is "Yes". */
export function detailKey(k: string): string {
  return `${k}_detail`;
}
