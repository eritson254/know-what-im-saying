import { BookOpen, Headphones, Film, Newspaper, type LucideProps } from "lucide-react";
import type { ReadingListFrontmatter } from "@/lib/content/schema";

const iconMap: Record<ReadingListFrontmatter["medium"], typeof BookOpen> = {
  book: BookOpen,
  podcast: Headphones,
  film: Film,
  article: Newspaper,
  essay: Newspaper,
};

export function MediumIcon({
  medium,
  ...props
}: { medium: ReadingListFrontmatter["medium"] } & LucideProps) {
  const Icon = iconMap[medium];
  return <Icon {...props} />;
}
