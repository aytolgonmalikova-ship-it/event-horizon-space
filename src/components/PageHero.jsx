import { images } from '../data/images';
import Credit from './Credit';

/** Cinematic page header with a credited background image. */
export default function PageHero({ imageKey, eyebrow, title, lead, children }) {
  const img = images[imageKey];
  return (
    <section className="relative isolate flex min-h-[78vh] items-end overflow-hidden pb-16 pt-32 sm:min-h-[82vh]">
      {img && (
        <img
          src={img.hero}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 -z-20 h-full w-full animate-drift object-cover opacity-70"
        />
      )}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-void/70 via-void/40 to-void" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-void/90 via-void/30 to-transparent" />
      <div className="container-x">
        <p className="eyebrow animate-fade-up">{eyebrow}</p>
        <h1 className="mt-4 max-w-4xl animate-fade-up text-4xl font-bold leading-[1.05] [animation-delay:120ms] sm:text-6xl lg:text-7xl">
          <span className="text-gradient">{title}</span>
        </h1>
        <p className="mt-6 max-w-2xl animate-fade-up text-base leading-relaxed text-slate-300 [animation-delay:240ms] sm:text-lg">
          {lead}
        </p>
        {children}
      </div>
      {img && (
        <div className="absolute bottom-3 right-4 max-w-[70%] text-right sm:max-w-md">
          <Credit imageKey={imageKey} className="rounded-lg bg-void/60 px-2 py-1 backdrop-blur" />
        </div>
      )}
    </section>
  );
}
