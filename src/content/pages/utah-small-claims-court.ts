import { definePage } from '../../lib/page-types';
import { st, idx, rankOf, countAtLeast } from '../../lib/engine/claims';
import { usd } from '../../lib/fmt';
import { factsTable, neighborsTable, stateSources, lockedState } from '../../lib/state-page';
const S = st('UT');
export default definePage({
  id: 'utah-small-claims-court', group: 'states', order: 22, slug: 'utah-small-claims-court',
  nav: 'Utah', card: `Justice Court small claims up to ${usd(S.cap)} with attorney fees, ${usd(S.next!.cap)} from 2030.`,
  title: 'Utah Small Claims Court 2026: $20,000 Limit, $25,000 in 2030',
  description: 'Utah small claims court in 2026: the $20,000 limit that includes attorney fees, the $25,000 set for cases filed from January 1, 2030, and how Utah ranks.',
  h1: `Utah small claims court: ${usd(S.cap)} now, ${usd(S.next!.cap)} from 2030`,
  intro: `<strong>Utah small claims court</strong> hears claims up to <strong>${usd(S.cap)}</strong>, attorney fees included, through December 31, 2029; the statute already sets <strong>${usd(S.next!.cap)}</strong> for cases filed from January 1, 2030.`,
  resume: `Utah is among the most generous states for small claims. Utah Code § 78A-8-102, as described on the Utah courts’ self-help pages, sets the ceiling at ${usd(S.cap)} through the end of 2029 and at ${usd(S.next!.cap)} from January 1, 2030. Only ${countAtLeast(S.cap)} jurisdictions allow ${usd(S.cap)} or more, and Utah ranks ${rankOf('UT')} of 51. The catch is that attorney fees count toward the limit, as in Texas: a business that hires a lawyer to collect an invoice has less room for the debt itself. Small claims cases are heard in the Justice Court. The filing fee follows a state schedule by amount, which we could not read from our network, so this page shows no figure. The clerk of the court where you file gives the exact amount and the cost of serving each defendant.`,
  ...lockedState('UT'), toolTitle: 'Does your claim fit the Utah limit?',
  body: (h) => `
<h2>Attorney fees inside the Utah small claims court limit</h2>
<p>Most people in small claims have no lawyer, and for them the ${usd(S.cap)} is simply the amount owed. When a contract lets the winner recover attorney fees, those fees use up part of the limit: a claim of $18,000 plus $3,000 of fees is ${usd(21000)}, over the line. Reduce the claim, drop the fees, or file an ordinary civil case instead.</p>
${factsTable(h, 'UT')}
${h.mini('limit', { title: 'Check your claim against the 2030 Utah limit', defaults: { st: idx('UT'), amount: 22000, when: 2 }, locked: ['st'] })}
<h2>Utah and its neighbors</h2>
<p>Utah’s ceiling is four times Arizona’s and well above Idaho’s new figure. A Utah business suing a customer in a neighboring state usually has to use that state’s court, and its lower limit.</p>
${neighborsTable(h, 'UT')}
<p>See ${h.a('texas-small-claims-court', 'how Texas counts attorney fees')} and ${h.a('idaho-small-claims-court', 'Idaho’s 2026 increase')}.</p>`,
  faqs: [
    { q: 'What is the Utah small claims limit in 2026?', a: '$20,000 including attorney fees, for cases filed through December 31, 2029. Small claims cases are heard in the Justice Court. A larger claim must be reduced or brought as an ordinary civil case, where the rules of procedure apply in full.', open: true },
    { q: 'When does the Utah limit go to $25,000?', a: 'For cases filed from January 1, 2030, under Utah Code § 78A-8-102. The higher figure applies by filing date, so a claim between $20,000 and $25,000 filed in 2029 still has to be reduced. The checker on this page lets you test both dates.' },
    { q: 'Do attorney fees count toward the Utah small claims limit?', a: 'Yes. The $20,000 includes attorney fees, so they reduce the room left for the claim itself. Most individuals in Utah small claims have no lawyer, so the rule mostly affects businesses. If the fees push you over, drop them or reduce the debt to stay under the limit.' },
  ],
  related: ['small-claims-court-limits', 'idaho-small-claims-court', 'texas-small-claims-court'],
  sources: [...stateSources('UT')],
});
