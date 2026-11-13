/** Text of the home page (the pillar). Every figure comes from the engine (states.json). */
import { st, idx, median, countAtLeast, N_STATES, STATES, RETRIEVED, ranking } from '../lib/engine/claims';
import { usd, day } from '../lib/fmt';
import type { Helpers } from '../lib/page-types';
import type { FAQItem } from '../lib/seo';

const MED = median();
const TOP = ranking().slice(0, 6);
const LOW = ranking().slice(-2);
const nFee = STATES.filter((s) => s.fee).length;
const nStatute = STATES.filter((s) => s.read === 'statute').length;
const nCourt = STATES.filter((s) => s.read === 'court').length;
const nIndex = STATES.filter((s) => s.read === 'index').length;
const at10 = STATES.filter((s) => s.cap === 10000).length;
const list = (xs: string[]) => xs.length < 2 ? xs.join('') : `${xs.slice(0, -1).join(', ')} and ${xs[xs.length - 1]}`;

/** The value sentence (RECETTE §2.4), shown on the home page, the About page and the method page. */
export const VALUE = `Most pages about small claims give one national list that was copied years ago and never checked again, so they still show Idaho at $5,000 and miss Georgia’s 2027 increase. This site reads the statute or court rule of each of the ${N_STATES} jurisdictions, keeps the address of what it read and the day, and answers the question you actually have: does my amount fit in this state, which court hears it, and what does it cost to file.`;

export const HOME = {
  title: 'Small Claims Court by State 2026: Limits, Fees and Courts',
  description: 'Small claims court by state in 2026: the limit of all 50 states and DC read in each statute, filing fees, the court for a case and a free check of your claim.',
  h1: 'Small claims court by state: can your amount be claimed?',
  answer: `<strong>Small claims court by state</strong> limits run from <strong>${usd(LOW[LOW.length - 1].cap)}</strong> in ${LOW[LOW.length - 1].name} to <strong>${usd(TOP[0].cap)}</strong> in ${TOP[0].name} and ${TOP[1].name}; the median state allows <strong>${usd(MED)}</strong>. Pick your state and amount: the checker says if it fits, which court hears it and the filing fee where the law fixes one.`,
  resume: `Every state and the District of Columbia has a simplified court for small money disputes, but each one sets its own ceiling, names the court differently and charges its own fee. On ${day(RETRIEVED)} we read the limit of all ${N_STATES} jurisdictions: ${nStatute} in the statute text itself, ${nCourt} on the court system’s own page, and ${nIndex} through the official page as indexed, when the state site refused our connection. The median limit is ${usd(MED)}, the figure of ${at10} jurisdictions. ${countAtLeast(20000)} allow ${usd(20000)} or more: ${list(ranking().filter((s) => s.cap >= 20000).map((s) => s.name))}. At the other end, ${LOW[0].name} stops at ${usd(LOW[0].cap)} and ${LOW[1].name} at ${usd(LOW[1].cap)}. Several figures changed recently and most lists online have not caught up: Idaho tripled its limit to ${usd(st('ID').cap)} on July 1, 2026, Georgia goes to ${usd(st('GA').next!.cap)} for cases filed from January 1, 2027, and Utah has written ${usd(st('UT').next!.cap)} into law for 2030. Filing fees are fixed statewide in only ${nFee} jurisdictions we could read; elsewhere the county sets them and the clerk gives the figure.`,
  start: (h: Helpers) => `
<h2>Small claims court by state: the six highest limits</h2>
<p>The table lists the jurisdictions where a single claim can go furthest without a lawyer and without the full rules of civil procedure. A high ceiling does not mean an easy case: the higher the stakes, the more likely the other side hires counsel, even where lawyers are rare in small claims.</p>
${h.table(['State', 'Limit', 'Court'], TOP.map((s) => [s.name, usd(s.cap), s.court]), 'Highest small claims limits', ['l', 'r', 'l'])}
<p>All ${N_STATES} are on ${h.a('small-claims-court-limits', 'the full table of small claims limits')}, with the law behind each figure.</p>`,
  guide: (h: Helpers) => `
<h2>How to read a limit before you file</h2>
<p>The limit is the most a judge can award in that court, but each state measures it in its own way, and the details decide whether your claim fits. Four questions cover almost every case.</p>
<h3>1. Does the limit include attorney fees, interest and costs?</h3>
<p>It depends on the state. Texas counts attorney fees inside its ${usd(st('TX').cap)} and leaves out statutory interest and court costs. Utah also counts attorney fees inside its ${usd(st('UT').cap)}. Maryland does the opposite: interest, costs and attorney fees allowed by law or contract sit on top of its ${usd(st('MD').cap)}. When the claim is close to the ceiling, read the rule of your state on its page before trimming anything.</p>
<h3>2. Are you a person or a business?</h3>
<p>Two states set a lower figure for businesses and other entities: California allows ${usd(st('CA').cap)} for a natural person and ${usd(st('CA').capBiz!)} for a business, and Washington ${usd(st('WA').cap)} and ${usd(st('WA').capBiz!)}. California also limits how many claims above a set amount one plaintiff can file each year. The checker asks who is suing and applies the right figure.</p>
<h3>3. Does the kind of claim matter?</h3>
<p>In a few states, yes. Wisconsin allows ${usd(st('WI').cap)} for debts and contracts but only $5,000 for tort claims such as personal injury. Connecticut excludes libel and slander from its small claims session entirely. Idaho lets its magistrates hear up to ${usd(st('ID').cap)} since July 2026, but not punitive damages or pain and suffering. Colorado caps how often one plaintiff can file: two claims a month in a county and 18 a year.</p>
<h3>4. Which date applies?</h3>
<p>Limits change, and the figure that applies is the one in force when the case is filed. Georgia’s Magistrate Court hears ${usd(st('GA').cap)} today and ${usd(st('GA').next!.cap)} for cases filed from January 1, 2027, under House Bill 999. Utah moves from ${usd(st('UT').cap)} to ${usd(st('UT').next!.cap)} on January 1, 2030. Michigan reached ${usd(st('MI').cap)} on January 1, 2024 after several steps. The checker lets you choose the date of filing where a change is scheduled.</p>
${h.mini('limit', { title: 'Try Georgia with a 2027 filing', defaults: { st: idx('GA'), amount: 22000, when: 2 } })}`,
  folds: [
    { id: 'over-the-limit', title: 'When your claim is above the limit', html: (h: Helpers) => `
<p>A claim larger than the small claims ceiling leaves three choices. You can reduce it to the limit and give up the rest: the waiver is final, because the same dispute cannot be brought again for the difference. You can file in the next court up, where the rules of procedure apply in full and a lawyer becomes more useful; New Jersey’s Special Civil Part, for example, hears up to $20,000 above a ${usd(st('NJ').cap)} small claims section, and North Carolina’s District Court up to $25,000 above the county’s magistrate figure. Or, where the defendant can be sued in more than one state, you can check whether the other state’s court has a higher limit.</p>
<p>What you cannot do is split one debt into two claims to stay under the line. A landlord owed several months of rent by one tenant has one claim, and so does a contractor with one unpaid job. Separate debts from separate deals are separate claims, but courts look closely at claims that seem cut up to fit.</p>
<p>See ${h.a('how-to-sue-someone-in-small-claims-court', 'how to sue someone in small claims court')} for the steps that follow.</p>` },
    { id: 'fees', title: 'What filing costs, and who pays in the end', html: (h: Helpers) => `
<p>The filing fee is the first cost and usually the smallest one that matters. Where the law sets it statewide, it ranges from ${usd(10)} in Wyoming to ${usd(295)} for the largest Florida claims, and many states charge more as the amount grows: California asks ${usd(30)}, ${usd(50)} or ${usd(75)}, Michigan ${usd(25)}, ${usd(45)} or ${usd(65)}, Massachusetts ${usd(40)} up to ${usd(150)}. In most other states the county adds its own charges and the clerk gives the figure.</p>
<p>Serving the papers on the defendant costs extra: certified mail, a sheriff or constable, or a private process server. Then come the hidden costs: hours off work for the hearing, copies, travel. When you win, the judge can usually add the filing and service fees to the judgment, but you collect them only if you collect the judgment.</p>
${h.mini('cost', { title: 'Your own cost of suing', defaults: { claim: 3000, fee: 75, service: 40 } })}
<p>Compare states on ${h.a('small-claims-court-filing-fee', 'the filing fee page')} and add the rest on ${h.a('how-much-does-it-cost-to-sue-someone', 'what it costs to sue someone')}.</p>` },
    { id: 'before', title: 'Before you file: the demand letter', html: (h: Helpers) => `
<p>A written demand gives the other side a last chance to pay, fixes the amount and the date in writing, and shows the judge that you tried to settle. Some courts expect one before a hearing, and a deposit dispute often ends with the letter alone. The letter should say what is owed, why, by when it must be paid, and that you will file in small claims if it is not.</p>
<p>Our ${h.a('small-claims-demand-letter', 'demand letter generator')} writes one from six fields, checks your amount against your state’s limit, and keeps everything in your browser.</p>` },
    { id: 'after', title: 'After you win: collecting the judgment', html: (h: Helpers) => `
<p>A judgment is a court order to pay, not a payment. Many debtors pay once the judge has ruled; others have to be pushed with the tools the state provides, such as a wage garnishment, a bank levy or a lien on property. Each tool has its own form and fee, and some income, such as part of a paycheck, is protected by law.</p>
<p>Before you file, ask whether the other side can pay. A judgment against someone with no job, no bank account and no property can stay unpaid for years. ${h.a('collecting-a-small-claims-judgment', 'Collecting a small claims judgment')} shows how long a payment plan would take.</p>` },
    { id: 'how-read', title: 'How each limit on this site was read', html: (h: Helpers) => `
<p>Each state carries one of three reading marks. “Statute text read” means we opened the statute or court rule on the legislature’s or the court’s site and read the figure ourselves. “Court page read” means we read the court system’s self-help page, which quotes the statute. “Official page read” means the state site refused our connection, and we read the same official page through a search engine restricted to the state’s own domain; the citation of the law is given so you can check it. No figure comes from a law firm, a blog or a list copied from another site.</p>
<p>The full method, with its limits, is on ${h.a('method', 'how we read the laws')}.</p>` },
  ],
  faqs: [
    { q: 'What is the highest small claims limit in the United States?', a: `${usd(TOP[0].cap)}, in ${TOP[0].name} and ${TOP[1].name}, where small cases go to the ${TOP[0].court} and the ${TOP[1].court}. Georgia joins them for cases filed from January 1, 2027, when its Magistrate Court limit rises from ${usd(st('GA').cap)} to ${usd(st('GA').next!.cap)}. Minnesota, Texas, Utah and West Virginia follow at ${usd(20000)}.` },
    { q: 'Where is the small claims ceiling the lowest?', a: `In ${LOW[1].name}, at ${usd(LOW[1].cap)}, followed by ${LOW[0].name} at ${usd(LOW[0].cap)}. A claimant there with more at stake must either give up the amount above the limit or file in the regular civil court, where the forms are longer and a lawyer is more useful. Check the exact figure on the state’s page before you decide.` },
    { q: 'Do I need a lawyer for small claims court?', a: 'No. Small claims courts are designed for people who represent themselves, with short forms and an informal hearing, and some states restrict lawyers at the hearing. You can still pay for an hour of advice before you file, to check the claim, the evidence and whom to sue. The clerk explains the procedure but cannot give legal advice.' },
    { q: 'Whose limit applies when the other side lives out of state?', a: 'Usually the case is filed where the defendant lives or does business, or where the contract was made or the harm happened. The limit of that court then applies, not the one of your own state. Serving papers in another state also costs more and takes longer, so compare both states on this site first.' },
    { q: 'How much does it cost to file a small claim?', a: `Where a statewide schedule exists, the fee ranges from ${usd(10)} in Wyoming to ${usd(295)} for the largest Florida claims, and many states charge more as the amount grows. Elsewhere the county sets the fee and the clerk gives the figure. Serving the defendant costs extra, and the judge can usually add both costs to the judgment if you win.` },
    { q: 'What happens after I win in small claims?', a: 'The judge enters a judgment, which is an order to pay, not a payment. Many people pay at that point; if they do not, you use the collection tools of your state, such as wage garnishment, a bank levy or a lien, each with its own form and fee. Before you file, ask whether the other side can pay at all.' },
    { q: 'Is this site a court or a law firm?', a: 'Neither. It is an independent site published by Radif Partners that reads public laws and court pages and turns them into calculators. It gives no legal advice, represents no one, sells no demand letter and asks for no contact details. For your own case, the clerk of the court and a lawyer licensed in your state are the ones who can help.' },
  ] as FAQItem[],
  sources: [
    ...['TX', 'CA', 'GA', 'ID', 'DE', 'FL'].map((c) => [`${st(c).name}: ${st(c).cite}`, st(c).url]),
  ] as Array<[string, string]>,
};
