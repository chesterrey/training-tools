import Link from "next/link"

import { siteConfig } from "@/config/site"
import { toolsConfig } from "@/config/tools"
import { buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function IndexPage() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Collection of training tools <br className="hidden sm:inline" />
          to assist you in your health and fitness goals.
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          Interactive apps for creating personalized training plans, offering
          options for exercise selection, program duration, and routine
          frequency.
        </p>
      </div>
      <div className="flex gap-4">
        <Link
          target="_blank"
          rel="noreferrer"
          href={siteConfig.links.github}
          className={buttonVariants({ variant: "outline" })}
        >
          GitHub
        </Link>
      </div>
      <div className="items-start justify-center gap-6 p-8 grid lg:grid-cols-2 xl:grid-cols-3">
        {toolsConfig.map((tool) => {
          return (
            <Link href={tool.href} key={tool.href}>
              <Card>
                <CardHeader>
                  <CardTitle>{tool.name}</CardTitle>
                  <CardDescription>{tool.description}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
