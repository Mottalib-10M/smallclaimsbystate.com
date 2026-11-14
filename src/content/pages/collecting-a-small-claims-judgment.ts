import { definePage } from '../../lib/page-types';
import { st } from '../../lib/engine/claims';
export default definePage({
  id: 'collecting-a-small-claims-judgment', group: 'guides', order: 6, slug: 'collecting-a-small-claims-judgment',
  nav: 'Getting paid after you win', card: 'What to do when you win and the other side still does not pay.',
  title: 'Collecting a Small Claims Judgment in 2026: What Works',
  description: 'Collecting a small claims judgment in 2026: asking for payment, a payment plan, taking money from wages or a bank account, liens, and how long a plan takes.',
  h1: 'Collecting a small claims judgment when the other side does not pay',
  intro: '<strong>Collecting a small claims judgment</strong> is up to you: the court decides who owes what, but it does not collect the money, so a judgment is the start of a second, shorter procedure.',
  resume: 'Winning in small claims gives you a judgment, a court order saying the defendant owes you a sum. Many defendants pay once it is entered, often after a letter that encloses a copy and gives a date. When they do not, every state offers the same family of tools, under different names: an examination where the debtor must list income and assets, an order to the employer to withhold part of the wages, an order to the bank to hand over money in an account, and a lien on real estate that must be paid when the property is sold. Each step has its own form and fee at the clerk’s office, and the fees are usually added to what the debtor owes. Some states let the judge set a monthly payment plan at the hearing; the calculator shows how long one takes.',
  tool: 'collect', toolTitle: 'How long a payment plan takes',
  body: (h) => `
<h2>Collecting a small claims judgment, in order</h2>
<ol>
<li><strong>Wait for the appeal period</strong> to run out. Collection usually cannot start while the losing side may still appeal; the clerk tells you the date.</li>
<li><strong>Ask for payment in writing</strong>, with a copy of the judgment and a deadline.</li>
<li><strong>Find out what the person who owes you owns</strong>: most states have a short court hearing (a “debtor examination”) or a written list of questions they must answer under oath.</li>
<li><strong>Take the money from their paycheck or bank account</strong> (a “wage garnishment” or a “bank levy”), through the clerk and the sheriff or marshal. Federal and state law protect part of wages and some benefits.</li>
<li><strong>Put a claim on a house or land they own</strong> in the county (a “lien”): it must be paid when the property is sold.</li>
<li><strong>Tell the court you have been paid</strong> once you are paid in full (a “satisfaction of judgment”).</li>
</ol>
<h2>Payment plans and interest</h2>
<p>A judge can often order payment in installments. Judgments also earn interest in most states at a rate the law sets. The calculators start with an example rate of 6% a year: replace it with your state’s rate, which the clerk can give you. If the monthly amount does not even cover the interest, the plan never ends, and you should ask the court for another way to collect.</p>
${h.mini('interest', { title: 'Interest owed on the judgment so far', defaults: { amount: 4500, rate: 6, months: 6 } })}
<h2>When a judgment cannot be collected</h2>
<p>Some debtors have no wages that can be garnished and no assets: their income may come only from protected benefits. A judgment lasts for years in most states and can often be renewed, so it may still be paid when their situation changes. Before you sue, the ${h.a('how-much-does-it-cost-to-sue-someone', 'cost calculator')} helps you weigh this risk against the fee.</p>`,
  faqs: [
    { q: 'Does the court collect the money for me?', a: 'No. The court enters the judgment; collecting it is up to you, through the clerk, the sheriff or marshal, and the debtor’s employer or bank. Start by asking the debtor in writing to pay the judgment. If nothing arrives, the clerk’s office explains which collection forms your state uses and what each one costs to file.', open: true },
    { q: 'Can I add collection costs to the judgment?', a: 'Usually yes: the fees for garnishment, levies and liens are generally added to the amount the debtor owes. Keep the receipts. Each state lists the costs it allows, and some limit what can be added after judgment. Write down every fee as you pay it, with the date, so the total is easy to prove.' },
    { q: 'How long is a small claims judgment valid?', a: 'Several years in every state, and it can often be renewed before it expires. The period is set by each state’s law; the clerk can tell you. Interest usually runs on the unpaid amount in the meantime. Mark the expiry date in your calendar, because a judgment that lapses can no longer be enforced.' },
  ],
  related: ['small-claims-demand-letter', 'how-to-sue-someone-in-small-claims-court', 'how-much-does-it-cost-to-sue-someone'],
  sources: [['Michigan district court fee table (MCL 600.8420)', st('MI').feeUrl!], ['Alaska Small Claims Handbook', st('AK').url], ['Indiana Small Claims Manual (2026)', st('IN').url]],
});
