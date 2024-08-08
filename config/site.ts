export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "H-AI Ethics Atlas",
  description:
    "Beautifully designed components built with Radix UI and Tailwind CSS.",
  theme: "system", // system, dark or light
  siteUrl: "https://tailwind-nextjs-starter-blog.vercel.app",
  siteRepo: "https://github.com/timlrx/tailwind-nextjs-starter-blog",
  siteLogo: "/static/images/logo.png",
  socialBanner: "/static/images/twitter-card.png",
  mastodon: "https://mastodon.social/@mastodonuser",
  email: "address@yoursite.com",
  github: "https://github.com",
  twitter: "https://twitter.com/Twitter",
  facebook: "https://facebook.com",
  youtube: "https://youtube.com",
  linkedin: "https://www.linkedin.com",
  threads: "https://www.threads.net",
  instagram: "https://www.instagram.com",
  locale: "en-US",
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
    // {
    //   title: "Browse",
    //   href: "/",
    // },
    // {
    //   title: "Publish",
    //   href: "/publish",
    // },
  ],
  links: {
    twitter: "https://twitter.com/shadcn",
    github: "https://github.com/shadcn/ui",
    docs: "https://ui.shadcn.com",
  },
};
