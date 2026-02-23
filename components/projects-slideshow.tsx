"use client"

import { useState, useEffect } from "react"
import { useSupabase } from "@/components/supabase-provider"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react'
import { Badge } from "@/components/ui/badge"

export default function ProjectsSlideshow() {
  const supabase = useSupabase()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [showContactForm, setShowContactForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
    interestedProject: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')

  const projects = [
    {
      title: "AI-Based Predictive Maintenance for Industrial Machines",
      description: "Advanced machine learning system that predicts equipment failures before they occur, reducing downtime by up to 50% and maintenance costs by 30%.",
      category: "AI Solutions",
      tags: ["Machine Learning", "Predictive Analytics", "Industrial IoT"],
      image: "/maintain.png?height=300&width=500"
    },
    {
      title: "SubGEN: AI Subtitle Generator",
      description: "Intelligent subtitle generation system that translates any language audio into English subtitles with 95% accuracy using advanced NLP and speech recognition.",
      category: "AI Solutions",
      tags: ["NLP", "Speech Recognition", "Translation"],
      image: "/subgen.png?height=300&width=500"
    },
    {
      title: "AI Smart Scheduling Systems",
      description: "Intelligent scheduling platform for healthcare and industries that optimizes resource allocation and reduces waiting times by 40%.",
      category: "AI Solutions",
      tags: ["Healthcare", "Optimization", "Scheduling"],
      image: "/schedule.png?height=300&width=500"
    },
    {
      title: "AI Study Planner and Doubt Solver",
      description: "Educational AI assistant that creates personalized study plans and provides instant doubt resolution for students across various subjects.",
      category: "AI Solutions",
      tags: ["Education", "Personalization", "AI Tutor"],
      image: "/study.jpg?height=300&width=500"
    },
    {
      title: "Skin and Haircare AI Chatbot",
      description: "Specialized AI chatbot that provides personalized skincare and haircare recommendations based on user inputs and image analysis.",
      category: "AI Solutions",
      tags: ["Healthcare", "Computer Vision", "Personalization"],
      image: "/skincare.jpg?height=300&width=500"
    },
    {
      title: "Intelligent Traffic Management System (ITMS)",
      description: "Smart traffic management solution for rural and semi-urban areas using AI-powered traffic flow optimization and real-time monitoring.",
      category: "IoT Solutions",
      tags: ["Smart City", "Traffic Management", "IoT"],
      image: "/ITMS.png?height=300&width=500"
    },
    {
      title: "Smart Energy Management System (SEMS)",
      description: "Comprehensive energy management platform that optimizes energy consumption and reduces costs by up to 35% using AI-driven insights.",
      category: "IoT Solutions",
      tags: ["Energy Management", "IoT", "Sustainability"],
      image: "/SEMS.png?height=300&width=500"
    },
    {
      title: "Smart Construction Site Monitoring",
      description: "AI-powered monitoring system for construction sites that enhances operational efficiency, safety compliance, and project management.",
      category: "AI Solutions",
      tags: ["Construction", "Safety", "Monitoring"],
      image: "/SCSM.png?height=300&width=500"
    },
    {
      title: "Transformer Fault Detection System",
      description: "Advanced fault detection and prediction system for electrical transformers using machine learning and IoT sensors.",
      category: "AI Solutions",
      tags: ["Electrical", "Fault Detection", "Predictive Maintenance"],
      image: "/TRANS.png?height=300&width=500"
    },
    {
      title: "AI Image Generator",
      description: "Custom AI image generation platform that creates high-quality images from text descriptions using advanced generative AI models.",
      category: "AI Solutions",
      tags: ["Generative AI", "Image Generation", "Creative AI"],
      image: "/IMAGEN.png?height=300&width=500"
    },
    {
      title: "Smart Solar Tracking System",
      description: "IoT-enabled solar panel tracking system that maximizes energy capture by automatically adjusting panel orientation based on sun position.",
      category: "IoT Solutions",
      tags: ["Solar Energy", "IoT", "Automation"],
      image: "/SMTS.png?height=300&width=500"
    },
    {
      title: "Smart Irrigation & Flood Prevention System",
      description: "Intelligent irrigation system with flood prevention capabilities using IoT sensors, weather data, and predictive analytics.",
      category: "IoT Solutions",
      tags: ["Agriculture", "IoT", "Water Management"],
      image: "/VMS.jpg?height=300&width=500"
    }
  ]

  const automations = [
    {
      title: "Customer Support Chatbot",
      description: "Website-integrated chatbot that provides 24/7 customer support with context-aware responses specific to your business.",
      category: "AI Automations",
      tags: ["Customer Support", "Website Integration", "24/7 Service"]
    },
    {
      title: "Telegram AI Chatbot",
      description: "Custom Telegram bot with general knowledge capabilities for answering questions and providing assistance.",
      category: "AI Automations",
      tags: ["Telegram", "General AI", "Chat Interface"]
    },
    {
      title: "AI Prompt Generator",
      description: "N8N workflow that generates optimized prompts based on user requirements and specific use cases.",
      category: "AI Automations",
      tags: ["Prompt Engineering", "N8N", "Workflow Automation"]
    },
    {
      title: "Sentiment Analysis Automation",
      description: "Automated workflow that analyzes data sentiment and converts insights into visual bar charts and reports.",
      category: "AI Automations",
      tags: ["Sentiment Analysis", "Data Visualization", "Analytics"]
    },
    {
      title: "WhatsApp AI Legal Assistant",
      description: "WhatsApp-based AI chatbot providing legal assistance and consultation through familiar chat interface.",
      category: "AI Automations",
      tags: ["WhatsApp", "Legal Tech", "AI Assistant"]
    },
    {
      title: "AI Calling Agent",
      description: "Automated calling system for appointment reminders and task notifications via phone calls.",
      category: "AI Automations",
      tags: ["Voice AI", "Appointment Management", "Phone Automation"]
    },
    {
      title: "Telecalling Agent",
      description: "Customizable AI-powered telecalling agent for sales, surveys, and customer outreach campaigns.",
      category: "AI Automations",
      tags: ["Telecalling", "Sales Automation", "Customer Outreach"]
    },
    {
      title: "Appointment Reminder Agent",
      description: "Automated system that calls doctors and patients based on calendar appointments for timely reminders.",
      category: "AI Automations",
      tags: ["Healthcare", "Appointment Management", "Calendar Integration"]
    },
    {
      title: "Spam Detection Agent",
      description: "Security-focused workflow that detects spam and provides security awareness by analyzing websites and applications.",
      category: "AI Automations",
      tags: ["Security", "Spam Detection", "Web Analysis"]
    },
    {
      title: "Mail Automation Agent",
      description: "Intelligent email management system that filters, categorizes, and automates email workflows to save time.",
      category: "AI Automations",
      tags: ["Email Automation", "Productivity", "Mail Filtering"]
    }
  ]

  const allProjects = [...projects, ...automations]

  useEffect(() => {
    if (isAutoPlaying) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % allProjects.length)
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [isAutoPlaying, allProjects.length])

  const nextProject = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % allProjects.length)
  }

  const prevProject = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + allProjects.length) % allProjects.length)
  }

  const goToProject = (index: number) => {
    setCurrentIndex(index)
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      if (!supabase) {
        throw new Error("Supabase client is not available.")
      }
      const { data, error } = await supabase
        .from('project_inquiries')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            company: formData.company,
            message: formData.message,
            interested_project: formData.interestedProject,
            created_at: new Date().toISOString()
          }
        ])

      if (error) throw error

      setSubmitMessage('Thank you! Your inquiry has been submitted successfully.')
      setFormData({ name: '', email: '', company: '', message: '', interestedProject: '' })
      setTimeout(() => {
        setShowContactForm(false)
        setSubmitMessage('')
      }, 3000)
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitMessage('Sorry, there was an error submitting your inquiry. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const openContactForm = (projectTitle: string) => {
    setFormData({
      ...formData,
      interestedProject: projectTitle
    })
    setShowContactForm(true)
  }

  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/30 dark:from-background dark:to-muted/10" id="projects">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary mb-2">
              Case Studies
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Proven Impact & Results
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Explore our case studies of AI solutions, IoT implementations, and automation projects delivering measurable ROI.
            </p>
          </div>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div
            className="relative overflow-hidden rounded-xl"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -300 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <Card className="border-0 shadow-2xl bg-background/80 backdrop-blur-sm">
                  <div className="grid md:grid-cols-2 gap-0">
                    {allProjects[currentIndex].image && (
                      <div className="relative h-64 md:h-auto">
                        <img
                          src={allProjects[currentIndex].image || "/placeholder.svg"}
                          alt={allProjects[currentIndex].title}
                          className="w-full h-full object-cover rounded-l-xl"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-l-xl" />
                      </div>
                    )}
                    <div className={`flex flex-col justify-center ${!allProjects[currentIndex].image ? 'col-span-2' : ''}`}>
                      <CardHeader className="pb-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="secondary" className="bg-primary/10 text-primary">
                            {allProjects[currentIndex].category}
                          </Badge>
                        </div>
                        <CardTitle className="text-xl md:text-2xl leading-tight">
                          {allProjects[currentIndex].title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <CardDescription className="text-base mb-4 leading-relaxed">
                          {allProjects[currentIndex].description}
                        </CardDescription>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {allProjects[currentIndex].tags.map((tag, tagIndex) => (
                            <Badge key={tagIndex} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="w-fit" onClick={() => openContactForm(allProjects[currentIndex].title)}>
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Get More Info
                          </Button>
                        </div>
                      </CardContent>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <Button
              variant="outline"
              size="icon"
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-background/90"
              onClick={prevProject}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-background/90"
              onClick={nextProject}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-6 space-x-2">
            {allProjects.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentIndex
                    ? 'bg-primary w-8'
                    : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                  }`}
                onClick={() => goToProject(index)}
              />
            ))}
          </div>

          {/* Project Counter */}
          <div className="text-center mt-4 text-sm text-muted-foreground">
            {currentIndex + 1} of {allProjects.length} case studies
          </div>

          {/* Contact Form Modal */}
          {showContactForm && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-background rounded-xl p-6 w-full max-w-md border shadow-2xl">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">Project Inquiry</h3>
                  <Button variant="ghost" size="sm" onClick={() => setShowContactForm(false)}>
                    ✕
                  </Button>
                </div>

                {submitMessage ? (
                  <div className="text-center py-8">
                    <p className={`text-sm ${submitMessage.includes('error') ? 'text-red-500' : 'text-green-500'}`}>
                      {submitMessage}
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Company</label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Interested Project</label>
                      <input
                        type="text"
                        name="interestedProject"
                        value={formData.interestedProject}
                        onChange={handleInputChange}
                        readOnly
                        className="w-full px-3 py-2 border rounded-lg bg-muted"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Message</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                        placeholder="Tell us about your requirements..."
                      />
                    </div>

                    <Button type="submit" className="w-full seion-button text-black" disabled={isSubmitting}>
                      {isSubmitting ? 'Submitting...' : 'Submit Inquiry'}
                    </Button>
                  </form>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
