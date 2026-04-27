import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getPostBySlug, getFeaturedImage, getPostCategories, getPostAuthor, fmtDate } from "@/lib/wordpress";

export default async function BlogPostPage(props: PageProps<"/[locale]/blog/[slug]">) {
  const { locale, slug } = await props.params;

  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const img = getFeaturedImage(post);
  const cats = getPostCategories(post);
  const author = getPostAuthor(post);

  return (
    <div style={{ background: "#fafafa", color: "#0a0a0a" }}>
      {/* Breadcrumb */}
      <section className="max-w-[1280px] mx-auto px-8 pt-8 pb-4">
        <div className="font-mono uppercase" style={{ fontSize: 10, letterSpacing: "0.18em", color: "#373939" }}>
          <Link href={`/${locale}/blog`}>Blog</Link>
          {cats[0] && (
            <>
              <span className="mx-2">/</span>
              <span>{cats[0].name}</span>
            </>
          )}
        </div>
      </section>

      {/* Hero */}
      <section className="max-w-[1280px] mx-auto px-8 pb-12">
        <div className="max-w-3xl">
          {/* Category + date */}
          <div className="flex items-center gap-3 font-mono uppercase mb-5" style={{ fontSize: 10, letterSpacing: "0.18em", color: "#373939" }}>
            {cats[0] && <span>{cats[0].name}</span>}
            {cats[0] && <span style={{ opacity: 0.4 }}>·</span>}
            <span>{fmtDate(post.date)}</span>
            <span style={{ opacity: 0.4 }}>·</span>
            <span>{author}</span>
          </div>

          <h1
            className="tracking-tight"
            style={{ fontSize: "clamp(32px,4vw,52px)", letterSpacing: "-0.025em", fontWeight: 500, lineHeight: 1.1 }}
            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
          />
        </div>

        {/* Featured image */}
        {img && (
          <div className="mt-10 relative w-full" style={{ aspectRatio: "16/9", background: "#f4f2ee" }}>
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover"
              sizes="(max-width: 1280px) 100vw, 1280px"
              priority
            />
          </div>
        )}
      </section>

      {/* Content + sidebar */}
      <section className="max-w-[1280px] mx-auto px-8 pb-24 grid grid-cols-12 gap-12">
        {/* Article */}
        <article className="col-span-8">
          <div
            className="prose prose-zinc max-w-none"
            style={{ fontSize: 17, lineHeight: 1.75, color: "#0a0a0a" }}
            dangerouslySetInnerHTML={{ __html: post.content.rendered }}
          />
        </article>

        {/* Sidebar */}
        <aside className="col-span-4">
          <div className="sticky top-32 space-y-8">
            {/* Author */}
            <div className="p-5" style={{ background: "#f4f2ee" }}>
              <div className="font-mono uppercase mb-2" style={{ fontSize: 10, letterSpacing: "0.14em", color: "#373939" }}>Autor</div>
              <div style={{ fontSize: 15, fontWeight: 500 }}>{author}</div>
              <div style={{ fontSize: 13, color: "#373939", marginTop: 4 }}>Dezentralshop Team</div>
            </div>

            {/* Categories */}
            {cats.length > 0 && (
              <div>
                <div className="font-mono uppercase mb-3" style={{ fontSize: 10, letterSpacing: "0.14em", color: "#373939" }}>Kategorien</div>
                <div className="flex flex-wrap gap-2">
                  {cats.map((cat) => (
                    <span key={cat.id} className="font-mono uppercase px-3 py-1.5" style={{ fontSize: 10, letterSpacing: "0.12em", border: "1px solid #e7e4df", color: "#0a0a0a" }}>
                      {cat.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="p-5" style={{ border: "1px solid #0a0a0a" }}>
              <div className="font-mono uppercase mb-2" style={{ fontSize: 10, letterSpacing: "0.14em", color: "#f39320" }}>₿ Bitcoin Rabatt</div>
              <div style={{ fontSize: 14, lineHeight: 1.5 }}>10 % Rabatt auf alle Produkte bei Zahlung mit Bitcoin.</div>
              <Link href={`/${locale}/shop`} className="mt-4 h-10 w-full flex items-center justify-center" style={{ background: "#0a0a0a", color: "#fafafa", fontSize: 13 }}>
                Zum Shop →
              </Link>
            </div>

            {/* Back */}
            <Link href={`/${locale}/blog`} className="font-mono uppercase" style={{ fontSize: 10, letterSpacing: "0.14em", color: "#373939" }}>
              ← Alle Beiträge
            </Link>
          </div>
        </aside>
      </section>
    </div>
  );
}
