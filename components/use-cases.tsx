"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import FrostedGlassIcon from "@/components/frosted-glass-icon"
import { Factory, Leaf, HeartPulse, Zap, Truck } from "lucide-react"

export default function UseCases() {
  const industries = [
    {
      icon: <Factory className="w-12 h-12 text-primary" />,
      title: "Manufacturing",
      description:
        "Implement predictive maintenance and production optimization. Prevent costly downtime and reduce operational costs significantly.",
      accentColor: "rgba(255, 215, 0, 0.5)",
    },
    {
      icon: <Leaf className="w-12 h-12 text-primary" />,
      title: "Agriculture",
      description:
        "Deploy IoT smart agriculture solutions to optimize resource usage. Automation pays for itself in 6–12 months through increased crop yield and reduced waste.",
      accentColor: "rgba(34, 197, 94, 0.5)",
    },
    {
      icon: <HeartPulse className="w-12 h-12 text-primary" />,
      title: "Healthcare",
      description:
        "Smart patient scheduling and automated workflow management. Increase operational efficiency to reduce overheads and ensure better patient outcomes.",
      accentColor: "rgba(255, 165, 0, 0.5)",
    },
    {
      icon: <Zap className="w-12 h-12 text-primary" />,
      title: "Energy",
      description: "Smart grid optimization and predictive maintenance. Control consumption and automatically lower expensive energy bills month over month.",
      accentColor: "rgba(184, 134, 11, 0.5)",
    },
    {
      icon: <Truck className="w-12 h-12 text-primary" />,
      title: "Logistics",
      description:
        "AI-powered route optimization and supply chain tracking. Scale your delivery operations and prevent costly delays without adding extra headcount.",
      accentColor: "rgba(255, 140, 0, 0.5)",
    },
  ]

  // Animation variants for container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  // Animation variants for individual items
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  }

  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/30 dark:from-background dark:to-muted/10" id="industries">
      <div className="container px-4 md:px-6">
        <motion.div
          className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary mb-2">
              Industries Served
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Proven Across Sectors</h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              See why forward-thinking companies choose SEION to reduce costs and automate their operations.
            </p>
          </div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {industries.map((industry, index) => (
            <motion.div key={index} variants={itemVariants} className={index >= 3 ? "lg:col-span-1" : ""}>
              <Card className="h-full bg-background/60 backdrop-blur-sm border transition-all duration-300 hover:shadow-lg dark:bg-background/80">
                <CardHeader className="pb-2">
                  <div className="mb-4">
                    {industry.icon}
                  </div>
                  <CardTitle>{industry.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{industry.description}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
