/**
 * Video registry — "Космический кинозал" / Space cinema.
 *
 * Licence audit (reviewed 19 Nov 2026, see /credits):
 *  - NASA (NASA Images and Media Usage Guidelines): NASA video is generally not
 *    copyrighted in the U.S. and may be used on educational websites; NASA must be
 *    acknowledged as the source; no implied endorsement; NASA insignia/logos NOT used.
 *    Videos containing third-party copyrighted footage were deliberately excluded.
 *  - ESA/Hubble (CC BY 4.0): the full footage credit is shown unaltered, visibly,
 *    directly under the player, with active links. Clips that credit third-party
 *    music were deliberately excluded. Logos NOT used.
 *
 * Files are streamed straight from the agencies' public servers
 * (images-assets.nasa.gov, cdn.esahubble.org) in a native <video> element:
 * H.264/AAC MP4, no CORS needed for playback, nothing is downloaded until "Play".
 * Every URL was checked (HTTP 200, video/mp4, byte-range support).
 * Credit strings are copied from each video's source page.
 */

const NASA_PD = 'nasa';
const CC_BY = 'cc-by-4.0';

/** NASA Image and Video Library asset: ~medium.mp4 (desktop), ~mobile.mp4 (phones). */
function nasaVideo(nasaId, { poster = 'large' } = {}) {
  const id = encodeURIComponent(nasaId);
  const base = `https://images-assets.nasa.gov/video/${id}/${id}`;
  return {
    src: `${base}~medium.mp4`,
    srcMobile: `${base}~mobile.mp4`,
    poster: `${base}~${poster}.jpg`,
    href: `https://images.nasa.gov/details/${id}`,
    agency: 'NASA',
    archive: 'NASA Image and Video Library',
    licence: NASA_PD,
  };
}

/** ESA/Hubble video archive: 1080p for desktop, the light "podcast" encode for phones. */
function hubbleVideo(id, mobileFile = `${id}.mp4`) {
  const cdn = 'https://cdn.esahubble.org/archives/videos';
  return {
    src: `${cdn}/hd_1080p25_screen/${id}.mp4`,
    srcMobile: `${cdn}/medium_podcast/${mobileFile}`,
    poster: `${cdn}/videoframe/${id}.jpg`,
    href: `https://esahubble.org/videos/${id}/`,
    agency: 'ESA/Hubble',
    archive: 'esahubble.org',
    licence: CC_BY,
  };
}

export const videoCategories = [
  { id: 'planets', icon: '🪐', name: { ru: 'Планеты', en: 'Planets', kg: 'Планеталар' } },
  { id: 'stars', icon: '☀️', name: { ru: 'Звёзды', en: 'Stars', kg: 'Жылдыздар' } },
  { id: 'galaxies', icon: '🌌', name: { ru: 'Галактики', en: 'Galaxies', kg: 'Галактикалар' } },
  { id: 'blackHoles', icon: '🕳️', name: { ru: 'Чёрные дыры', en: 'Black holes', kg: 'Кара көңдөйлөр' } },
  { id: 'cosmos', icon: '✨', name: { ru: 'Космос', en: 'Cosmos', kg: 'Космос' } },
];

/** What the footage actually is — so real data is never confused with an artist's impression. */
export const videoKinds = {
  observation: { ru: 'Реальные наблюдения', en: 'Real observations', kg: 'Чыныгы байкоолор' },
  animation: { ru: 'Анимация', en: 'Animation', kg: 'Анимация' },
  simulation: { ru: 'Научная симуляция', en: 'Scientific simulation', kg: 'Илимий симуляция' },
  story: { ru: 'Научный рассказ', en: 'Science story', kg: 'Илимий баян' },
};

export const videosData = [
  // ── Galaxies ──────────────────────────────────────────────
  {
    id: 'andromeda-zoom',
    category: 'galaxies',
    kind: 'observation',
    duration: '0:50',
    ...hubbleVideo('heic1502a', 'heic1502a.m4v'),
    credit:
      'NASA, ESA, Digitized Sky Survey 2, N. Risinger (Skysurvey.org), J. Dalcanton (University of Washington, USA), B. F. Williams (University of Washington, USA), L. C. Johnson (University of Washington, USA), the PHAT team, and R. Gendler.',
    title: { ru: 'Полёт к Андромеде', en: 'Flight into Andromeda', kg: 'Андромедага учуу' },
    description: {
      ru: 'Начинаем с ночного неба и погружаемся в крупнейшую мозаику Hubble: 1,5 миллиарда пикселей и более 100 миллионов отдельных звёзд соседней галактики.',
      en: 'Starting from the night sky, we dive into Hubble’s largest mosaic: 1.5 billion pixels and more than 100 million individual stars of our neighbouring galaxy.',
      kg: 'Түнкү асмандан баштап, Hubbleдин эң чоң мозаикасына сүңгүйбүз: 1,5 миллиард пиксель жана коңшу галактиканын 100 миллиондон ашык өзүнчө жылдызы.',
    },
  },
  {
    id: 'gn-z11-zoom',
    category: 'galaxies',
    kind: 'animation',
    duration: '0:33',
    ...hubbleVideo('heic1604a'),
    credit: 'NASA, ESA, and G. Bacon (STScI)',
    title: { ru: 'Путь к GN-z11 — галактике на краю времени', en: 'Journey to GN-z11, a galaxy at the edge of time', kg: 'GN-z11ге саякат — убакыттын чегиндеги галактика' },
    description: {
      ru: 'Из созвездия Большой Медведицы — к галактике, свет которой летел к нам 13,4 млрд лет. Hubble увидел её такой, какой она была всего через 400 млн лет после Большого взрыва.',
      en: 'From the Big Dipper to a galaxy whose light travelled 13.4 billion years to reach us. Hubble saw it as it was just 400 million years after the Big Bang.',
      kg: 'Чоң Аюу топ жылдызынан — жарыгы бизге 13,4 миллиард жыл учуп келген галактикага. Hubble аны Чоң жарылуудан 400 миллион жыл гана өткөндөгү абалында көргөн.',
    },
  },

  // ── Black holes ───────────────────────────────────────────
  {
    id: 'accretion-disk',
    category: 'blackHoles',
    kind: 'animation',
    duration: '0:30',
    ...hubbleVideo('hubblecast43c', 'hubblecast43c.m4v'),
    credit: 'ESA/Hubble (M. Kornmesser)',
    title: { ru: 'Диск вокруг сверхмассивной чёрной дыры', en: 'Feeding a supermassive black hole', kg: 'Супермассалуу кара көңдөйдү курчаган диск' },
    description: {
      ru: 'Газ закручивается в раскалённый аккреционный диск и разгоняется до колоссальных скоростей — так «питающиеся» чёрные дыры становятся самыми яркими объектами во Вселенной.',
      en: 'Gas spirals into a white-hot accretion disc and reaches colossal speeds — this is how feeding black holes become the brightest objects in the Universe.',
      kg: 'Газ ысык аккрециялык дискке айланып, эбегейсиз ылдамдыкка жетет — ушундайча «азыктанган» кара көңдөйлөр Ааламдагы эң жарык объекттерге айланат.',
    },
  },
  {
    id: 'smbh-binary',
    category: 'blackHoles',
    kind: 'simulation',
    duration: '2:13',
    ...nasaVideo('GSFC_20181002_SMBH_m13043_Simulation', { poster: 'large_2' }),
    credit: 'NASA’s Goddard Space Flight Center / Scott Wiessinger',
    title: { ru: 'Танец двух сверхмассивных чёрных дыр', en: 'Two supermassive black holes in a cosmic dance', kg: 'Эки супермассалуу кара көңдөйдүн бийи' },
    description: {
      ru: 'Первая симуляция, полностью учитывающая общую теорию относительности Эйнштейна: пара гигантов кружит перед слиянием, а газ вокруг них светится в основном в ультрафиолете и рентгене.',
      en: 'The first simulation to fully include Einstein’s general relativity: two giants spiral towards a merger while the gas around them glows mostly in ultraviolet and X-rays.',
      kg: 'Эйнштейндин жалпы салыштырмалуулук теориясын толук эске алган биринчи симуляция: эки гигант кошулуу алдында айланып, аларды курчаган газ негизинен ультрафиолет жана рентген нурунда жаркырайт.',
    },
  },
  {
    id: 'sun-as-black-hole',
    category: 'blackHoles',
    kind: 'animation',
    duration: '0:21',
    ...hubbleVideo('hubblecast43g', 'hubblecast43g.m4v'),
    credit: 'ESA/Hubble (M. Kornmesser)',
    title: { ru: 'Что, если Солнце станет чёрной дырой?', en: 'What if the Sun became a black hole?', kg: 'Күн кара көңдөйгө айланса эмне болот?' },
    description: {
      ru: 'Мысленный эксперимент: сожмите Солнце в шар диаметром около 6 км — и планеты продолжат кружить по прежним орбитам, ведь гравитация на расстоянии не изменится. Только станет очень темно и холодно.',
      en: 'A thought experiment: squeeze the Sun into a ball about 6 km across and the planets keep circling on the same orbits — gravity at a distance stays the same. It just gets very dark and very cold.',
      kg: 'Ой жүгүртүү: Күндү диаметри 6 кмдей шарга кысып көрүңүз — планеталар мурунку орбиталары боюнча айлана беришет, анткени алыстагы тартылуу өзгөрбөйт. Болгону абдан караңгы жана суук болуп калат.',
    },
  },

  // ── Planets ───────────────────────────────────────────────
  {
    id: 'jupiter-great-red-spot',
    category: 'planets',
    kind: 'story',
    duration: '2:06',
    ...nasaVideo('GSFC_20180313_Jupiter_m12878_GreatRedSpot'),
    credit: 'NASA’s Goddard Space Flight Center / David Ladd',
    title: { ru: 'Большое Красное Пятно: шторм, который растёт ввысь', en: 'The Great Red Spot: a storm growing taller', kg: 'Чоң Кызыл Так: бийиктеп бараткан бороон' },
    description: {
      ru: 'Шторм крупнее Земли сжимается по площади — но не слабеет, а вытягивается вверх и становится ярче. История, собранная из данных «Вояджеров», Hubble и Juno.',
      en: 'A storm bigger than Earth is shrinking in area — yet instead of weakening it is growing taller and deeper in colour. A story pieced together from Voyager, Hubble and Juno data.',
      kg: 'Жерден чоң бороондун аянты кичирейип жатат — бирок ал алсыраган жок, тескерисинче бийиктеп, түсү коюуланууда. Voyager, Hubble жана Juno маалыматтарынан чогултулган окуя.',
    },
  },
  {
    id: 'jupiter-auroras',
    category: 'planets',
    kind: 'observation',
    duration: '0:10',
    ...hubbleVideo('heic1613a'),
    credit: 'NASA, ESA, J. Nichols',
    title: { ru: 'Полярные сияния Юпитера', en: 'Jupiter’s auroras', kg: 'Юпитердеги уюлдук шооладар' },
    description: {
      ru: 'Таймлапс Hubble в ультрафиолете: сияния над полюсом Юпитера крупнее всей Земли и в сотни раз мощнее земных.',
      en: 'A Hubble time-lapse in ultraviolet light: the auroras over Jupiter’s pole are bigger than the whole Earth and hundreds of times more energetic than ours.',
      kg: 'Hubbleдин ультрафиолет нурундагы таймлапсы: Юпитердин уюлундагы шооладар бүт Жерден чоң жана Жердегилерден жүздөгөн эсе күчтүү.',
    },
  },
  {
    id: 'saturn-pan',
    category: 'planets',
    kind: 'observation',
    duration: '0:18',
    ...hubbleVideo('heic1917a'),
    credit: 'NASA, ESA, A. Simon (Goddard Space Flight Center), and M.H. Wong (University of California, Berkeley)',
    title: { ru: 'Сатурн во всей красе', en: 'Saturn in all its glory', kg: 'Сатурн бүт көркүндө' },
    description: {
      ru: 'Панорама по снимку Hubble 2019 года: кольца, наклонённые к Земле, и тонкие полосы облаков в атмосфере газового гиганта.',
      en: 'A pan across Hubble’s 2019 portrait: rings tilted towards Earth and delicate cloud bands in the gas giant’s atmosphere.',
      kg: 'Hubbleдин 2019-жылкы сүрөтү боюнча панорама: Жерге карай ийилген шакекчелер жана газ гигантынын атмосферасындагы булуттардын ичке тилкелери.',
    },
  },

  // ── Stars ─────────────────────────────────────────────────
  {
    id: 'sdo-seven-years',
    category: 'stars',
    kind: 'observation',
    duration: '3:21',
    ...nasaVideo('GSFC_20170211_SDO_m12500_Year7', { poster: 'large_5' }),
    credit: 'NASA’s Goddard Space Flight Center / Scott Wiessinger, Tom Bridgman',
    title: { ru: 'Семь лет наблюдений за Солнцем', en: 'Seven years of watching the Sun', kg: 'Күндү жети жыл байкоо' },
    description: {
      ru: 'Обсерватория SDO следит за Солнцем без перерыва и успела увидеть почти весь 11-летний цикл: как пятна и вспышки нарастают, а затем снова стихают.',
      en: 'The Solar Dynamics Observatory watches the Sun non-stop and has now seen most of its 11-year cycle: sunspots and flares building up, then fading away again.',
      kg: 'SDO обсерваториясы Күндү тынымсыз байкап, 11 жылдык циклдин дээрлик баарын көрдү: тактар менен жаркылдоолор кантип көбөйүп, кайра басаңдаарын.',
    },
  },
  {
    id: 'supernova',
    category: 'stars',
    kind: 'animation',
    duration: '0:20',
    ...hubbleVideo('hubblecast64b', 'hubblecast64b.m4v'),
    credit: 'ESA/Hubble (L. Calçada)',
    title: { ru: 'Взрыв сверхновой', en: 'A supernova explodes', kg: 'Супержаңы жылдыздын жарылуусу' },
    description: {
      ru: 'Последние мгновения массивной звезды: ядро коллапсирует, и за считанные секунды звезда высвобождает больше энергии, чем Солнце за всю свою жизнь.',
      en: 'The final moments of a massive star: its core collapses and within seconds the star releases more energy than the Sun will in its entire lifetime.',
      kg: 'Массалуу жылдыздын акыркы көз ирмемдери: өзөгү кулайт жана жылдыз бир нече секундда Күн бүт өмүрүндө чыгаргандан көп энергия бөлүп чыгарат.',
    },
  },
  {
    id: 'pulsar-in-a-box',
    category: 'stars',
    kind: 'simulation',
    duration: '2:53',
    ...nasaVideo('GSFC_20181010_FERMI_m13058_Pulsar4K'),
    credit: 'NASA’s Goddard Space Flight Center / Scott Wiessinger',
    title: { ru: 'Пульсар в коробке', en: 'A pulsar in a box', kg: 'Кутудагы пульсар' },
    description: {
      ru: 'Компьютерная модель вращающейся нейтронной звезды — ядра взорвавшейся звезды размером с город, но тяжелее Солнца. Видно, как частицы в её полях рождают гамма- и радиоимпульсы.',
      en: 'A computer model of a spinning neutron star — the city-sized yet heavier-than-the-Sun core of an exploded star. Watch particles in its fields produce gamma-ray and radio pulses.',
      kg: 'Айланып турган нейтрон жылдызынын компьютердик модели — өлчөмү шаардай, бирок Күндөн оор, жарылган жылдыздын өзөгү. Анын талааларындагы бөлүкчөлөр гамма жана радио импульстарын кантип жаратары көрүнөт.',
    },
  },

  // ── Cosmos ────────────────────────────────────────────────
  {
    id: 'infrared-universe',
    category: 'cosmos',
    kind: 'observation',
    duration: '1:33',
    ...nasaVideo('JPL-20231222-SOLSYSf-0001-NASA Telescopes Reveal Hidden Universe'),
    credit:
      'NASA/JPL-Caltech. IRAS images: NASA/Netherlands Agency for Aerospace Programmes/UK Science and Engineering Research Council/JPL-Caltech; Spitzer images: NASA/JPL-Caltech/IPAC; Webb images: NASA/ESA/CSA/STScI',
    title: { ru: 'Невидимая инфракрасная Вселенная', en: 'The invisible infrared Universe', kg: 'Көзгө көрүнбөгөн инфракызыл Аалам' },
    description: {
      ru: '40 лет инфракрасной астрономии за полторы минуты: одни и те же объекты глазами IRAS, «Спитцера» и «Джеймса Уэбба» — и с каждым поколением всё чётче.',
      en: 'Forty years of infrared astronomy in ninety seconds: the same objects through the eyes of IRAS, Spitzer and Webb — sharper with every generation.',
      kg: 'Инфракызыл астрономиянын 40 жылы бир жарым мүнөттө: ошол эле объекттер IRAS, Spitzer жана «Джеймс Уэбб» көзү менен — ар бир муун сайын даанараак.',
    },
  },
  {
    id: 'gravitational-lens',
    category: 'cosmos',
    kind: 'animation',
    duration: '0:20',
    ...hubbleVideo('heic1710a'),
    credit: 'ESA/Hubble, L. Calçada',
    title: { ru: 'Как работает гравитационная линза', en: 'How a gravitational lens works', kg: 'Гравитациялык линза кантип иштейт' },
    description: {
      ru: 'Галактика на пути света действует как увеличительное стекло: она искривляет пространство и превращает одну далёкую сверхновую в несколько ярких изображений.',
      en: 'A galaxy in the light’s path acts like a magnifying glass: it bends space and turns a single distant supernova into several bright images.',
      kg: 'Жарыктын жолундагы галактика чоңойтуучу айнектей иштейт: ал мейкиндикти ийип, бир алыскы супержаңы жылдызды бир нече жаркыраган сүрөткө айландырат.',
    },
  },
  {
    id: 'distance-ladder',
    category: 'cosmos',
    kind: 'animation',
    duration: '0:30',
    ...hubbleVideo('heic1611a'),
    credit: 'NASA, ESA, A. Feild (STScI), and A. Riess (STScI/JHU)',
    title: { ru: 'Как измерить расширение Вселенной', en: 'Measuring the expanding Universe', kg: 'Ааламдын кеңейишин кантип өлчөйбүз' },
    description: {
      ru: 'Три ступени «космической лестницы расстояний»: параллакс, цефеиды и сверхновые типа Ia. Так Hubble уточнил, с какой скоростью разлетаются галактики.',
      en: 'Three rungs of the “cosmic distance ladder”: parallax, Cepheids and Type Ia supernovae. This is how Hubble refined how fast galaxies are flying apart.',
      kg: '«Космостук аралыктар тепкичинин» үч баскычы: параллакс, цефеидалар жана Ia тибиндеги супержаңы жылдыздар. Ушундайча Hubble галактикалар канчалык тез алыстап жатканын тактаган.',
    },
  },
  {
    id: 'hubble-29',
    category: 'cosmos',
    kind: 'story',
    duration: '3:02',
    ...nasaVideo('GSFC_20190424_HST_m13189_Hubble29'),
    credit: 'NASA’s Goddard Space Flight Center / Timothy Childers, Katrina Jackson',
    title: { ru: 'Hubble: 29 лет на орбите', en: 'Hubble: 29 years in orbit', kg: 'Hubble: орбитада 29 жыл' },
    description: {
      ru: 'К своему юбилею телескоп показал Южную Крабовидную туманность — и заодно вспомнил самые яркие научные результаты 29-го года работы.',
      en: 'For its anniversary the telescope unveiled the Southern Crab Nebula — and looked back at the highlights of its 29th year of science.',
      kg: 'Мааракесине карата телескоп Түштүк Краб тумандуулугун көрсөттү — жана 29-жылдагы эң жаркын илимий жыйынтыктарын эске салды.',
    },
  },
];

/** Videos of one category (keeps the order above). */
export const videosByCategory = (category) => videosData.filter((v) => v.category === category);
