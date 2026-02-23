import FeatureCard from "@/components/feature-card"
import {
  Activity,
  AlertTriangle,
  Factory,
  Zap,
  TrendingUp,
} from "lucide-react"

export default function FeaturesSection() {
  const features = [
    {
      icon: <AlertTriangle className="w-12 h-12 text-primary" />,
      title: "Reduce machine downtime",
      description:
        "AI-driven predictive analytics identify potential issues before they cause costly interruptions in your production line.",
      accentColor: "rgba(255, 215, 0, 0.5)",
    },
    {
      icon: <Activity className="w-12 h-12 text-primary" />,
      title: "Monitor operations in real time",
      description: "Gain complete visibility across your operations with real-time dashboards and automated tracking.",
      accentColor: "rgba(255, 165, 0, 0.5)",
    },
    {
      icon: <Factory className="w-12 h-12 text-primary" />,
      title: "Prevent equipment failures",
      description: "Implement continuous health monitoring to prevent catastrophic equipment failures and extend asset lifespan.",
      accentColor: "rgba(255, 140, 0, 0.5)",
    },
    {
      icon: <Zap className="w-12 h-12 text-primary" />,
      title: "Optimize energy usage",
      description: "Smart energy management strategies that reduce consumption and lower operational costs seamlessly.",
      accentColor: "rgba(218, 165, 32, 0.5)",
    },
    {
      icon: <TrendingUp className="w-12 h-12 text-primary" />,
      title: "Increase productivity without increasing manpower",
      description: "Automate repetitive tasks and workflows so your team can focus on complex, high-value activities.",
      accentColor: "rgba(184, 134, 11, 0.5)",
    },
  ]

  return (
    <section className="py-20 bg-muted/50 dark:bg-muted/10" id="services" aria-labelledby="services-heading">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary mb-2">
              Business Outcomes
            </div>
            <h2 id="services-heading" className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Results That Transform Operations
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              From reducing downtime to optimizing energy, we provide real impact for modern businesses.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              accentColor={feature.accentColor}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
