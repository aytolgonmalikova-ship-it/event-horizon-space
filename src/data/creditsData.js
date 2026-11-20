// Summary of the licence audit (reviewed 18 Nov 2026) — shown on /credits.

export const licenceAudit = [
  {
    id: 'nasa',
    name: 'NASA',
    href: 'https://www.nasa.gov/nasa-brand-center/images-and-media/',
    page: 'NASA Images and Media Usage Guidelines',
    allowed: {
      ru: ['Использовать снимки и видео NASA в образовательных и информационных целях без отдельного разрешения', 'Использовать на веб-сайтах, в том числе личных и учебных'],
      en: ['Use NASA images and video for educational and informational purposes without separate permission', 'Use them on websites, including personal and educational ones'],
      kg: ['NASAнын сүрөттөрүн жана видеолорун билим берүү жана маалымат максатында өзүнчө уруксатсыз колдонуу', 'Аларды веб-сайттарда, анын ичинде жеке жана окуу сайттарында колдонуу'],
    },
    forbidden: {
      ru: ['Создавать впечатление, что NASA одобряет проект, товар или услугу', 'Использовать эмблему NASA («meatball»), логотип («worm») и другие знаки без разрешения', 'Использовать материалы третьих лиц, отмеченные копирайтом, без согласия правообладателя', 'Использовать имена и облик сотрудников NASA в рекламных целях'],
      en: ['Imply that NASA endorses the project, a product or a service', 'Use the NASA insignia (“meatball”), logotype (“worm”) or other identifiers without permission', 'Use third-party copyrighted material without the owner’s consent', 'Use the names or likenesses of NASA employees for promotion'],
      kg: ['NASA долбоорду, товарды же кызматты жактырат деген таасир калтыруу', 'NASAнын эмблемасын («meatball»), логотибин («worm») жана башка белгилерин уруксатсыз колдонуу', 'Үчүнчү тараптардын автордук укук менен корголгон материалдарын ээсинин макулдугусуз колдонуу', 'NASA кызматкерлеринин ысымдарын жана элесин жарнамада колдонуу'],
    },
    how: {
      ru: 'Под каждым снимком NASA указан источник со ссылкой на NASA Image and Video Library; логотипы NASA не используются; в подвале — оговорка об отсутствии связи с агентством. Видео NASA транслируются из NASA Image and Video Library с подписью «Видео: NASA…» прямо под плеером; ролики со сторонними материалами исключены.',
      en: 'Every NASA image names NASA as the source with a link to the NASA Image and Video Library; no NASA logos are used; the footer states we are not affiliated with the agency. NASA videos stream from the NASA Image and Video Library with a “Video: NASA…” credit right under the player; clips with third-party material are excluded.',
      kg: 'NASAнын ар бир сүрөтүнүн астында NASA Image and Video Library шилтемеси менен булак көрсөтүлгөн; NASA логотиптери колдонулбайт; сайттын төмөнкү бөлүгүндө агенттик менен байланыш жок экени жазылган. NASA видеолору NASA Image and Video Library аркылуу көрсөтүлүп, плеердин түз астында «Видео: NASA…» деп белгиленет; үчүнчү тараптын материалдары бар видеолор алынып салынган.',
    },
  },
  {
    id: 'webb',
    name: 'ESA/Webb',
    href: 'https://esawebb.org/copyright/',
    page: 'ESA/Webb — Usage of Images, Videos and Web Texts',
    allowed: {
      ru: ['Свободно использовать снимки и видео по лицензии Creative Commons Attribution 4.0 (CC BY 4.0)', 'Изменять размер и кадрировать изображения'],
      en: ['Freely reuse images and video under Creative Commons Attribution 4.0 (CC BY 4.0)', 'Resize and crop images'],
      kg: ['Сүрөттөрдү жана видеолорду Creative Commons Attribution 4.0 (CC BY 4.0) лицензиясы боюнча эркин колдонуу', 'Сүрөттөрдүн өлчөмүн өзгөртүү жана кесүү'],
    },
    forbidden: {
      ru: ['Сокращать, изменять или прятать строку авторства и отделять её от снимка', 'Использовать логотип ESA/Webb без письменного согласия', 'Подразумевать одобрение со стороны ESA/Webb', 'Брать музыку, научные статьи и код с сайта под этой лицензией'],
      en: ['Shorten, alter or hide the credit line, or separate it from the image', 'Use the ESA/Webb logo without written consent', 'Imply endorsement by ESA/Webb', 'Take music, scientific papers or code from the site under this licence'],
      kg: ['Авторлук сабын кыскартуу, өзгөртүү же жашыруу жана аны сүрөттөн бөлүү', 'ESA/Webb логотибин жазуу жүзүндөгү макулдуксуз колдонуу', 'ESA/Webb тарабынан жактырылган деген таасир калтыруу', 'Бул лицензия боюнча сайттан музыка, илимий макалаларды жана кодду алуу'],
    },
    how: {
      ru: 'Рядом с каждым снимком — полная неизменённая строка авторства с активной ссылкой на страницу изображения и на текст лицензии CC BY 4.0.',
      en: 'Next to each image is the full, unaltered credit line with an active link to the image page and to the CC BY 4.0 licence.',
      kg: 'Ар бир сүрөттүн жанында — сүрөттүн барагына жана CC BY 4.0 лицензиясына активдүү шилтемеси бар толук, өзгөртүлбөгөн авторлук сабы.',
    },
  },
  {
    id: 'hubble',
    name: 'ESA/Hubble',
    href: 'https://esahubble.org/copyright/',
    page: 'ESA/Hubble — Usage of Images, Videos and Web Texts',
    allowed: {
      ru: ['Использовать снимки, видео и веб-тексты по лицензии CC BY 4.0 без оплаты', 'Не нужно отдельно связываться с людьми, указанными в авторстве'],
      en: ['Reuse images, video and web texts under CC BY 4.0 free of charge', 'No need to contact the people named in the credit separately'],
      kg: ['Сүрөттөрдү, видеолорду жана веб-тексттерди CC BY 4.0 лицензиясы боюнча акысыз колдонуу', 'Авторлукта көрсөтүлгөн адамдар менен өзүнчө байланышуунун кереги жок'],
    },
    forbidden: {
      ru: ['Изменять или удалять имена в строке авторства', 'Заменять подпись логотипом ESA/Hubble или использовать логотип без согласия', 'Подразумевать одобрение со стороны ESA/Hubble'],
      en: ['Alter or remove names in the credit line', 'Replace the credit with the ESA/Hubble logo or use the logo without consent', 'Imply endorsement by ESA/Hubble'],
      kg: ['Авторлук сабындагы ысымдарды өзгөртүү же өчүрүү', 'Кол тамганы ESA/Hubble логотиби менен алмаштыруу же логотипти макулдуксуз колдонуу', 'ESA/Hubble тарабынан жактырылган деген таасир калтыруу'],
    },
    how: {
      ru: 'Строки авторства скопированы дословно со страниц изображений esahubble.org и показаны прямо под снимками со ссылками. То же для видео: полная строка авторства со страницы ролика выводится сразу под плеером; клипы со сторонней музыкой не используются.',
      en: 'Credit lines are copied verbatim from each esahubble.org image page and shown directly under the images, with links. The same goes for video: the full credit from each video page is shown right under the player; clips with third-party music are not used.',
      kg: 'Авторлук саптары esahubble.org сайтындагы сүрөттөрдүн барактарынан сөзмө-сөз көчүрүлүп, сүрөттөрдүн түз астында шилтемелери менен көрсөтүлгөн. Видеолор үчүн да ошондой: видео барагындагы толук авторлук сабы плеердин түз астында көрсөтүлөт; үчүнчү тараптын музыкасы бар клиптер колдонулбайт.',
    },
  },
  {
    id: 'apod',
    name: 'NASA APOD',
    href: 'https://apod.nasa.gov/apod/lib/about_apod.html',
    page: 'Astronomy Picture of the Day — via api.nasa.gov',
    allowed: {
      ru: ['Получать «фото дня» через официальный публичный API NASA', 'Показывать его со ссылкой на оригинальную страницу APOD'],
      en: ['Fetch the picture of the day through NASA’s official public API', 'Display it with a link to the original APOD page'],
      kg: ['«Күндүн сүрөтүн» NASAнын расмий ачык API аркылуу алуу', 'Аны APODдун түп барагына шилтеме менен көрсөтүү'],
    },
    forbidden: {
      ru: ['Скачивать и распространять снимки APOD с пометкой © автора вне сервиса без разрешения правообладателя'],
      en: ['Download and redistribute APOD images marked © by their author outside the service without the owner’s permission'],
      kg: ['Автордун © белгиси бар APOD сүрөттөрүн кызматтан тышкары укук ээсинин уруксатысыз жүктөп алуу жана таратуу'],
    },
    how: {
      ru: 'Снимок не копируется на наш сервер — он загружается напрямую из NASA; поле copyright из API всегда показывается рядом, а также ссылка на страницу APOD.',
      en: 'The image is never copied to our server — it loads directly from NASA; the API’s copyright field is always shown next to it, plus a link to the APOD page.',
      kg: 'Сүрөт биздин серверге көчүрүлбөйт — ал түз NASAдан жүктөлөт; API берген copyright талаасы ар дайым жанында көрсөтүлөт, ошондой эле APOD барагына шилтеме берилет.',
    },
  },
];
