import { definePage } from '../../lib/page-types';
import { st, DEFAMATION, OTHER_READ } from '../../lib/engine/claims';
import { day } from '../../lib/fmt';
const one = DEFAMATION.filter((d) => d.years === 1).map((d) => st(d.code).name);
const two = DEFAMATION.filter((d) => d.years === 2).map((d) => st(d.code).name);
const list = (xs: string[]) => `${xs.slice(0, -1).join(', ')} and ${xs[xs.length - 1]}`;
export default definePage({
  id: 'how-to-sue-someone-for-defamation-of-character', group: 'guides', order: 13, slug: 'how-to-sue-someone-for-defamation-of-character',
  nav: 'Suing for defamation', card: 'The short deadlines, what must be shown, and why small claims is often not the court.',
  title: 'Sue for Defamation of Character: Deadlines by State 2026',
  description: 'How to sue someone for defamation of character: the one- or two-year deadlines of eight states read in the statutes, what a claim must show and which court.',
  h1: 'How to sue someone for defamation of character: the deadline comes first',
  intro: `<strong>How to sue someone for defamation of character</strong> starts with a short clock: in the eight states whose statutes we read, the deadline is <strong>one year</strong> (${list(one)}) or <strong>two years</strong> (${list(two)}), far shorter than for a debt.`,
  resume: `Defamation is a false statement of fact about you, communicated to someone else, that harms your reputation; written, it is called libel, spoken, slander. A suit has to show each of those elements, and public figures must also show a higher degree of fault on the speaker’s side. Opinions, insults and true statements, however hurtful, are generally not defamation. Two features make these cases different from a small money claim. The deadline is short: one year in Arizona, Maryland, New York and Virginia, two years in Connecticut, Florida, Minnesota and Washington, counted in most cases from the publication. And the damages are hard to put a number on, which is why many people start with a written request to retract the statement and keep proof of every publication and of the losses it caused. Small claims court is not always available: Connecticut, for one, keeps libel and slander out of its small claims session. This page gives general information only; a lawyer licensed in your state can assess a real case.`,
  tool: 'defame', toolTitle: 'Time left to sue for defamation',
  body: (h) => `
<h2>How to sue for defamation of character on time: deadlines in eight states</h2>
${h.table(['State', 'Deadline', 'Statute'], DEFAMATION.map((d) => [st(d.code).name, `${d.years} year${d.years > 1 ? 's' : ''}`, h.ext(d.url, d.cite)]), `Limitation periods for libel and slander, read on ${day(OTHER_READ)}`, ['l', 'r', 'l'])}
<p>Virginia’s statute adds that when the statement is published anonymously or under a false identity on the internet, the period is paused until the author is identified. Other states have their own rules on when the clock starts; read the statute of your state or ask the clerk where to find it.</p>
<h2>What a defamation claim has to show</h2>
<ol>
<li><strong>A statement of fact</strong>, not an opinion: “he stole from the till” rather than “he is a terrible manager”.</li>
<li><strong>Falsity</strong>: a true statement is not defamation.</li>
<li><strong>Publication</strong> to at least one other person: a post, an online review, an email to your employer, words said in front of others.</li>
<li><strong>Harm</strong>: lost customers, a lost job, a lost contract. Some statements, such as accusing someone of a crime, are treated as harmful by their nature in many states.</li>
<li><strong>Fault</strong>: at least carelessness about the truth, and more for public figures.</li>
</ol>
${h.mini('defame', { title: 'A post in New York, published nine months ago', defaults: { st: 6, ago: 9 } })}
<h2>Which court hears a defamation claim</h2>
<p>A defamation claim for a modest sum can sometimes go to small claims court, within the state’s ${h.a('small-claims-court-limits', 'small claims limit')}, but not everywhere: Connecticut keeps libel and slander out of its small claims session, and a small claims judge can award money, not an order to take a post down. Larger claims go to the regular civil court. ${h.a('how-to-sue-someone', 'How to sue someone')} compares the two routes.</p>
<h2>Steps people take before suing</h2>
<ul>
<li>Save the statement with the date, the address of the page and screenshots; note who saw or heard it.</li>
<li>Write down the losses with documents: cancelled orders, a dismissal letter, lost bookings.</li>
<li>Ask in writing for a retraction or a removal; platforms have their own reporting procedures.</li>
<li>Check the deadline above before the clock runs out.</li>
</ul>
<p>This site is independent, is not a law firm and gives no legal advice; a lawyer licensed in your state can tell you whether a statement is defamatory and what it may be worth.</p>`,
  faqs: [
    { q: 'How long do I have to sue for defamation?', a: `It depends on the state and is usually short: one year in ${list(one)}, two years in ${list(two)}, according to the statutes we read on ${day(OTHER_READ)}. The period usually runs from the publication. Check the statute of your own state, because a late suit is usually dismissed.`, open: true },
    { q: 'Can I sue for defamation in small claims court?', a: 'In some states, for a modest amount, yes; in others, no: Connecticut keeps libel and slander out of its small claims session. A small claims judge awards money only, not an order to remove a statement. Check your state’s small claims rules with the clerk before you file.' },
    { q: 'Is a bad online review defamation?', a: 'Usually not when it is an opinion or a true account of what happened. It can be when it states false facts that harm your reputation, such as a made-up accusation. The line is often hard to draw, which is why a lawyer licensed in your state is the right person to assess a specific review.' },
  ],
  related: ['how-to-sue-someone', 'claims-court', 'small-claims-court-limits'],
  sources: DEFAMATION.map((d) => [`${st(d.code).name}: ${d.cite}`, d.url] as [string, string]),
});
