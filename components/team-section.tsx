"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Linkedin, Mail, Phone } from 'lucide-react'

export default function TeamSection() {
  const teamMembers = [
    {
      name: "Showmik Kumaar",
      role: "Founder & CEO",
      avatar: "SK",
      description:
        "A visionary tech leader shaping the future of AI innovation in India. With a strong foundation in electronics and a deep understanding of AI, Showmik is the driving force behind our strategy, growth, and breakthrough product innovations.",
      specialties: ["AI Development", "Business Strategy", "Technical Leadership"],
      accentColor: "rgba(20, 184, 166, 0.5)",
      linkedin: "https://www.linkedin.com/in/showmik-kumaar-39a767317/",
    },
    {
      name: "Prithvi Raj",
      role: "Co-Founder & COO",
      avatar: "PR",
      description:
        "A systems-driven innovator specializing in AI and IoT. Prithvi bridges the gap between hardware and intelligence, leading operations and execution with a strong focus on building scalable, real-world smart systems.",
      specialties: ["IoT Solutions", "AI Integration", "Financial & Risk Management"],
      accentColor: "rgba(59, 130, 246, 0.5)",
      linkedin: "https://www.linkedin.com/in/prithiviraj-thiruvarasan-a3733a27b/",
    },
    {
      name: "Ganesh",
      role: "Chief Technology Officer (CTO)",
      avatar: "GN",
      description:
        "The architect behind our technical strength. Ganesh ensures that every solution we build is powerful, scalable, and secure — combining AI expertise with sharp problem-solving and engineering leadership.",
      specialties: ["Technical Architecture", "Web Development", "Team Leadership"],
      accentColor: "rgba(168, 85, 247, 0.5)",
      linkedin: "https://www.linkedin.com/in/ganeshkumar023/",
    },
    {
      name: "Dharsan",
      role: "Chief Growth & Community Officer (CGCO)",
      avatar: "DH",
      description:
        "The voice of our brand and the builder of our tribe. Dharsan crafts strategies that amplify our presence, grow our reach, and nurture a loyal, engaged community around our vision.",
      specialties: ["Brand Strategy", "Community Building", "Growth Marketing"],
      accentColor: "rgba(236, 72, 153, 0.5)",
      linkedin: "https://www.linkedin.com/in/dharsanarunkumar/",
    },
    {
      name: "kirthika",
      role: "Chief Creative officer (CCO)",
      avatar: "KR",
      description:
        "drives the company’s creative vision, shaping brand identity, design, and innovation strategies. They ensure every idea, campaign, and product reflects the company’s values, connects with audiences, and sets the brand apart in the market",
      specialties: ["Brand Identity", "User Experience", "Innovation Strategies"],
      accentColor: "rgba(34, 197, 94, 0.5)",
    },
  ]

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
    <section id="about" className="py-20">
      <div className="container px-4 md:px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary mb-4">
            Our Team
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
            Meet the Experts Behind SEION
          </h2>
          <p className="mx-auto max-w-[800px] text-muted-foreground md:text-xl">
            Our diverse team combines deep technical expertise in AI, IoT, and automation with practical business
            experience to deliver solutions that truly transform industries.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {teamMembers.map((member, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="h-full bg-background/60 backdrop-blur-sm border transition-all duration-300 hover:shadow-lg dark:bg-background/80 group relative overflow-hidden">
                {/* Animated background gradient */}
                <motion.div
                  className="absolute inset-0 z-0 opacity-10 dark:opacity-20"
                  initial={{ opacity: 0 }}
                  animate={{
                    background: [
                      `radial-gradient(circle at 30% 30%, ${member.accentColor} 0%, transparent 60%)`,
                      `radial-gradient(circle at 70% 70%, ${member.accentColor} 0%, transparent 60%)`,
                    ],
                    opacity: [0.1, 0.2, 0.1],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                    ease: "easeInOut",
                  }}
                />

                <CardContent className="p-6 relative z-10">
                  <div className="flex flex-col items-center text-center space-y-4">
                    {/* Avatar */}
                    <div className="relative">
                      <Avatar className="w-20 h-20 border-4 border-background shadow-lg">
                        <AvatarFallback className="text-lg font-bold bg-gradient-to-br from-primary/20 to-primary/10">
                          {member.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div
                        className="absolute inset-0 rounded-full opacity-20 blur-sm"
                        style={{ background: member.accentColor }}
                      />
                    </div>

                    {/* Name and Role */}
                    <div>
                      <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{member.name}</h3>
                      <p className="text-primary font-medium">{member.role}</p>
                      <p className="text-sm text-muted-foreground mt-1">{member.background}</p>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground leading-relaxed">{member.description}</p>

                    {/* Specialties */}
                    <div className="flex flex-wrap gap-2 justify-center">
                      {member.specialties.map((specialty, idx) => (
                        <Badge
                          key={idx}
                          variant="secondary"
                          className="text-xs bg-primary/10 text-primary border-primary/20"
                        >
                          {specialty}
                        </Badge>
                      ))}
                    </div>

                    {/* Social Links */}
                    <div className="flex gap-3 pt-2">
                      {member.linkedin && (
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-full bg-muted/50 hover:bg-primary/10 transition-colors"
                          aria-label={`${member.name} LinkedIn`}
                        >
                          <Linkedin className="h-4 w-4" />
                        </a>
                      )}
                      <button
                        className="p-2 rounded-full bg-muted/50 hover:bg-primary/10 transition-colors"
                        aria-label={`Email ${member.name}`}
                      >
                        <Mail className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Contact Information */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="bg-background/60 backdrop-blur-sm border rounded-lg p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-6">Get in Touch</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <a
                href="mailto:seion.automation.services@gmail.com"
                className="flex items-center justify-center gap-3 text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="h-5 w-5 text-primary" />
                <span>seion.automation.services@gmail.com</span>
              </a>
              <div className="flex flex-col items-center justify-center gap-2">
                <a
                  href="tel:+919551889752"
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                >
                  <Phone className="h-5 w-5 text-primary" />
                  <span>+91 95518 89752</span>
                </a>
                <a
                  href="tel:+919342475264"
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                >
                  <Phone className="h-5 w-5 text-primary" />
                  <span>+91 93424 75264</span>
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Team Stats */}
        <motion.div
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div>
            <div className="text-3xl font-bold text-primary mb-2">22+</div>
            <div className="text-sm text-muted-foreground">Solutions</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary mb-2">4+</div>
            <div className="text-sm text-muted-foreground">Team Members</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary mb-2">5+</div>
            <div className="text-sm text-muted-foreground">Industries Served</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary mb-2">100%</div>
            <div className="text-sm text-muted-foreground">Client Satisfaction</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
