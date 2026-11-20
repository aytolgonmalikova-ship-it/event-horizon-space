import { useCallback, useState } from 'react';
import { useLang } from '../i18n/LanguageContext';
import { andromedaText, galaxyTypes, galleryItems, milkyWayFacts, milkyWayText } from '../data/galaxiesData';
import { images } from '../data/images';
import PageHero from '../components/PageHero';
import SectionHeading from '../components/SectionHeading';
import Reveal from '../components/Reveal';
import SpaceImage from '../components/SpaceImage';
import Credit from '../components/Credit';
import Modal from '../components/Modal';
import MilkyWayMap from '../components/MilkyWayMap';
import Sources from '../components/Sources';
import VideoShowcase from '../components/video/VideoShowcase';

function Lightbox({ item, onClose }) {
  const { tr } = useLang();
  if (!item) return null;
  return (
    <Modal open onClose={onClose} labelledBy="lb-title" wide>
      <div className="p-4 sm:p-6">
        <h2 id="lb-title" className="pr-14 text-xl font-semibold sm:text-2xl">
          {tr(item.name)}
        </h2>
        {item.text && <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-300">{tr(item.text)}</p>}
        <SpaceImage
          imageKey={item.image}
          alt={tr(item.name)}
          large
          priority
          aspect=""
          imgClassName="mx-auto max-h-[72vh] w-auto max-w-full object-contain"
          className="mt-4"
          rounded="rounded-2xl"
        />
      </div>
    </Modal>
  );
}

export default function Galaxies() {
  const { t, tr, lang } = useLang();
  const [filter, setFilter] = useState('all');
  const [open, setOpen] = useState(null);
  const close = useCallback(() => setOpen(null), []);
  const shown = galleryItems.filter((g) => filter === 'all' || g.scope === filter);

  return (
    <>
      <PageHero imageKey="whirlpool" eyebrow={t('galEyebrow')} title={t('galTitle')} lead={t('galLead')} />

      {/* Types */}
      <section className="container-x py-20" aria-labelledby="types-title">
        <SectionHeading id="types-title" title={t('galTypesTitle')} lead={t('clickToExplore')} />
        <div className="grid gap-5 md:grid-cols-2">
          {galaxyTypes.map((g, i) => (
            <Reveal key={g.id} delay={(i % 2) * 90}>
              <button
                type="button"
                onClick={() => setOpen(g)}
                className="group relative flex h-[380px] w-full flex-col justify-end overflow-hidden rounded-3xl border border-white/10 text-left transition duration-500 hover:border-white/25 hover:shadow-glow"
              >
                <img src={images[g.image].src} alt={tr(g.example)} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition duration-[1.6s] group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-void via-void/60 to-transparent" />
                <div className="relative p-6 sm:p-8">
                  <span className="chip">{tr(g.example)}</span>
                  <h3 className="mt-3 text-2xl font-bold sm:text-3xl">{tr(g.name)}</h3>
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-300">{tr(g.text)}</p>
                </div>
              </button>
              <Credit imageKey={g.image} className="mt-2" />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Milky Way */}
      <section className="container-x py-16" aria-labelledby="mw-title">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <MilkyWayMap />
          </Reveal>
          <div>
            <SectionHeading id="mw-title" title={t('milkyWayTitle')} />
            <Reveal className="prose-space">
              {(milkyWayText[lang] ?? milkyWayText.en).map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </Reveal>
            <div className="mt-6 grid grid-cols-2 gap-3">
              {milkyWayFacts.map((f, i) => (
                <Reveal key={i} delay={i * 70} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <p className="font-display text-lg font-bold text-gradient-cool sm:text-xl">{tr(f.value)}</p>
                  <p className="mt-1 text-xs text-slate-400">{tr(f.label)}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Andromeda */}
      <section className="container-x py-16" aria-labelledby="and-title">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
          <div className="order-2 lg:order-1">
            <SectionHeading id="and-title" title={t('andromedaTitle')} />
            <Reveal className="prose-space">
              {(andromedaText[lang] ?? andromedaText.en).map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </Reveal>
          </div>
          <Reveal className="order-1 lg:order-2">
            <button type="button" onClick={() => setOpen({ image: 'andromeda', name: { ru: 'Андромеда (M31)', en: 'Andromeda (M31)', kg: 'Андромеда (M31)' } })} className="block w-full text-left">
              <SpaceImage imageKey="andromeda" alt="Andromeda Galaxy (M31)" aspect="aspect-[16/10]" rounded="rounded-3xl" imgClassName="h-full w-full object-cover transition duration-700 hover:scale-105" />
            </button>
          </Reveal>
        </div>
      </section>

      <VideoShowcase category="galaxies" />

      {/* Gallery */}
      <section className="container-x py-20" aria-labelledby="gallery-title">
        <SectionHeading id="gallery-title" title={t('galleryTitle')} lead={t('galleryLead')} />
        <div className="mb-6 flex gap-2" role="group" aria-label={t('galleryTitle')}>
          {[
            ['all', t('filterAll')],
            ['webb', 'James Webb'],
            ['hubble', 'Hubble'],
          ].map(([k, label]) => (
            <button
              key={k}
              type="button"
              aria-pressed={filter === k}
              onClick={() => setFilter(k)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                filter === k ? 'bg-white text-void shadow-glow' : 'border border-white/10 bg-white/5 text-slate-300 hover:text-white'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
          {shown.map((g) => (
            <figure key={g.image} className="mb-5 break-inside-avoid">
              <button type="button" onClick={() => setOpen(g)} className="group relative block w-full overflow-hidden rounded-2xl border border-white/10">
                <img src={images[g.image].src} alt={tr(g.name)} loading="lazy" className="w-full transition duration-700 group-hover:scale-105" />
                <span className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-void/90 to-transparent p-4 pt-12 text-left opacity-100 transition sm:opacity-0 sm:group-hover:opacity-100">
                  <span className="text-sm font-semibold text-white">{tr(g.name)}</span>
                  <span className="chip shrink-0">{g.scope === 'webb' ? 'JWST' : 'HST'}</span>
                </span>
              </button>
              <figcaption>
                <Credit imageKey={g.image} className="mt-2" />
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <Lightbox item={open} onClose={close} />
      <Sources page="galaxies" />
    </>
  );
}
