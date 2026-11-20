// Home page: stats, section overview and "mind-blowing facts".

export const stats = [
  { value: 13.8, decimals: 1, unit: { ru: 'млрд лет', en: 'billion years', kg: 'млрд жыл' }, label: { ru: 'возраст Вселенной', en: 'age of the Universe', kg: 'Ааламдын жашы' } },
  { value: 2, decimals: 0, unit: { ru: 'трлн', en: 'trillion', kg: 'трлн' }, label: { ru: 'галактик — по оценкам, в наблюдаемой Вселенной', en: 'galaxies estimated in the observable Universe', kg: 'галактика — байкалуучу Ааламда болжолдуу' } },
  { value: 299792, decimals: 0, unit: { ru: 'км/с', en: 'km/s', kg: 'км/с' }, label: { ru: 'скорость света', en: 'speed of light', kg: 'жарыктын ылдамдыгы' } },
  { value: 6000, decimals: 0, prefix: '> ', unit: { ru: 'экзопланет', en: 'exoplanets', kg: 'экзопланета' }, label: { ru: 'подтверждено на сегодня', en: 'confirmed to date', kg: 'бүгүнкү күнгө тастыкталган' } },
];

export const sectionsOverview = [
  {
    to: '/solar-system',
    navKey: 'navSolar',
    image: 'saturn',
    accent: 'from-amber-400/30',
    scale: { ru: '≈ 10¹³ м', en: '≈ 10¹³ m', kg: '≈ 10¹³ м' },
    text: {
      ru: 'Восемь планет, от раскалённого Меркурия до штормового Нептуна. Сравните их размеры и узнайте, сколько бы вы весили на Юпитере.',
      en: 'Eight planets, from scorching Mercury to stormy Neptune. Compare their sizes and find out what you’d weigh on Jupiter.',
      kg: 'Ысык Меркурийден бороондуу Нептунга чейин сегиз планета. Алардын өлчөмдөрүн салыштырып, Юпитерде канча салмак тартарыңызды билиңиз.',
    },
  },
  {
    to: '/stars',
    navKey: 'navStars',
    image: 'pillarsWebb',
    accent: 'from-orange-500/30',
    scale: { ru: '≈ 10⁹ – 10¹² м', en: '≈ 10⁹ – 10¹² m', kg: '≈ 10⁹ – 10¹² м' },
    text: {
      ru: 'Как рождаются, живут и умирают звёзды — от облаков-колыбелей до сверхновых.',
      en: 'How stars are born, live and die — from stellar nurseries to supernovae.',
      kg: 'Жылдыздар кантип жаралып, жашап, өлөт — бешик-булуттардан супержаңы жылдыздарга чейин.',
    },
  },
  {
    to: '/galaxies',
    navKey: 'navGalaxies',
    image: 'whirlpool',
    accent: 'from-sky-400/30',
    scale: { ru: '≈ 10²¹ м', en: '≈ 10²¹ m', kg: '≈ 10²¹ м' },
    text: {
      ru: 'Спиральные, эллиптические, столкнувшиеся. Млечный Путь, Андромеда и галерея лучших снимков «Хаббла» и «Уэбба».',
      en: 'Spiral, elliptical, colliding. The Milky Way, Andromeda and a gallery of Hubble’s and Webb’s finest.',
      kg: 'Спиралдык, эллипстик, кагылышкан. Саманчынын жолу, Андромеда жана «Хаббл» менен «Уэббдин» мыкты сүрөттөрүнүн галереясы.',
    },
  },
  {
    to: '/black-holes',
    navKey: 'navBlackHoles',
    image: 'ngc1275',
    accent: 'from-fuchsia-500/30',
    scale: { ru: 'r = 2GM/c²', en: 'r = 2GM/c²', kg: 'r = 2GM/c²' },
    text: {
      ru: 'Горизонт событий, сингулярность и аккреционные диски. Узнайте, до какого размера нужно сжать Землю, чтобы она стала чёрной дырой.',
      en: 'Event horizons, singularities and accretion discs. Find out how small Earth would have to be to become a black hole.',
      kg: 'Окуялар горизонту, сингулярдуулук жана аккрециялык дисктер. Жер кара көңдөйгө айланышы үчүн аны канчага чейин кысуу керек экенин билиңиз.',
    },
  },
  {
    to: '/universe',
    navKey: 'navUniverse',
    image: 'deepField',
    accent: 'from-violet-500/30',
    scale: { ru: '≈ 10²⁶ м', en: '≈ 10²⁶ m', kg: '≈ 10²⁶ м' },
    text: {
      ru: 'От Большого взрыва до наших дней. Масштабы, тёмная материя, тёмная энергия и главные загадки мироздания.',
      en: 'From the Big Bang to today. Scale, dark matter, dark energy and the greatest riddles of existence.',
      kg: 'Чоң жарылуудан бүгүнкү күнгө чейин. Масштабдар, караңгы материя, караңгы энергия жана ааламдын эң чоң табышмактары.',
    },
  },
];

export const mindBlowingFacts = [
  {
    icon: '🌟',
    q: { ru: 'Сколько звёзд во Вселенной?', en: 'How many stars are there?', kg: 'Ааламда канча жылдыз бар?' },
    a: {
      ru: 'По оценкам — порядка 10²² – 10²⁴. Это больше, чем песчинок на всех пляжах Земли.',
      en: 'Roughly 10²² – 10²⁴ by estimate. More than all the grains of sand on all of Earth’s beaches.',
      kg: 'Болжолдуу эсеп боюнча — 10²² – 10²⁴ чамасында. Бул Жердин бардык жээктериндеги кум бүртүкчөлөрүнөн көп.',
    },
  },
  {
    icon: '🕰️',
    q: { ru: 'Мы видим прошлое?', en: 'Do we see the past?', kg: 'Биз өткөндү көрөбүзбү?' },
    a: {
      ru: 'Да. Чем дальше смотрим, тем глубже в прошлое: свет Андромеды покинул её 2,5 млн лет назад — когда на Земле ещё не было людей нашего вида.',
      en: 'Yes. The farther we look, the deeper into the past: Andromeda’s light left it 2.5 million years ago — before our species existed.',
      kg: 'Ооба. Канчалык алысты карасак, ошончолук терең өткөндү көрөбүз: Андромеданын жарыгы андан 2,5 млн жыл мурун чыккан — Жерде азыркы адамдар али жок кезде.',
    },
  },
  {
    icon: '🥄',
    q: { ru: 'Сколько весит ложка нейтронной звезды?', en: 'What does a spoonful of neutron star weigh?', kg: 'Нейтрон жылдызынын бир кашыгы канча тартат?' },
    a: {
      ru: 'Около миллиарда тонн — примерно как гора. Атомы там раздавлены до состояния сплошных нейтронов.',
      en: 'About a billion tonnes — roughly a mountain. Atoms there are crushed into a solid mass of neutrons.',
      kg: 'Болжол менен бир миллиард тонна — тоодой. Ал жерде атомдор таза нейтрондорго чейин эзилген.',
    },
  },
  {
    icon: '🔇',
    q: { ru: 'Слышен ли звук в космосе?', en: 'Is there sound in space?', kg: 'Космосто үн угулабы?' },
    a: {
      ru: 'Нет — звуку нужна среда. Но в скоплении Персея «Чандра» уловил волны давления в горячем газе — «ноту» на 57 октав ниже ля первой октавы.',
      en: 'No — sound needs a medium. But in the Perseus cluster, Chandra detected pressure waves in hot gas: a “note” 57 octaves below middle A.',
      kg: 'Жок — үнгө чөйрө керек. Бирок Персей кластеринде «Чандра» ысык газдагы басым толкундарын кармаган — биринчи октаванын ля нотасынан 57 октава төмөн «нота».',
    },
  },
  {
    icon: '💎',
    q: { ru: 'Бывают ли алмазные дожди?', en: 'Can it rain diamonds?', kg: 'Алмаз жамгыры жаайбы?' },
    a: {
      ru: 'Вероятно, да: в глубинах Урана и Нептуна давление может превращать углерод из метана в алмазы, которые «тонут» к ядру.',
      en: 'Probably: deep inside Uranus and Neptune, pressure may squeeze carbon from methane into diamonds that sink toward the core.',
      kg: 'Балким, ооба: Уран менен Нептундун тереңинде басым метандагы көмүртекти өзөккө «чөккөн» алмаздарга айландырышы мүмкүн.',
    },
  },
  {
    icon: '🧬',
    q: { ru: 'Из чего сделаны мы?', en: 'What are we made of?', kg: 'Биз эмнеден жаралганбыз?' },
    a: {
      ru: 'Водород в наших клетках родился при Большом взрыве, а углерод, кислород и железо — в звёздах. Мы буквально звёздная пыль.',
      en: 'The hydrogen in our cells was made in the Big Bang; the carbon, oxygen and iron in stars. We are literally stardust.',
      kg: 'Клеткаларыбыздагы суутек Чоң жарылууда, ал эми көмүртек, кычкылтек жана темир жылдыздарда жаралган. Биз чындап эле жылдыз чаңыбыз.',
    },
  },
];
