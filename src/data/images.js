/**
 * Image registry — every image on the site, with its exact credit line.
 *
 * Licence audit (see /credits page):
 *  - NASA: not copyrighted in the U.S.; free for educational use; NASA must be
 *    acknowledged as the source; no implied endorsement; NASA insignia/logos NOT used.
 *  - ESA/Webb & ESA/Hubble: CC BY 4.0. The full credit line must be shown unaltered,
 *    visibly next to the image, with an active link. Logos NOT used.
 *  Credit strings below are copied verbatim from each image's source page.
 */

const nasa = (id, size = 'medium') => `https://images-assets.nasa.gov/image/${id}/${id}~${size}.jpg`;
const hubble = (id, size = 'screen') => `https://cdn.esahubble.org/archives/images/${size}/${id}.jpg`;
const webb = (id, size = 'screen') => `https://cdn.esawebb.org/archives/images/${size}/${id}.jpg`;

const NASA_PD = 'nasa';
const CC_BY = 'cc-by-4.0';

function nasaImg(id, credit, title, { large = true } = {}) {
  return {
    id,
    src: nasa(id, 'medium'),
    large: large ? nasa(id, 'large') : nasa(id, 'medium'),
    hero: large ? nasa(id, 'large') : nasa(id, 'medium'),
    credit,
    title,
    agency: 'NASA',
    licence: NASA_PD,
    href: `https://images.nasa.gov/details/${id}`,
  };
}
// ESA "large" originals weigh up to 40 MB, so we never use them:
//  - `large` (lightbox/modal) = uncropped 1280 px "screen" version;
//  - `hero` (full-bleed backgrounds) = ~1600 px "wallpaper3" crop (~0.7 MB).
function hubbleImg(id, credit, title, { hero = false } = {}) {
  return {
    id,
    src: hubble(id),
    large: hubble(id),
    hero: hero ? hubble(id, 'wallpaper3') : hubble(id),
    credit,
    title,
    agency: 'ESA/Hubble',
    licence: CC_BY,
    href: `https://esahubble.org/images/${id}/`,
  };
}
function webbImg(id, credit, title) {
  return {
    id,
    src: webb(id),
    large: webb(id),
    hero: webb(id, 'wallpaper3'),
    credit,
    title,
    agency: 'ESA/Webb',
    licence: CC_BY,
    href: `https://esawebb.org/images/${id}/`,
  };
}

export const images = {
  // ---------- NASA (Solar System) ----------
  sun: nasaImg('GSFC_20171208_Archive_e001435', 'NASA/SDO', 'Sun Emits a Solstice CME'),
  mercury: nasaImg(
    'PIA15162',
    'NASA/Johns Hopkins University Applied Physics Laboratory/Carnegie Institution of Washington',
    'Mercury Globe (MESSENGER)'
  ),
  venus: nasaImg('PIA00271', 'NASA/JPL', 'Venus — Computer Simulated Global View (Magellan)'),
  earth: nasaImg('as17-148-22727', 'NASA', 'Earth seen by the Apollo 17 crew (“The Blue Marble”)'),
  mars: nasaImg('PIA00407', 'NASA/JPL/USGS', 'Global Color Views of Mars (Viking)'),
  jupiter: nasaImg('GSFC_20171208_Archive_e000103', 'NASA, ESA, and A. Simon (NASA Goddard)', 'NASA’s Hubble Takes Close-up Portrait of Jupiter', { large: false }),
  saturn: nasaImg('PIA06193', 'NASA/JPL/Space Science Institute', 'The Greatest Saturn Portrait… Yet (Cassini)'),
  uranus: nasaImg('PIA18182', 'NASA/JPL-Caltech', 'Uranus as seen by NASA’s Voyager 2', { large: false }),
  neptune: nasaImg('PIA01492', 'NASA/JPL', 'Neptune (Voyager 2)'),

  // ---------- ESA/Hubble (CC BY 4.0) ----------
  whirlpool: hubbleImg(
    'heic0506a',
    'NASA, ESA, S. Beckwith (STScI), and The Hubble Heritage Team (STScI/AURA)',
    'The Whirlpool Galaxy (M51) and companion galaxy',
    { hero: true }
  ),
  andromeda: hubbleImg(
    'heic1502a',
    'NASA, ESA, J. Dalcanton (University of Washington, USA), B. F. Williams (University of Washington, USA), L. C. Johnson (University of Washington, USA), the PHAT team, and R. Gendler.',
    'Sharpest ever view of the Andromeda Galaxy'
  ),
  crab: hubbleImg(
    'heic0515a',
    'NASA, ESA and Allison Loll/Jeff Hester (Arizona State University). Acknowledgement: Davide De Martin (ESA/Hubble)',
    'Most detailed image of the Crab Nebula'
  ),
  pillarsHubble: hubbleImg(
    'heic1501a',
    'NASA, ESA/Hubble and the Hubble Heritage Team',
    'New view of the Pillars of Creation — visible'
  ),
  hudf: hubbleImg(
    'heic0406a',
    'NASA, ESA, and S. Beckwith (STScI) and the HUDF Team',
    'Hubble Ultra Deep Field',
    { hero: true }
  ),
  carinaHubble: hubbleImg(
    'heic0707a',
    'NASA, ESA, N. Smith (University of California, Berkeley), and The Hubble Heritage Team (STScI/AURA)',
    'Star birth in the extreme (Carina Nebula)'
  ),
  ngc1275: hubbleImg(
    'heic0817a',
    'NASA, ESA and Andy Fabian (University of Cambridge, UK)',
    'Magnetic monster NGC 1275'
  ),

  // ---------- ESA/Webb (CC BY 4.0) ----------
  cosmicCliffs: webbImg('weic2205a', 'NASA, ESA, CSA, and STScI', '“Cosmic Cliffs” in Carina (NIRCam)'),
  stephansQuintet: webbImg('weic2208a', 'NASA, ESA, CSA, and STScI', 'Stephan’s Quintet (NIRCam + MIRI)'),
  deepField: webbImg('weic2209a', 'NASA, ESA, CSA, and STScI', 'Webb’s First Deep Field (NIRCam)'),
  cartwheel: webbImg('weic2211a', 'NASA, ESA, CSA, STScI', 'Cartwheel Galaxy (NIRCam + MIRI)'),
  tarantula: webbImg('weic2212a', 'NASA, ESA, CSA, and STScI', 'Tarantula Nebula (NIRCam)'),
  pillarsWebb: webbImg(
    'weic2216a',
    'NASA, ESA, CSA, STScI; J. DePasquale, A. Koekemoer, A. Pagan (STScI).',
    'Pillars of Creation (NIRCam)'
  ),
  protostar: webbImg('weic2219a', 'NASA, ESA, CSA, and STScI, J. DePasquale (STScI)', 'Protostar L1527'),
  pandora: webbImg(
    'weic2305a',
    'NASA, ESA, CSA, I. Labbe (Swinburne University of Technology), R. Bezanson (University of Pittsburgh), A. Pagan (STScI)',
    'Pandora’s Cluster (Abell 2744)'
  ),
  ringNebula: webbImg(
    'weic2320a',
    'ESA/Webb, NASA, CSA, M. Barlow, N. Cox, R. Wesson',
    'Ring Nebula (NIRCam and MIRI)'
  ),
};

// How much each globe must be scaled to fill a circle (planet diameter / frame).
const GLOBE = { sun: 1.22, mercury: 1.08, venus: 1.08, earth: 1.5, mars: 1.0, jupiter: 1.33, uranus: 1.2, neptune: 1.1, saturn: 'contain' };
for (const [k, v] of Object.entries(GLOBE)) images[k].globe = v;

export const licences = {
  [NASA_PD]: {
    short: { ru: 'общественное достояние', en: 'public domain', kg: 'коомдук менчик' },
    href: 'https://www.nasa.gov/nasa-brand-center/images-and-media/',
  },
  [CC_BY]: {
    short: { ru: 'CC BY 4.0', en: 'CC BY 4.0', kg: 'CC BY 4.0' },
    href: 'https://creativecommons.org/licenses/by/4.0/',
  },
};
