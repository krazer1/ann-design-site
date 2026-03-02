export type BlogPost = {
  slug: string;
  date: string; // "2026-03-01"
  cover: string; // /public/...
  title_ru: string;
  title_en: string;
  excerpt_ru: string;
  excerpt_en: string;

  // Контент простым массивом блоков (позже можно заменить на MDX/CMS)
  content_ru: { type: "p" | "h2" | "ul"; text?: string; items?: string[] }[];
  content_en: { type: "p" | "h2" | "ul"; text?: string; items?: string[] }[];
};

export const posts: BlogPost[] = [
  {
    slug: "how-to-start-interior-project",
    date: "2026-03-01",
    cover: "/images/blog1.jpg",
    title_ru: "С чего начать дизайн-проект: чек-лист перед первой встречей",
    title_en: "How to start an interior project: checklist before the first call",
    excerpt_ru:
      "Короткий список вопросов и материалов, которые помогут быстрее сформировать задачу и получить точную смету.",
    excerpt_en:
      "A short list of questions and materials that helps define the brief faster and get a more accurate estimate.",
    content_ru: [
      { type: "p", text: "Первый созвон и бриф — это 50% успеха проекта. Чем точнее вводные, тем быстрее и спокойнее пойдёт работа." },
      { type: "h2", text: "Что подготовить заранее" },
      {
        type: "ul",
        items: [
          "План квартиры/дома (если есть) и метраж",
          "Примерный бюджет и приоритеты (что важнее: сроки, материалы, бренд)",
          "Референсы (10–15 картинок из Pinterest/Instagram)",
          "Состав семьи, сценарии жизни, привычки",
          "Сроки: когда хотите начать/закончить",
        ],
      },
      { type: "h2", text: "Как мы работаем" },
      { type: "p", text: "После брифа я формирую план этапов и предлагаю оптимальный пакет: концепция → визуализации → чертежи → сопровождение." },
    ],
    content_en: [
      { type: "p", text: "The first call and brief is 50% of the project success. The clearer the input, the smoother the process." },
      { type: "h2", text: "What to prepare" },
      {
        type: "ul",
        items: [
          "Floor plan (if available) and total area",
          "Approx. budget and priorities (time vs materials vs brands)",
          "References (10–15 images from Pinterest/Instagram)",
          "Lifestyle scenarios and habits",
          "Timeline expectations",
        ],
      },
      { type: "h2", text: "How we work" },
      { type: "p", text: "After the brief I propose a clear plan: concept → visuals → drawings → supervision." },
    ],
  },

  {
    slug: "lighting-scenarios",
    date: "2026-02-12",
    cover: "/images/blog2.jpg",
    title_ru: "Световые сценарии: почему интерьер выглядит дороже",
    title_en: "Lighting scenarios: why the interior looks more premium",
    excerpt_ru:
      "Объясняю простыми словами, как 2–3 уровня света делают пространство уютнее и визуально дороже.",
    excerpt_en:
      "Explaining how 2–3 lighting layers make a space cozier and visually more premium.",
    content_ru: [
      { type: "p", text: "Один потолочный свет — это почти всегда «плоско». Дорого выглядит интерьер, где есть слои света." },
      { type: "h2", text: "Три слоя света" },
      { type: "ul", items: ["Общий (основной)", "Акцентный (подсветки, бра, треки)", "Атмосферный (торшеры, локальные источники)"] },
      { type: "p", text: "Дальше мы собираем сценарии: вечер, гости, работа, кино. Это влияет и на электрику, и на подбор светильников." },
    ],
    content_en: [
      { type: "p", text: "A single ceiling light often makes the space feel flat. Premium interiors have layered lighting." },
      { type: "h2", text: "Three layers" },
      { type: "ul", items: ["Ambient (general)", "Accent (wall lights, tracks, backlights)", "Atmosphere (floor lamps, local sources)"] },
      { type: "p", text: "Then we build scenarios: evening, guests, work, movie time. This impacts wiring and fixture selection." },
    ],
  },

  {
    slug: "materials-and-textures",
    date: "2026-01-20",
    cover: "/images/blog3.jpg",
    title_ru: "Материалы и фактуры: как сочетать, чтобы было спокойно",
    title_en: "Materials & textures: how to combine for a calm look",
    excerpt_ru:
      "Правило 60/30/10, натуральные фактуры и контраст — как держать баланс и не перегружать интерьер.",
    excerpt_en:
      "60/30/10 rule, natural textures and contrast — how to keep balance without overloading the space.",
    content_ru: [
      { type: "p", text: "Секрет «дорогого» интерьера — в тактильности: дерево, камень, текстиль и матовые поверхности." },
      { type: "h2", text: "Быстрое правило" },
      { type: "ul", items: ["60% — базовый фон", "30% — вторичный материал/цвет", "10% — акцент"] },
      { type: "p", text: "Если сомневаетесь — делайте базу спокойной, а акценты добавляйте постепенно." },
    ],
    content_en: [
      { type: "p", text: "Premium feel comes from tactility: wood, stone, textile and matte surfaces." },
      { type: "h2", text: "Quick rule" },
      { type: "ul", items: ["60% — base", "30% — secondary", "10% — accent"] },
      { type: "p", text: "If unsure, keep the base calm and add accents gradually." },
    ],
  },
];