"use client";

import { Toast } from "@/components/Toast/Toast";
import React, { useEffect, useMemo, useRef, useState } from "react";

type Locale = "ru" | "en";
type ProjectType = "apartment" | "house" | "commercial" | "consultation";

type Errors = Partial<Record<"name" | "phone" | "email" | "message" | "projectType", string>>;

/** -------------------- LIMITS -------------------- **/

const NAME_MAX = 25;
const EMAIL_MAX = 100;
const MESSAGE_MAX = 3000;

function limitMessage(ru: boolean, max: number) {
  return ru ? `Достигнут лимит ${max}` : `Limit reached ${max}`;
}

function clampToMax(v: string, max: number) {
  return v.length <= max ? v : v.slice(0, max);
}

/** -------------------- NAME -------------------- **/

function isValidNameStrict(value: string) {
  const v = value.trim();
  if (!v) return false;

  // Только буквы RU/EN, один дефис максимум, дефис строго между буквами
  // Ок: "Anna", "Анна", "Anna-Maria", "Анна-Мария"
  // Не ок: "-Anna", "Anna-", "Anna--Maria", "An.na", "An/na", "Anna Maria"
  const re = /^[A-Za-zА-Яа-яЁё]+(?:-[A-Za-zА-Яа-яЁё]+)?$/;

  if (v.length < 2 || v.length > 60) return false;
  return re.test(v);
}

function sanitizeNameForTyping(raw: string) {
  let out = "";
  let usedHyphen = false;

  for (const ch of raw) {
    const isLetter = /[A-Za-zА-Яа-яЁё]/.test(ch);
    if (isLetter) {
      out += ch;
      continue;
    }

    if (ch === "-") {
      // дефис разрешаем 1 раз и только если слева уже есть буква
      if (!usedHyphen && out.length > 0) {
        out += "-";
        usedHyphen = true;
      }
      continue;
    }

    // остальные символы игнорируем
  }

  return out;
}

/** -------------------- EMAIL (STRICT DOMAINS + STRICT CHARS) -------------------- **/

const ALLOWED_EMAIL_DOMAINS = new Set([
  "gmail.com",
  "yandex.ru",
  "yandex.com",
  "ya.ru",
  "mail.ru",
  "bk.ru",
  "inbox.ru",
  "list.ru",
  "rambler.ru",
]);

function isValidEmailStrictAllowlist(emailRaw: string) {
  const email = emailRaw.trim().toLowerCase();
  if (!email) return true; // может быть пустым, если есть телефон

  // запрет пробелов/табов/любого whitespace
  if (/\s/.test(email)) return false;

  // запрет символов: ! # $ % & ~ = , ' и +
  if (/[!#$%&~=,']/.test(email)) return false;
  if (/\+/.test(email)) return false;

  // запрет двух точек подряд
  if (/\.\./.test(email)) return false;

  // базовый валидатор формы
  const re = /^([a-z0-9][a-z0-9._-]{0,63})@([a-z0-9-]+(?:\.[a-z0-9-]+)*)$/i;

  const m = email.match(re);
  if (!m) return false;

  const domain = m[2].toLowerCase();
  return ALLOWED_EMAIL_DOMAINS.has(domain);
}

function sanitizeEmailForTyping(raw: string) {
  // 1) убираем whitespace
  let v = raw.replace(/\s+/g, "");

  // 2) вырезаем запрещенные символы
  v = v.replace(/[!#$%&~=,']/g, "");
  v = v.replace(/\+/g, "");

  // 3) схлопываем множественные точки подряд
  while (v.includes("..")) v = v.replace(/\.\./g, ".");

  return v;
}

/** -------------------- PHONE (SMART PREFIX ON FIRST INPUT) -------------------- **/

function digitsOnly(s: string) {
  return s.replace(/\D/g, "");
}

function sanitizePhoneInput(raw: string) {
  const trimmed = raw.replace(/\s+/g, "");
  const hasPlus = trimmed.startsWith("+");
  const digits = digitsOnly(trimmed);
  return { hasPlus, digits };
}

function smartPhoneFromUser(prevValue: string, nextRaw: string) {
  const prev = sanitizePhoneInput(prevValue);
  const next = sanitizePhoneInput(nextRaw);

  const isStarting = prevValue.trim().length === 0;
  const firstChar = nextRaw.trim().charAt(0);

  if (!nextRaw.trim()) return { value: "", changedByAutoprefix: false };

  if (isStarting) {
    if (firstChar === "+") {
      const rest = next.digits.startsWith("7") ? next.digits.slice(1) : next.digits;
      return { value: `+7${rest}`, changedByAutoprefix: true };
    }

    if (/[0-9]/.test(firstChar)) {
      const d = next.digits;

      if (d.startsWith("7") || d.startsWith("8")) {
        return { value: d, changedByAutoprefix: false };
      }

      if (d.length > 0) {
        return { value: `+7${d}`, changedByAutoprefix: true };
      }
    }
  }

  if (next.hasPlus) {
    const rest = next.digits.startsWith("7") ? next.digits.slice(1) : next.digits;
    return { value: `+7${rest}`, changedByAutoprefix: false };
  }

  return { value: next.digits, changedByAutoprefix: false };
}

function isValidRuPhone11(raw: string) {
  const v = raw.trim();
  if (!v) return true;

  const { hasPlus, digits } = sanitizePhoneInput(v);

  if (digits.length !== 11) return false;

  if (hasPlus) {
    return v.startsWith("+7") && digits.startsWith("7");
  }

  return digits.startsWith("7") || digits.startsWith("8");
}

function normalizeRuPhoneForSubmit(raw: string) {
  const v = raw.trim();
  if (!v) return "";

  const { digits } = sanitizePhoneInput(v);
  if (digits.length !== 11) return "";

  if (digits.startsWith("8")) return `+7${digits.slice(1)}`;
  if (digits.startsWith("7")) return `+7${digits.slice(1)}`;

  return "";
}

function phoneMaxLenByValue(v: string) {
  // "+7.........." => 12 including "+"
  // "7.........." / "8.........." => 11 including first digit
  return v.trim().startsWith("+") ? 12 : 11;
}

/** -------------------- BEFORE INPUT LIMIT (SHOW MESSAGE WHEN TRY TO TYPE MORE) -------------------- **/

function isInsertInput(e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) {
  const ne = e.nativeEvent as unknown as { inputType?: string };
  const t = ne?.inputType;
  return typeof t === "string" ? t.startsWith("insert") : true;
}

function handleBeforeInputLimit(
  ru: boolean,
  max: number,
  currentValue: string,
  setErrors: React.Dispatch<React.SetStateAction<Errors>>,
  field: keyof Errors
) {
  return (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (currentValue.length >= max && isInsertInput(e)) {
      setErrors((prev) => ({ ...prev, [field]: limitMessage(ru, max) }));
      e.preventDefault();
    }
  };
}

function handlePasteLimit(
  ru: boolean,
  max: number,
  setValue: (v: string) => void,
  setErrors: React.Dispatch<React.SetStateAction<Errors>>,
  field: keyof Errors
) {
  return (e: React.ClipboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const paste = e.clipboardData.getData("text");
    if (!paste) return;

    const el = e.currentTarget;
    const start = el.selectionStart ?? el.value.length;
    const end = el.selectionEnd ?? el.value.length;

    const next = el.value.slice(0, start) + paste + el.value.slice(end);

    if (next.length > max) {
      e.preventDefault();
      setValue(next.slice(0, max));
      setErrors((prev) => ({ ...prev, [field]: limitMessage(ru, max) }));
    }
  };
}

/** -------------------- CONTACT FORM -------------------- **/

export function ContactForm({ locale }: { locale: Locale }) {
  const ru = locale === "ru";

  const [errors, setErrors] = useState<Errors>({});
  const [isLoading, setIsLoading] = useState(false);

  const [projectType, setProjectType] = useState<ProjectType>("consultation");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const phoneRef = useRef<HTMLInputElement | null>(null);

  const [toast, setToast] = useState<null | { type: "success" | "error"; message: string }>(null);

  const options = useMemo(
    () => [
      { value: "consultation" as const, label: ru ? "Консультация" : "Consultation" },
      { value: "apartment" as const, label: ru ? "Квартира" : "Apartment" },
      { value: "house" as const, label: ru ? "Дом" : "House" },
      { value: "commercial" as const, label: ru ? "Коммерческий интерьер" : "Commercial interior" },
    ],
    [ru]
  );

  function validateAll(
    next?: Partial<{ name: string; phone: string; email: string; message: string }>
  ): Errors {
    const nName = next?.name ?? name;
    const nPhone = next?.phone ?? phone;
    const nEmail = next?.email ?? email;
    const nMessage = next?.message ?? message;

    const e: Errors = {};

    // hard max limits (чтобы "лимит" не пропадал при blur/revalidate)
    if (nName.length > NAME_MAX) e.name = limitMessage(ru, NAME_MAX);
    if (nEmail.length > EMAIL_MAX) e.email = limitMessage(ru, EMAIL_MAX);
    if (nMessage.length > MESSAGE_MAX) e.message = limitMessage(ru, MESSAGE_MAX);

    const tName = nName.trim();
    const tPhone = nPhone.trim();
    const tEmail = nEmail.trim();
    const tMessage = nMessage.trim();

    // Имя: пустое / некорректное
    if (!tName) {
      e.name = ru ? "Введите имя" : "Enter a name";
    } else if (!isValidNameStrict(tName)) {
      e.name = ru ? "Введите корректное имя" : "Enter a valid name";
    }

    if (!tEmail && !tPhone) {
      const msg = ru ? "Укажите телефон или email" : "Phone or email required";
      e.phone = msg;
      e.email = msg;
    }

    if (tPhone && !isValidRuPhone11(tPhone)) {
      e.phone = ru ? "Телефон: +7/7/8 и 11 цифр" : "Phone: +7/7/8 and 11 digits";
    }

    if (tEmail && !isValidEmailStrictAllowlist(tEmail)) {
      e.email = ru ? "Введите корректный Email" : "Enter the correct Email address";
    }

    if (!e.message && tMessage.length < 10) {
      e.message = ru ? "Сообщение: минимум 10 символов" : "Message: at least 10 chars";
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

  const inputBase =
    "w-full rounded-2xl border px-4 py-3 text-sm outline-none transition disabled:opacity-60";
  const inputStyle: React.CSSProperties = {
    borderColor: "var(--border)",
    backgroundColor: "var(--surface)",
    color: "var(--text)",
  };

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
            showToast("error", ru ? "Проверьте поля формы" : "Please check the form", 3500);
            return;
          }

          const phoneNormalized = phone ? normalizeRuPhoneForSubmit(phone) : "";

          setIsLoading(true);

          try {
            const res = await fetch("/api/contact", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                locale,
                projectType,
                name: name.trim(),
                phone: phoneNormalized,
                email: email.trim(),
                message: message.trim(),
              }),
            });

            if (res.ok) {
              setName("");
              setPhone("");
              setEmail("");
              setMessage("");
              setProjectType("consultation");
              setErrors({});

              showToast("success", ru ? "Спасибо! Заявка отправлена." : "Thanks! Request sent.", 4500);
            } else {
              const j = await res.json().catch(() => null);
              showToast(
                "error",
                (j?.error as string) || (ru ? "Не удалось отправить" : "Could not send"),
                5500
              );
            }
          } catch {
            showToast("error", ru ? "Ошибка сети" : "Network error", 5500);
          } finally {
            setIsLoading(false);
          }
        }}
      >
        {/* Тип проекта */}
        <Field label={ru ? "Тип проекта" : "Project type"} error={errors.projectType}>
          <ProjectTypeDropdown
            value={projectType}
            onChange={(v) => setProjectType(v)}
            disabled={isLoading}
            options={options}
          />
        </Field>

        {/* Имя */}
        <Field label={ru ? "Имя" : "Name"} error={errors.name}>
          <input
            value={name}
            onBeforeInput={handleBeforeInputLimit(ru, NAME_MAX, name, setErrors, "name")}
            onPaste={handlePasteLimit(ru, NAME_MAX, setName, setErrors, "name")}
            onChange={(e) => {
              const raw = e.target.value;

              const sanitized = sanitizeNameForTyping(raw);
              const next = clampToMax(sanitized, NAME_MAX);

              setName(next);

              if (sanitized.length > NAME_MAX) {
                setErrors((prev) => ({ ...prev, name: limitMessage(ru, NAME_MAX) }));
              } else {
                setErrors(validateAll({ name: next }));
              }
            }}
            onBlur={() => setErrors(validateAll())}
            disabled={isLoading}
            className={inputBase}
            style={inputStyle}
            placeholder={ru ? "Анна-Мария" : "Anna-Maria"}
            autoComplete="name"
          />
        </Field>

        {/* Телефон */}
        <Field label={ru ? "Телефон" : "Phone"} error={errors.phone}>
          <input
            ref={phoneRef}
            value={phone}
            onChange={(e) => {
              const raw = e.target.value;

              const { value: smartValue, changedByAutoprefix } = smartPhoneFromUser(phone, raw);

              const max = phoneMaxLenByValue(smartValue);
              const limitedValue = clampToMax(smartValue, max);

              setPhone(limitedValue);

              if (smartValue.length > max) {
                setErrors((prev) => ({ ...prev, phone: limitMessage(ru, max) }));
              } else {
                setErrors(validateAll({ phone: limitedValue }));
              }

              if (changedByAutoprefix) {
                requestAnimationFrame(() => {
                  const el = phoneRef.current;
                  if (!el) return;
                  const pos = el.value.length;
                  el.setSelectionRange(pos, pos);
                });
              }
            }}
            onBlur={() => setErrors(validateAll())}
            disabled={isLoading}
            className={inputBase}
            style={inputStyle}
            placeholder={ru ? "+7" : "+7"}
            inputMode="tel"
            autoComplete="tel"
          />
        </Field>

        {/* Email */}
        <Field label="Email" error={errors.email}>
          <input
            value={email}
            onBeforeInput={handleBeforeInputLimit(ru, EMAIL_MAX, email, setErrors, "email")}
            onPaste={handlePasteLimit(ru, EMAIL_MAX, setEmail, setErrors, "email")}
            onChange={(e) => {
              const raw = e.target.value;

              const sanitized = sanitizeEmailForTyping(raw);
              const next = clampToMax(sanitized, EMAIL_MAX);

              setEmail(next);

              if (sanitized.length > EMAIL_MAX) {
                setErrors((prev) => ({ ...prev, email: limitMessage(ru, EMAIL_MAX) }));
              } else {
                setErrors(validateAll({ email: next }));
              }
            }}
            onBlur={() => setErrors(validateAll())}
            disabled={isLoading}
            type="email"
            className={inputBase}
            style={inputStyle}
            placeholder="name@gmail.com"
            autoComplete="email"
          />
        </Field>

        {/* Сообщение */}
        <Field label={ru ? "Сообщение" : "Message"} error={errors.message}>
          <div className="grid gap-2">
            <textarea
              value={message}
              onBeforeInput={handleBeforeInputLimit(ru, MESSAGE_MAX, message, setErrors, "message")}
              onPaste={handlePasteLimit(ru, MESSAGE_MAX, setMessage, setErrors, "message")}
              onChange={(e) => {
                const raw = e.target.value;
                const next = clampToMax(raw, MESSAGE_MAX);

                setMessage(next);

                if (raw.length > MESSAGE_MAX) {
                  setErrors((prev) => ({ ...prev, message: limitMessage(ru, MESSAGE_MAX) }));
                } else {
                  setErrors(validateAll({ message: next }));
                }
              }}
              onBlur={() => setErrors(validateAll())}
              disabled={isLoading}
              rows={5}
              className={[inputBase, "resize-none"].join(" ")}
              style={inputStyle}
              placeholder={
                ru
                  ? "Коротко опишите задачу: объект, метраж, сроки, стиль…"
                  : "Briefly describe: type, size, timeline, style…"
              }
              required
            />

            {/* счетчик справа, без дубля "достигнут лимит" */}
            <div className="flex justify-end text-xs" style={{ color: "var(--muted)" }}>
              {message.length}/{MESSAGE_MAX}
            </div>
          </div>
        </Field>

        <button type="submit" disabled={!canSubmit || isLoading} className="btn-cta group mt-2">
          {isLoading ? (ru ? "Отправка..." : "Sending...") : ru ? "Отправить" : "Send"}
          <span
            aria-hidden
            className="ml-2 inline-block transition-transform duration-300 ease-out group-hover:translate-x-1 group-focus-visible:translate-x-1"
          >
            →
          </span>
        </button>
      </form>

      {/* Placeholder color + focus border without JS */}
      <style jsx global>{`
        input::placeholder,
        textarea::placeholder {
          color: var(--muted);
          opacity: 0.75;
        }
        input:focus,
        textarea:focus,
        button:focus {
          outline: none;
        }
        input:focus,
        textarea:focus {
          border-color: color-mix(in srgb, var(--accent) 55%, var(--border));
        }
      `}</style>
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
        <label className="text-sm" style={{ color: "var(--muted)" }}>
          {label}
        </label>
        {error && <span className="text-xs text-rose-700">{error}</span>}
      </div>
      {children}
    </div>
  );
}

/** -------------------- CUSTOM DROPDOWN -------------------- **/

function ProjectTypeDropdown({
  value,
  onChange,
  options,
  disabled,
}: {
  value: ProjectType;
  onChange: (v: ProjectType) => void;
  options: Array<{ value: ProjectType; label: string }>;
  disabled?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  const selected = options.find((o) => o.value === value)?.label ?? "";

  useEffect(() => {
    function onDown(e: MouseEvent) {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen((s) => !s)}
        className="w-full rounded-2xl border px-4 py-3 text-left text-sm outline-none transition disabled:opacity-60"
        style={{
          borderColor: "var(--border)",
          backgroundColor: "var(--surface)",
          color: "var(--text)",
        }}
      >
        <span className="block pr-8">{selected}</span>
        <span
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2"
          style={{ color: "var(--muted)" }}
        >
          ▾
        </span>
      </button>

      {open && (
        <div
          className="absolute z-50 mt-2 w-full overflow-hidden rounded-2xl border shadow-lg"
          style={{
            borderColor: "var(--border)",
            backgroundColor: "var(--surface)",
          }}
        >
          <ul className="max-h-64 overflow-auto py-1">
            {options.map((o) => {
              const active = o.value === value;

              return (
                <li key={o.value}>
                  <button
                    type="button"
                    data-active={active ? "true" : "false"}
                    onClick={() => {
                      onChange(o.value);
                      setOpen(false);
                    }}
                    className="dropdown-item w-full px-4 py-2 text-left text-sm transition"
                  >
                    {o.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}