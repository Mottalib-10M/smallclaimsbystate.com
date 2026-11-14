import { definePage } from '../../lib/page-types';
import { STATES, st, idx, OTHER_COURTS } from '../../lib/engine/claims';
import { readHow } from '../../lib/state-page';
export default definePage({
  id: 'small-claims-court-near-me', group: 'guides', order: 11, slug: 'small-claims-court-near-me',
  nav: 'Court near me', card: 'Which county’s court takes your case, and the official page of each state.',
  title: 'Small Claims Court Near Me: Find the Right County Court',
  description: 'Small claims court near me: which county’s court takes your case, the court that hears small claims in each of the 50 states and DC, and its official page.',
  h1: 'Small claims court near me: which courthouse takes your case',
  intro: `The <strong>small claims court near me</strong> is not always the right one: the case usually belongs in the county where the person or business you sue lives or works, or where the deal or the damage took place, and the court has a different name in each state, such as the <strong>${st('MD').court}</strong> in Maryland.`,
  resume: `Searching for the nearest small claims court is a good start, but the court that can hear your case is set by venue rules, not by distance. In most states, a small claim may be filed in the county or precinct where the defendant lives or has a place of business, and often also where the contract was signed or was to be performed, or where the damage happened. When both sides live in the same county, the nearest court is usually the right one. When the other side is in another county, you may have to travel to theirs, unless the dispute took place in yours. When they live in another state, your own court can hear the case only if it has power over them, and suing in their state is often the practical choice. Once the county is known, the courthouse is the one that hears small claims there: the name of that court in each state is in the table below, with the official page we read. The checker above applies the usual pattern to your situation.`,
  tool: 'venue', toolTitle: 'Which county’s small claims court?',
  body: (h) => `
<h2>Finding the small claims court near you, in three steps</h2>
<ol>
<li><strong>Pick the county</strong> with the checker above: where the defendant is, or where the deal or the damage took place.</li>
<li><strong>Find the court type</strong> that hears small claims in your state in the table below.</li>
<li><strong>Look up that court for the county</strong> on the state judiciary’s website, or call the county courthouse and ask for the small claims clerk.</li>
</ol>
<p>Large courts run several courthouses and assign cases by address: the ${h.ext(OTHER_COURTS.losAngeles.url, 'Los Angeles Superior Court')} has a filing court locator that tells you which courthouse takes your case. Read ${h.a('los-angeles-small-claims-court', 'LA small claims court')} for that county.</p>
${h.mini('venue', { title: 'The other side lives in another state', defaults: { st: idx('NJ'), lives: 3, where: 1 } })}
<h2>The court that hears small claims, state by state</h2>
${h.table(['State', 'Court', 'Official page we read'], STATES.map((s) => [s.name, s.court, h.ext(s.url, readHow(s))]), 'Small claims court in each state and the official page read on 13 November 2026', ['l', 'l', 'l'])}
<h2>When the court near you is the wrong one</h2>
<p>If you file in a county where the case does not belong, the defendant can ask to move or dismiss it, and you lose time and sometimes the fee. If the defendant is a business with branches, the county of the branch you dealt with often works. If you are the defendant and you were sued far from home, read the notice: it says how to object to the place of trial. The ${h.a('file-small-claims', 'filing page')} lists what to check before paying.</p>`,
  faqs: [
    { q: 'Can I file small claims in my own county?', a: 'Yes when the defendant lives or does business there, or when the deal or the damage took place there, in most states. Otherwise the case usually belongs in the defendant’s county. Each state writes its own venue rule, so the clerk of the court you plan to use confirms it before you pay the fee.', open: true },
    { q: 'How do I find the small claims court for my county?', a: 'Find the type of court that hears small claims in your state in the table above, then look up that court for your county on the state judiciary’s website or ask at the county courthouse. In big counties, the court’s own locator assigns a courthouse according to the address of the parties.' },
    { q: 'Is there a small claims court online near me?', a: 'Some courts let you file online and hold parts of the case online: the Los Angeles court, for one, offers e-filing and requires registration for its online dispute resolution before the hearing. The hearing itself may still be in a courtroom. The court’s small claims page explains its own procedure.' },
  ],
  related: ['file-small-claims', 'los-angeles-small-claims-court', 'small-claims-court-limits'],
  sources: [['Los Angeles Superior Court: Small Claims', OTHER_COURTS.losAngeles.url], [`Maryland: ${st('MD').cite}`, st('MD').url], [`New Jersey: ${st('NJ').cite}`, st('NJ').url]],
});
