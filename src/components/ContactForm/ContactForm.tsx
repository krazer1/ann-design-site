"use client";

import { Toast } from "@/components/Toast/Toast";
import { useMemo, useState } from "react";

type Locale = "ru" | "en";
type ProjectType = "apartment" | "house" | "commercial" | "consultation";

type Errors = Partial<
  Record<"name" | "phone" | "email" | "message" | "projectType", string>
>;

function normalizePhone(raw: string) {
  let s = raw.trim();
  s = s.replace(/[^\d+]/g, "");
  if (s.startsWith("8") && s.length === 11) s = "+7" + s.slice(1);
  if (s.startsWith("7") && s.length === 11) s = "+7" + s.slice(1);
  return s;
}

function isValidName(name: string) {
  const n = name.trim();
  if (!n) return true; // имя необязательное (если хочешь обязательное — скажи)
  if (n.length < 2 || n.length > 60) return false;
  return /^[A-Za-zА-Яа-яЁё][A-Za-zА-Яа-яЁё\s-]*$/.test(n);
}

function isValidEmail(email: string) {
  const e = email.trim();
  if (!e) return true; // может быть пустым, если есть телефон
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e);
}

function isValidPhone(phone: string) {
  const p = normalizePhone(phone);
  if (!p) return true; // может быть пустым, если есть email
  return /^\+?\d{10,15}$/.test(p);
}

export function ContactForm({ locale }: { locale: Locale }) {
  const ru = locale === "ru";

  const [errors, setErrors] = useState<Errors>({});
  const [isLoading, setIsLoading] = useState(false);

  const [projectType, setProjectType] =
    useState<ProjectType>("consultation");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [toast, setToast] = useState<null | {
    type: "success" | "error";
    message: string;
  }>(null);

  const options = useMemo(
    () => [
      {
        value: "consultation" as const,
        label: ru ? "Консультация" : "Consultation",
      },
      { value: "apartment" as const, label: ru ? "Квартира" : "Apartment" },
      { value: "house" as const, label: ru ? "Дом" : "House" },
      {
        value: "commercial" as const,
        label: ru ? "Коммерческий интерьер" : "Commercial",
      },
    ],
    [ru]
  );

  function validateAll(next?: Partial<{ name: string; phone: string; email: string; message: string }>): Errors {
    const nName = (next?.name ?? name).trim();
    const nPhone = (next?.phone ?? phone).trim();
    const nEmail = (next?.email ?? email).trim();
    const nMessage = (next?.message ?? message).trim();

    const e: Errors = {};

    // Нужно хотя бы одно: телефон или email
    if (!nEmail && !nPhone) {
      e.phone = ru ? "Укажите телефон или email" : "Provide phone or email";
      e.email = ru ? "Укажите email или телефон" : "Provide email or phone";
    }

    if (!isValidName(nName)) e.name = ru ? "Введите корректное имя" : "Enter a valid name";
    if (!isValidPhone(nPhone)) e.phone = ru ? "Введите корректный телефон" : "Enter a valid phone";
    if (!isValidEmail(nEmail)) e.email = ru ? "Введите корректный email" : "Enter a valid email";

    if (nMessage.length < 10) {
      e.message = ru
        ? "Сообщение должно быть не короче 10 символов"
        : "Message must be at least 10 characters";
    }

    return e;
  }

  const canSubmit = useMemo(() => {
    const e = validateAll();
    return !isLoading && Object.keys(e).length === 0;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, phone, email, message, projectType, isLoading, ru]);

  function showToast(type: "success" | "error", message: string, ms: number) {
    setToast({ type, message });
    window.setTimeout(() => setToast(null), ms);
  }

  return (
    <>
      <Toast
        open={toast !== null}
        type={toast?.type ?? "success"}
        message={toast?.message ?? ""}
        onClose={() => setToast(null)}
      />

      <form
        className="mt-6 grid gap-4"
        onSubmit={async (ev) => {
          ev.preventDefault();
          setToast(null);

          const e = validateAll();
          setErrors(e);
          if (Object.keys(e).length > 0) {
            showToast(
              "error",
              ru ? "Проверьте поля формы — есть ошибки." : "Please check the form fields — there are errors.",
              4500
            );
            return;
          }

          setIsLoading(true);

          try {
            const res = await fetch("/api/contact", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                locale,
                projectType,
                name,
                phone,
                email,
                message,
              }),
            });

            if (res.ok) {
              setName("");
              setPhone("");
              setEmail("");
              setMessage("");
              setProjectType("consultation");
              setErrors({});

              showToast(
                "success",
                ru
                  ? "Спасибо! Заявка отправлена. Мы свяжемся с вами в ближайшее время."
                  : "Thank you! Your request has been sent. We’ll get back to you shortly.",
                5000
              );
            } else {
              const j = await res.json().catch(() => null);
              showToast(
                "error",
                (j?.error as string) ||
                  (ru
                    ? "Не удалось отправить. Попробуйте ещё раз."
                    : "Could not send. Please try again."),
                6000
              );
            }
          } catch {
            showToast(
              "error",
              ru
                ? "Ошибка сети. Проверьте соединение и попробуйте снова."
                : "Network error. Please check your connection and try again.",
              6000
            );
          } finally {
            setIsLoading(false);
          }
        }}
      >
        {/* Тип проекта */}
        <Field label={ru ? "Тип проекта" : "Project type"} error={errors.projectType}>
          <select
            value={projectType}
            onChange={(e) => setProjectType(e.target.value as ProjectType)}
            disabled={isLoading}
            className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-zinc-900"
          >
            {options.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </Field>

        {/* Имя */}
        <Field label={ru ? "Имя" : "Name"} error={errors.name}>
          <input
            value={name}
            onChange={(e) => {
              const v = e.target.value;
              setName(v);
              setErrors(validateAll({ name: v }));
            }}
            onBlur={() => setErrors(validateAll())}
            disabled={isLoading}
            className="w-full rounded-2xl border border-zinc-200 px-4 py-3 text-sm outline-none transition focus:border-zinc-900"
            placeholder={ru ? "Анна" : "Anna"}
            autoComplete="name"
          />
        </Field>

        {/* Телефон */}
        <Field label={ru ? "Телефон" : "Phone"} error={errors.phone}>
          <input
            value={phone}
            onChange={(e) => {
              const v = e.target.value;
              setPhone(v);
              setErrors(validateAll({ phone: v }));
            }}
            onBlur={() => setErrors(validateAll())}
            disabled={isLoading}
            className="w-full rounded-2xl border border-zinc-200 px-4 py-3 text-sm outline-none transition focus:border-zinc-900"
            placeholder={ru ? "+7 (___) ___-__-__" : "+7 / +1 / ..."}
            inputMode="tel"
            autoComplete="tel"
          />
        </Field>

        {/* Email */}
        <Field label="Email" error={errors.email}>
          <input
            value={email}
            onChange={(e) => {
              const v = e.target.value;
              setEmail(v);
              setErrors(validateAll({ email: v }));
            }}
            onBlur={() => setErrors(validateAll())}
            disabled={isLoading}
            type="email"
            className="w-full rounded-2xl border border-zinc-200 px-4 py-3 text-sm outline-none transition focus:border-zinc-900"
            placeholder="name@email.com"
            autoComplete="email"
          />
        </Field>

        {/* Сообщение */}
        <Field label={ru ? "Сообщение" : "Message"} error={errors.message}>
          <textarea
            value={message}
            onChange={(e) => {
              const v = e.target.value;
              setMessage(v);
              setErrors(validateAll({ message: v }));
            }}
            onBlur={() => setErrors(validateAll())}
            disabled={isLoading}
            rows={5}
            className="w-full resize-none rounded-2xl border border-zinc-200 px-4 py-3 text-sm outline-none transition focus:border-zinc-900"
            placeholder={
              ru
                ? "Коротко опишите задачу: объект, метраж, сроки, стиль…"
                : "Briefly describe: object type, size, timeline, style…"
            }
            required
          />
        </Field>

        <button
          type="submit"
          disabled={!canSubmit}
          className="mt-2 inline-flex items-center justify-center rounded-full bg-zinc-900 px-6 py-3 text-sm text-white transition hover:opacity-90 disabled:opacity-50"
        >
          {isLoading ? (ru ? "Отправка..." : "Sending...") : ru ? "Отправить" : "Send"}
        </button>
      </form>
    </>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-2">
      <div className="flex items-baseline justify-between gap-4">
        <label className="text-sm text-zinc-600">{label}</label>
        {error && <span className="text-xs text-rose-700">{error}</span>}
      </div>
      {children}
    </div>
  );
}