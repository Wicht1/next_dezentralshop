import Link from "next/link";
import Image from "next/image";
import { getPosts, getBlogCategories, getFeaturedImage, getPostCategories, fmtDate, stripHtml } from "@/lib/wordpress";

export default async function BlogPage(props: PageProps<"/[locale]/blog">) {
  const { locale } = await props.params;
  const [posts, categories] = await Promise.all([getPosts({ per_page: 12 }), getBlogCategories()]);

  return (
    <div style={{ background: "#fafafa", color: "#0a0a0a" }}>
      {/* Header */}
      <section className="max-w-[1280px] mx-auto px-8 pt-10 pb-8">
        <div className="font-mono uppercase mb-6" style={{ fontSize: 10, letterSpacing: "0.18em", color: "#373939" }}>
          Blog
        </div>
        <div className="flex items-end justify-between">
          <h1 className="tracking-tight" style={{ fontSize: "clamp(36px,5vw,56px)", letterSpacing: "-0.025em", fontWeight: 500, lineHeight: 1 }}>
            Guides & Hintergründe.
          </h1>
          <div className="font-mono" style={{ fontSize: 12, color: "#373939" }}>{posts.length} Beiträge</div>
        </div>
        <p className="mt-4 max-w-xl" style={{ fontSize: 15, color: "#373939", lineHeight: 1.6 }}>
          Alles rund um Bitcoin: Setup-Guides, Hardware-Vergleiche, News aus der Community.
        </p>

        {/* Category pills */}
        {categories.length > 0 && (
          <div className="mt-6 flex items-center gap-2 flex-wrap">
            <span className="font-mono uppercase px-3 py-1.5" style={{ fontSize: 10, letterSpacing: "0.14em", background: "#0a0a0a", color: "#fafafa" }}>
              Alle
            </span>
            {categories.map((cat) => (
              <span key={cat.id} className="font-mono uppercase px-3 py-1.5 cursor-pointer" style={{ fontSize: 10, letterSpacing: "0.14em", border: "1px solid #e7e4df", color: "#373939" }}>
                {cat.name}
              </span>
            ))}
          </div>
        )}
      </section>

      {/* Post grid */}
      <section className="max-w-[1280px] mx-auto px-8 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14" style={{ borderTop: "1px solid #0a0a0a", paddingTop: 32 }}>
          {posts.map((post) => {
            const img = getFeaturedImage(post);
            const cats = getPostCategories(post);
            const excerpt = stripHtml(post.excerpt.rendered).slice(0, 160);

            return (
              <Link key={post.id} href={`/${locale}/blog/${post.slug}`} className="group block">
                {/* Image */}
                <div className="relative w-full overflow-hidden" style={{ aspectRatio: "16/9", background: "#f4f2ee" }}>
                  {img ? (
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 400px"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-end p-4">
                      <span className="font-mono uppercase" style={{ fontSize: 10, letterSpacing: "0.12em", color: "#9c9689" }}>
                        {post.title.rendered}
                      </span>
                    </div>
                  )}
                </div>

                {/* Meta */}
                <div className="mt-4">
                  <div className="flex items-center gap-3 font-mono uppercase" style={{ fontSize: 10, letterSpacing: "0.14em", color: "#373939" }}>
                    {cats[0] && <span>{cats[0].name}</span>}
                    {cats[0] && <span style={{ opacity: 0.4 }}>·</span>}
                    <span>{fmtDate(post.date)}</span>
                  </div>
                  <h2 className="mt-2 tracking-tight" style={{ fontSize: 20, fontWeight: 500, letterSpacing: "-0.01em", color: "#0a0a0a", lineHeight: 1.3 }}
                    dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                  />
                  <p className="mt-2" style={{ fontSize: 14, color: "#373939", lineHeight: 1.6 }}>
                    {excerpt}{excerpt.length === 160 ? "…" : ""}
                  </p>
                  <div className="mt-3 font-mono uppercase" style={{ fontSize: 10, letterSpacing: "0.14em", color: "#0a0a0a", borderBottom: "1px solid #f39320", display: "inline-block", paddingBottom: 2 }}>
                    Lesen →
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {posts.length === 0 && (
          <p className="py-20 text-center font-mono" style={{ fontSize: 13, color: "#373939" }}>
            Noch keine Beiträge vorhanden.
          </p>
        )}
      </section>
    </div>
  );
}
