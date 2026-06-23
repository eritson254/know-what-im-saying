import { getEssaysByTopic } from "@/lib/content/essays";

export type Topic = {
  slug: string;
  label: string;
  description: string;
  icon: string;
  iconColor: string;
  iconBg: string;
};

/** Topic taxonomy and icon treatment, matching the canonical design prototype's Topics page exactly. */
export const topics: Topic[] = [
  {
    slug: "love-relationships",
    label: "Love & Relationships",
    description:
      "Attachment, heartbreak, intimacy, boundaries, and what it means to be chosen.",
    icon: "Heart",
    iconColor: "#B07A72",
    iconBg: "#EFE4E2",
  },
  {
    slug: "psychology-behavior",
    label: "Psychology & Behavior",
    description: "Why we do what we do — the quiet mechanics of the human mind.",
    icon: "Activity",
    iconColor: "#A8894F",
    iconBg: "#EEE8DA",
  },
  {
    slug: "culture-technology",
    label: "Culture & Technology",
    description: "Attention, identity, and living inside systems built to distract us.",
    icon: "Monitor",
    iconColor: "#7E8CA3",
    iconBg: "#E5E8EE",
  },
  {
    slug: "money-work-ambition",
    label: "Money, Work & Ambition",
    description: "Timing, comparison, meaning, and the milestones nobody agreed to.",
    icon: "TrendingUp",
    iconColor: "#2C4636",
    iconBg: "#DCE2D0",
  },
  {
    slug: "life-meaning",
    label: "Life & Meaning",
    description: "The big quiet questions about how to spend a life that's yours.",
    icon: "Compass",
    iconColor: "#6F9A95",
    iconBg: "#E0EAE6",
  },
  {
    slug: "healing-boundaries",
    label: "Healing & Boundaries",
    description: "Repair, self-trust, and learning to protect your own quiet.",
    icon: "Sprout",
    iconColor: "#8FA189",
    iconBg: "#E5EADD",
  },
  {
    slug: "friendship",
    label: "Friendship",
    description: "The bonds that hold us — and the ones that quietly fade.",
    icon: "Users",
    iconColor: "#9A8299",
    iconBg: "#ECE5EB",
  },
  {
    slug: "modern-dating",
    label: "Modern Dating",
    description: "Apps, ambiguity, and looking for something real in a noisy world.",
    icon: "MessageCircle",
    iconColor: "#BC8466",
    iconBg: "#F0E6DE",
  },
  {
    slug: "family",
    label: "Family",
    description: "Inheritance, obligation, and the people who shaped how you love.",
    icon: "Home",
    iconColor: "#4A6A52",
    iconBg: "#E2E8DC",
  },
];

export function getTopicBySlug(slug: string): Topic | undefined {
  return topics.find((topic) => topic.slug === slug);
}

export function getTopicEssayCount(slug: string): number {
  return getEssaysByTopic(slug).length;
}
