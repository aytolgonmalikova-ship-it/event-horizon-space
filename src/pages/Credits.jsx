import { useLang } from '../i18n/LanguageContext';
import { images, licences } from '../data/images';
import { licenceAudit } from '../data/creditsData';
import { videosData } from '../data/videosData';
import SectionHeading from '../components/SectionHeading';
import Reveal from '../components/Reveal';

/** Mobile-friendly version of the credit tables: one card per row (shown below md). */
function CreditCards({ rows }) {
  return (
    <ul className="mt-6 space-y-3 md:hidden">
      {rows.map((r) => (
        <li key={r.key} className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-3 text-sm">
          <img src={r.thumb} alt="" loading="lazy" className="h-14 w-16 shrink-0 rounded-md object-cover" />
          <div className="min-w-0 flex-1">
            <a href={r.href} target="_blank" rel="noreferrer" className="break-words text-sky-300 underline underline-offset-2">
              {r.title}
            </a>
            <div className="mt-0.5 break-all font-mono text-[0.65rem] text-slate-500">{r.sub}</div>
            <p className="mt-2 break-words text-xs leading-relaxed text-slate-300">{r.credit}</p>
            <a href={r.licenceHref} target="_blank" rel="noreferrer" className="chip mt-2 inline-block hover:text-white">
              {r.licence}
            </a>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default function Credits() {
  const { t, tr, lang } = useLang();
  const pick = (o) => o[lang] ?? o.en;
  const how = { ru: 'Как мы соблюдаем', en: 'How we comply', kg: 'Биз кантип сактайбыз' };
  const yes = { ru: 'Разрешено', en: 'Allowed', kg: 'Уруксат берилген' };
  const no = { ru: 'Запрещено', en: 'Not allowed', kg: 'Тыюу салынган' };

  return (
    <div className="container-x pb-10 pt-32">
      <SectionHeading eyebrow="© · CC BY 4.0 · NASA" title={t('creditsTitle')} lead={t('creditsLead')} />

      <div className="grid gap-5 lg:grid-cols-2">
        {licenceAudit.map((a, i) => (
          <Reveal key={a.id} delay={(i % 2) * 80} className="card p-6 sm:p-7">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="text-2xl font-bold">{a.name}</h2>
              <a href={a.href} target="_blank" rel="noreferrer" className="text-xs text-sky-300 underline underline-offset-4">
                {a.page} ↗
              </a>
            </div>
            <h3 className="mt-5 text-xs font-semibold uppercase tracking-widest text-emerald-300">✓ {tr(yes)}</h3>
            <ul className="mt-2 space-y-1.5 text-sm text-slate-300">
              {pick(a.allowed).map((x) => (
                <li key={x} className="flex gap-2">
                  <span className="text-emerald-400">•</span>
                  {x}
                </li>
              ))}
            </ul>
            <h3 className="mt-5 text-xs font-semibold uppercase tracking-widest text-rose-300">✕ {tr(no)}</h3>
            <ul className="mt-2 space-y-1.5 text-sm text-slate-300">
              {pick(a.forbidden).map((x) => (
                <li key={x} className="flex gap-2">
                  <span className="text-rose-400">•</span>
                  {x}
                </li>
              ))}
            </ul>
            <div className="mt-5 rounded-2xl border border-sky-400/20 bg-sky-400/5 p-4 text-sm leading-relaxed text-sky-100">
              <strong className="mb-1 block text-xs uppercase tracking-widest text-sky-300">{tr(how)}</strong>
              {tr(a.how)}
            </div>
          </Reveal>
        ))}
      </div>

      <section className="mt-16" aria-labelledby="all-images">
        <h2 id="all-images" className="text-2xl font-bold sm:text-3xl">
          {t('allImages')}
        </h2>
        <CreditCards
          rows={Object.values(images).map((img) => ({
            key: img.id,
            thumb: img.src,
            href: img.href,
            title: img.title,
            sub: img.id,
            credit: img.credit,
            licence: tr(licences[img.licence].short),
            licenceHref: licences[img.licence].href,
          }))}
        />
        <div className="mt-6 hidden overflow-x-auto rounded-2xl border border-white/10 md:block">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/[0.04] text-xs uppercase tracking-wider text-slate-400">
              <tr>
                <th className="p-3">#</th>
                <th className="p-3">{t('sourcePage')}</th>
                <th className="p-3">{t('credit')}</th>
                <th className="p-3">{t('licence')}</th>
              </tr>
            </thead>
            <tbody>
              {Object.values(images).map((img) => (
                <tr key={img.id} className="border-t border-white/5 align-top">
                  <td className="p-3">
                    <img src={img.src} alt="" loading="lazy" className="h-12 w-16 rounded-md object-cover" />
                  </td>
                  <td className="p-3">
                    <a href={img.href} target="_blank" rel="noreferrer" className="text-sky-300 underline underline-offset-2">
                      {img.title}
                    </a>
                    <div className="mt-0.5 font-mono text-[0.65rem] text-slate-500">{img.id}</div>
                  </td>
                  <td className="p-3 text-slate-300">{img.credit}</td>
                  <td className="p-3">
                    <a href={licences[img.licence].href} target="_blank" rel="noreferrer" className="chip whitespace-nowrap hover:text-white">
                      {tr(licences[img.licence].short)}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-16" aria-labelledby="all-videos">
        <h2 id="all-videos" className="text-2xl font-bold sm:text-3xl">
          {t('allVideos')}
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-400">{t('videosLicenceNote')}</p>
        <CreditCards
          rows={videosData.map((v) => ({
            key: v.id,
            thumb: v.poster,
            href: v.href,
            title: tr(v.title),
            sub: `${v.archive} · ${v.duration}`,
            credit: v.credit,
            licence: tr(licences[v.licence].short),
            licenceHref: licences[v.licence].href,
          }))}
        />
        <div className="mt-6 hidden overflow-x-auto rounded-2xl border border-white/10 md:block">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/[0.04] text-xs uppercase tracking-wider text-slate-400">
              <tr>
                <th className="p-3">#</th>
                <th className="p-3">{t('sourcePage')}</th>
                <th className="p-3">{t('videoCredit')}</th>
                <th className="p-3">{t('licence')}</th>
              </tr>
            </thead>
            <tbody>
              {videosData.map((v) => (
                <tr key={v.id} className="border-t border-white/5 align-top">
                  <td className="p-3">
                    <img src={v.poster} alt="" loading="lazy" className="h-12 w-20 rounded-md object-cover" />
                  </td>
                  <td className="p-3">
                    <a href={v.href} target="_blank" rel="noreferrer" className="text-sky-300 underline underline-offset-2">
                      {tr(v.title)}
                    </a>
                    <div className="mt-0.5 text-[0.65rem] text-slate-500">
                      {v.archive} · {v.duration}
                    </div>
                  </td>
                  <td className="p-3 text-slate-300">{v.credit}</td>
                  <td className="p-3">
                    <a href={licences[v.licence].href} target="_blank" rel="noreferrer" className="chip whitespace-nowrap hover:text-white">
                      {tr(licences[v.licence].short)}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
