import * as outlineIcons from "@heroicons/react/24/outline";
import * as solidIcons from "@heroicons/react/24/solid";

export interface IHeroIcon {
  icon: keyof typeof outlineIcons;
  useSolid?: boolean;
  className?: string;
  onClick?: () => void;
}

export default function HeroIcon({
  icon,
  className,
  useSolid,
  onClick,
}: IHeroIcon) {
  const HeroIconComponent = useSolid ? solidIcons[icon] : outlineIcons[icon];
  return <HeroIconComponent className={className} onClick={onClick} />;
}
