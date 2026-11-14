import { definePage } from '../../lib/page-types';
import { st, median, N_STATES } from '../../lib/engine/claims';
import { usd } from '../../lib/fmt';
export default definePage({
  id: 'how-to-sue-someone-in-small-claims-court', group: 'guides', order: 2, slug: 'how-to-sue-someone-in-small-claims-court',
  nav: 'The 7 steps of a case, in order', card: 'Seven steps, from the demand letter to collecting what the judge awards.',
  title: 'Sue Someone in Small Claims Court: 7 Steps for 2026',
  description: 'How to sue someone in small claims court in 2026: check your state’s limit, send a demand letter, file, serve, prepare evidence, win and collect. With a check.',
  h1: 'How to sue someone in small claims court, step by step',
  intro: `<strong>How to sue someone in small claims court</strong> comes down to seven steps; the first is to check that your amount fits your state’s limit, ${usd(median())} in the middle state and as low as ${usd(st('KY').cap)} in Kentucky.`,
  resume: `Small claims courts were built for people without lawyers, and the procedure is short everywhere: a one-page claim form, a filing fee, a hearing a few weeks or months later, and a judge who decides that day or by mail. What varies by state is the ceiling, the name of the court, the fee and a handful of rules on who may appear for whom. The order of the steps does not vary. A case is won or lost before the hearing, on three things: suing the right person under the right name, in the right county, and bringing paper that proves the amount. Most cases also end without a hearing when the defendant receives a clear demand letter or the summons itself, so the letter is a step to take seriously, not a formality.`,
  tool: 'limit', toolTitle: 'Step 1: does your amount fit the small claims limit?',
  body: (h) => `
<h2>How to sue someone in small claims court in seven steps</h2>
<ol>
<li><strong>Check the limit.</strong> The calculator above applies the limit of your state, read in its law. If your loss is larger, you choose between giving up the excess and filing in the regular civil court.</li>
<li><strong>Send a demand letter.</strong> State the amount, the reason and a deadline, and keep proof of sending. Some courts ask whether you demanded payment first. Our ${h.a('small-claims-demand-letter', 'free demand letter')} fills itself in.</li>
<li><strong>Find the right court and county.</strong> As a rule you sue where the defendant lives or does business, or where the damage happened or the contract was to be performed. The clerk of that court confirms it.</li>
<li><strong>Name the defendant correctly.</strong> A business is sued under its legal name, which the Secretary of State’s business search shows; a judgment against a trade name can be impossible to collect.</li>
<li><strong>File and pay the fee.</strong> Fill in the claim form, attach copies of the key papers and pay the ${h.a('small-claims-court-filing-fee', 'filing fee')}, or ask for a fee waiver if you cannot pay.</li>
<li><strong>Serve the defendant.</strong> The court mails the papers, or the sheriff, a constable or a process server delivers them, depending on the state. A case cannot go ahead until service is proved.</li>
<li><strong>Prepare, appear, then collect.</strong> Bring originals, photos, texts and receipts in three copies, and a one-page timeline. If you win and the defendant does not pay, read ${h.a('collecting-a-small-claims-judgment', 'how to collect a small claims judgment')}.</li>
</ol>
<h2>Deadlines that close the door</h2>
<p>Every state has a statute of limitations, a period after which a claim can no longer be brought. It differs by kind of claim, often longer for a written contract than for an oral one or for property damage, and it runs from the breach or the damage, not from the day you decide to act. Look up the period for your kind of claim in your state’s code or ask the clerk, then enter it below.</p>
${h.mini('deadline')}
<h2>When small claims is the wrong court</h2>
<p>Small claims judges award money and, in some states, the return of property. They do not grant divorces, evictions in many states, name changes or orders to stop doing something, and several states exclude libel and slander. A claim against a state or federal agency follows its own route. Where the defendant is in another state, the court of your state may not reach them: suing where they live is often the only practical option, and the limit there is the one that counts. The ${h.a('small-claims-court-limits', `table of all ${N_STATES} limits`)} gives it.</p>
<h2>What a hearing looks like</h2>
<p>The plaintiff speaks first, shows the documents and answers the judge’s questions; the defendant does the same. Hearings often last ten to twenty minutes, so a clear order of events and the exact figure, with how it was computed, matter more than eloquence. If the defendant does not come, ask for a default judgment; if you do not come, your case is usually dismissed.</p>`,
  faqs: [
    { q: 'Do I need a lawyer to sue in small claims court?', a: 'No. The procedure is designed for people who represent themselves, and a few states, such as Virginia’s small claims division, generally keep lawyers out. You can still pay a lawyer for an hour of advice before you file, to check the claim, the evidence and the right defendant. The hearing itself is built for people speaking for themselves.', open: true },
    { q: 'Can I sue someone who lives in another state in small claims?', a: 'Only if the court of your state has power over them, for example because the contract was performed or the damage happened there. Otherwise you file where they live, under that state’s limit. Serving papers out of state also costs more and takes longer. Before you file, check the other state’s limit on its page here, since it may be higher or lower than yours.' },
    { q: 'What happens if the defendant does not show up?', a: 'If service was proved, the judge can enter a default judgment for the amount you prove. The defendant can sometimes ask to set it aside with a good reason. Bring your evidence anyway: some judges still ask you to prove the amount before entering judgment. If you are the one who cannot attend, ask the clerk for a new date in writing before the hearing.' },
  ],
  related: ['small-claims-demand-letter', 'how-much-does-it-cost-to-sue-someone', 'small-claims-court-limits'],
  sources: [['California Courts self-help: file your plaintiff’s claim', 'https://selfhelp.courts.ca.gov/small-claims/start-case/file'], ['Virginia Code § 16.1-122.2', st('VA').url], ['Kentucky Revised Statutes § 24A.230', st('KY').url]],
});
