import React from 'react';
import { Brain, Zap, Code, Video, Users, ArrowRight } from 'lucide-react';

interface ServicesProps {
  darkMode: boolean;
}

const Services: React.FC<ServicesProps> = ({ darkMode }) => {
  const services = [
    {
      icon: Brain,
      title: 'AI Solutions',
      description: 'Custom AI models, machine learning, and intelligent automation systems that transform your business operations.',
      features: ['Predictive Analytics', 'Natural Language Processing', 'Computer Vision', 'Decision Support Systems'],
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Zap,
      title: 'Process Automation',
      description: 'End-to-end workflow automation that eliminates manual tasks and accelerates business processes.',
      features: ['RPA Implementation', 'Workflow Optimization', 'Integration Services', 'Performance Monitoring'],
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Code,
      title: 'Web & App Development',
      description: 'Enterprise-grade applications built with cutting-edge technology and scalable architecture.',
      features: ['Custom Web Apps', 'Mobile Solutions', 'Cloud Architecture', 'API Development'],
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Video,
      title: 'Video Solutions',
      description: 'Professional video production, streaming platforms, and interactive media experiences.',
      features: ['Corporate Videos', 'Training Content', 'Live Streaming', 'Interactive Media'],
      color: 'from-red-500 to-red-600'
    },
    {
      icon: Users,
      title: 'Strategic Consulting',
      description: 'Expert guidance on digital transformation, technology strategy, and implementation roadmaps.',
      features: ['Digital Strategy', 'Technology Audit', 'Change Management', 'ROI Optimization'],
      color: 'from-orange-500 to-orange-600'
    }
  ];

  return (
    <section id="services" className={`py-24 ${
      darkMode ? 'bg-slate-800' : 'bg-slate-50'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            Enterprise Solutions
          </h2>
          <p className={`text-xl max-w-3xl mx-auto ${
            darkMode ? 'text-slate-300' : 'text-slate-600'
          }`}>
            Comprehensive digital services designed for Fortune 500 companies, 
            healthcare systems, and industrial leaders.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div
                key={index}
                id={`services-${service.title.replace(/[^a-zA-Z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')}`}
                className={`group relative p-8 rounded-2xl transition-all duration-300 hover:transform hover:scale-105 scroll-mt-32 ${
                  darkMode 
                    ? 'bg-slate-900 hover:bg-slate-700 border border-slate-700' 
                    : 'bg-white hover:bg-slate-50 border border-slate-200 shadow-lg hover:shadow-xl'
                }`}
              >
                {/* Icon */}
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${service.color} mb-6`}>
                  <IconComponent className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <h3 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                  {service.title}
                </h3>
                
                <p className={`text-base mb-6 leading-relaxed ${
                  darkMode ? 'text-slate-300' : 'text-slate-600'
                }`}>
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className={`flex items-center text-sm ${
                      darkMode ? 'text-slate-400' : 'text-slate-500'
                    }`}>
                      <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${service.color} mr-3`}></div>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a
                  href="#contact"
                  className={`inline-flex items-center text-sm font-semibold transition-colors group-hover:text-blue-600 ${
                    darkMode ? 'text-slate-300' : 'text-slate-700'
                  }`}
                >
                  Learn More
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <a
            href="#contact"
            className="inline-flex items-center px-8 py-4 btn-aquamarine text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl"
          >
            Get Expert Advice
            <ArrowRight className="ml-2 w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Services;