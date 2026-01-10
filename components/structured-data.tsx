export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "SEION AI Automation Platform",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      priceValidUntil: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split("T")[0],
    },
    description:
      "AI automation for predictive maintenance, smart scheduling, IoT, and business workflow automation for Indian industries.",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      ratingCount: "89",
    },
    featureList: [
      "Predictive Maintenance",
      "Smart Scheduling",
      "IoT Integration",
      "Business Workflow Automation",
      "Digital Transformation",
      "Industry-Specific Solutions",
    ],
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
}
