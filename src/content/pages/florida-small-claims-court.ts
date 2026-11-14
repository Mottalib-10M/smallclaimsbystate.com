import { definePage } from '../../lib/page-types';
import { st, idx, feeFor } from '../../lib/engine/claims';
import { usd } from '../../lib/fmt';
import { factsTable, neighborsTable, stateSources, lockedState } from '../../lib/state-page';
const S = st('FL');
export default definePage({
  id: 'florida-small-claims-court', group: 'states', order: 12, slug: 'florida-small-claims-court',
  nav: 'Florida', card: `County court, up to ${usd(S.cap)}; filing fees set by statute, ${usd(S.fee![0][1])} to ${usd(S.fee![3][1])}.`,
  title: 'Florida Small Claims Court 2026: $8,000 Limit, Statute Fees',
  description: 'Florida small claims court in 2026: the $8,000 limit of Rule 7.010, the county court filing fees of section 34.041 from $50 to $295, and a check of your claim.',
  h1: `Florida small claims court: ${usd(S.cap)} and fees fixed by statute`,
  intro: `<strong>Florida small claims court</strong> is the small claims division of each county court, open to claims up to <strong>${usd(S.cap)}</strong>, with a filing fee of at most ${usd(feeFor(S, 3000)!)} for a claim between $2,500 and the limit.`,
  resume: `Florida sets its small claims ceiling by court rule rather than by statute: Rule 7.010(b) of the Florida Small Claims Rules covers actions in county court for money or property worth no more than ${usd(S.cap)}, not counting costs, interest and attorney fees. The fees, on the other hand, are written into section 34.041 of the Florida Statutes, which caps what the clerk may charge: ${usd(feeFor(S, 50)!)} for a claim under $100, ${usd(feeFor(S, 300)!)} up to $500, ${usd(feeFor(S, 2000)!)} up to $2,500 and ${usd(feeFor(S, 6000)!)} above that. That makes Florida one of the most expensive states to file a claim of a few thousand dollars, and the sheriff or a process server charges again to serve the defendant. The first court date is a pretrial conference, where many cases settle or go to mediation before any trial is set.`,
  ...lockedState('FL'), toolTitle: 'Does your claim fit the Florida limit?',
  body: (h) => `
<h2>What Florida small claims court costs, step by step</h2>
<p>Because the fee jumps at $2,500, a claim of $2,600 costs ${usd(feeFor(S, 2600)! - feeFor(S, 2400)!)} more to file than one of $2,400. If part of your claim is uncertain, it can be worth weighing whether to file the firm part alone. The fees below are the statutory maximum each clerk may charge; service of process is extra.</p>
${factsTable(h, 'FL')}
${h.mini('cost', { title: 'The full cost of a Florida claim', defaults: { st: idx('FL'), claim: 4000 }, locked: ['st'] })}
<h2>The pretrial conference comes first</h2>
<p>In Florida the summons calls both sides to a pretrial conference, not to a trial. The judge or a mediator asks whether the dispute can be settled; if it cannot, a trial date is set. A plaintiff who misses the pretrial conference risks dismissal, and a defendant who misses it risks a default judgment, so the first date matters as much as the trial itself.</p>
<h2>Florida and its neighbors</h2>
${neighborsTable(h, 'FL')}
<p>See also ${h.a('small-claims-court-filing-fee', 'the fee schedules of the other states')} and ${h.a('collecting-a-small-claims-judgment', 'how to collect after you win')}.</p>`,
  faqs: [
    { q: 'What is the maximum for small claims in Florida?', a: '$8,000, not counting costs, interest and attorney fees, under Rule 7.010(b) of the Florida Small Claims Rules. A larger claim goes to the county court’s regular civil docket. Many Florida small claims start with a pretrial conference, where the parties can settle before any trial is set.', open: true },
    { q: 'How much is the filing fee for small claims in Florida?', a: 'Section 34.041 caps it at $50 under $100, $75 up to $500, $170 up to $2,500 and $295 above, plus the cost of serving the defendant. The clerk of the county court collects the fee, and the sheriff or a certified process server charges separately to deliver the papers. Ask for both amounts when you file.' },
    { q: 'Do I have to go to a pretrial conference in Florida?', a: 'Yes. It is the first court date in a Florida small claims case, and missing it can end the case against you. At the conference the judge or a mediator may ask whether the dispute can settle, and if not a trial date is set. Bring your documents, because the other side will see the strength of your case.' },
  ],
  related: ['small-claims-court-filing-fee', 'georgia-small-claims-court', 'how-much-does-it-cost-to-sue-someone'],
  sources: [...stateSources('FL')],
});
