import { definePage } from '../../lib/page-types';
import { st } from '../../lib/engine/claims';
import { usd } from '../../lib/fmt';
import { factsTable, neighboursTable, stateSources, lockedState } from '../../lib/state-page';
const S = st('NY');
export default definePage({
  id: 'new-york-small-claims-court', group: 'states', order: 14, slug: 'new-york-small-claims-court',
  nav: 'New York', card: `${usd(S.cap)} in New York City, $5,000 in city courts, $3,000 in town and village courts.`,
  title: 'New York Small Claims Court 2026: $10,000 NYC, $5,000 City',
  description: 'New York small claims court in 2026: $10,000 in New York City, $5,000 in other city courts, Nassau and Suffolk, $3,000 in town and village courts. Check yours.',
  h1: 'New York small claims court: three limits, depending on the court',
  intro: `<strong>New York small claims court</strong> has three ceilings: <strong>${usd(S.cap)}</strong> in the Civil Court of New York City, <strong>$5,000</strong> in city courts outside it and in Nassau and Suffolk, and <strong>$3,000</strong> in town and village courts.`,
  resume: `New York is the only large state where the small claims limit depends on which local court you file in. The Civil Court of the City of New York, which covers the five boroughs, takes claims up to ${usd(S.cap)}. The city courts of the rest of the state, from Buffalo to Yonkers, and the district courts of Nassau and Suffolk counties stop at $5,000, and the town and village justice courts at $3,000. Fees are low: $15 for a claim up to $1,000 and $20 above that in New York City and the city courts, $10 and $15 in town and village courts. A bill before the Legislature, Senate Bill S2636 of the 2025-2026 session, would raise the limit to ${usd(S.cap)} statewide; we found no sign that it has passed, so the three tiers still apply. Corporations cannot sue in small claims and use a separate commercial claims part instead.`,
  ...lockedState('NY'), toolTitle: 'Does your claim fit the New York City limit?',
  body: (h) => `
<h2>Which New York small claims court is yours</h2>
<p>You file where the defendant lives, works or has a business office. A claim against a contractor based in Brooklyn goes to the Civil Court in Kings County, up to ${usd(S.cap)}; the same claim against a contractor in a village of Westchester goes to that village’s justice court, up to $3,000. The calculator applies the New York City figure: if your court is outside the city, compare your amount with $5,000 or $3,000 yourself.</p>
${factsTable(h, 'NY')}
<h2>Evening sessions and arbitrators in New York City</h2>
<p>The Civil Court holds many small claims sessions in the evening, so working plaintiffs do not have to lose a day. Many cases are heard by a volunteer arbitrator, a lawyer, if both sides agree; the decision is then final and cannot be appealed. Choosing a judge instead can mean a longer wait for the hearing.</p>
${h.mini('cost', { title: 'The cost of your New York claim', defaults: { claim: 3000, fee: 20, hours: 0 } })}
<h2>New York and its neighbours</h2>
${neighboursTable(h, 'NY')}
<p>Before you file, send ${h.a('small-claims-demand-letter', 'a demand letter')}.</p>`,
  faqs: [
    { q: 'What is the small claims limit in New York State?', a: '$10,000 in New York City, $5,000 in other city courts and in Nassau and Suffolk district courts, and $3,000 in town and village courts. The court depends on where the defendant lives, works or has a business. Outside New York City, check whether your town has a city court or only a town or village justice court.', open: true },
    { q: 'Can a corporation sue in New York small claims court?', a: 'No. Corporations, partnerships and associations use the commercial claims part, which has its own rules; they can be sued in small claims, though. The commercial claims part limits how many claims a business can file each month and requires a demand letter first. An individual suing a company uses ordinary small claims.' },
    { q: 'How much does it cost to file a small claim in New York City?', a: '$15 for a claim up to $1,000 and $20 for a claim above $1,000, up to the $10,000 limit. The fee is paid to the clerk of the Civil Court in the borough where you file. Courts outside the city set their own small claims fees, which the clerk of each court will give you.' },
  ],
  related: ['new-jersey-small-claims-court', 'connecticut-small-claims-court', 'small-claims-court-limits'],
  sources: [...stateSources('NY'), ['New York Senate Bill S2636 (2025-2026)', 'https://www.nysenate.gov/legislation/bills/2025/S2636']],
});
