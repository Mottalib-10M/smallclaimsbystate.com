import { definePage } from '../../lib/page-types';
import { st, idx, median, countAtLeast, N_STATES, ranking } from '../../lib/engine/claims';
import { usd } from '../../lib/fmt';
const LOW = ranking().slice(-1)[0];
const TOP = ranking()[0];
export default definePage({
  id: 'how-to-sue-someone', group: 'guides', order: 1, slug: 'how-to-sue-someone',
  nav: 'How to sue someone: which court', card: 'Small claims or the regular civil court: the amount and the defendant decide.',
  title: 'Sue Someone in 2026: How to Sue Someone in the Right Court',
  description: 'How to sue someone in 2026: pick the right court for your amount, demand payment in writing, file, serve and prove your case, with the limits of 51 states.',
  h1: 'How to sue someone: pick the court before anything else',
  intro: `<strong>How to sue someone</strong> depends first on the amount: up to your state’s small claims limit, <strong>${usd(median())}</strong> in the median state, you can sue on your own in small claims court; above it, the case goes to the regular civil court, where the rules are longer and a lawyer is more useful.`,
  resume: `Suing someone is a sequence of choices, and the first one decides the rest: which court. A dispute over a few thousand dollars with a person or a business fits in small claims court in every state, with a one-page form, a fee of tens of dollars and a hearing that lasts minutes. A larger claim goes to the regular civil court, with a written complaint, formal service, deadlines to answer, discovery and rules of evidence; people can still represent themselves there, but most hire counsel. A claim against a government agency follows a route of its own. Whatever the court, the same groundwork pays off: a written demand that sets a date, the exact legal name and address of the defendant, the paper that proves the amount, and a check of the deadline for your kind of claim. The checker above applies your state’s small claims limit to your amount and tells you which side of the line you are on.`,
  tool: 'limit', toolTitle: 'Can you sue for this amount in small claims?', toolDefaults: { amount: 15000 },
  body: (h) => `
<h2>How to sue someone: small claims or the regular civil court</h2>
<p>The two routes differ in almost everything except the judge’s power to order payment. The table sums up what changes when your claim is above the limit.</p>
${h.table(['', 'Small claims court', 'Regular civil court'], [
    ['Amount', `Up to the state’s limit, from ${usd(LOW.cap)} to ${usd(TOP.cap)}`, 'Above it, without ceiling in the general trial court'],
    ['Starting paper', 'A short claim form from the clerk', 'A written complaint that follows the rules of civil procedure'],
    ['Lawyers', 'Not needed; limited in a few states', 'Allowed everywhere and common'],
    ['Exchange of evidence', 'You bring it to the hearing', 'Discovery: questions, documents, depositions'],
    ['Length', 'Weeks to a few months', 'Months to years'],
  ], 'Two ways to sue someone for money', ['l', 'l', 'l'])}
<p>${countAtLeast(10000)} of the ${N_STATES} jurisdictions allow ${usd(10000)} or more in small claims. Cutting a claim to fit the limit is allowed, but the rest is lost for good: weigh it with the checker above.</p>
<h2>The five moves, whatever the court</h2>
<ol>
<li><strong>Write a demand.</strong> The amount, the reason, a date. Our ${h.a('small-claims-demand-letter', 'demand letter')} fills itself in.</li>
<li><strong>Identify the defendant.</strong> The full legal name of a person, or the registered name of a business from the Secretary of State’s search.</li>
<li><strong>Choose the court and the county.</strong> Usually where the defendant lives or does business, or where the deal or the damage took place. ${h.a('small-claims-court-near-me', 'Finding the right county')} explains the usual rules.</li>
<li><strong>File and serve.</strong> Pay the fee or ask for a waiver, then have the papers delivered the way the court requires.</li>
<li><strong>Prove the amount.</strong> Contracts, receipts, photos, messages and estimates, in order and in copies.</li>
</ol>
${h.mini('court', { title: 'Suing a person, a state or the federal government?', defaults: { st: idx('TX'), amount: 15000 } })}
<h2>When you should not sue yet</h2>
<p>If the deadline for your kind of claim is far off and the other side has started to pay, a written payment plan may bring more than a judgment. If the other side has no income or property that can be reached, a judgment may stay unpaid for years; read ${h.a('collecting-a-small-claims-judgment', 'collecting a judgment')} before you spend money on fees. And if the dispute is about a government agency, ${h.a('claims-court', 'the claims court page')} shows the route that applies.</p>`,
  faqs: [
    { q: 'How do I sue someone without a lawyer?', a: 'Use small claims court if the amount fits your state’s limit: the forms are short, the clerk explains the procedure and the hearing is informal. Above the limit, you may still represent yourself in the regular civil court, but the rules of procedure apply in full. Many courts run self-help centers that explain the forms without giving legal advice.', open: true },
    { q: 'How much money can I sue someone for?', a: `In small claims, up to your state’s limit: ${usd(LOW.cap)} in ${LOW.name}, ${usd(median())} in the median state, ${usd(TOP.cap)} at the top. In the regular civil court there is no such ceiling, but you must prove every dollar you claim. The checker above applies the limit of your state to your own figure.` },
    { q: 'Can I sue someone who lives in another state?', a: 'Often you must sue where they live or where the deal or damage took place, and then the limit and the fee of that state apply. Your own state’s court can hear the case only if it has power over the defendant. Serving papers out of state also costs more and takes longer, so compare both states first.' },
  ],
  related: ['how-to-sue-someone-in-small-claims-court', 'claims-court', 'small-claims-court-limits'],
  sources: [[`${TOP.name}: ${TOP.cite}`, TOP.url], [`${LOW.name}: ${LOW.cite}`, LOW.url], [`Texas: ${st('TX').cite}`, st('TX').url]],
});
