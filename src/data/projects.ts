export type Project = {
  slug: string;
  title_ru: string;
  title_en: string;
  meta_ru: string;
  meta_en: string;
  cover: string;
  images: string[];

  about_ru?: string;
  about_en?: string;

  details_ru?: { label: string; value: string }[];
  details_en?: { label: string; value: string }[];
};

export const projects: Project[] = [
  {
    slug: "apartment-neva",
    title_ru: "Квартира на Неве",
    title_en: "Apartment on Neva",
    meta_ru: "Квартира · 86 м²",
    meta_en: "Apartment · 86 m²",
    cover: "/images/p1.jpg",
    images: ["/images/p1.jpg", "/images/p1.jpg", "/images/p1.jpg"],
    about_ru:
      "Минималистичный интерьер с тёплой палитрой и акцентом на натуральные материалы. Продумали хранение, световые сценарии и эргономику под ежедневные привычки.",
    about_en:
      "A warm minimalist interior with a focus on natural materials. We designed storage, lighting scenes and ergonomics for everyday routines.",
    details_ru: [
      { label: "Тип", value: "Квартира" },
      { label: "Площадь", value: "86 м²" },
      { label: "Город", value: "Санкт-Петербург" },
      { label: "Стиль", value: "Минимализм / тёплый современный" },
    ],
    details_en: [
      { label: "Type", value: "Apartment" },
      { label: "Area", value: "86 m²" },
      { label: "City", value: "Saint Petersburg" },
      { label: "Style", value: "Warm contemporary minimalism" },
    ],
  },

  {
    slug: "house-komarovo",
    title_ru: "Дом в Комарово",
    title_en: "House in Komarovo",
    meta_ru: "Дом · 140 м²",
    meta_en: "House · 140 m²",
    cover: "/images/p2.jpg",
    images: ["/images/p2.jpg", "/images/p2.jpg", "/images/p2.jpg"],
    about_ru:
      "Дом для отдыха и жизни: много воздуха, свет, дерево и спокойные фактуры. Упор на приватность и комфортные маршруты внутри дома.",
    about_en:
      "A home for living and resting: light, wood and calm textures. Focus on privacy and comfortable daily routes.",
    details_ru: [
      { label: "Тип", value: "Дом" },
      { label: "Площадь", value: "140 м²" },
      { label: "Локация", value: "Комарово" },
      { label: "Стиль", value: "Современный" },
    ],
    details_en: [
      { label: "Type", value: "House" },
      { label: "Area", value: "140 m²" },
      { label: "Location", value: "Komarovo" },
      { label: "Style", value: "Contemporary" },
    ],
  },

  {
    slug: "commercial-coffee",
    title_ru: "Кофейня в центре",
    title_en: "Coffee shop in the center",
    meta_ru: "Коммерция · 62 м²",
    meta_en: "Commercial · 62 m²",
    cover: "/images/p3.jpg",
    images: ["/images/p3.jpg", "/images/p3.jpg", "/images/p3.jpg"],
    about_ru:
      "Компактное коммерческое пространство: посадка, витрина и навигация. Сделали тёплую атмосферу, удобные очереди и фотогеничные зоны.",
    about_en:
      "Compact commercial space: seating, display and navigation. Warm atmosphere, comfortable queue flow and photogenic spots.",
    details_ru: [
      { label: "Тип", value: "Коммерция" },
      { label: "Площадь", value: "62 м²" },
      { label: "Город", value: "Санкт-Петербург" },
      { label: "Задача", value: "Потоки + посадка + визуальная айдентика" },
    ],
    details_en: [
      { label: "Type", value: "Commercial" },
      { label: "Area", value: "62 m²" },
      { label: "City", value: "Saint Petersburg" },
      { label: "Goal", value: "Flow + seating + visual identity" },
    ],
  },

  {
    slug: "apartment-petrograd",
    title_ru: "Петроградская сторона",
    title_en: "Petrograd Side",
    meta_ru: "Квартира · 74 м²",
    meta_en: "Apartment · 74 m²",
    cover: "/images/p4.jpg",
    images: ["/images/p4.jpg", "/images/p4.jpg", "/images/p4.jpg"],
  },
  {
    slug: "apartment-loft",
    title_ru: "Лофт в новостройке",
    title_en: "Loft in a new building",
    meta_ru: "Квартира · 92 м²",
    meta_en: "Apartment · 92 m²",
    cover: "/images/p5.jpg",
    images: ["/images/p5.jpg", "/images/p5.jpg", "/images/p5.jpg"],
  },
  {
    slug: "house-repino",
    title_ru: "Дом в Репино",
    title_en: "House in Repino",
    meta_ru: "Дом · 180 м²",
    meta_en: "House · 180 m²",
    cover: "/images/p6.jpg",
    images: ["/images/p6.jpg", "/images/p6.jpg", "/images/p6.jpg"],
  },
];