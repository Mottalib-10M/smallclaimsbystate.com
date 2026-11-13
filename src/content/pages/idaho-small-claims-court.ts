import { definePage } from '../../lib/page-types';
import { st, rankOf } from '../../lib/engine/claims';
import { usd } from '../../lib/fmt';
import { factsTable, neighboursTable, stateSources, lockedState } from '../../lib/state-page';
const S = st('ID');
export default definePage({
  id: 'idaho-small-claims-court', group: 'states', order: 25, slug: 'idaho-small-claims-court',
  nav: 'Idaho', card: `Limit tripled to ${usd(S.cap)} on July 1, 2026; no punitive or pain-and-suffering damages.`,
  title: 'Idaho Small Claims Court 2026: Limit Raised to $15,000',
  description: 'Idaho small claims court in 2026: the limit rose from $5,000 to $15,000 on July 1, 2026 under S1330. What it covers, what it excludes and a check of your claim.',
  h1: `Idaho small claims court: ${usd(S.cap)} since July 1, 2026`,
  intro: `<strong>Idaho small claims court</strong> is the small claims department of the Magistrate Division; since <strong>July 1, 2026</strong> it hears claims up to <strong>${usd(S.cap)}</strong>, three times the old $5,000.`,
  resume: `Idaho made one of the largest changes of 2026. Senate Bill 1330 amended Idaho Code § 1-2301 and raised the small claims ceiling from $5,000 to ${usd(S.cap)} from July 1, 2026. Most guides on the web still give $5,000, as did several of the first search results when we prepared this page. The jump moves Idaho to ${rankOf('ID')} of 51, ahead of Washington and Oregon at ${usd(st('WA').cap)}. Two limits remain: a small claims judge in Idaho cannot award punitive damages or damages for pain and suffering, so an injury claim is limited to actual costs such as repair bills and lost wages. Small claims are filed with the clerk of the district court in the county, which sets out the fee.`,
  ...lockedState('ID'), toolTitle: 'Does your claim fit the Idaho limit?',
  body: (h) => `
<h2>What the new Idaho small claims court limit changes</h2>
<p>A claim of $9,000 for unpaid work, a deposit of $6,500 kept by a landlord or a $12,000 dispute over a used car: before July 2026, each had to go to the regular civil docket or be cut to $5,000. Now each fits in small claims, where the hearing is informal and lawyers are rare.</p>
${factsTable(h, 'ID')}
${h.mini('deadline', { title: 'How long you have left to file', defaults: { years: 5, ago: 30 } })}
<p>The deadline calculator uses the period you enter; Idaho’s limitation periods depend on the kind of claim and are not read here.</p>
<h2>Idaho and its neighbours</h2>
${neighboursTable(h, 'ID')}
<p>See ${h.a('utah-small-claims-court', 'Utah’s $20,000')} and ${h.a('small-claims-court-limits', 'the states that changed recently')}.</p>`,
  faqs: [
    { q: 'What is the Idaho small claims limit in 2026?', a: '$15,000 from July 1, 2026, under Idaho Code § 1-2301 as amended by S1330. It was $5,000 before. Most lists online still give $5,000. A larger claim goes to the Magistrate Division’s regular civil docket or the District Court, with formal rules.', open: true },
    { q: 'Can I get pain and suffering in Idaho small claims?', a: 'No. Punitive damages and pain and suffering cannot be awarded in Idaho small claims. An injury claim in small claims is limited to actual losses such as repair bills, medical bills and lost wages. If pain and suffering matter, the regular civil docket is the place for it.' },
    { q: 'Who hears small claims in Idaho?', a: 'A magistrate of the Magistrate Division, in the small claims department. The hearing is informal and the parties usually speak for themselves. Small claims are filed with the clerk of the district court in the county, which gives the forms and the fee. Lawyers are rare in the small claims department.' },
  ],
  related: ['utah-small-claims-court', 'small-claims-court-limits', 'how-to-sue-someone-in-small-claims-court'],
  sources: [...stateSources('ID')],
});
