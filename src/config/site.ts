export const SITE = {
  brand: "ANNA BAVYKINA",

  taglineRu:
    "Премиальный дизайн интерьера в Санкт-Петербурге. Создаём пространства, отражающие вашу индивидуальность.",
  taglineEn:
    "Premium interior design in Saint Petersburg. Creating spaces that reflect your individuality.",

  cityRu: "Санкт-Петербург, Россия",
  cityEn: "Saint Petersburg, Russia",

  phoneDisplay: "+7 (923) 614-48-64",
  phoneE164: "+79236144864",

  email: "fedortsova.ann@gmail.com",

  instagramHandle: "@anny_fedortsova",
  instagramUrl: "https://instagram.com/anny_fedortsova",

  telegramHandle: "@anny_bavykina",
  telegramUrl: "https://t.me/anny_bavykina",

  pinterestUrl: "#", // потом можно добавить
} as const;

export const links = {
  tel: `tel:${SITE.phoneE164}`,
  mail: `mailto:${SITE.email}`,
  instagram: SITE.instagramUrl,
  telegram: SITE.telegramUrl,
  pinterest: SITE.pinterestUrl,
} as const;