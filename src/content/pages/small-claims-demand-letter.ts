import { definePage } from '../../lib/page-types';
import { st } from '../../lib/engine/claims';
export default definePage({
  id: 'small-claims-demand-letter', group: 'guides', order: 5, slug: 'small-claims-demand-letter',
  nav: 'Free demand letter', card: 'A demand letter that writes itself as you type, ready to print. Free, no account.',
  title: 'Small Claims Demand Letter 2026: Free Template to Print',
  description: 'A small claims demand letter you fill in on the page and print: amount, reason, deadline and the court you will use. Free, no account, nothing sent to a server.',
  h1: 'Small claims demand letter: a free template that fills itself in',
  intro: 'A <strong>small claims demand letter</strong> tells the other side what they owe, why, and by when, before you file; fill in the six fields below and the letter is ready to print, with the right court for your state.',
  resume: 'A demand letter costs a stamp and settles a large share of disputes before anyone sees a judge, because it shows the other side that you know the amount, the deadline and the court you will use. It also serves as evidence: judges ask whether the defendant was told what was owed and given a chance to pay, and a dated copy with proof of mailing answers the question. Several legal websites sell this letter or put it behind a subscription; the text below is free, written in plain words and stays in your browser. Keep it factual: the amount and how you arrived at it, the date it was due, a reasonable deadline of ten to thirty days, and what you will do next. Threats, insults and claims you cannot prove weaken it.',
  tool: 'letter',
  body: (h) => `
<h2>What a small claims demand letter should say</h2>
<ul>
<li><strong>The amount, to the dollar</strong>, and how you computed it: the invoice, the deposit minus the deductions you accept, the loan minus what was repaid.</li>
<li><strong>The reason</strong> in one sentence, with the date of the contract, the damage or the payment that was missed.</li>
<li><strong>A deadline</strong> that a judge would find fair, usually ten to thirty days, and how to pay.</li>
<li><strong>What happens next</strong>: the court you will file in, named as the letter generator names it for your state.</li>
</ul>
<h2>Interest: add it before you send</h2>
<p>If a contract sets an interest rate, or your state’s law allows interest on a late debt, the letter can claim it. Interest usually sits outside the small claims limit, but check the wording of your state’s law; the calculator below adds simple interest to the sum owed.</p>
${h.mini('interest')}
<h2>Sending it so it counts as evidence</h2>
<p>Send the letter in a way that leaves a trace: certified mail with return receipt, or e-mail if that is how you dealt with the other side, and keep a copy. Bring both to the hearing. If the defendant answers with a partial offer, you can accept it in writing and drop the case, or refuse and file for the full amount.</p>
<p>When the deadline passes without payment, the next steps are in ${h.a('how-to-sue-someone-in-small-claims-court', 'how to sue someone in small claims court')}, and the cost is in ${h.a('how-much-does-it-cost-to-sue-someone', 'what it costs to sue')}.</p>`,
  faqs: [
    { q: 'Is a demand letter required before small claims court?', a: 'Not in every state, but some courts ask whether you demanded payment first, and a judge will look at it. Sending one is free and often ends the dispute. Keep a copy of the letter and the proof of mailing, and bring both to the hearing. The generator on this page writes the letter from six fields and checks the amount against your state’s limit.', open: true },
    { q: 'How long should I give them to pay?', a: 'Ten to thirty days is common. Pick a date you can show was reasonable, and file promptly after it if nothing arrives. Fourteen days is a common middle ground for a deposit or an invoice. Write the exact calendar date rather than a number of days, so there is no argument later about when the time ran out.' },
    { q: 'Should a lawyer send the letter?', a: 'Not for a small claims amount. A clear letter in your own name, sent with proof of mailing, does the job. A letter on a law firm’s paper costs money that a small claims judge will rarely let you recover. Keep the tone factual: what is owed, why, by when, and what you will do if it is not paid.' },
  ],
  related: ['how-to-sue-someone-in-small-claims-court', 'collecting-a-small-claims-judgment', 'small-claims-court-limits'],
  sources: [['Nevada Revised Statutes, chapter 73 (small claims)', st('NV').url], ['California Courts self-help: file your claim', st('CA').url], ['New Jersey courts: small claims brochure', st('NJ').url]],
});
