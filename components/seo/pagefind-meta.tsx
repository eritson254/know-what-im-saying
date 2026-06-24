export function PagefindMeta({
  type,
  topic,
  date,
  readingTime,
  series,
}: {
  type: "Essay" | "Note" | "Series" | "Topic";
  topic?: string | null;
  date?: string | null;
  readingTime?: number | null;
  series?: string | null;
}) {
  return (
    <>
      <span hidden data-pagefind-meta={`type:${type}`} />
      {topic && <span hidden data-pagefind-meta={`topic:${topic}`} />}
      {date && <span hidden data-pagefind-meta={`date:${date}`} />}
      {readingTime != null && (
        <span hidden data-pagefind-meta={`readingTime:${readingTime}`} />
      )}
      {series && <span hidden data-pagefind-meta={`series:${series}`} />}
    </>
  );
}
