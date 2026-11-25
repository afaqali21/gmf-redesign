import { archiveMetadata, pagedParams } from "@/lib/archive";
import { ArchiveRoute } from "@/components/blog/ArchiveRoute";

export const generateStaticParams = () => pagedParams("author");

export async function generateMetadata({ params }: PageProps<"/author/[slug]/page/[page]">) {
  const { slug, page } = await params;
  return archiveMetadata("author", slug, Number(page));
}

export default async function Page({ params }: PageProps<"/author/[slug]/page/[page]">) {
  const { slug, page } = await params;
  return <ArchiveRoute kind="author" slug={slug} page={Number(page)} />;
}
