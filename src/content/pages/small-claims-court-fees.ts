import { definePage } from '../../lib/page-types';
import { STATES, st, feeFor, limitFor } from '../../lib/engine/claims';
import { usd } from '../../lib/fmt';
const withFee = STATES.filter((s) => s.fee);
const at = (s: (typeof STATES)[number], x: number) => (x > limitFor(s) ? 'over limit' : usd(feeFor(s, x)!));
export default definePage({
  id: 'small-claims-court-fees', group: 'guides', order: 9, slug: 'small-claims-court-fees',
  nav: 'All the fees', card: 'Filing, service, extra defendants: the fees of a small claim added up.',
  title: 'Small Claims Court Fees 2026: Filing, Service, Defendants',
  description: 'Small claims court fees in 2026: the filing fee for $1,000, $2,500 and $5,000 claims in 14 states, service per defendant, and which fees the loser pays back.',
  h1: 'Small claims court fees in 2026: what you pay before the hearing',
  intro: `<strong>Small claims court fees</strong> come in two parts you pay up front: the filing fee, fixed statewide in ${withFee.length} jurisdictions (a $2,500 claim costs <strong>${usd(feeFor(st('CA'), 2500)!)}</strong> in California and <strong>${usd(feeFor(st('MI'), 2500)!)}</strong> in Michigan), and the cost of serving each defendant.`,
  resume: `The fees of a small claims case are paid before you know the outcome, so it helps to add them up first. The filing fee depends on the state and, in most schedules, on the amount claimed: the table below gives the official figure for claims of $1,000, $2,500 and $5,000 in every state where one schedule covers the whole state. Service is the second fee and it multiplies: each defendant must be served, so suing a couple, or a company and its owner, doubles it. Some courts charge more for frequent filers: in California the fee rises to $100 for anyone who has filed more than 12 small claims in the past 12 months. Later steps, such as a subpoena for a witness, an appeal or a wage garnishment, carry their own fees. A judge who rules for you can usually add the filing and service fees to the judgment, and every state has a fee waiver for people with low income. The calculator above adds the fees for your state, your amount and the number of defendants.`,
  tool: 'fees', toolTitle: 'Your fees before the hearing',
  body: (h) => `
<h2>Small claims court fees by claim amount</h2>
<p>The filing fees below come from the official schedules read for this site; “over limit” means the amount cannot be claimed in that state’s small claims court.</p>
${h.table(['State', '$1,000 claim', '$2,500 claim', '$5,000 claim'], withFee.map((s) => [s.name, at(s, 1000), at(s, 2500), at(s, 5000)]), 'Small claims filing fee for three claim amounts, official schedules read on 13 November 2026', ['l', 'r', 'r', 'r'])}
<p>The step-by-step schedules, with their sources, are on ${h.a('small-claims-court-filing-fee', 'the filing fee page')}; in the other states the county sets the fee.</p>
<h2>The fees that come after filing</h2>
<ul>
<li><strong>Service on each defendant</strong>: certified mail through the clerk in some courts, a sheriff, a constable or a process server elsewhere.</li>
<li><strong>Subpoena of a witness or a document</strong>: a fee to issue it and often a fee to serve it.</li>
<li><strong>Appeal</strong>: the side that appeals usually pays a new fee, and in some states posts a bond.</li>
<li><strong>Collection</strong>: each writ, garnishment or lien has its own fee, usually added to what the debtor owes.</li>
</ul>
${h.mini('fees', { title: 'Two defendants in Massachusetts', defaults: { st: 22, amount: 4000, defs: 2 } })}
<h2>Fees you can get back, and fees you can skip</h2>
<p>Ask the judge at the hearing to add the filing and service fees to the judgment; bring the receipts. If paying the fees would stop you from meeting basic needs, ask the clerk for the fee waiver form before you pay: in California, people who receive public benefits or whose income is below a set amount qualify. To weigh the fees against time off work and the amount at stake, use ${h.a('how-much-does-it-cost-to-sue-someone', 'the full cost of suing')}.</p>`,
  faqs: [
    { q: 'What are the fees for small claims court?', a: 'A filing fee, paid when you file, and a fee to serve each defendant. Where a statewide schedule exists, filing ranges from $10 in Wyoming to $295 for the largest Florida claims; elsewhere the county sets it. Later steps such as subpoenas, appeals and collection have their own fees, which the clerk lists.', open: true },
    { q: 'Do I pay more to sue two people?', a: 'Usually the filing fee is the same, but each defendant must be served, so the service cost is paid once per defendant. Enter the number of defendants in the calculator above to see the total. Check with the clerk whether your court charges anything else for an added party before you file.' },
    { q: 'Who pays the small claims court fees in the end?', a: 'You pay them up front. If you win, the judge can usually order the losing side to repay the filing and service fees as part of the judgment. You recover them only when the judgment itself is paid, so keep every receipt and the date you paid it.' },
  ],
  related: ['small-claims-court-filing-fee', 'how-much-does-it-cost-to-sue-someone', 'file-small-claims'],
  sources: [['California Courts: file your plaintiff’s claim (fees, fee waiver)', 'https://selfhelp.courts.ca.gov/small-claims/start-case/file'], ['Michigan district court fee table (MCL 600.8420)', st('MI').feeUrl!], ['Massachusetts court filing fees', st('MA').feeUrl!], ['Florida Statutes § 34.041', st('FL').feeUrl!]],
});
