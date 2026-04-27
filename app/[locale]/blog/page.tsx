import { redirect } from "next/navigation";

export default async function BlogPage(props: PageProps<"/[locale]/blog">) {
  const { locale } = await props.params;
  redirect(`/${locale}/wissen`);
}
