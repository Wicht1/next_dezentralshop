import Link from "next/link";
import Pill from "@/components/ui/Pill";

export default async function WissenArtikelPage(props: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await props.params;
  const title = slug.replace(/-/g, " ").replace(/\b\w/g, (c: string) => c.toUpperCase());

  return (
    <div style={{ background: "#fafafa", color: "#0a0a0a" }}>
      <section className="max-w-[1280px] mx-auto px-8 pt-8 pb-4">
        <div className="font-mono uppercase" style={{ fontSize: 10, letterSpacing: "0.18em", color: "#373939" }}>
          <Link href={`/${locale}/wissen`}>Wissen</Link>
          <span className="mx-2">/</span>
          <span style={{ color: "#0a0a0a" }}>{title}</span>
        </div>
      </section>

      <article className="max-w-2xl mx-auto px-8 py-12">
        <div className="flex items-center gap-4 mb-6">
          <Pill variant="solid">Guide</Pill>
          <span className="font-mono uppercase" style={{ fontSize: 10, letterSpacing: "0.18em", color: "#373939" }}>Nr. 014 · 12 min</span>
        </div>
        <h1 className="tracking-tight" style={{ fontSize: "clamp(32px,4vw,52px)", letterSpacing: "-0.025em", fontWeight: 500, lineHeight: 1.05 }}>
          {title}
        </h1>
        <div className="flex items-center gap-3 mt-5" style={{ fontSize: 13, color: "#373939" }}>
          <span>Lukas M.</span>
          <span>·</span>
          <span>18. April 2026</span>
        </div>

        <div className="mt-10 relative overflow-hidden w-full" style={{ aspectRatio: "3/2", background: "repeating-linear-gradient(135deg, #f4f2ee 0 14px, #ece8e1 14px 15px)" }} />

        <div className="mt-10" style={{ fontSize: 17, lineHeight: 1.65, color: "#0a0a0a" }}>
          <p style={{ marginBottom: "1.5em" }}>
            Inhalt wird hier über die WordPress REST API geladen.
          </p>
        </div>
      </article>
    </div>
  );
}
