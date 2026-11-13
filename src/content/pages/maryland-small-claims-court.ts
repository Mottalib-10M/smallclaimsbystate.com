import { definePage } from '../../lib/page-types';
import { st, rankOf } from '../../lib/engine/claims';
import { usd } from '../../lib/fmt';
import { factsTable, neighboursTable, stateSources, lockedState } from '../../lib/state-page';
const S = st('MD');
export default definePage({
  id: 'maryland-small-claims-court', group: 'states', order: 19, slug: 'maryland-small-claims-court',
  nav: 'Maryland', card: `District Court small claim action up to ${usd(S.cap)}, interest and costs on top.`,
  title: 'Maryland Small Claims Court 2026: $5,000 in District Court',
  description: 'Maryland small claims court in 2026: the $5,000 District Court limit under section 4-405, what it leaves out, and how the neighbors compare. Check your claim.',
  h1: `Maryland small claims court: ${usd(S.cap)} in the District Court`,
  intro: `<strong>Maryland small claims court</strong> is the District Court hearing a “small claim action”: a claim of <strong>${usd(S.cap)}</strong> or less, not counting interest, costs or attorney fees allowed by law or contract.`,
  resume: `Maryland’s Courts and Judicial Proceedings Article, section 4-405, defines a small claim action as one for ${usd(S.cap)} or less, and we read the text on the General Assembly’s site. The figure leaves out three things: interest, court costs and attorney fees when a statute or a contract allows them. A landlord whose lease provides for attorney fees can therefore claim a ${usd(S.cap)} debt and still ask for fees on top. The case is heard by the District Court, which has a courthouse in every county and in Baltimore City, with simplified rules. The ceiling ranks ${rankOf('MD')} of 51, the same as Virginia’s general district court small claims division and well below the ${usd(st('DC').cap)} of the District of Columbia. The filing fee is set by the District Court’s cost schedule; we could not read it from our network, so no figure is shown here.`,
  ...lockedState('MD'), toolTitle: 'Does your claim fit the Maryland limit?',
  body: (h) => `
<h2>Measuring a Maryland small claims court claim</h2>
<p>Start with the money actually owed or the damage actually suffered. Leave out the interest that has run since, the fees you will pay the court and, if your contract gives you a right to them, your attorney fees: under section 4-405 none of these count. If what is left is ${usd(S.cap)} or less, the small claim procedure is open to you.</p>
${factsTable(h, 'MD')}
${h.mini('interest', { title: 'Interest a Maryland claim can add on top', defaults: { amount: 4800, rate: 6, months: 12 } })}
<h2>Maryland and its neighbours</h2>
<p>Around Washington the limits change a great deal over a few miles: ${usd(st('DC').cap)} in the District, ${usd(st('VA').cap)} in Virginia’s small claims division, ${usd(st('PA').cap)} in Pennsylvania. The court that can hear the case is usually the one where the defendant lives, works or carries on business.</p>
${neighboursTable(h, 'MD')}
<p>See ${h.a('collecting-a-small-claims-judgment', 'how to collect a judgment')} once you win.</p>`,
  faqs: [
    { q: 'What is the limit for small claims in Maryland?', a: '$5,000 under section 4-405 of the Courts and Judicial Proceedings Article, not counting interest, costs and attorney fees allowed by law or contract. Interest and court costs come on top of that figure. A larger claim is still heard in the District Court, which hears civil cases above the small claim amount under its regular rules.', open: true },
    { q: 'Which court hears small claims in Maryland?', a: 'The District Court of Maryland, which sits in every county and in Baltimore City. The District Court uses simplified rules for small claim actions, and most parties speak for themselves. The clerk of the location nearest the defendant can explain where to file.' },
    { q: 'Do attorney fees count toward the Maryland limit?', a: 'No, when a statute or a contract allows them. They can be claimed on top of the $5,000. The same is true of interest and court costs. Only the debt or damage itself is measured against the $5,000, which leaves room for fees provided by a lease or a contract.' },
  ],
  related: ['small-claims-court-limits', 'collecting-a-small-claims-judgment', 'small-claims-demand-letter'],
  sources: [...stateSources('MD')],
});
