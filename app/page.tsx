"use client";

import { Button } from "@/components/ui/button"
import { Bot, Cog, Factory, TrendingUp, Zap, Mail } from 'lucide-react'
import ContactForm from "@/components/contact-form"
import UseCases from "@/components/use-cases"
import TeamSection from "@/components/team-section"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import TypingPromptInput from "@/components/typing-prompt-input"
import FramerSpotlight from "@/components/framer-spotlight"
import CssGridBackground from "@/components/css-grid-background"
import FeaturesSection from "@/components/features-section"
import ProjectsSlideshow from "@/components/projects-slideshow"
import StructuredData from "@/components/structured-data"
import { useState } from "react"
import { useSupabase } from "@/components/supabase-provider"

export default function Home() {
  const [emailSubscription, setEmailSubscription] = useState('')
  const [isSubscribing, setIsSubscribing] = useState(false)
  const [subscriptionMessage, setSubscriptionMessage] = useState('')
  const supabase = useSupabase()

  const handleEmailSubscription = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubscribing(true)
    
    try {
      if (!supabase) {
        throw new Error("Supabase client is not available.")
      }
      const { data, error } = await supabase
        .from('email_subscriptions')
        .insert([
          {
            email: emailSubscription,
            source: 'hero_section',
            created_at: new Date().toISOString()
          }
        ])

      if (error) throw error

      setSubscriptionMessage('Thank you for subscribing!')
      setEmailSubscription('')
      setTimeout(() => setSubscriptionMessage(''), 3000)
    } catch (error) {
      console.error('Error subscribing:', error)
      setSubscriptionMessage('Error subscribing. Please try again.')
      setTimeout(() => setSubscriptionMessage(''), 3000)
    } finally {
      setIsSubscribing(false)
    }
  }

  return (
    <>
      <StructuredData />
      <div className="flex min-h-screen flex-col">
        <Navbar />

        {/* Hero Section */}
        <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <CssGridBackground />
          <FramerSpotlight />
          <div className="container px-4 md:px-6 py-16 md:py-20">
            <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm mb-6">
                Premium Enterprise AI Solution
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-6">
                The <span className="seion-metallic-text">AI-Powered Software Solutions Provider</span> for India's Growing Businesses
              </h1>
              <p className="text-xl text-muted-foreground md:text-2xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed max-w-3xl mb-12">
                SEION delivers custom web development, smart automation, IoT integration, and scalable AI tools—all built to suit your unique business needs at a price that works for you.
              </p>

              {/* Email Subscription */}
              <form onSubmit={handleEmailSubscription} className="w-full max-w-md mb-8">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={emailSubscription}
                      onChange={(e) => setEmailSubscription(e.target.value)}
                      required
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  <Button type="submit" className="seion-button text-black font-medium px-6 py-3" disabled={isSubscribing}>
                    <Zap className="h-4 w-4" />
                  </Button>
                </div>
                {subscriptionMessage && (
                  <p className={`text-sm mt-2 text-center ${subscriptionMessage.includes('Error') ? 'text-red-500' : 'text-green-500'}`}>
                    {subscriptionMessage}
                  </p>
                )}
              </form>

              <div className="flex flex-wrap justify-center gap-4 mt-8">
                <Button 
                  className="flex items-center gap-3 px-6 py-3 seion-button text-black font-medium rounded-xl border-0 relative overflow-hidden group"
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-seion-300/0 via-white/30 to-seion-300/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-x-[-100%] group-hover:translate-x-[100%]"></div>
                  <Bot className="h-5 w-5 text-black relative z-10" />
                  <span className="relative z-10">Connect with Our Experts</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="px-6 py-3 rounded-xl border-2 border-primary/20 bg-transparent hover:bg-primary/10 text-foreground font-medium"
                  onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  View Our Projects
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <FeaturesSection />

        {/* Projects Slideshow */}
        <ProjectsSlideshow id="projects" />

        {/* Industries Section */}
        <UseCases />

        {/* Team Section */}
        <TeamSection />

        {/* Contact Section */}
        <section id="contact" className="py-20 bg-muted/50 dark:bg-muted/10" aria-labelledby="contact-heading">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-start">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 id="contact-heading" className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    Ready to Transform Your Business?
                  </h2>
                  <p className="text-muted-foreground md:text-xl">
                    Get started with AI automation solutions tailored for your industry. Our experts will help you identify the best opportunities for digital transformation.
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Bot className="h-5 w-5 text-primary" />
                    <span>Custom AI automation solutions</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Factory className="h-5 w-5 text-primary" />
                    <span>Industry-specific implementations</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    <span>Scalable and affordable solutions</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Cog className="h-5 w-5 text-primary" />
                    <span>End-to-end support and maintenance</span>
                  </div>
                </div>
                <div className="pt-4">
                  <p className="font-medium">
                    Contact our experts to discuss your specific automation needs and get a customized solution.
                  </p>
                </div>
              </div>
              <div className="lg:ml-10">
                <ContactForm />
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  )
}
