import { redirect } from "next/navigation";

export default async function BlogPostPage(props: PageProps<"/[locale]/blog/[slug]">) {
  const { locale, slug } = await props.params;
  redirect(`/${locale}/wissen/${slug}`);
}
