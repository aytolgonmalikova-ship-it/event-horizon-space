// Black holes: anatomy, formation, famous objects, calculator presets.

export const anatomy = [
  {
    id: 'singularity',
    r: 4,
    color: '#ffffff',
    name: { ru: 'Сингулярность', en: 'Singularity', kg: 'Сингулярдуулук' },
    text: {
      ru: 'Точка (или кольцо у вращающейся дыры), где, согласно общей теории относительности, плотность становится бесконечной. На самом деле это знак того, что наша теория здесь перестаёт работать: описать сингулярность сможет только будущая квантовая теория гравитации.',
      en: 'The point (or ring, for a spinning hole) where general relativity predicts infinite density. In reality it signals that our theory breaks down; only a future quantum theory of gravity can describe what is really there.',
      kg: 'Жалпы салыштырмалуулук теориясы боюнча тыгыздык чексиз болуп калган чекит (айлануучу көңдөйдө — шакек). Чындыгында бул биздин теория бул жерде иштебей калганын билдирет: сингулярдуулукту келечектеги тартылуунун кванттык теориясы гана сүрөттөй алат.',
    },
  },
  {
    id: 'horizon',
    r: 28,
    color: '#000000',
    name: { ru: 'Горизонт событий', en: 'Event horizon', kg: 'Окуялар горизонту' },
    text: {
      ru: 'Граница невозврата. Здесь скорость убегания равна скорости света, поэтому изнутри ничто не может выбраться наружу. Это не твёрдая поверхность: падающий наблюдатель пересёк бы её, ничего особенного не заметив, а для внешнего мира он бы будто застыл у края, медленно краснея и угасая.',
      en: 'The point of no return. Here the escape velocity equals the speed of light, so nothing inside can get out. It isn’t a solid surface: an infalling astronaut would cross it without noticing anything special, while to outside observers they would seem to freeze at the edge, reddening and fading away.',
      kg: 'Кайтып келбөө чеги. Бул жерде качуу ылдамдыгы жарыктын ылдамдыгына барабар, ошондуктан ичинен эч нерсе сыртка чыга албайт. Бул катуу бет эмес: кулап бараткан байкоочу аны эч нерсе байкабай кесип өтмөк, ал эми сырттан караганда ал чекте тоңуп калгандай, акырындык менен кызарып, өчүп бараткандай көрүнмөк.',
    },
  },
  {
    id: 'photon',
    r: 42,
    color: '#fde68a',
    name: { ru: 'Фотонная сфера', en: 'Photon sphere', kg: 'Фотон сферасы' },
    text: {
      ru: 'На расстоянии полутора радиусов горизонта гравитация настолько сильна, что свет может двигаться по кругу. Стоя здесь, вы теоретически увидели бы собственный затылок. Именно эта область формирует светящееся кольцо на снимках телескопа горизонта событий (EHT).',
      en: 'At 1.5 times the horizon radius, gravity is strong enough to bend light into a circle. Standing here, you could in theory see the back of your own head. This region shapes the glowing ring seen in Event Horizon Telescope images.',
      kg: 'Горизонттун радиусунан бир жарым эсе алыстыкта тартылуу күчү ушунчалык күчтүү, жарык тегерек боюнча кыймылдай алат. Бул жерде турсаңыз, теория жүзүндө өз желкеңизди көрмөксүз. Окуялар горизонту телескобунун (EHT) сүрөттөрүндөгү жаркыраган шакекти дал ушул аймак түзөт.',
    },
  },
  {
    id: 'disk',
    r: 70,
    color: '#fb923c',
    name: { ru: 'Аккреционный диск', en: 'Accretion disk', kg: 'Аккрециялык диск' },
    text: {
      ru: 'Газ, падающий на чёрную дыру, закручивается в диск и разогревается трением до миллионов градусов. Такие диски светят ярче целых галактик — так выглядят квазары. Сама дыра чёрная, но её окрестности — одни из самых ярких мест во Вселенной.',
      en: 'Gas falling toward the hole spirals into a disc and is heated by friction to millions of degrees. Such discs can outshine entire galaxies — that’s what quasars are. The hole itself is black, but its surroundings are among the brightest places in the Universe.',
      kg: 'Кара көңдөйгө кулаган газ дискке оролуп, сүрүлүүдөн миллиондогон градуска чейин ысыйт. Мындай дисктер бүтүндөй галактикалардан жарык жаркырайт — квазарлар ушундай көрүнөт. Көңдөйдүн өзү кара, бирок анын айланасы — Ааламдагы эң жарык жерлердин бири.',
    },
  },
  {
    id: 'jets',
    r: 95,
    color: '#7dd3fc',
    name: { ru: 'Релятивистские джеты', en: 'Relativistic jets', kg: 'Релятивисттик агымдар' },
    text: {
      ru: 'Магнитные поля вращающейся дыры выстреливают часть вещества двумя узкими струями почти со скоростью света. Джеты галактики M87 тянутся на тысячи световых лет — дальше, чем размер многих галактик.',
      en: 'The magnetic fields of a spinning hole launch some matter into two narrow beams at nearly the speed of light. The jets of galaxy M87 stretch for thousands of light-years.',
      kg: 'Айлануучу көңдөйдүн магнит талаалары заттын бир бөлүгүн жарыктын ылдамдыгына жакын эки ичке агым менен атып чыгарат. M87 галактикасынын агымдары миңдеген жарык жылына созулат.',
    },
  },
];

export const formation = [
  {
    icon: '💥',
    name: { ru: 'Коллапс массивной звезды', en: 'Collapse of a massive star', kg: 'Массалуу жылдыздын кулашы' },
    text: {
      ru: 'Когда у звезды массой больше ~20 Солнц заканчивается топливо, её ядро обрушивается внутрь. Так появляются чёрные дыры звёздной массы — от нескольких до десятков солнечных масс.',
      en: 'When a star of more than ~20 solar masses runs out of fuel, its core caves in. That’s how stellar-mass black holes — a few to dozens of solar masses — are made.',
      kg: 'Массасы ~20 Күндөн ашкан жылдыздын отуну түгөнгөндө, анын өзөгү ичине кулайт. Жылдыздык массадагы кара көңдөйлөр — бир нечеден ондогон Күн массасына чейин — ушундай пайда болот.',
    },
  },
  {
    icon: '🌀',
    name: { ru: 'Слияния', en: 'Mergers', kg: 'Кошулуулар' },
    text: {
      ru: 'Две чёрные дыры, кружась друг вокруг друга, сливаются в одну — и сотрясают само пространство-время. Эти гравитационные волны впервые уловил детектор LIGO в 2015 году.',
      en: 'Two black holes spiralling together merge into one and shake space-time itself. LIGO first detected these gravitational waves in 2015.',
      kg: 'Бири-бирин айланган эки кара көңдөй бирге кошулуп, мейкиндик-убакыттын өзүн титиретет. Бул тартылуу толкундарын LIGO детектору 2015-жылы биринчи жолу каттаган.',
    },
  },
  {
    icon: '🌌',
    name: { ru: 'Сверхмассивные гиганты', en: 'Supermassive giants', kg: 'Супермассалуу алптар' },
    text: {
      ru: 'В центре почти каждой крупной галактики сидит дыра в миллионы и миллиарды солнечных масс. «Уэбб» находит их уже в первые сотни миллионов лет после Большого взрыва — и учёные до сих пор спорят, как они успели так вырасти.',
      en: 'Nearly every large galaxy hosts a hole of millions to billions of solar masses at its centre. Webb finds them within the first few hundred million years after the Big Bang — and scientists still debate how they grew so fast.',
      kg: 'Дээрлик ар бир чоң галактиканын борборунда миллиондогон жана миллиарддаган Күн массасындагы көңдөй бар. «Уэбб» аларды Чоң жарылуудан кийинки алгачкы жүздөгөн миллион жылда эле табууда — окумуштуулар алар кантип ушунчалык тез өскөнүн дагы эле талашып келишет.',
    },
  },
  {
    icon: '❓',
    name: { ru: 'Первичные (гипотеза)', en: 'Primordial (hypothetical)', kg: 'Алгачкы (гипотеза)' },
    text: {
      ru: 'Возможно, крошечные чёрные дыры возникли прямо в первые мгновения Вселенной из сгустков плотности. Их пока не нашли, но некоторые физики считают, что они могут составлять часть тёмной материи.',
      en: 'Tiny black holes might have formed in the first instants of the Universe from dense pockets of matter. None has been found yet, but some physicists think they could make up part of dark matter.',
      kg: 'Балким, кичинекей кара көңдөйлөр Ааламдын алгачкы көз ирмемдеринде тыгыздык уюмдарынан пайда болгондур. Алар азырынча табыла элек, бирок кээ бир физиктер алар караңгы материянын бир бөлүгүн түзүшү мүмкүн деп эсептешет.',
    },
  },
];

export const famousBlackHoles = [
  {
    id: 'sgra',
    massSun: 4.3e6,
    massLabel: { ru: '≈ 4,3 млн', en: '≈ 4.3 million', kg: '≈ 4,3 млн' },
    distance: { ru: '≈ 26 000 св. лет', en: '≈ 26,000 light-years', kg: '≈ 26 000 жарык жылы' },
    name: { ru: 'Стрелец A*', en: 'Sagittarius A*', kg: 'Стрелец A*' },
    text: {
      ru: 'Сердце нашей Галактики. Его существование доказали, десятилетиями отслеживая звёзды, обращающиеся вокруг невидимого центра, — за это в 2020 году вручили Нобелевскую премию. В 2022 году коллаборация EHT показала его «портрет».',
      en: 'The heart of our Galaxy. Its existence was proven by tracking stars orbiting an invisible centre for decades — work that won the 2020 Nobel Prize. In 2022 the EHT collaboration revealed its “portrait”.',
      kg: 'Биздин Галактиканын жүрөгү. Анын бар экени көзгө көрүнбөгөн борборду айланган жылдыздарды ондогон жылдар бою байкоо аркылуу далилденген — бул үчүн 2020-жылы Нобель сыйлыгы берилген. 2022-жылы EHT коллаборациясы анын «портретин» көрсөткөн.',
    },
  },
  {
    id: 'm87',
    massSun: 6.5e9,
    massLabel: { ru: '≈ 6,5 млрд', en: '≈ 6.5 billion', kg: '≈ 6,5 млрд' },
    distance: { ru: '≈ 55 млн св. лет', en: '≈ 55 million light-years', kg: '≈ 55 млн жарык жылы' },
    name: { ru: 'M87*', en: 'M87*', kg: 'M87*' },
    text: {
      ru: 'Первая чёрная дыра, которую человечество увидело: в апреле 2019 года мир облетело изображение огненного кольца вокруг тёмной тени. Её горизонт больше орбиты Плутона.',
      en: 'The first black hole humanity ever saw: in April 2019 the image of a fiery ring around a dark shadow went around the world. Its horizon is larger than Pluto’s orbit.',
      kg: 'Адамзат көргөн биринчи кара көңдөй: 2019-жылдын апрелинде караңгы көлөкөнү курчаган оттуу шакектин сүрөтү дүйнөнү кыдырып чыккан. Анын горизонту Плутондун орбитасынан чоң.',
    },
  },
  {
    id: 'ton618',
    massSun: 4e10,
    massLabel: { ru: '≈ 40–66 млрд', en: '≈ 40–66 billion', kg: '≈ 40–66 млрд' },
    distance: { ru: '≈ 10 млрд св. лет', en: '≈ 10 billion light-years', kg: '≈ 10 млрд жарык жылы' },
    name: { ru: 'TON 618', en: 'TON 618', kg: 'TON 618' },
    text: {
      ru: 'Один из самых массивных известных кандидатов: питает квазар, светящийся ярче ста триллионов Солнц. Его горизонт событий во много раз шире всей Солнечной системы до пояса Койпера.',
      en: 'One of the most massive known candidates, powering a quasar brighter than a hundred trillion Suns. Its event horizon is many times wider than the Solar System out to the Kuiper Belt.',
      kg: 'Белгилүү эң массалуу талапкерлердин бири: жүз триллион Күндөн жарык жаркыраган квазарды азыктандырат. Анын окуялар горизонту Койпер алкагына чейинки бүт Күн системасынан көп эсе кенен.',
    },
  },
  {
    id: 'cygx1',
    massSun: 21,
    massLabel: { ru: '≈ 21', en: '≈ 21', kg: '≈ 21' },
    distance: { ru: '≈ 7 200 св. лет', en: '≈ 7,200 light-years', kg: '≈ 7 200 жарык жылы' },
    name: { ru: 'Лебедь X-1', en: 'Cygnus X-1', kg: 'Аккуу X-1' },
    text: {
      ru: 'Первый объект, который астрономы признали чёрной дырой. Стивен Хокинг в 1974 году даже поспорил, что это не чёрная дыра, — и в 1990 году признал проигрыш.',
      en: 'The first object astronomers accepted as a black hole. In 1974 Stephen Hawking bet that it wasn’t one — and conceded the bet in 1990.',
      kg: 'Астрономдор кара көңдөй деп тааныган биринчи объект. Стивен Хокинг 1974-жылы бул кара көңдөй эмес деп талашка түшкөн — 1990-жылы утулганын мойнуна алган.',
    },
  },
  {
    id: 'gaiabh3',
    massSun: 33,
    massLabel: { ru: '≈ 33', en: '≈ 33', kg: '≈ 33' },
    distance: { ru: '≈ 1 900 св. лет', en: '≈ 1,900 light-years', kg: '≈ 1 900 жарык жылы' },
    name: { ru: 'Gaia BH3', en: 'Gaia BH3', kg: 'Gaia BH3' },
    text: {
      ru: 'Самая массивная из известных «звёздных» чёрных дыр нашей Галактики. Её открыли в 2024 году по покачиванию звезды-компаньона в данных космического телескопа ESA Gaia.',
      en: 'The most massive known stellar black hole in our Galaxy, discovered in 2024 from the wobble of its companion star in data from ESA’s Gaia mission.',
      kg: 'Биздин Галактикадагы белгилүү эң массалуу «жылдыздык» кара көңдөй. Ал 2024-жылы ESAнын Gaia миссиясынын маалыматтарында жолдош жылдыздын термелүүсү боюнча ачылган.',
    },
  },
  {
    id: 'gw150914',
    massSun: 62,
    massLabel: { ru: '36 + 29 → 62', en: '36 + 29 → 62', kg: '36 + 29 → 62' },
    distance: { ru: '≈ 1,3 млрд св. лет', en: '≈ 1.3 billion light-years', kg: '≈ 1,3 млрд жарык жылы' },
    name: { ru: 'GW150914', en: 'GW150914', kg: 'GW150914' },
    text: {
      ru: 'Слияние двух чёрных дыр, «услышанное» 14 сентября 2015 года. За доли секунды масса трёх Солнц превратилась в энергию гравитационных волн. Нобелевская премия — 2017.',
      en: 'A merger of two black holes “heard” on 14 September 2015. In a fraction of a second three Suns’ worth of mass became gravitational-wave energy. Nobel Prize, 2017.',
      kg: '2015-жылдын 14-сентябрында «угулган» эки кара көңдөйдүн кошулушу. Секунданын үлүшүндө үч Күндүн массасы тартылуу толкундарынын энергиясына айланган. Нобель сыйлыгы — 2017.',
    },
  },
];

const M_SUN = 1.989e30;
export const calcPresets = [
  { id: 'human', massKg: 70, name: { ru: 'Человек (70 кг)', en: 'A human (70 kg)', kg: 'Адам (70 кг)' } },
  { id: 'earth', massKg: 5.972e24, name: { ru: 'Земля', en: 'Earth', kg: 'Жер' } },
  { id: 'jupiter', massKg: 1.898e27, name: { ru: 'Юпитер', en: 'Jupiter', kg: 'Юпитер' } },
  { id: 'sun', massKg: M_SUN, name: { ru: 'Солнце', en: 'The Sun', kg: 'Күн' } },
  { id: 'sgra', massKg: 4.3e6 * M_SUN, name: { ru: 'Стрелец A*', en: 'Sagittarius A*', kg: 'Стрелец A*' } },
  { id: 'm87', massKg: 6.5e9 * M_SUN, name: { ru: 'M87*', en: 'M87*', kg: 'M87*' } },
];
export { M_SUN };

export const bhFacts = {
  ru: [
    'Вблизи горизонта время течёт медленнее: часы у края дыры отставали бы от земных.',
    'Приливные силы растянули бы падающее тело в «спагетти» — физики так и называют это: спагеттификация.',
    'Стивен Хокинг показал, что чёрные дыры слабо излучают и очень медленно испаряются.',
    'Чёрная дыра массой Солнца испарялась бы около 10⁶⁷ лет — в миллиарды миллиардов раз дольше возраста Вселенной.',
  ],
  en: [
    'Near the horizon time runs slower: a clock at the edge would fall behind clocks on Earth.',
    'Tidal forces would stretch an infalling body like spaghetti — physicists really call it spaghettification.',
    'Stephen Hawking showed that black holes faintly glow and very slowly evaporate.',
    'A solar-mass black hole would take about 10⁶⁷ years to evaporate — vastly longer than the age of the Universe.',
  ],
  kg: [
    'Горизонттун жанында убакыт жайыраак агат: көңдөйдүн четиндеги саат Жердеги сааттардан артта калмак.',
    'Агым күчтөрү кулап бараткан телону «спагеттидей» созмок — физиктер муну спагеттификация деп аташат.',
    'Стивен Хокинг кара көңдөйлөр алсыз нурданып, өтө жай буулана турганын көрсөткөн.',
    'Күн массасындагы кара көңдөй болжол менен 10⁶⁷ жылда бууланмак — бул Ааламдын жашынан эбегейсиз узак.',
  ],
};
