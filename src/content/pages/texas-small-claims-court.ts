import { definePage } from '../../lib/page-types';
import { st, idx, rankOf, countAtLeast } from '../../lib/engine/claims';
import { usd } from '../../lib/fmt';
import { factsTable, neighborsTable, stateSources, lockedState } from '../../lib/state-page';
const S = st('TX');
export default definePage({
  id: 'texas-small-claims-court', group: 'states', order: 10, slug: 'texas-small-claims-court',
  nav: 'Texas', card: `Justice Court hears claims up to ${usd(S.cap)}, attorney fees included.`,
  title: 'Texas Small Claims Court 2026: $20,000 Limit, Justice Court',
  description: 'Texas small claims court in 2026: the $20,000 limit of Justice Court under Rule 500.3, what counts toward it, county filing fees, and a check of your amount.',
  h1: `Texas small claims court: up to ${usd(S.cap)} in Justice Court`,
  intro: `In <strong>Texas small claims court</strong> you can ask for up to <strong>${usd(S.cap)}</strong>: the small claims case is heard by a Justice of the Peace, and the limit counts attorney fees but not interest or court costs.`,
  resume: `Texas has no court named “small claims court” any more: since the Supreme Court of Texas rewrote the justice court rules, a small claims case is one of four kinds of civil case heard by the Justice Court of your precinct. Rule 500.3 sets the ceiling at ${usd(S.cap)}, the same figure as the general civil jurisdiction of justice courts under Government Code § 27.031. Two details trip people up. Attorney fees count toward the ${usd(S.cap)}, so a landlord or a business that hires a lawyer has less room for the debt itself. Statutory interest and court costs do not count, so a claim of exactly ${usd(S.cap)} can end in a judgment for more. The limit ranks ${rankOf('TX')} of 51, one of only ${countAtLeast(S.cap)} jurisdictions at ${usd(S.cap)} or more.`,
  ...lockedState('TX'), toolTitle: 'Does your claim fit the Texas limit?',
  body: (h) => `
<h2>What the Texas small claims court limit counts</h2>
<p>The figure that matters is the amount you ask the judge to award, measured the way Rule 500.3 measures it: the debt or damage, plus any attorney fees you claim, without the interest a statute adds and without court costs. A tenant suing for a deposit of $2,400 plus a statutory penalty usually adds the penalty to the claim, because it is damages, not interest. A contractor owed $19,000 who also wants $2,500 of lawyer’s fees is over the line and has to cut one or the other.</p>
${factsTable(h, 'TX')}
<h2>Filing fees in Texas are set county by county</h2>
<p>The Office of Court Administration publishes the parts of the fee that the state sets, but each county adds its own charges, so the total for the same petition differs from one precinct to the next. The justice court clerk gives the exact figure, and the constable or a private process server charges separately to deliver the citation. Someone who cannot pay can ask the court to let them file without paying the costs.</p>
<p>Because the county sets the total, the calculator below leaves the fee empty: ask the justice court clerk and type the figure in.</p>
${h.mini('cost', { title: 'What a Texas justice court case costs you', defaults: { st: idx('TX'), claim: 6000 }, locked: ['st'] })}
<h2>Neighboring states are far lower</h2>
<p>A Texan with a claim against someone in Oklahoma, Louisiana or New Mexico meets a very different ceiling across the border. The table compares the limits that apply in each court; the court that hears the case is usually the one where the defendant lives or where the contract was performed, which is why the neighbor’s limit can be the one that binds you.</p>
${neighborsTable(h, 'TX')}
<p>For the steps from demand letter to judgment, read ${h.a('how-to-sue-someone-in-small-claims-court', 'how to sue someone in small claims court')}; to compare every state, see ${h.a('small-claims-court-limits', 'the limits of all 51 jurisdictions')}.</p>`,
  faqs: [
    { q: 'Is there still a small claims court in Texas?', a: 'Not as a separate court. Small claims cases are filed in the Justice Court of the precinct, under the justice court rules (Part V of the Texas Rules of Civil Procedure). The judge is a Justice of the Peace. The justice court also hears debt claims, repair-and-remedy cases and evictions, each with its own rules. A small claims case is the general category for an individual seeking money or property.', open: true },
    { q: 'Do attorney fees count toward the $20,000 in Texas?', a: 'Yes. Rule 500.3 includes attorney fees in the $20,000 but leaves out statutory interest and court costs. Most people in Texas justice court have no lawyer, so the question mostly matters for businesses. If fees push you over the limit, drop them or reduce the debt to stay under $20,000.' },
    { q: 'How much does it cost to file in a Texas justice court?', a: 'It depends on the county: the state sets part of the fee and the county adds the rest. Ask the clerk of the justice court, and add the cost of serving the citation. Someone who cannot afford the fee can file a statement of inability to afford payment of court costs. The judge decides whether the fees are waived.' },
  ],
  related: ['small-claims-court-limits', 'how-much-does-it-cost-to-sue-someone', 'small-claims-demand-letter'],
  sources: [...stateSources('TX')],
});
