import {
  Heart,
  Activity,
  Monitor,
  TrendingUp,
  Compass,
  Sprout,
  Users,
  MessageCircle,
  Home,
  type LucideProps,
} from "lucide-react";

const iconMap = {
  Heart,
  Activity,
  Monitor,
  TrendingUp,
  Compass,
  Sprout,
  Users,
  MessageCircle,
  Home,
};

export type TopicIconName = keyof typeof iconMap;

export function TopicIcon({
  name,
  ...props
}: { name: string } & LucideProps) {
  const Icon = iconMap[name as TopicIconName] ?? Compass;
  return <Icon {...props} />;
}
