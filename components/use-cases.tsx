"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import FrostedGlassIcon from "@/components/frosted-glass-icon"
import {
  BuildingIcon,
  FactoryIcon,
  HealthcareIcon,
  LogisticsIcon,
  RetailIcon,
  EnergyIcon,
} from "@/components/use-case-icons"

export default function UseCases() {
  const industries = [
    {
      icon: <FactoryIcon />,
      title: "Manufacturing Excellence",
      description:
        "Implement predictive maintenance, quality control automation, and production optimization to increase efficiency by 40%.",
      accentColor: "rgba(255, 215, 0, 0.5)",
    },
    {
      icon: <HealthcareIcon />,
      title: "Healthcare Innovation",
      description:
        "Smart patient scheduling, automated workflow management, and IoT-enabled monitoring for better patient outcomes.",
      accentColor: "rgba(255, 165, 0, 0.5)",
    },
    {
      icon: <LogisticsIcon />,
      title: "Logistics Optimization",
      description:
        "AI-powered route optimization, inventory management, and supply chain automation to reduce costs by 30%.",
      accentColor: "rgba(255, 140, 0, 0.5)",
    },
    {
      icon: <RetailIcon />,
      title: "Retail Transformation",
      description: "Demand forecasting, inventory optimization, and customer experience automation for retail growth.",
      accentColor: "rgba(218, 165, 32, 0.5)",
    },
    {
      icon: <EnergyIcon />,
      title: "Energy Management",
      description: "Smart grid optimization, predictive maintenance for energy infrastructure, and consumption analytics.",
      accentColor: "rgba(184, 134, 11, 0.5)",
    },
    {
      icon: <BuildingIcon />,
      title: "Smart Buildings",
      description: "IoT-enabled building automation, energy optimization, and predictive maintenance for facilities.",
      accentColor: "rgba(255, 193, 7, 0.5)",
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
              Industries
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Industry Applications</h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Real-world AI automation implementations across diverse industries in India.
            </p>
          </div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {industries.map((industry, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="h-full bg-background/60 backdrop-blur-sm border transition-all duration-300 hover:shadow-lg dark:bg-background/80">
                <CardHeader className="pb-2">
                  <FrostedGlassIcon icon={industry.icon} color={industry.accentColor} className="mb-4" />
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
