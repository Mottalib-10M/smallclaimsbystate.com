import { definePage } from '../../lib/page-types';
import { st, idx, rankOf } from '../../lib/engine/claims';
import { usd } from '../../lib/fmt';
import { factsTable, neighborsTable, stateSources, lockedState } from '../../lib/state-page';
const S = st('IN');
export default definePage({
  id: 'indiana-small-claims-court', group: 'states', order: 24, slug: 'indiana-small-claims-court',
  nav: 'Indiana', card: `Small claims docket up to ${usd(S.cap)}; the filing fee depends on the county.`,
  title: 'Indiana Small Claims Court 2026: $10,000 Limit, County Fees',
  description: 'Indiana small claims court in 2026: the $10,000 limit of the small claims docket, why the filing fee differs by county, and how Indiana compares nearby.',
  h1: `Indiana small claims court: ${usd(S.cap)} on the small claims docket`,
  intro: `<strong>Indiana small claims court</strong> is the small claims docket of the Circuit or Superior Court in each county; it hears claims of up to <strong>${usd(S.cap)}</strong>, and the filing fee depends on the county.`,
  resume: `Indiana sets one limit for the whole state, ${usd(S.cap)}, under Ind. Code § 33-29-2-4 and the Indiana courts’ small claims manual, but the courts that hear the cases and the fees they charge vary by county. The fee is the sum of state and county charges, so it is not the same everywhere: Wabash County, for example, publishes $97 for a claim against one defendant. Ask the clerk of the county where you file for the exact amount and the cost of serving each defendant. At ${usd(S.cap)} Indiana ranks ${rankOf('IN')} of 51, above Ohio’s ${usd(st('OH').cap)}, Michigan’s ${usd(st('MI').cap)} and Kentucky’s ${usd(st('KY').cap)}, and level with Illinois. A claim above the limit cannot be split to fit: it either gives up the excess or goes to the regular civil docket.`,
  ...lockedState('IN'), toolTitle: 'Does your claim fit the Indiana limit?',
  body: (h) => `
<h2>Staying inside the Indiana small claims court limit</h2>
<p>If the claim is above ${usd(S.cap)}, you can cut it down to the limit and give up the rest, but you cannot split one debt into two claims to stay under the line. A landlord owed $14,000 of rent and repairs by one tenant has one claim, not two. Claims above the limit go to the regular civil docket.</p>
${factsTable(h, 'IN')}
<p>Indiana fees differ by county, so the calculator leaves the fee empty: Wabash County, for example, publishes $97 for one defendant. Ask your county clerk and type the figure in.</p>
${h.mini('cost', { title: 'What an Indiana small claim costs you', defaults: { st: idx('IN'), claim: 5000 }, locked: ['st'] })}
<h2>Indiana and its neighbors</h2>
${neighborsTable(h, 'IN')}
<p>See ${h.a('michigan-small-claims-court', 'Michigan’s fee steps')} and ${h.a('small-claims-court-filing-fee', 'fees in other states')}.</p>`,
  faqs: [
    { q: 'What is the small claims limit in Indiana?', a: '$10,000 on the small claims docket of the Circuit or Superior Court. The same limit applies in every county. A larger claim goes to the regular civil docket, where formal rules apply and the case takes longer. You can also reduce the claim to fit.', open: true },
    { q: 'How much does it cost to file small claims in Indiana?', a: 'It depends on the county. Wabash County, for example, publishes $97 for one defendant. Ask the county clerk. Each additional defendant usually adds a service cost. The clerk of the county where you file gives the total for your case.' },
    { q: 'Can I split a large claim into two Indiana small claims?', a: 'No. One debt is one claim; you can reduce it to $10,000 but the rest is then given up. Separate debts from separate deals are separate claims, but courts look closely at claims that seem cut up to fit the limit. When in doubt, ask the clerk before filing.' },
  ],
  related: ['michigan-small-claims-court', 'small-claims-court-filing-fee', 'how-much-does-it-cost-to-sue-someone'],
  sources: [...stateSources('IN')],
});
