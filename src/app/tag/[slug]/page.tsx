import { archives } from "@/lib/content";
import { archiveMetadata } from "@/lib/archive";
import { ArchiveRoute } from "@/components/blog/ArchiveRoute";

export const generateStaticParams = () => Object.keys(archives.tag).map((slug) => ({ slug }));

export async function generateMetadata({ params }: PageProps<"/tag/[slug]">) {
  const { slug } = await params;
  return archiveMetadata("tag", slug);
}

export default async function Page({ params }: PageProps<"/tag/[slug]">) {
  const { slug } = await params;
  return <ArchiveRoute kind="tag" slug={slug} />;
}
