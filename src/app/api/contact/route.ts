import { NextResponse } from "next/server";

type Locale = "ru" | "en";
type ProjectType = "apartment" | "house" | "commercial" | "consultation";

type Payload = {
  name?: string;
  phone?: string;
  email?: string;
  message?: string;
  projectType?: ProjectType;
  locale?: Locale;
};

function esc(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function normalizeLocale(v: unknown): Locale {
  return v === "en" ? "en" : "ru";
}

function normalizePhone(raw: string) {
  // Оставляем только цифры и плюс
  let s = raw.trim();
  s = s.replace(/[^\d+]/g, "");
  // Если начинается с 8 и это РФ, можно привести к +7 (опционально)
  if (s.startsWith("8") && s.length === 11) s = "+7" + s.slice(1);
  if (s.startsWith("7") && s.length === 11) s = "+7" + s.slice(1);
  return s;
}

function isValidName(name: string) {
  const n = name.trim();
  if (n.length < 2 || n.length > 60) return false;
  // Рус/лат + пробел/дефис
  return /^[A-Za-zА-Яа-яЁё][A-Za-zА-Яа-яЁё\s-]*$/.test(n);
}

function isValidEmail(email: string) {
  const e = email.trim();
  if (!e) return true; // email необязателен, если есть телефон
  // Достаточно надёжная проверка без оверкилла
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e);
}

function isValidPhone(phone: string) {
  const p = normalizePhone(phone);
  if (!p) return true; // телефон необязателен, если есть email
  // + и 10–15 цифр
  return /^\+?\d{10,15}$/.test(p);
}

function isValidProjectType(v: unknown): v is ProjectType {
  return v === "apartment" || v === "house" || v === "commercial" || v === "consultation";
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Payload;

    const locale = normalizeLocale(body.locale);
    const name = (body.name ?? "").trim();
    const phoneRaw = (body.phone ?? "").trim();
    const phone = normalizePhone(phoneRaw);
    const email = (body.email ?? "").trim();
    const message = (body.message ?? "").trim();
    const projectType: ProjectType = isValidProjectType(body.projectType) ? body.projectType : "consultation";

    // Требуем хотя бы один контакт
    if (!email && !phone) {
      return NextResponse.json(
        { ok: false, error: locale === "ru" ? "Укажите телефон или email" : "Provide phone or email" },
        { status: 400 }
      );
    }

    if (name && !isValidName(name)) {
      return NextResponse.json(
        { ok: false, error: locale === "ru" ? "Некорректное имя" : "Invalid name" },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { ok: false, error: locale === "ru" ? "Некорректный email" : "Invalid email" },
        { status: 400 }
      );
    }

    if (!isValidPhone(phoneRaw)) {
      return NextResponse.json(
        { ok: false, error: locale === "ru" ? "Некорректный телефон" : "Invalid phone" },
        { status: 400 }
      );
    }

    if (message.length < 10) {
      return NextResponse.json(
        { ok: false, error: locale === "ru" ? "Сообщение слишком короткое" : "Message is too short" },
        { status: 400 }
      );
    }

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
      return NextResponse.json({ ok: false, error: "Telegram env is not configured" }, { status: 500 });
    }

    const typeLabel =
      locale === "ru"
        ? { apartment: "Квартира", house: "Дом", commercial: "Коммерция", consultation: "Консультация" }[projectType]
        : { apartment: "Apartment", house: "House", commercial: "Commercial", consultation: "Consultation" }[projectType];

    const text =
      `<b>Новая заявка с сайта</b>\n\n` +
      `🌐 Язык: <b>${locale.toUpperCase()}</b>\n` +
      `🏷 Тип: <b>${esc(typeLabel)}</b>\n` +
      `👤 Имя: <b>${esc(name || "-")}</b>\n` +
      `📞 Телефон: <b>${esc(phone || "-")}</b>\n` +
      `✉️ Email: <b>${esc(email || "-")}</b>\n\n` +
      `📝 Сообщение:\n${esc(message)}\n\n` +
      `⏱ ${new Date().toLocaleString("ru-RU")}`;

    const tgRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
    });

    const tgText = await tgRes.text().catch(() => "");
    if (!tgRes.ok) {
      return NextResponse.json({ ok: false, error: `Telegram send failed: ${tgText}` }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }
}