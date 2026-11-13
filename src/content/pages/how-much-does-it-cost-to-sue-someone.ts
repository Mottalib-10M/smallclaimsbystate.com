import { definePage } from '../../lib/page-types';
import { STATES, st, feeFor, limitFor } from '../../lib/engine/claims';
import { usd } from '../../lib/fmt';
const withFee = STATES.filter((s) => s.fee);
const atCap = withFee.map((s) => ({ s, f: feeFor(s, limitFor(s))! })).sort((a, b) => a.f - b.f);
export default definePage({
  id: 'how-much-does-it-cost-to-sue-someone', group: 'guides', order: 3, slug: 'how-much-does-it-cost-to-sue-someone',
  nav: 'What it costs to sue', card: 'Fee, service, time off work: the full cost against the amount you claim.',
  title: 'Cost to Sue Someone in Small Claims: 2026 Fees by State',
  description: 'How much it costs to sue someone in small claims court in 2026: official filing fees from $10 to $295, service, time off work, and what the loser pays back.',
  h1: 'How much does it cost to sue someone in small claims court?',
  intro: `<strong>How much it costs to sue someone</strong> in small claims starts with a filing fee that ranges from <strong>${usd(atCap[0].f)}</strong> in ${atCap[0].s.name} to <strong>${usd(atCap[atCap.length - 1].f)}</strong> in ${atCap[atCap.length - 1].s.name} on the official schedules we read, plus the cost of serving the defendant.`,
  resume: `The filing fee is the only cost every plaintiff pays, and it is small next to the claim in most states: ${usd(feeFor(st('CA'), 5000)!)} for a $5,000 claim in California, ${usd(feeFor(st('MA'), 5000)!)} in Massachusetts, ${usd(feeFor(st('FL'), 5000)!)} in Florida, where the county court fee is set by statute. Serving the papers on the defendant adds a second charge, from a few dollars of certified mail to a sheriff’s or process server’s fee. The cost people forget is time: a morning at the courthouse to file in states without e-filing, and a day for the hearing, sometimes two if the case is postponed. A judge who rules for you can usually add the filing and service fees to the judgment, but not your lost pay, so a claim of a few hundred dollars can cost more than it brings back.`,
  tool: 'cost', toolTitle: 'What your suit costs you',
  body: (h) => `
<h2>How much it costs to sue someone: the filing fee by state</h2>
<p>Fourteen jurisdictions publish one schedule for the whole state; the others leave the fee to each county or court, and the clerk gives it. The table lists the official fee for a claim at each state’s limit, the highest step of the schedule.</p>
${h.table(['State', 'Fee for a claim at the limit', 'Limit'], atCap.map(({ s, f }) => [s.name, usd(f), usd(limitFor(s))]), 'Official small claims filing fees read on 13 November 2026', ['l', 'r', 'r'])}
<h2>Service, the second fee</h2>
<p>The defendant must receive the claim in a way the court accepts. Courts in several states mail it by certified mail for a small charge; elsewhere a sheriff, a constable or a private process server delivers it for a fee that depends on the county and on how many attempts it takes. Each defendant is served separately, so suing a couple or a business and its owner doubles the cost.</p>
<h2>The cost that does not come back</h2>
<p>Winning usually returns the fee and the service cost, added to the judgment. Time off work, parking, copies of documents and the hours spent preparing are yours to bear. The calculator above weighs them against the claim; above roughly half of the claim, a firm ${h.a('small-claims-demand-letter', 'demand letter')} or a mediation offered by the court is worth trying first.</p>
${h.mini('fee', { title: 'The fee of your state for your amount' })}
<p>Fee waivers exist in every state for people with low income: ask the clerk for the form before you pay.</p>`,
  faqs: [
    { q: 'Does the loser pay the filing fee in small claims?', a: 'Usually the judge can order the losing side to repay the filing fee and the cost of service, added to the judgment. Ask for it at the hearing. Keep the receipts for the filing fee and for service, and bring them to the hearing. Lost wages and your own time are usually not repaid, which is why the calculator counts them separately.', open: true },
    { q: 'Can I sue without paying the filing fee?', a: 'Yes, if your income is low: every state has a fee waiver procedure. The clerk of the court gives the form. You fill in a short statement of income and expenses, and the judge or clerk decides. If the waiver is granted, service by a sheriff or marshal is often covered as well; ask when you file.' },
    { q: 'Is it worth suing for $500?', a: 'If the fee is $30 to $75 and service a few dollars, often yes; if the hearing costs you a day of pay, compare first with the calculator. Add the time to prepare, the trip to court and the chance that the other side does not pay even after losing. A demand letter costs a stamp and settles many small debts before any fee is paid.' },
  ],
  related: ['small-claims-court-filing-fee', 'how-to-sue-someone-in-small-claims-court', 'small-claims-court-limits'],
  sources: [['California Courts: small claims filing fees', st('CA').feeUrl!], ['Florida Statutes § 34.041', st('FL').feeUrl!], ['Massachusetts court filing fees', st('MA').feeUrl!]],
});
