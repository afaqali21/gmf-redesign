import { archives } from "@/lib/content";
import { archiveMetadata } from "@/lib/archive";
import { ArchiveRoute } from "@/components/blog/ArchiveRoute";

export const generateStaticParams = () => Object.keys(archives.category).map((slug) => ({ slug }));

export async function generateMetadata({ params }: PageProps<"/category/[slug]">) {
  const { slug } = await params;
  return archiveMetadata("category", slug);
}

export default async function Page({ params }: PageProps<"/category/[slug]">) {
  const { slug } = await params;
  return <ArchiveRoute kind="category" slug={slug} />;
}
