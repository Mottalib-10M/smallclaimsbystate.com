import { definePage } from '../../lib/page-types';
import { st, idx, rankOf } from '../../lib/engine/claims';
import { usd } from '../../lib/fmt';
import { factsTable, neighboursTable, stateSources, lockedState } from '../../lib/state-page';
const S = st('CO');
export default definePage({
  id: 'colorado-small-claims-court', group: 'states', order: 17, slug: 'colorado-small-claims-court',
  nav: 'Colorado', card: `County Court small claims up to ${usd(S.cap)}; $31 or $55 to file, two claims a month at most.`,
  title: 'Colorado Small Claims Court 2026: $7,500 Limit and Fees',
  description: 'Colorado small claims court in 2026: the $7,500 County Court limit, the $31 and $55 filing fees by amount, and the two-claims-a-month cap. Check your amount.',
  h1: `Colorado small claims court: ${usd(S.cap)} and a cap on how often`,
  intro: `<strong>Colorado small claims court</strong> is a division of the County Court that hears claims up to <strong>${usd(S.cap)}</strong>; the filing fee is <strong>$31</strong> up to $500 and <strong>$55</strong> above.`,
  resume: `Colorado is one of the few states that limits how often the same person can use small claims. Under C.R.S. § 13-6-411 a plaintiff may file no more than two claims a month in one county and no more than 18 in a year; frequent filers such as landlords and small businesses have to use the regular County Court docket for the rest. The ceiling of ${usd(S.cap)} ranks ${rankOf('CO')} of 51. The filing fee follows the amount claimed, under C.R.S. § 13-32-101: $31 for a claim of $500 or less, $55 for anything above, up to the limit. Colorado Judicial’s self-help pages list both figures, so this page uses them. The small claims division sits in the County Court, and a case is normally filed in the county where the defendant lives, works or has an office.`,
  ...lockedState('CO'), toolTitle: 'Does your claim fit the Colorado limit?',
  body: (h) => `
<h2>Two tiers of filing fee in Colorado small claims court</h2>
<p>The step from $31 to $55 sits at $500. A neighbour who owes you $480 for a shared fence costs you $31 to sue; the same neighbour owing $520 costs $55. When the claim is close to the line, the extra $24 is small next to the amount, but it is worth knowing that court costs can be added to the judgment when you win.</p>
${factsTable(h, 'CO')}
${h.mini('fee', { title: 'The Colorado fee for your amount', defaults: { st: idx('CO'), amount: 450 }, locked: ['st'] })}
<h2>Who uses the monthly cap</h2>
<p>The two-a-month rule rarely touches an individual with one dispute. It matters for small landlords, contractors and shops that bill customers: a business with several unpaid invoices has to spread its filings over time, choose the larger claims for small claims and send the rest to the County Court civil docket, where there is no such cap and the limit is much higher.</p>
<h2>Colorado and its neighbours</h2>
${neighboursTable(h, 'CO')}
<p>For the steps of a case, read ${h.a('how-to-sue-someone-in-small-claims-court', 'how to sue in small claims')}; for fees elsewhere, see ${h.a('small-claims-court-filing-fee', 'the filing fee comparison')}.</p>`,
  faqs: [
    { q: 'What is the maximum for small claims in Colorado?', a: '$7,500, heard by the small claims division of the County Court. Anything above that figure belongs on the County Court’s civil docket, which has longer forms. You can reduce a larger claim to $7,500, but the rest is then given up for good.', open: true },
    { q: 'How many small claims can I file in Colorado?', a: 'No more than two a month in one county and 18 a year, under C.R.S. § 13-6-411. The cap matters mostly to landlords and small businesses with several unpaid accounts. An individual with one dispute will rarely reach it. Claims beyond the cap can go to the County Court’s civil docket.' },
    { q: 'What is the Colorado small claims filing fee?', a: '$31 for a claim of $500 or less and $55 above $500, under C.R.S. § 13-32-101. The step sits at $500, so a claim just above it costs $24 more to file. Service on the defendant is paid separately, and the judge can add both costs to the judgment if you win.' },
  ],
  related: ['small-claims-court-filing-fee', 'utah-small-claims-court', 'small-claims-court-limits'],
  sources: [...stateSources('CO')],
});
