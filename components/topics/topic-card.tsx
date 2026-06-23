import Link from "next/link";
import { TopicIcon } from "@/components/topics/topic-icon";
import type { Topic } from "@/lib/content/topics";

export function TopicCard({
  topic,
  essayCount,
}: {
  topic: Topic;
  essayCount: number;
}) {
  return (
    <Link
      href={`/topics/${topic.slug}`}
      className="flex min-h-[206px] flex-col gap-[14px] rounded-[4px] border border-border-soft bg-surface px-7 pt-[30px] pb-[26px] no-underline transition-[border-color,transform,box-shadow] duration-200 hover:-translate-y-[3px] hover:border-accent-text hover:shadow-[0_14px_30px_rgba(40,38,28,.07)]"
    >
      <div
        className="flex h-[46px] w-[46px] items-center justify-center rounded-full"
        style={{ backgroundColor: topic.iconBg }}
      >
        <TopicIcon
          name={topic.icon}
          size={22}
          strokeWidth={1.6}
          style={{ color: topic.iconColor }}
        />
      </div>
      <h3 className="font-serif text-[25px] leading-[1.1] font-medium text-ink-strong">
        {topic.label}
      </h3>
      <p className="flex-1 text-[15px] leading-[1.55] text-muted-2">
        {topic.description}
      </p>
      <div className="flex items-center justify-between">
        <span className="inline-flex rounded-full bg-chip-neutral px-[11px] py-[5px] font-mono text-[10px] tracking-[.04em] text-muted-1 uppercase">
          {essayCount} {essayCount === 1 ? "essay" : "essays"}
        </span>
        <span className="font-mono text-[15px] text-muted-4">→</span>
      </div>
    </Link>
  );
}
