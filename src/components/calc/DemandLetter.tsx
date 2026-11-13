/**
 * Free demand letter (no account, nothing sent): the reader fills six fields, the letter is written below and can be
 * printed or copied. Text is a plain template, not legal advice; the state's small claims limit and court come from
 * the engine. First render = the example values of the build (RECETTE §17.5).
 */
import { useMemo, useState } from 'react';
import NumberField from '../ui/NumberField';
import SelectField from '../ui/SelectField';
import { STATES, byIdx, limitFor } from '../../lib/engine/claims';
import { usd } from '../../lib/fmt';

const T = ({ id, label, value, onChange, help }: { id: string; label: string; value: string; onChange: (v: string) => void; help?: string }) => (
  <div className="grid grid-rows-subgrid row-span-3 content-start gap-y-0">
    <label htmlFor={id} className="mb-1 block text-sm font-medium text-navy-700">{label}</label>
    <input id={id} type="text" value={value} onChange={(e) => onChange(e.target.value)} className="h-12 w-full rounded-lg border border-navy-300 bg-white px-4 text-base text-navy-900 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20" />
    {help ? <p className="mt-1 text-xs text-navy-500">{help}</p> : <span />}
  </div>
);

export default function DemandLetter() {
  const [from, setFrom] = useState('Your full name');
  const [to, setTo] = useState('Name of the person or business');
  const [why, setWhy] = useState('the unpaid balance of invoice 104 for repairs done on 3 March');
  const [amount, setAmount] = useState(2400);
  const [days, setDays] = useState(14);
  const [stI, setStI] = useState('44');
  const [touched, setTouched] = useState(false);
  const s = byIdx(Number(stI));
  const cap = limitFor(s);
  const letter = useMemo(() => [
    `${from}`, '[Your address]', '[Date]', '', `To: ${to}`, '[Their address]', '',
    `Re: Demand for payment of ${usd(amount)}`, '',
    `Dear ${to},`, '',
    `I am writing about ${why}. As of today, you owe me ${usd(amount)}.`, '',
    `Please pay this amount within ${days} days of the date of this letter, by [check / bank transfer / other means] to the address above.`, '',
    `If I have not received payment by then, I intend to file a claim against you in ${s.court} in ${s.name}, without further notice, and to ask the court to add the filing fee and the cost of service to any judgment.`, '',
    'I would prefer to settle this without going to court. If you dispute any part of this amount, please tell me in writing before the deadline.', '',
    'Sincerely,', '', `${from}`,
  ].join('\n'), [from, to, why, amount, days, s]);
  const t = <F,>(f: (v: F) => void) => (v: F) => { setTouched(true); f(v); };
  return (
    <div data-lettre className="not-prose rounded-xl border border-accent-200 bg-white p-4 shadow-sm sm:p-5">
      <p className="text-base font-semibold text-navy-900">Your demand letter, filled in as you type</p>
      <form className="mt-3 grid gap-x-4 gap-y-3 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
        <T id="dl-from" label="Your name" value={from} onChange={t(setFrom)} />
        <T id="dl-to" label="Who owes you" value={to} onChange={t(setTo)} help="The legal name of a business" />
        <NumberField id="dl-amount" label="Amount owed" value={amount} onChange={t(setAmount)} unit="$" max={1_000_000} />
        <NumberField id="dl-days" label="Days to pay" value={days} onChange={t(setDays)} unit="days" max={90} />
        <SelectField id="dl-st" label="State where you would sue" value={stI} onChange={t(setStI)} options={STATES.map((x, i) => ({ value: String(i + 1), label: x.name }))} />
        <T id="dl-why" label="What it is for" value={why} onChange={t(setWhy)} help="One line: the invoice, deposit or loan" />
      </form>
      {amount > cap && <p data-alerte className="mt-3 border-l-4 border-amber-500 pl-2 text-sm font-semibold text-navy-900">{usd(amount)} is above the {usd(cap)} small claims limit of {s.name}: demand the full amount, but know that small claims can only award {usd(cap)}.</p>}
      {!touched && <p data-exemple className="mt-3 rounded-md border border-amber-300 bg-amber-50 px-2 py-1 text-xs text-amber-900"><strong>Example letter</strong> — change any field to write your own.</p>}
      <pre data-resultat aria-live="polite" data-texte-lettre className="mt-3 whitespace-pre-wrap rounded-lg bg-navy-50 p-4 font-serif text-[0.95rem] leading-relaxed text-navy-900">{letter}</pre>
      <div className="mt-3 flex flex-wrap gap-3">
        <button type="button" onClick={() => window.print()} className="min-h-11 rounded-lg bg-accent-600 px-4 text-sm font-semibold text-white hover:bg-accent-700">Print the letter</button>
        <button type="button" onClick={() => navigator.clipboard?.writeText(letter)} className="min-h-11 rounded-lg border border-navy-300 px-4 text-sm font-semibold text-navy-900 hover:bg-navy-50">Copy the text</button>
      </div>
      <p className="mt-2 text-xs text-navy-600">A template, not legal advice. Nothing you type leaves your browser.</p>
    </div>
  );
}
