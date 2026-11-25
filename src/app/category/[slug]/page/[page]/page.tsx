import { archiveMetadata, pagedParams } from "@/lib/archive";
import { ArchiveRoute } from "@/components/blog/ArchiveRoute";

export const generateStaticParams = () => pagedParams("category");

export async function generateMetadata({ params }: PageProps<"/category/[slug]/page/[page]">) {
  const { slug, page } = await params;
  return archiveMetadata("category", slug, Number(page));
}

export default async function Page({ params }: PageProps<"/category/[slug]/page/[page]">) {
  const { slug, page } = await params;
  return <ArchiveRoute kind="category" slug={slug} page={Number(page)} />;
}
