import Image from "next/image";
import Link from "next/link";
import { posts } from "@/data/blog";
import { tinyBlurDataURL } from "@/lib/blur";

type Locale = "ru" | "en";

function formatDate(dateISO: string, locale: Locale) {
  const d = new Date(dateISO);
  return d.toLocaleDateString(locale === "ru" ? "ru-RU" : "en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });
}

function estimateReadingTime(content: { type: string; text?: string; items?: string[] }[]) {
  const text = content
    .map((b) => (b.type === "ul" ? (b.items ?? []).join(" ") : b.text ?? ""))
    .join(" ");
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return minutes;
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  const ru = locale === "ru";

  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-20">
        <h1 className="text-3xl font-medium">{ru ? "Статья не найдена" : "Post not found"}</h1>
        <Link className="mt-6 inline-block text-zinc-600 hover:text-zinc-900" href={`/${locale}/blog`}>
          ← {ru ? "Вернуться в блог" : "Back to blog"}
        </Link>
      </div>
    );
  }

  const title = ru ? post.title_ru : post.title_en;
  const excerpt = ru ? post.excerpt_ru : post.excerpt_en;
  const content = ru ? post.content_ru : post.content_en;
  const readingMin = estimateReadingTime(content);

  return (
    <div>
      {/* FULL-BLEED HERO */}
      <section className="relative w-full overflow-hidden">
        <div className="relative h-[72vh] min-h-[520px] w-full">
          <Image
            src={post.cover}
            alt={title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
            placeholder="blur"
            blurDataURL={tinyBlurDataURL()}
          />
          <div className="absolute inset-0 bg-black/35" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />
        </div>

        <div className="pointer-events-none absolute inset-0">
          <div className="mx-auto h-full max-w-6xl px-4">
            <div className="pointer-events-auto flex h-full flex-col justify-end pb-10 md:pb-14">
              {/* Back link */}
              <div className="mb-7">
                <Link
                  href={`/${locale}/blog`}
                  className="inline-flex items-center gap-2 text-sm text-white/85 hover:text-white"
                >
                  <span aria-hidden>←</span> {ru ? "Все статьи" : "All posts"}
                </Link>
              </div>

              {/* Meta */}
              <div className="text-xs uppercase tracking-[0.35em] text-white/75">
                {formatDate(post.date, locale)} · {ru ? `${readingMin} мин` : `${readingMin} min`}
              </div>

              {/* Title */}
              <h1 className="mt-5 max-w-4xl text-4xl font-medium leading-[1.02] text-white md:text-6xl">
                {title}
              </h1>

              {/* Excerpt */}
              <p className="mt-7 max-w-2xl text-base leading-relaxed text-white/85 md:text-lg">
                {excerpt}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT (левое выравнивание, без “центр под фото”) */}
      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid md:grid-cols-12">
          <div className="md:col-span-8">
            <article className="prose prose-zinc max-w-none">
              {content.map((b, idx) => {
                if (b.type === "h2") return <h2 key={idx}>{b.text}</h2>;
                if (b.type === "ul")
                  return (
                    <ul key={idx}>
                      {(b.items ?? []).map((it) => (
                        <li key={it}>{it}</li>
                      ))}
                    </ul>
                  );
                return <p key={idx}>{b.text}</p>;
              })}
            </article>

            {/* Bottom back link (практично, без кнопок) */}
            <div className="mt-14 border-t border-zinc-200 pt-8">
              <Link className="text-sm text-zinc-600 hover:text-zinc-900" href={`/${locale}/blog`}>
                ← {ru ? "Назад в блог" : "Back to blog"}
              </Link>
            </div>
          </div>

          {/* правую колонку оставляем пустой ради воздуха (как у студий) */}
          <div className="hidden md:col-span-4 md:block" />
        </div>
      </section>
    </div>
  );
}