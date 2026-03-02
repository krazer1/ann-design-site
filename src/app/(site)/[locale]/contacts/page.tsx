import { ContactForm } from "@/components/ContactForm/ContactForm";
import { Faq } from "@/components/Faq/Faq";
import { SITE, links } from "@/config/site";

// icons (outline, как в макете)
import { FiPhone, FiMail, FiMapPin, FiInstagram } from "react-icons/fi";

export default async function ContactsPage({
  params,
}: {
  params: Promise<{ locale: "ru" | "en" }>;
}) {
  const { locale } = await params;
  const ru = locale === "ru";

  const faq = ru
    ? [
        {
          q: "Сколько стоят ваши услуги?",
          a: "Стоимость зависит от сложности и площади проекта. Средняя стоимость дизайн-проекта от 3000 руб/м². Точную цену могу назвать после первой встречи и осмотра объекта.",
        },
        {
          q: "Как долго длится проект?",
          a: "Создание дизайн-проекта занимает от 1 до 3 месяцев в зависимости от площади. Реализация проекта — от 3 до 6 месяцев.",
        },
        {
          q: "Работаете ли вы с подрядчиками?",
          a: "Да, у меня есть проверенная команда подрядчиков. Могу организовать полный цикл работ или работать с вашими мастерами.",
        },
        {
          q: "Предоставляете ли вы онлайн-консультации?",
          a: "Да, провожу онлайн-консультации для клиентов из других городов. Формат и стоимость обсуждаются индивидуально.",
        },
      ]
    : [
        {
          q: "How much do your services cost?",
          a: "The price depends on project complexity and area. Typical interior design project starts from 3000 RUB/m².",
        },
        {
          q: "How long does a project take?",
          a: "Design stage usually takes 1–3 months depending on area. Implementation may take 3–6 months.",
        },
        {
          q: "Do you work with contractors?",
          a: "Yes. I have a trusted team. I can manage the full cycle or work with your contractors.",
        },
        {
          q: "Do you offer online consultations?",
          a: "Yes, for clients from other cities.",
        },
      ];

  return (
    <div>
      {/* HERO */}
      <section className="border-b border-zinc-200">
        <div className="mx-auto max-w-6xl px-4 py-20 md:py-28">
          <div className="text-xs uppercase tracking-[0.35em] text-zinc-500">
            {ru ? "Контакты" : "Contacts"}
          </div>

          <h1 className="mt-6 text-5xl font-medium leading-[0.95] md:text-7xl">
            {ru ? (
              <>
                Давайте обсудим ваш
                <br />
                проект
              </>
            ) : (
              <>
                Let’s discuss your
                <br />
                project
              </>
            )}
          </h1>

          <p className="mt-10 max-w-2xl text-base leading-relaxed text-zinc-600 md:text-lg">
            {ru
              ? "Заполните форму ниже или свяжитесь со мной любым удобным способом. Первая консультация бесплатна."
              : "Fill out the form below or contact me in any convenient way. The first consultation is free."}
          </p>
        </div>
      </section>

      {/* INFO + FORM */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-12 md:grid-cols-2">
          {/* LEFT */}
          <div>
            <h2 className="text-2xl font-medium md:text-3xl">
              {ru ? "Контактная информация" : "Contact information"}
            </h2>

            <div className="mt-10 space-y-6">
              <InfoRow
                title={ru ? "Телефон" : "Phone"}
                value={SITE.phoneDisplay}
                href={links.tel}
                icon={<FiPhone className="h-5 w-5" />}
              />

              <InfoRow
                title="Email"
                value={SITE.email}
                href={links.mail}
                icon={<FiMail className="h-5 w-5" />}
              />

              <InfoRow
                title={ru ? "Адрес" : "Address"}
                value={ru ? SITE.cityRu : SITE.cityEn}
                icon={<FiMapPin className="h-5 w-5" />}
              />

              <InfoRow
                title="Instagram"
                value={SITE.instagramHandle}
                href={links.instagram}
                icon={<FiInstagram className="h-5 w-5" />}
              />
            </div>

            {/* WORKING HOURS */}
            <div className="mt-14 border-t border-zinc-200 pt-10">
              <h3 className="text-xl font-medium md:text-2xl">
                {ru ? "График работы" : "Working hours"}
              </h3>

              <div className="mt-6 space-y-2 text-sm text-zinc-600">
                <div>{ru ? "Пн–Пт: 10:00 – 19:00" : "Mon–Fri: 10:00 – 19:00"}</div>
                <div>{ru ? "Сб: 11:00 – 16:00" : "Sat: 11:00 – 16:00"}</div>
                <div>{ru ? "Вс: Выходной" : "Sun: Closed"}</div>
              </div>
            </div>
          </div>

          {/* FORM */}
          <div>
            <ContactForm locale={locale} />
            <div className="mt-6 text-xs text-zinc-500">
              {ru
                ? "Нажимая «Отправить», вы соглашаетесь с обработкой персональных данных."
                : "By clicking “Send”, you agree to the processing of personal data."}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <Faq
        title={ru ? "Частые вопросы" : "Frequently asked questions"}
        items={faq}
      />
    </div>
  );
}

function InfoRow({
  title,
  value,
  href,
  icon,
}: {
  title: string;
  value: string;
  href?: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-5">
      <div className="flex h-12 w-12 items-center justify-center border border-zinc-200 text-zinc-800">
        {icon}
      </div>

      <div>
        <div className="text-sm text-zinc-500">{title}</div>

        {href ? (
          <a
            className="mt-1 inline-block text-base text-zinc-900 hover:opacity-70"
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noreferrer" : undefined}
          >
            {value}
          </a>
        ) : (
          <div className="mt-1 text-base text-zinc-900">{value}</div>
        )}
      </div>
    </div>
  );
}