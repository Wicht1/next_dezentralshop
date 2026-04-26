import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";

export async function generateStaticParams() {
  return [
    { locale: "de" },
    { locale: "fr" },
    { locale: "en" },
    { locale: "it" },
  ];
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  return (
    <>
      <TopBar locale={locale} />
      <div className="flex-1">{children}</div>
      <Footer locale={locale} />
    </>
  );
}
