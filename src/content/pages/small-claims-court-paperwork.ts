import { definePage } from '../../lib/page-types';
import { st, OTHER_COURTS } from '../../lib/engine/claims';
const CA = OTHER_COURTS.california;
export default definePage({
  id: 'small-claims-court-paperwork', group: 'guides', order: 12, slug: 'small-claims-court-paperwork',
  nav: 'Paperwork and forms', card: 'The claim form, the proof of service and the evidence to print, counted.',
  title: 'Small Claims Court Paperwork: Forms and Copies for 2026',
  description: 'Small claims court paperwork in 2026: the claim form, proof of service, fee waiver and evidence, how many copies to bring, and where each state keeps its forms.',
  h1: 'Small claims court paperwork: the forms and the copies to bring',
  intro: `<strong>Small claims court paperwork</strong> fits in one folder: the claim form of your state (in California, form <strong>SC-100, Plaintiff’s Claim</strong>), the proof that the defendant was served, a fee waiver request if you need one, and your evidence in a copy for the judge, one for each defendant and one for you.`,
  resume: `The paperwork of a small claims case is short, but each piece has a job. The claim form starts the case: it names you, the defendant, the amount and the reason, and each state has its own, usually free from the court’s website or the clerk. The proof of service shows the court that the defendant received the papers; without it there is no hearing. A fee waiver request replaces the fee when your income is low. Some courts add their own local forms, for example to request an interpreter or to exchange evidence before the hearing. Then comes the paperwork you make yourself: the contract, receipts, photos, messages, estimates and a one-page timeline. Judges read quickly, so the papers should follow the order of your story and come in enough copies. The counter above tells you how many sheets to print for your evidence and how many copies of the claim form to bring when you file.`,
  tool: 'papers', toolTitle: 'Your paperwork, counted',
  body: (h) => `
<h2>Small claims court paperwork, piece by piece</h2>
${h.table(['Paper', 'What it does', 'Where it comes from'], [
    ['Claim form', 'Starts the case: parties, amount, reason', 'The court’s forms page or the clerk'],
    ['Proof of service', 'Shows the defendant received the claim', 'Filled in by whoever served the papers'],
    ['Fee waiver request', 'Replaces the filing fee for low income', 'The clerk or the court’s forms page'],
    ['Local forms', 'Interpreter, evidence exchange, rescheduling', 'The court’s small claims page'],
    ['Your evidence', 'Proves each dollar you claim', 'Your own records'],
  ], 'The papers of a small claims case', ['l', 'l', 'l'])}
<h2>One example: California’s forms</h2>
<p>In California the claim form is ${h.ext(CA.formUrl, 'SC-100, Plaintiff’s Claim and ORDER to Go to Small Claims Court')}. You file the original and copies; the clerk keeps the original and returns one copy for you and one for each person, business or agency you sue, according to the ${h.ext(CA.fileUrl, 'California Courts self-help guide')}. By mail, the court asks for the original, two copies, the fee and a self-addressed stamped envelope. The Los Angeles court adds local orders, among them a standing order on the exchange of evidence.</p>
${h.mini('papers', { title: 'Two defendants and a thick file', defaults: { docs: 24, defs: 2 } })}
<h2>How to sort the evidence</h2>
<ol>
<li>A one-page timeline on top, with dates.</li>
<li>The agreement: contract, quote, lease, order confirmation or messages that show the deal.</li>
<li>The breach: photos, inspection reports, unanswered messages, returned checks.</li>
<li>The amount: invoices, receipts, estimates, the bank statement that shows the payment.</li>
<li>Your demand letter and the proof that it was sent; the ${h.a('small-claims-demand-letter', 'demand letter generator')} writes one.</li>
</ol>
<p>Number the pages and use the same numbers when you speak. For the steps around the paperwork, read ${h.a('file-small-claims', 'filing small claims')} and ${h.a('how-to-take-someone-to-small-claims-court', 'taking someone to small claims court')}.</p>`,
  faqs: [
    { q: 'Where do I get small claims court forms?', a: 'From your state court system’s website or the clerk of the court where you file; they are free. Many states use one statewide claim form, such as California’s SC-100, while some courts add local forms. Use the version the court publishes on the day you file, since forms are revised from time to time.', open: true },
    { q: 'How many copies of the small claims paperwork do I need?', a: 'For the claim form, usually the original plus a copy for each defendant and one for you. For evidence, bring a set for the judge, one for each defendant and your own. The counter above gives the number of sheets to print from the pages of your evidence and the number of defendants.' },
    { q: 'Do I file my evidence with the claim?', a: 'In most courts, no: you file the claim form and bring the evidence to the hearing. Some courts ask for evidence in advance or through an online system, as the Los Angeles court does with its standing order on evidence exchange. The notice you receive from the clerk tells you what applies.' },
  ],
  related: ['file-small-claims', 'how-to-take-someone-to-small-claims-court', 'small-claims-demand-letter'],
  sources: [['California Courts: form SC-100', CA.formUrl], ['California Courts: file your plaintiff’s claim', CA.fileUrl], ['Los Angeles Superior Court: Small Claims', OTHER_COURTS.losAngeles.url], [`Alaska: ${st('AK').cite}`, st('AK').url]],
});
