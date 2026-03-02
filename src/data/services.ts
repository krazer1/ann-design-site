export type Service = {
  id: string;
  title_ru: string;
  title_en: string;
  desc_ru: string;
  desc_en: string;
  includes_ru: string[];
  includes_en: string[];
  price_ru: string;
  price_en: string;
  timeline_ru: string;
  timeline_en: string;
};

export const services: Service[] = [
  {
    id: "interior",
    title_ru: "Дизайн интерьера",
    title_en: "Interior design",
    desc_ru:
      "Полный цикл разработки дизайн-проекта: от концепции до рабочей документации. Подходит для квартир, домов и коммерческих пространств.",
    desc_en:
      "Full-cycle interior design: from concept to working documentation. Suitable for apartments, houses and commercial spaces.",
    includes_ru: [
      "Планировочное решение (2–3 варианта)",
      "Концепция и стилистика",
      "3D визуализации ключевых зон",
      "Рабочие чертежи и ведомости",
      "Подбор материалов и мебели",
    ],
    includes_en: [
      "Layout options (2–3 variants)",
      "Concept & style direction",
      "3D visuals of key areas",
      "Working drawings & schedules",
      "Materials & furniture selection",
    ],
    price_ru: "от 3 000 ₽/м²",
    price_en: "from 3,000 ₽/m²",
    timeline_ru: "4–10 недель",
    timeline_en: "4–10 weeks",
  },
  {
    id: "architecture",
    title_ru: "Архитектурный проект",
    title_en: "Architectural design",
    desc_ru:
      "Архитектурные решения для частных домов: планировка, фасады, материалы, логика пространства и конструктивные рекомендации.",
    desc_en:
      "Architectural solutions for private houses: layout, facades, materials, spatial logic and structural recommendations.",
    includes_ru: [
      "Планировочные решения",
      "Фасады и материалы",
      "Объёмно-пространственная концепция",
      "Рекомендации по конструктиву",
      "Сопровождение согласований (при необходимости)",
    ],
    includes_en: [
      "Layout solutions",
      "Facades & materials",
      "Spatial concept",
      "Structural recommendations",
      "Approval support (if needed)",
    ],
    price_ru: "индивидуально",
    price_en: "custom",
    timeline_ru: "6–12 недель",
    timeline_en: "6–12 weeks",
  },
  {
    id: "visual",
    title_ru: "3D визуализация",
    title_en: "3D visualization",
    desc_ru:
      "Фотореалистичные визуализации для согласования дизайна и презентации. Можно заказать отдельно.",
    desc_en:
      "Photorealistic visuals for approvals and presentation. Available as a standalone service.",
    includes_ru: [
      "2–3 ракурса на помещение",
      "Корректировки по согласованию",
      "Подбор материалов/референсов",
    ],
    includes_en: [
      "2–3 angles per room",
      "Revisions after feedback",
      "Materials/reference подбор",
    ],
    price_ru: "от 8 000 ₽/помещение",
    price_en: "from 8,000 ₽/room",
    timeline_ru: "3–7 дней",
    timeline_en: "3–7 days",
  },
  {
    id: "support",
    title_ru: "Авторский надзор",
    title_en: "Author supervision",
    desc_ru:
      "Сопровождение реализации: контроль соответствия проекту, ответы строителям, корректировки, выезды на объект.",
    desc_en:
      "Implementation supervision: project compliance control, builders’ Q&A, adjustments, site visits.",
    includes_ru: [
      "Плановые выезды на объект",
      "Коммуникация с подрядчиками",
      "Контроль соответствия проекту",
      "Оперативные правки",
    ],
    includes_en: [
      "Scheduled site visits",
      "Contractor communication",
      "Design compliance control",
      "Quick adjustments",
    ],
    price_ru: "от 25 000 ₽/мес",
    price_en: "from 25,000 ₽/month",
    timeline_ru: "на период реализации",
    timeline_en: "during implementation",
  },
];