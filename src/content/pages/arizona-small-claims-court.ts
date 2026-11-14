import { definePage } from '../../lib/page-types';
import { st, idx, rankOf } from '../../lib/engine/claims';
import { usd } from '../../lib/fmt';
import { factsTable, neighborsTable, stateSources, lockedState } from '../../lib/state-page';
const S = st('AZ');
export default definePage({
  id: 'arizona-small-claims-court', group: 'states', order: 16, slug: 'arizona-small-claims-court',
  nav: 'Arizona', card: `Justice Court small claims division up to ${usd(S.cap)}; ${usd(S.fee![0][1])} statewide, $58 in Maricopa.`,
  title: 'Arizona Small Claims Court 2026: $5,000 Limit, $30 to File',
  description: 'Arizona small claims court in 2026: the $5,000 limit of A.R.S. 22-503, why some websites still say $3,500, the $30 statewide fee and $58 in Maricopa County.',
  h1: `Arizona small claims court: ${usd(S.cap)} in the Justice Court`,
  intro: `<strong>Arizona small claims court</strong> is the small claims division of each Justice Court; under A.R.S. § 22-503 it hears claims of up to <strong>${usd(S.cap)}</strong>, and the statewide filing fee is <strong>${usd(S.fee![0][1])}</strong>.`,
  resume: `Arizona’s small claims division sits inside the Justice Courts, the local courts organized by precinct in each county. Section 22-503 of the Arizona Revised Statutes sets its ceiling at ${usd(S.cap)}. Older pages on the web still give $3,500 or even $2,500, figures that were overtaken years ago; when we read the search results for this page, three of the first results gave a wrong number. The fee is low by national standards: ${usd(S.fee![0][1])} on the statewide justice court schedule in effect since December 28, 2024 (Administrative Order 2024-211). Maricopa County, where most Arizonans live, publishes its own schedule and charges $58 to file a small claims complaint. With a ${usd(S.cap)} ceiling the state ranks ${rankOf('AZ')} of 51, far below California next door at ${usd(st('CA').cap)}.`,
  ...lockedState('AZ'), toolTitle: 'Does your claim fit the Arizona limit?',
  body: (h) => `
<h2>Arizona small claims court or the regular Justice Court track?</h2>
<p>A claim of ${usd(S.cap)} or less can go to the small claims division, where the hearing is informal and the forms are short. A larger claim goes through the ordinary civil process, where the rules of procedure apply in full. Before you file, add up the whole claim: the debt, the damage and anything else you want the judge to award. If it is above ${usd(S.cap)}, cutting it down to fit means giving up the difference for good, because the same dispute cannot be brought twice.</p>
${factsTable(h, 'AZ')}
<h2>Statewide fee or Maricopa fee</h2>
<p>Which schedule applies depends on the court where you file, not on where you live. A landlord in Phoenix suing a former tenant who moved to Tucson files in Pima County and pays the statewide ${usd(S.fee![0][1])}; the same claim against a tenant still living in Mesa goes to a Maricopa justice court at $58. Serving the papers is a separate cost, paid to a constable or a private process server.</p>
<p>The calculator below counts the statewide ${usd(S.fee![0][1])}. If you file in a Maricopa County justice court, type $58 under “A different filing fee”.</p>
${h.mini('cost', { title: 'What an Arizona small claim costs you', defaults: { st: idx('AZ'), claim: 3000 }, locked: ['st'] })}
<h2>Arizona and its neighbors</h2>
<p>Arizona’s ceiling is the lowest in its corner of the country. Someone suing a business based in Nevada or Utah may find the other state’s court both available and roomier, because the case usually belongs where the defendant lives or where the deal was made.</p>
${neighborsTable(h, 'AZ')}
<p>Compare all states on ${h.a('small-claims-court-limits', 'the table of small claims limits')}, or see ${h.a('california-small-claims-court', 'how California splits its limit')}.</p>`,
  faqs: [
    { q: 'What is the small claims limit in Arizona?', a: '$5,000, under A.R.S. § 22-503. Pages that still say $3,500 or $2,500 are out of date. The small claims division sits in each Justice Court. A claim above $5,000 cannot be heard there, so it must be reduced or brought through the regular civil process.', open: true },
    { q: 'How much is the filing fee for Arizona small claims?', a: '$30 on the statewide justice court schedule in effect since December 28, 2024. Maricopa County justice courts charge $58 on their own schedule. Serving the defendant is a separate cost, paid to a constable or a private process server. Ask the clerk of your justice court for both figures before you file.' },
    { q: 'Which Arizona justice court do I file in?', a: 'Usually the justice precinct where the defendant lives or where the dispute took place. The court’s clerk can confirm the precinct before you file. Filing in the wrong precinct can lead to the case being moved or dismissed, which costs time and another fee, so call before you send the forms.' },
  ],
  related: ['small-claims-court-limits', 'small-claims-court-filing-fee', 'california-small-claims-court'],
  sources: [...stateSources('AZ')],
});
