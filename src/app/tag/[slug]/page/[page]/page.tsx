import { archiveMetadata, pagedParams } from "@/lib/archive";
import { ArchiveRoute } from "@/components/blog/ArchiveRoute";

export const generateStaticParams = () => pagedParams("tag");

export async function generateMetadata({ params }: PageProps<"/tag/[slug]/page/[page]">) {
  const { slug, page } = await params;
  return archiveMetadata("tag", slug, Number(page));
}

export default async function Page({ params }: PageProps<"/tag/[slug]/page/[page]">) {
  const { slug, page } = await params;
  return <ArchiveRoute kind="tag" slug={slug} page={Number(page)} />;
}
