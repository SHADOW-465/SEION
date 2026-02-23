import { Award, Handshake, ShieldCheck, Users } from "lucide-react"

export default function TrustSignals() {
    const trustedMetrics = [
        {
            icon: <Award className="w-8 h-8 text-primary" />,
            title: "Hackathon Recognitions",
            value: "10+",
            description: "Awards for AI & IoT innovation",
        },
        {
            icon: <Handshake className="w-8 h-8 text-primary" />,
            title: "Industry Collaborations",
            value: "5+",
            description: "Strategic tech partnerships",
        },
        {
            icon: <ShieldCheck className="w-8 h-8 text-primary" />,
            title: "Pilot Deployments",
            value: "20+",
            description: "Successful field implementations",
        },
        {
            icon: <Users className="w-8 h-8 text-primary" />,
            title: "Client Satisfaction",
            value: "100%",
            description: "Satisfied enterprise clients",
        },
    ]

    return (
        <section className="py-12 bg-background border-b" id="trust-signals">
            <div className="container px-4 md:px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-border/50">
                    {trustedMetrics.map((metric, index) => (
                        <div key={index} className="flex flex-col items-center space-y-2">
                            <div className="p-3 bg-primary/10 rounded-full mb-3">
                                {metric.icon}
                            </div>
                            <h3 className="text-3xl font-bold tracking-tight text-foreground">{metric.value}</h3>
                            <p className="font-medium text-foreground">{metric.title}</p>
                            <p className="text-sm text-muted-foreground max-w-[200px] mx-auto hidden md:block">{metric.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
