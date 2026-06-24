import { Header } from "@/components/layout/header";
import { SectionIntro } from "@/components/marketing/section-intro";
import { CommunityNewsletter } from "@/components/marketing/community-newsletter";
import { siteConfig } from "@/config/site";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "Share Your Story",
  description:
    "Share a story anonymously — it may inspire a future essay on Know What I'm Saying?",
  pathname: "/share-your-story",
});

const steps = [
  { number: "01", label: "Share what happened" },
  { number: "02", label: "Your details are protected" },
  { number: "03", label: "Your story may inspire a future essay" },
];

const importantInfo = [
  "Stories may be edited and anonymized",
  "Submission does not guarantee publication",
  "Do not include unnecessary identifying details",
  "This is not a crisis, legal, medical, or therapy service. If you are in immediate danger, please contact your local emergency or crisis services.",
  "Contact information is optional",
];

const hasRealForm = siteConfig.shareYourStoryFormUrl !== "#";

export default function ShareYourStoryPage() {
  return (
    <main className="flex flex-1 flex-col">
      <Header />
      <SectionIntro
        eyebrow="Share Your Story"
        title="Share Your Story"
        subtitle="Have a story you cannot stop thinking about? A relationship, betrayal, friendship, family dynamic, loss, or moment that changed how you see yourself may inspire a future essay."
      />

      <section className="mx-auto w-full max-w-[860px] px-6 pb-16 md:px-16">
        <div className="grid gap-8 sm:grid-cols-3">
          {steps.map((step) => (
            <div key={step.number} className="flex flex-col gap-2">
              <span className="font-mono text-[12px] tracking-[.14em] text-accent-text uppercase">
                {step.number}
              </span>
              <span className="text-[16px] leading-[1.5] text-ink-strong">
                {step.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-[640px] px-6 pb-16 md:px-16">
        <div className="rounded-[3px] border border-border-strong bg-surface p-9 md:p-[50px]">
          <h2 className="mb-5 font-serif text-[22px] leading-[1.2] font-medium text-ink-strong">
            Important Information
          </h2>
          <ul className="flex flex-col gap-3">
            {importantInfo.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-[15px] leading-[1.6] text-muted-2"
              >
                <span className="mt-[9px] h-[6px] w-[6px] flex-none rounded-full bg-sage" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[640px] px-6 pb-20 md:px-16">
        <div className="overflow-hidden rounded-[3px] border border-border-strong bg-surface">
          {hasRealForm ? (
            <iframe
              src={siteConfig.shareYourStoryFormUrl}
              title="Share Your Story submission form"
              className="h-[900px] w-full"
            >
              Loading…
            </iframe>
          ) : (
            <div className="flex flex-col items-center gap-2 px-9 py-16 text-center md:px-[50px]">
              <p className="font-serif text-[20px] text-ink-strong">
                The submission form is being set up.
              </p>
              <p className="max-w-[40ch] text-[15px] leading-[1.6] text-muted-2">
                Check back soon, or email us directly in the meantime.
              </p>
            </div>
          )}
        </div>
      </section>

      <CommunityNewsletter newsletterLocation="share_your_story" />
    </main>
  );
}
