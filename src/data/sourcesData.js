// Sources listed at the bottom of each page.

const S = {
  nasaScience: { label: 'NASA Science — Solar System', href: 'https://science.nasa.gov/solar-system/' },
  factSheet: { label: 'NASA Planetary Fact Sheet (NSSDCA)', href: 'https://nssdc.gsfc.nasa.gov/planetary/factsheet/' },
  nasaMoons: { label: 'NASA Science — Moons', href: 'https://science.nasa.gov/solar-system/moons/' },
  esaSolar: { label: 'ESA — Space Science', href: 'https://www.esa.int/Science_Exploration/Space_Science' },
  nasaStars: { label: 'NASA Science — Stars', href: 'https://science.nasa.gov/universe/stars/' },
  esaWebb: { label: 'ESA/Webb — Images & Science Releases', href: 'https://esawebb.org/' },
  esaHubble: { label: 'ESA/Hubble — Images & Science Releases', href: 'https://esahubble.org/' },
  nasaGalaxies: { label: 'NASA Science — Galaxies', href: 'https://science.nasa.gov/universe/galaxies/' },
  hubbleAndromeda: { label: 'ESA/Hubble — Andromeda (heic1502)', href: 'https://esahubble.org/news/heic1502/' },
  gaia: { label: 'ESA — Gaia mission', href: 'https://www.esa.int/Science_Exploration/Space_Science/Gaia' },
  nasaBH: { label: 'NASA Science — Black Holes', href: 'https://science.nasa.gov/universe/black-holes/' },
  eht: { label: 'Event Horizon Telescope', href: 'https://eventhorizontelescope.org/' },
  ligo: { label: 'LIGO Caltech — GW150914', href: 'https://www.ligo.caltech.edu/page/detection-companion-papers' },
  nobel2020: { label: 'NobelPrize.org — Physics 2020', href: 'https://www.nobelprize.org/prizes/physics/2020/summary/' },
  nasaUniverse: { label: 'NASA Science — Universe', href: 'https://science.nasa.gov/universe/' },
  planck: { label: 'ESA — Planck mission', href: 'https://www.esa.int/Science_Exploration/Space_Science/Planck' },
  desi: { label: 'DESI — Dark Energy Spectroscopic Instrument', href: 'https://www.desi.lbl.gov/' },
  exoplanets: { label: 'NASA Exoplanet Archive', href: 'https://exoplanetarchive.ipac.caltech.edu/' },
  apod: { label: 'NASA APOD — Astronomy Picture of the Day', href: 'https://apod.nasa.gov/apod/' },
  apodApi: { label: 'NASA Open APIs (APOD)', href: 'https://api.nasa.gov/' },
  chandra: { label: 'NASA Chandra — Perseus cluster sound', href: 'https://chandra.si.edu/' },
};

export const pageSources = {
  home: [S.apod, S.apodApi, S.nasaUniverse, S.exoplanets, S.chandra, S.esaWebb],
  solar: [S.nasaScience, S.factSheet, S.nasaMoons, S.esaSolar],
  stars: [S.nasaStars, S.esaWebb, S.esaHubble, S.esaSolar],
  galaxies: [S.nasaGalaxies, S.esaHubble, S.hubbleAndromeda, S.esaWebb, S.gaia],
  blackHoles: [S.nasaBH, S.eht, S.ligo, S.nobel2020, S.gaia],
  universe: [S.nasaUniverse, S.planck, S.desi, S.esaWebb, S.exoplanets],
};
