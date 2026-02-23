import { ClipboardCheck, Lightbulb, Rocket, Wrench } from "lucide-react"

export default function HowItWorks() {
    const steps = [
        {
            number: "01",
            icon: <ClipboardCheck className="w-10 h-10 text-primary" />,
            title: "Audit & Analysis",
            description: "We assess your current operations, identify bottlenecks, and determine the automation potential for your business.",
            accentColor: "rgba(255, 215, 0, 0.5)",
        },
        {
            number: "02",
            icon: <Lightbulb className="w-10 h-10 text-primary" />,
            title: "Custom Solution Design",
            description: "Our experts design a tailored AI or IoT solution that fits perfectly with your existing systems and workflows.",
            accentColor: "rgba(255, 165, 0, 0.5)",
        },
        {
            number: "03",
            icon: <Rocket className="w-10 h-10 text-primary" />,
            title: "Deployment & Integration",
            description: "We handle the end-to-end implementation securely, with zero disruption to your daily operations.",
            accentColor: "rgba(255, 140, 0, 0.5)",
        },
        {
            number: "04",
            icon: <Wrench className="w-10 h-10 text-primary" />,
            title: "Monitoring & Support",
            description: "We provide 24/7 proactive monitoring, continuous optimization, and dedicated support to ensure peak performance.",
            accentColor: "rgba(218, 165, 32, 0.5)",
        },
    ]

    return (
        <section className="py-20 bg-background" id="how-it-works">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center text-center mb-16 space-y-4">
                    <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary mb-2">
                        Process
                    </div>
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                        How It Works
                    </h2>
                    <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                        A seamless, four-step journey to digitally transform operations and accelerate growth.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
                    <div className="hidden lg:block absolute top-[60px] left-[12%] right-[12%] h-0.5 bg-border z-0" />

                    {steps.map((step, index) => (
                        <div key={index} className="relative z-10 flex flex-col items-center text-center space-y-4">
                            <div className="w-20 h-20 rounded-full bg-background border-4 border-muted/50 flex items-center justify-center shadow-lg mb-4 relative">
                                <div
                                    className="absolute inset-0 rounded-full opacity-20 blur-md"
                                    style={{ background: step.accentColor }}
                                />
                                {step.icon}
                                <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold flex items-center justify-center text-sm ring-4 ring-background">
                                    {step.number}
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-foreground">{step.title}</h3>
                            <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
