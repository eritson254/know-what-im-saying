import Link from "next/link";
import { Header } from "@/components/layout/header";
import { SectionIntro } from "@/components/marketing/section-intro";
import { Button } from "@/components/ui/button";
import { buildPageMetadata } from "@/lib/seo/metadata";

const CONTACT_EMAIL = "hello@knowwhatimsaying.com";

export const metadata = buildPageMetadata({
  title: "Contact",
  description: "How to get in touch with Know What I'm Saying?",
  pathname: "/contact",
});

export default function ContactPage() {
  return (
    <main className="flex flex-1 flex-col">
      <Header />
      <SectionIntro
        eyebrow="Contact"
        title="Get in Touch"
        subtitle="For most things, an email is the simplest way to reach us."
      />
      <section className="mx-auto w-full max-w-[640px] px-6 pb-20 text-center md:px-16">
        <Button href={`mailto:${CONTACT_EMAIL}`} size="default">
          {CONTACT_EMAIL}
        </Button>

        <div className="mt-12 flex flex-col gap-6 border-t border-border pt-10 text-left">
          <p className="text-[16px] leading-[1.6] text-muted-2">
            Have a story, question, or experience you would like to share for a
            future essay? That goes through{" "}
            <Link href="/share-your-story" className="text-accent-text underline">
              Share Your Story
            </Link>{" "}
            instead — it is read with more care than a general inbox can offer.
          </p>
          <p className="text-[16px] leading-[1.6] text-muted-2">
            For partnerships, press, or anything related to a future product,
            email us directly and mention what you have in mind.
          </p>
          <p className="text-[14px] leading-[1.6] text-muted-3">
            This is not a crisis, legal, medical, or therapy service. If you
            are in immediate danger, please contact your local emergency or
            crisis services.
          </p>
        </div>
      </section>
    </main>
  );
}
