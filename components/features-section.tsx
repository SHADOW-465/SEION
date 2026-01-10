import FeatureCard from "@/components/feature-card"
import {
  CodeIcon,
  BotIcon,
  CogIcon,
  ChipIcon,
  VideoIcon,
  PaletteIcon,
} from "@/components/feature-icons"

export default function FeaturesSection() {
  const features = [
    {
      icon: <CodeIcon />,
      title: "Web Development",
      description:
        "Custom web applications, responsive websites, and modern web solutions built with cutting-edge technologies for optimal performance and user experience.",
      accentColor: "rgba(255, 215, 0, 0.5)",
    },
    {
      icon: <BotIcon />,
      title: "AI Solutions",
      description: "Comprehensive AI implementations including machine learning models, predictive analytics, and intelligent automation systems tailored to your business needs.",
      accentColor: "rgba(255, 165, 0, 0.5)",
    },
    {
      icon: <CogIcon />,
      title: "Agents & Automations",
      description: "Smart AI agents and workflow automations for customer support, scheduling, data analysis, and business process optimization.",
      accentColor: "rgba(255, 140, 0, 0.5)",
    },
    {
      icon: <ChipIcon />,
      title: "Edge AI & IoT Services",
      description: "Edge computing solutions, IoT device integration, smart sensors, and real-time data processing for industrial and commercial applications.",
      accentColor: "rgba(218, 165, 32, 0.5)",
    },
    {
      icon: <VideoIcon />,
      title: "Video Editing",
      description: "Professional video editing services, motion graphics, and multimedia content creation for marketing, training, and promotional materials.",
      accentColor: "rgba(184, 134, 11, 0.5)",
    },
    {
      icon: <PaletteIcon />,
      title: "Logo Design",
      description: "Creative logo design and brand identity development that captures your brand essence and creates lasting visual impact.",
      accentColor: "rgba(255, 193, 7, 0.5)",
    },
  ]

  return (
    <section className="py-20 bg-muted/50 dark:bg-muted/10" id="services" aria-labelledby="services-heading">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary mb-2">
              Our Services
            </div>
            <h2 id="services-heading" className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Comprehensive Digital Solutions
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              From web development to AI automation, we provide end-to-end digital transformation services for modern businesses.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
