import type { ElementType } from "react";
import sizes from "@/content/generated/image-sizes.json";

/**
 * Renders migrated inline HTML (paragraphs with <strong>, <a>, <br>). The HTML comes from our own
 * migration script, which only keeps a small allow-list of tags, never from user input.
 */
export function Html({ html, as: Tag = "p", className }: { html: string; as?: ElementType; className?: string }) {
  return <Tag className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}

const imageSizes = sizes as unknown as Record<string, [number, number]>;

/** Intrinsic size of a file in /public (from the generated manifest), or null if the file is missing. */
export function imageSize(src: string): { width: number; height: number } | null {
  const s = imageSizes[src];
  return s ? { width: s[0], height: s[1] } : null;
}
