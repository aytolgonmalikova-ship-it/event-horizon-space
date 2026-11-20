// Galaxies: types, the Milky Way, Andromeda, telescope gallery.

export const galaxyTypes = [
  {
    id: 'spiral',
    image: 'whirlpool',
    name: { ru: 'Спиральные', en: 'Spiral', kg: 'Спиралдык' },
    example: { ru: 'Галактика Водоворот (M51)', en: 'Whirlpool Galaxy (M51)', kg: 'Иримдик галактикасы (M51)' },
    text: {
      ru: 'Плоский вращающийся диск с рукавами, в которых кипит звездообразование, и яркой выпуклостью в центре. Рукава — не жёсткие конструкции, а «пробки» волн плотности, сквозь которые проходят звёзды.',
      en: 'A flat, rotating disc with arms full of star formation and a bright central bulge. The arms aren’t rigid structures but density waves — cosmic traffic jams that stars pass through.',
      kg: 'Жылдыз пайда болуу кайнаган жеңдери жана борборунда жарык томпогу бар жалпак айлануучу диск. Жеңдер катуу түзүлүш эмес, жылдыздар аралап өткөн тыгыздык толкундары — космостук «тыгындар».',
    },
  },
  {
    id: 'elliptical',
    image: 'ngc1275',
    name: { ru: 'Эллиптические', en: 'Elliptical', kg: 'Эллипстик' },
    example: { ru: 'NGC 1275 (Персей A)', en: 'NGC 1275 (Perseus A)', kg: 'NGC 1275 (Персей A)' },
    text: {
      ru: 'Гладкие «облака» из старых красноватых звёзд почти без газа для рождения новых. Самые большие галактики Вселенной — эллиптические гиганты в центрах скоплений, выросшие на слияниях.',
      en: 'Smooth “swarms” of old, reddish stars with little gas left to make new ones. The biggest galaxies in the Universe are elliptical giants at the hearts of clusters, grown fat on mergers.',
      kg: 'Жаңы жылдыздар үчүн газы дээрлик жок, эски кызгылт жылдыздардын жылмакай «булуттары». Ааламдагы эң чоң галактикалар — топтордун борборундагы, кошулуулардын эсебинен өскөн эллипстик алптар.',
    },
  },
  {
    id: 'ring',
    image: 'cartwheel',
    name: { ru: 'Кольцевые и столкнувшиеся', en: 'Ring & colliding', kg: 'Шакек сымал жана кагылышкан' },
    example: { ru: 'Галактика Колесо Телеги', en: 'Cartwheel Galaxy', kg: 'Араба дөңгөлөгү галактикасы' },
    text: {
      ru: 'Около 400 млн лет назад сквозь «Колесо Телеги» пролетела меньшая галактика. Как камень, брошенный в пруд, она запустила кольцевую волну звездообразования.',
      en: 'About 400 million years ago a smaller galaxy plunged through the Cartwheel. Like a stone tossed into a pond, it sent a ring of star birth rippling outward.',
      kg: 'Болжол менен 400 млн жыл мурун «Араба дөңгөлөгү» аркылуу кичирээк галактика учуп өткөн. Көлмөгө ыргытылган таш сыяктуу, ал жылдыз пайда болуунун шакек толкунун жараткан.',
    },
  },
  {
    id: 'group',
    image: 'stephansQuintet',
    name: { ru: 'Группы галактик', en: 'Galaxy groups', kg: 'Галактика топтору' },
    example: { ru: 'Квинтет Стефана', en: 'Stephan’s Quintet', kg: 'Стефан квинтети' },
    text: {
      ru: 'Галактики редко живут поодиночке. В Квинтете Стефана четыре галактики сплелись в гравитационном танце, а ударные волны от их столкновений нагревают газ до миллионов градусов.',
      en: 'Galaxies rarely live alone. In Stephan’s Quintet four galaxies are locked in a gravitational dance, and shock waves from their collisions heat gas to millions of degrees.',
      kg: 'Галактикалар сейрек жалгыз жашайт. Стефан квинтетинде төрт галактика тартылуу бийинде чырмалышкан, алардын кагылышуусунан чыккан сокку толкундары газды миллиондогон градуска чейин ысытат.',
    },
  },
];

export const milkyWayFacts = [
  {
    value: { ru: '≈ 100 000', en: '≈ 100,000', kg: '≈ 100 000' },
    label: { ru: 'световых лет в поперечнике', en: 'light-years across', kg: 'жарык жылы туурасынан' },
  },
  {
    value: { ru: '100–400 млрд', en: '100–400 billion', kg: '100–400 млрд' },
    label: { ru: 'звёзд', en: 'stars', kg: 'жылдыз' },
  },
  {
    value: { ru: '≈ 26 000', en: '≈ 26,000', kg: '≈ 26 000' },
    label: { ru: 'св. лет от Солнца до центра', en: 'ly from the Sun to the centre', kg: 'ж. ж. Күндөн борборго чейин' },
  },
  {
    value: { ru: '≈ 230 млн', en: '≈ 230 million', kg: '≈ 230 млн' },
    label: { ru: 'лет — «галактический год»', en: 'years — one “galactic year”', kg: 'жыл — бир «галактикалык жыл»' },
  },
];

export const milkyWayText = {
  ru: [
    'Млечный Путь — спиральная галактика с перемычкой, и мы живём внутри неё, в рукаве Ориона, примерно на полпути от центра к краю. Поэтому мы видим её изнутри — как светлую полосу через всё небо. В ясную ночь вдали от городов, например у Иссык-Куля, она видна особенно отчётливо.',
    'Солнце мчится вокруг центра галактики со скоростью около 230 км/с и делает один оборот примерно за 230 миллионов лет. В последний раз, когда Солнце было в этой точке орбиты, на Земле только появлялись первые динозавры.',
    'В самом центре прячется сверхмассивная чёрная дыра Стрелец A* массой около 4 миллионов Солнц. А весь видимый диск погружён в гораздо более массивное гало тёмной материи.',
  ],
  en: [
    'The Milky Way is a barred spiral galaxy, and we live inside it, in the Orion Arm, roughly halfway from the centre to the edge. That’s why we see it edge-on, as a pale band across the sky — best seen on clear nights far from city lights.',
    'The Sun races around the galactic centre at about 230 km/s, completing one lap in roughly 230 million years. The last time it was at this point in its orbit, the first dinosaurs were just appearing on Earth.',
    'At the very centre hides the supermassive black hole Sagittarius A*, about 4 million times the mass of the Sun. And the whole visible disc is embedded in a far more massive halo of dark matter.',
  ],
  kg: [
    'Саманчынын жолу — тосмосу бар спиралдык галактика, биз анын ичинде, Орион жеңинде, борбордон четине чейинки жолдун болжол менен ортосунда жашайбыз. Ошондуктан биз аны ичинен — бүт асманды кесип өткөн ак тилке катары көрөбүз. Шаардан алыс, мисалы Ысык-Көлдүн жээгинде ачык түнү ал өзгөчө даана көрүнөт.',
    'Күн галактиканын борборун болжол менен 230 км/с ылдамдык менен айланып, бир айланууну 230 миллион жылдай убакытта бүтүрөт. Күн орбитанын ушул чекитинде акыркы жолу болгондо, Жерде алгачкы динозаврлар эми гана пайда боло баштаган.',
    'Эң борборунда массасы 4 миллион Күндөй болгон Стрелец A* супермассалуу кара көңдөйү жашынган. Ал эми бүт көрүнгөн диск алда канча массалуу караңгы материянын галосуна чөмүлгөн.',
  ],
};

export const andromedaText = {
  ru: [
    'Галактика Андромеды (M31) — самый далёкий объект, который можно увидеть невооружённым глазом: туманное пятнышко, свет от которого летел к нам 2,5 миллиона лет. В ней около триллиона звёзд — больше, чем в Млечном Пути.',
    'Андромеда сближается с нами со скоростью около 110 км/с. Долго считалось, что столкновение неизбежно через 4–5 млрд лет, но расчёты 2025 года с учётом данных «Хаббла» и Gaia дают примерно 50 % вероятности слияния в ближайшие 10 млрд лет. Даже если оно случится, звёзды почти не столкнутся — расстояния между ними огромны.',
  ],
  en: [
    'The Andromeda Galaxy (M31) is the most distant thing you can see with the naked eye: a hazy smudge whose light left it 2.5 million years ago. It holds around a trillion stars — more than the Milky Way.',
    'Andromeda is approaching at roughly 110 km/s. A collision in 4–5 billion years was long considered certain, but 2025 calculations using Hubble and Gaia data give only about a 50% chance of a merger within the next 10 billion years. Even if it happens, stars will hardly ever collide — the gaps between them are enormous.',
  ],
  kg: [
    'Андромеда галактикасы (M31) — жөнөкөй көз менен көрүүгө мүмкүн болгон эң алыскы объект: жарыгы бизге 2,5 миллион жыл учуп келген туман сымал так. Анда болжол менен бир триллион жылдыз бар — Саманчынын жолундагыдан көп.',
    'Андромеда бизге болжол менен 110 км/с ылдамдык менен жакындап келатат. Көпкө чейин 4–5 млрд жылдан кийин кагылышуу сөзсүз болот деп эсептелип келген, бирок «Хаббл» жана Gaia маалыматтарын эске алган 2025-жылдагы эсептөөлөр кийинки 10 млрд жылда кошулуунун ыктымалдыгын болжол менен 50 % деп көрсөтөт. Ал болгон күндө да жылдыздар дээрлик кагылышпайт — алардын ортосундагы аралыктар зор.',
  ],
};

export const galleryItems = [
  { image: 'cosmicCliffs', scope: 'webb', name: { ru: '«Космические утёсы» в Киле', en: '“Cosmic Cliffs” in Carina', kg: 'Килдеги «Космостук жарлар»' } },
  { image: 'pillarsWebb', scope: 'webb', name: { ru: 'Столпы Творения (Уэбб)', en: 'Pillars of Creation (Webb)', kg: 'Жаратылыш мамылары (Уэбб)' } },
  { image: 'pillarsHubble', scope: 'hubble', name: { ru: 'Столпы Творения (Хаббл)', en: 'Pillars of Creation (Hubble)', kg: 'Жаратылыш мамылары (Хаббл)' } },
  { image: 'deepField', scope: 'webb', name: { ru: 'Первое глубокое поле «Уэбба»', en: 'Webb’s First Deep Field', kg: '«Уэббдин» биринчи терең талаасы' } },
  { image: 'hudf', scope: 'hubble', name: { ru: 'Сверхглубокое поле «Хаббла»', en: 'Hubble Ultra Deep Field', kg: '«Хабблдын» өтө терең талаасы' } },
  { image: 'andromeda', scope: 'hubble', name: { ru: 'Андромеда крупным планом', en: 'Andromeda up close', kg: 'Андромеда жакындан' } },
  { image: 'tarantula', scope: 'webb', name: { ru: 'Туманность Тарантул', en: 'Tarantula Nebula', kg: 'Тарантул тумандуулугу' } },
  { image: 'carinaHubble', scope: 'hubble', name: { ru: 'Туманность Киля', en: 'Carina Nebula', kg: 'Кил тумандуулугу' } },
  { image: 'cartwheel', scope: 'webb', name: { ru: 'Галактика Колесо Телеги', en: 'Cartwheel Galaxy', kg: 'Араба дөңгөлөгү галактикасы' } },
  { image: 'whirlpool', scope: 'hubble', name: { ru: 'Галактика Водоворот', en: 'Whirlpool Galaxy', kg: 'Иримдик галактикасы' } },
  { image: 'stephansQuintet', scope: 'webb', name: { ru: 'Квинтет Стефана', en: 'Stephan’s Quintet', kg: 'Стефан квинтети' } },
  { image: 'crab', scope: 'hubble', name: { ru: 'Крабовидная туманность', en: 'Crab Nebula', kg: 'Краб сымал тумандуулук' } },
];
