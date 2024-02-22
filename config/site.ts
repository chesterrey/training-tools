export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "Training Tools",
  description: "A collection of tools to help with your fitness and training.",
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Training Planner",
      href: "/training-planner",
    },
  ],
  links: {
    twitter: "https://twitter.com/shadcn",
    github: "https://github.com/shadcn/ui",
    docs: "https://ui.shadcn.com",
  },
}
