import type { Props } from "astro";
import IconMail from "@/assets/icons/IconMail.svg";
import IconGitHub from "@/assets/icons/IconGitHub.svg";
import IconBrandX from "@/assets/icons/IconBrandX.svg";
import IconLinkedin from "@/assets/icons/IconLinkedin.svg";
import IconBilibili from "@/assets/icons/IconBilibili.svg";
import IconZhihu from "@/assets/icons/IconZhihu.svg";
import IconJuejin from "@/assets/icons/IconJuejin.svg";
import IconWeibo from "@/assets/icons/IconWeibo.svg";
import IconCSDN from "@/assets/icons/IconCSDN.svg";
import IconSegmentFault from "@/assets/icons/IconSegmentFault.svg";
import IconDouban from "@/assets/icons/IconDouban.svg";
import IconWhatsapp from "@/assets/icons/IconWhatsapp.svg";
import IconFacebook from "@/assets/icons/IconFacebook.svg";
import IconTelegram from "@/assets/icons/IconTelegram.svg";
import IconPinterest from "@/assets/icons/IconPinterest.svg";
import { SITE, SOCIAL } from "@/config";

interface Social {
  name: string;
  href: string;
  linkTitle: string;
  icon: (_props: Props) => Element;
}

type SocialKey = keyof typeof SOCIAL;

const SOCIAL_META: Record<SocialKey, Omit<Social, "href">> = {
  github: {
    name: "GitHub",
    linkTitle: `${SITE.title} on GitHub`,
    icon: IconGitHub,
  },
  email: {
    name: "Mail",
    linkTitle: `Send an email to ${SITE.title}`,
    icon: IconMail,
  },
  x: {
    name: "X",
    linkTitle: `${SITE.title} on X`,
    icon: IconBrandX,
  },
  linkedin: {
    name: "LinkedIn",
    linkTitle: `${SITE.title} on LinkedIn`,
    icon: IconLinkedin,
  },
  bilibili: {
    name: "Bilibili",
    linkTitle: `${SITE.title} on Bilibili`,
    icon: IconBilibili,
  },
  zhihu: {
    name: "Zhihu",
    linkTitle: `${SITE.title} on Zhihu`,
    icon: IconZhihu,
  },
  juejin: {
    name: "Juejin",
    linkTitle: `${SITE.title} on Juejin`,
    icon: IconJuejin,
  },
  weibo: {
    name: "Weibo",
    linkTitle: `${SITE.title} on Weibo`,
    icon: IconWeibo,
  },
  csdn: {
    name: "CSDN",
    linkTitle: `${SITE.title} on CSDN`,
    icon: IconCSDN,
  },
  segmentfault: {
    name: "SegmentFault",
    linkTitle: `${SITE.title} on SegmentFault`,
    icon: IconSegmentFault,
  },
  douban: {
    name: "Douban",
    linkTitle: `${SITE.title} on Douban`,
    icon: IconDouban,
  },
};

export const SOCIALS: Social[] = (Object.keys(SOCIAL) as SocialKey[])
  .filter(key => SOCIAL[key].enabled)
  .map(key => ({
    ...SOCIAL_META[key],
    href: SOCIAL[key].href,
  }))
  .filter(s => typeof s.href === "string" && s.href.trim().length > 0);

export const SHARE_LINKS: Social[] = [
  {
    name: "WhatsApp",
    href: "https://wa.me/?text=",
    linkTitle: `Share this post via WhatsApp`,
    icon: IconWhatsapp,
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/sharer.php?u=",
    linkTitle: `Share this post on Facebook`,
    icon: IconFacebook,
  },
  {
    name: "X",
    href: "https://x.com/intent/post?url=",
    linkTitle: `Share this post on X`,
    icon: IconBrandX,
  },
  {
    name: "Telegram",
    href: "https://t.me/share/url?url=",
    linkTitle: `Share this post via Telegram`,
    icon: IconTelegram,
  },
  {
    name: "Pinterest",
    href: "https://pinterest.com/pin/create/button/?url=",
    linkTitle: `Share this post on Pinterest`,
    icon: IconPinterest,
  },
  {
    name: "Mail",
    href: "mailto:?subject=See%20this%20post&body=",
    linkTitle: `Share this post via email`,
    icon: IconMail,
  },
] as const;
