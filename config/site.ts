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
    github: "https://github.com/chesterrey/training-tools",
    docs: "https://ui.shadcn.com",
  },
}
