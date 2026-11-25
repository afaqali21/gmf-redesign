import { archives } from "@/lib/content";
import { archiveMetadata } from "@/lib/archive";
import { ArchiveRoute } from "@/components/blog/ArchiveRoute";

export const generateStaticParams = () => Object.keys(archives.author).map((slug) => ({ slug }));

export async function generateMetadata({ params }: PageProps<"/author/[slug]">) {
  const { slug } = await params;
  return archiveMetadata("author", slug);
}

export default async function Page({ params }: PageProps<"/author/[slug]">) {
  const { slug } = await params;
  return <ArchiveRoute kind="author" slug={slug} />;
}
