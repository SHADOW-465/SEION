import React, { useState } from 'react';
import { Filter, ArrowRight, TrendingUp, Clock, Users } from 'lucide-react';

interface CaseStudiesProps {
  darkMode: boolean;
}

const CaseStudies: React.FC<CaseStudiesProps> = ({ darkMode }) => {
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'Healthcare', 'Manufacturing', 'Financial', 'Enterprise'];

  const caseStudies = [
    {
      category: 'Healthcare',
      title: 'AI-Powered Diagnostic System',
      client: 'Major Hospital Network',
      challenge: 'Reduce diagnostic errors and improve patient outcomes through advanced AI analysis.',
      solution: 'Implemented computer vision AI for medical imaging analysis with 99.2% accuracy.',
      results: ['45% reduction in diagnostic errors', '60% faster diagnosis time', '$2.3M annual savings'],
      image: 'https://images.pexels.com/photos/356040/pexels-photo-356040.jpeg?auto=compress&cs=tinysrgb&w=800',
      metrics: { roi: '340%', timeline: '6 months', users: '2,500+' }
    },
    {
      category: 'Manufacturing',
      title: 'Smart Factory Automation',
      client: 'Global Manufacturing Leader',
      challenge: 'Optimize production efficiency and reduce downtime through predictive maintenance.',
      solution: 'Deployed IoT sensors and ML algorithms for real-time equipment monitoring.',
      results: ['35% reduction in downtime', '28% increase in productivity', '$5.1M cost savings'],
      image: 'https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg?auto=compress&cs=tinysrgb&w=800',
      metrics: { roi: '420%', timeline: '8 months', users: '1,200+' }
    },
    {
      category: 'Financial',
      title: 'Fraud Detection Platform',
      client: 'International Bank',
      challenge: 'Enhance fraud detection capabilities while reducing false positives.',
      solution: 'Built advanced ML models for real-time transaction analysis and risk scoring.',
      results: ['92% fraud detection accuracy', '65% reduction in false positives', '$12M prevented losses'],
      image: 'https://images.pexels.com/photos/534216/pexels-photo-534216.jpeg?auto=compress&cs=tinysrgb&w=800',
      metrics: { roi: '580%', timeline: '4 months', users: '50,000+' }
    },
    {
      category: 'Enterprise',
      title: 'Digital Transformation Suite',
      client: 'Fortune 500 Company',
      challenge: 'Modernize legacy systems and automate complex business processes.',
      solution: 'Comprehensive digital transformation with cloud migration and process automation.',
      results: ['70% process automation', '50% operational cost reduction', '99.9% system uptime'],
      image: 'https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&cs=tinysrgb&w=800',
      metrics: { roi: '290%', timeline: '12 months', users: '10,000+' }
    }
  ];

  const filteredCaseStudies = activeFilter === 'All' 
    ? caseStudies 
    : caseStudies.filter(study => study.category === activeFilter);

  return (
    <section id="case-studies" className={`py-24 ${
      darkMode ? 'bg-slate-800' : 'bg-slate-50'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            Proven Results
          </h2>
          <p className={`text-xl max-w-3xl mx-auto mb-8 ${
            darkMode ? 'text-slate-300' : 'text-slate-600'
          }`}>
            Real success stories from industry leaders who transformed their operations with our solutions.
          </p>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-2">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeFilter === filter
                    ? 'bg-blue-600 text-white shadow-lg'
                    : darkMode
                    ? 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredCaseStudies.map((study, index) => (
            <div
              key={index}
              className={`group relative overflow-hidden rounded-2xl transition-all duration-500 hover:transform hover:scale-105 ${
                darkMode 
                  ? 'bg-slate-900 border border-slate-700' 
                  : 'bg-white border border-slate-200 shadow-lg hover:shadow-2xl'
              }`}
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={study.image}
                  alt={study.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full">
                    {study.category}
                  </span>
                </div>

                {/* Metrics */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center justify-between text-white text-sm">
                    <div className="flex items-center">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      {study.metrics.roi} ROI
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {study.metrics.timeline}
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {study.metrics.users}
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                  {study.title}
                </h3>
                
                <p className={`text-sm mb-4 ${
                  darkMode ? 'text-slate-400' : 'text-slate-500'
                }`}>
                  {study.client}
                </p>

                <div className="space-y-4 mb-6">
                  <div>
                    <h4 className={`text-sm font-semibold mb-1 ${
                      darkMode ? 'text-slate-300' : 'text-slate-700'
                    }`}>
                      Challenge
                    </h4>
                    <p className={`text-sm ${
                      darkMode ? 'text-slate-400' : 'text-slate-600'
                    }`}>
                      {study.challenge}
                    </p>
                  </div>

                  <div>
                    <h4 className={`text-sm font-semibold mb-1 ${
                      darkMode ? 'text-slate-300' : 'text-slate-700'
                    }`}>
                      Solution
                    </h4>
                    <p className={`text-sm ${
                      darkMode ? 'text-slate-400' : 'text-slate-600'
                    }`}>
                      {study.solution}
                    </p>
                  </div>

                  <div>
                    <h4 className={`text-sm font-semibold mb-2 ${
                      darkMode ? 'text-slate-300' : 'text-slate-700'
                    }`}>
                      Results
                    </h4>
                    <ul className="space-y-1">
                      {study.results.map((result, resultIndex) => (
                        <li key={resultIndex} className={`flex items-center text-sm ${
                          darkMode ? 'text-slate-400' : 'text-slate-600'
                        }`}>
                          <div className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2"></div>
                          {result}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* CTA */}
                <a
                  href="#contact"
                  className="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                >
                  View Full Case Study
                  <ArrowRight className="ml-2 w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className={`inline-flex flex-col items-center gap-4 p-8 rounded-2xl ${
            darkMode ? 'bg-slate-900' : 'bg-white'
          } border ${darkMode ? 'border-slate-700' : 'border-slate-200'}`}>
            <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              Ready to achieve similar results?
            </h3>
            <p className={`text-center max-w-md ${
              darkMode ? 'text-slate-300' : 'text-slate-600'
            }`}>
              Let's discuss how we can transform your business with proven solutions.
            </p>
            <a
              href="#contact"
              className="px-8 py-3 btn-aquamarine font-semibold rounded-lg shadow-lg hover:shadow-xl"
            >
              See Our Results
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;