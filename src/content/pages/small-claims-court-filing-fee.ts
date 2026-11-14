import { definePage } from '../../lib/page-types';
import { STATES, st } from '../../lib/engine/claims';
import { usd } from '../../lib/fmt';
const withFee = STATES.filter((s) => s.fee);
const county = STATES.filter((s) => !s.fee);
const steps = (s: (typeof STATES)[number]) => s.fee!.map(([upTo, f], i) => (s.fee!.length === 1 ? `${usd(f)}` : i === 0 ? `${usd(f)} up to ${usd(Math.ceil(upTo))}` : `${usd(f)} up to ${usd(Math.min(upTo, s.cap))}`)).join(' · ');
export default definePage({
  id: 'small-claims-court-filing-fee', group: 'guides', order: 4, slug: 'small-claims-court-filing-fee',
  nav: 'Filing fee, state by state', card: 'The official fee schedules of 14 states, step by step, and where to ask in the others.',
  title: 'Small Claims Court Filing Fee 2026: Official Fees by State',
  description: 'Small claims court filing fee in 2026: the schedules of 14 states by claim amount, from $10 in Wyoming, and how to find the fee where it is set locally.',
  h1: 'Small claims court filing fee in 2026, state by state',
  intro: `The <strong>small claims court filing fee</strong> is set statewide in ${withFee.length} jurisdictions, from <strong>${usd(st('WY').fee![0][1])}</strong> in Wyoming to a sliding scale in California, Florida, Massachusetts and Michigan; in the other ${county.length} the county or the court sets it.`,
  resume: `A small claims filing fee is paid once, when the claim is filed, and covers the court’s work up to judgment. Most schedules rise with the amount claimed, in two to four steps: in Massachusetts a $500 claim costs ${usd(st('MA').fee![0][1])} and a $7,000 claim ${usd(st('MA').fee![3][1])}, surcharge included; in Michigan the steps stop at ${usd(st('MI').fee![2][1])} whatever the amount above $1,750. Some states charge one flat fee, such as ${usd(st('HI').fee![0][1])} in Hawaii or ${usd(st('IA').fee![0][1])} in Iowa. In the rest of the country, including Texas, Illinois, Georgia and Ohio, the fee is a sum of state and local charges that differs from one county to the next; we show no figure for them rather than one that would be wrong in most counties. Serving the defendant is always billed on top.`,
  tool: 'fee', toolTitle: 'Your filing fee', toolDefaults: { st: 22, amount: 3000 },
  body: (h) => `
<h2>Small claims court filing fee schedules read in 14 states</h2>
<p>Each schedule below was read on the court’s or the legislature’s own page. A step applies to claims up to the amount shown; the top step ends at the state’s small claims limit.</p>
${h.table(['State', 'Fee by amount claimed', 'Source'], withFee.map((s) => [s.name, steps(s), h.ext(s.feeUrl!, 'schedule')]), 'Official small claims filing fees, read on 13 November 2026', ['l', 'l', 'l'])}
<p>Notes from the schedules: ${withFee.filter((s) => s.feeNote).map((s) => `<strong>${s.name}</strong>: ${s.feeNote}`).join(' ')}</p>
<h2>States where the county sets the fee</h2>
<p>${county.map((s) => s.name).join(', ')}. In these jurisdictions, call or check the website of the clerk of the court where you will file, and ask for the total: filing fee, any technology or e-filing charge, and the cost of service.</p>
${h.mini('cost', { title: 'Add service and time to the fee' })}
<h2>Paying, and not paying</h2>
<p>Clerks take cash, money orders or cards depending on the court, and online filing systems take cards with a processing charge. A person who cannot afford the fee can ask for a waiver with a short form on income and expenses; if it is granted, filing and often service cost nothing. If you win, ask the judge to order the defendant to repay the fee.</p>`,
  faqs: [
    { q: 'What is the cheapest state to file a small claim?', a: 'Of the fees set statewide, Wyoming’s $10 circuit court fee is the lowest; New York City charges $15 or $20 and Washington $35 plus any local surcharge. In most other states the fee depends on the county, so the cheapest place to file can change from one courthouse to the next. Always confirm the figure with the clerk before you send money.', open: true },
    { q: 'Is the filing fee refunded if the case settles?', a: 'Generally no: the fee pays for opening the case. If the defendant pays after filing, include the fee in the amount you accept. Write the settlement down, with the amount and the date it is due, and tell the clerk if you withdraw the case. If payment never arrives, ask the clerk whether the case can be reopened.' },
    { q: 'Why is there no fee for Texas or Illinois?', a: 'Because there is no single fee: each county adds its own charges to the state’s. The clerk of your justice or circuit court gives the total. We show a fee only when a court publishes one statewide schedule. Where the county decides, a figure from one courthouse would be wrong for most readers, so we send you to the clerk instead.' },
  ],
  related: ['how-much-does-it-cost-to-sue-someone', 'small-claims-court-limits', 'florida-small-claims-court'],
  sources: withFee.slice(0, 6).map((s) => [`${s.name}: small claims filing fees`, s.feeUrl!] as [string, string]),
});
