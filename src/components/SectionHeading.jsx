import Reveal from './Reveal';

export default function SectionHeading({ eyebrow, title, lead, center = false, id }) {
  return (
    <Reveal className={`mb-10 sm:mb-14 ${center ? 'mx-auto text-center' : ''} max-w-3xl`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 id={id} className="mt-3 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {lead && <p className="mt-4 text-base leading-relaxed text-slate-400 sm:text-lg">{lead}</p>}
    </Reveal>
  );
}
