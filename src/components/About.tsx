import React from 'react';
import { Award, Users, Globe, Shield } from 'lucide-react';

interface AboutProps {
  darkMode: boolean;
}

const About: React.FC<AboutProps> = ({ darkMode }) => {
  const placeholderImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJUAAACUCAMAAACtIJvYAAAAYFBMVEUAAAD////4+Pju7u7h4eH8/PzJyclZWVno6Oi1tbX19fUxMTHl5eUhISGxsbG9vb0cHBzZ2dmcnJw4ODgqKiqEhISTk5NHR0d5eXnS0tISEhJAQEBoaGioqKhOTk5wcHDHh5wsAAAE/0lEQVR4nN2c67KiOhBGwx3lJgiiIvL+b3mCjluFhHTCJ1BnVc2/qXJVaDqdTrOZRSJlGFLazzHS/3ICkFXgAK0ykBRjGc7KrmFWtQ2zymFSjOUwqwpoVaGswhJoVYYgqx1QirEdyAr5AGmPkGAFS1ZPKCmLYJUfoVZHwltIsMKl0CeEREqwKsBWBcLKwwY7D3cPYGXfwVZ39aajttpHYKtoj7BKwFYJwsq5gq2u6oSltgrBUoypd0K1VQy3ihFrBX+CiLXaZrTvkdVVTwmxasBWDcLK68BWHWLHsU5gq5P6JwlWqHPzC8L5mWDlH6BSBx9i5eLOqD21C7GyzlCrM+EXKVbYcCcEO8nqgtxzrheQlYU8egWUHyRZIXMDqa9GsnKAVqS2Gq2rhot3SqxTrXJU3VCS2ldEK9iZkHAWpFtZLmbXORDyuoYVKLJoUUW3gtR+hHpPzwpROVCqBU0rb/4zPNFCXcfK8m4zpW5kKQ0rK5zXBokozWN9K8ufoxWRg0rTyvLND6yJjpSelZWZvogH2q2SmZWVma1Woiela2XlJtm0oe3J5lZWrJ8gburW0Fwra6/b6S6o+8wcK/4q6jzFRuvlm2HFl4taBZYGC2VqxestWnTdiPUUyIrvP5VqvcpKY48BWfEk0U51trpWNx1grHh8XQpxZ6QuLkbxBLF6mPnFLaijMjkcDkkZ1cGt8GcZQaweOBff9zP+70Kb7VCBsULzP7ayndh18zx33dghTZyomGvl+G3VBXVzPEZRdDw2ddBVrT83usytvJi/fbJyK+FvYkw/PaCs8rZS7dFNZZxIjaycNKBtz2WQGj1MfSvH1+spnw2iTNdqn+o3SYNUN9nrWXmp2Y1AnepFvo6VszM/pkY7neeoYeXPa3AHGqUy2Srs5t4FXDtyFUi08lLE7XNCDS+aVYy6YDrTjoYkKx93IV6SoosyQQe+84JM0Dlze3xDboA5mQt6yIIHvfIyTmW1w0txLdXMqMKqRQ/JPLm2c6zQowxvpm8ppqwALfYJramEOmWFHn78ZmryV27105XqmVgtuRV6eHWMfJxVatX+XIox6Zsos8LOtMuQ5S2J1QU9uiomkmR5sZWDHR6XcxTviUIrDz16LOcufBFFVvavc8InJ1G7RGSFHrOfRnTFI7DKf1EmyEkEzQiBFfbjDTWCKaOx1e9z+pBxjh9ZzbgvNWV8zzq02i/9/HqCYXdkaLXE9jdmuCEOrPDD7DTiKSsPO4RJ5+xNWGW/OTyouWZyK/B3Zjp8f5P2ZbVOqD9pZVYedgxaj4MnsVo+q39SiK3C5aoqEfdQaLXuUn0t1ttqsapYxke1/LZa5lQzxW5s5a29VHyxvJHVsmWxmGxkhf7qxoRuaLXQsXSav0Pry2rJw5ac07eVs24GfXF3vqy2EOs92ZcVuqduyu3Tylvb5g/vwwr9gZk56YfVWuX6mPPbKkZ/TmlOE/9Zrb8xv9m9rOB/VWAOj69Q2HZS6JNHIu2tkH/EZj75P6s1D1xj2n9W651NRQRPK3utY7yYq/2wctf2GOA+rLYVVo/AYtuojT/peqtVeo5TBHtu5W5nE3zSuNxqhabxNInPrbZTW71IudXaTY8xhcXs7VR8L842W7EXKiNwWLh+12PIMWTutnbBnqvL/LUdBPhsK6fmTzK2pZPEix3bWsXQ07ItnW9eVGxrdUxPx7aXRHka/Q+GyT+QKGKLawAAAABJRU5ErkJggg==';

  const leadership = [
    {
      name: 'Showmik Kumaar.R',
      role: 'CEO & Founder',
      bio: 'Visionary leader with experience in digital transformation and AI innovation. Drives strategic growth and technological excellence across all business verticals.',
      image: ''
    },
    {
      name: 'Prithivi Raj.T',
      role: 'COO & Co-Founder',
      bio: 'Operations expert specializing in scaling AI & IoT solutions for optimizing business processes. Ensures seamless delivery of complex enterprise projects.',
      image: placeholderImage
    },
    {
      name: 'Ganesh.K',
      role: 'CTO',
      bio: 'Technology architect with expertise in AI/ML, cloud infrastructure, and emerging technologies. Leads technical innovation and engineering excellence.',
      image: ''
    }
  ];

  const achievements = [
    {
      icon: Award,
      title: 'Industry Recognition',
      items: ['Gartner Magic Quadrant Leader', 'Forbes AI Company of the Year', 'MIT Technology Review Innovator']
    },
    {
      icon: Users,
      title: 'Expert Team',
      items: ['200+ AI/ML Engineers', '50+ PhD Researchers', '24/7 Global Support']
    },
    {
      icon: Globe,
      title: 'Global Presence',
      items: ['15 Global Offices', '50+ Countries Served', '24/7 Operations']
    },
    {
      icon: Shield,
      title: 'Security & Compliance',
      items: ['SOC 2 Type II Certified', 'GDPR Compliant', 'ISO 27001 Certified']
    }
  ];

  return (
    <section id="about" className={`py-24 ${
      darkMode ? 'bg-slate-900' : 'bg-white'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            About SEION
          </h2>
          <p className={`text-xl max-w-3xl mx-auto ${
            darkMode ? 'text-slate-300' : 'text-slate-600'
          }`}>
            Leading the future of enterprise technology with AI-driven solutions 
            that deliver measurable business impact.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <div className={`p-8 rounded-2xl ${
            darkMode ? 'bg-slate-800' : 'bg-slate-50'
          }`}>
            <h3 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              Our Mission
            </h3>
            <p className={`text-lg leading-relaxed ${
              darkMode ? 'text-slate-300' : 'text-slate-600'
            }`}>
              To empower enterprises with cutting-edge AI and automation solutions that 
              drive operational excellence, reduce costs, and accelerate growth in the digital age.
            </p>
          </div>

          <div className={`p-8 rounded-2xl ${
            darkMode ? 'bg-slate-800' : 'bg-slate-50'
          }`}>
            <h3 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              Our Vision
            </h3>
            <p className={`text-lg leading-relaxed ${
              darkMode ? 'text-slate-300' : 'text-slate-600'
            }`}>
              To be the global leader in enterprise AI transformation, setting the standard 
              for innovation, reliability, and business impact across all industries.
            </p>
          </div>
        </div>

        {/* Leadership Team */}
        <div className="mb-20">
          <h3 className={`text-3xl font-bold text-center mb-12 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            Leadership Team
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {leadership.map((leader, index) => (
              <div
                key={index}
                className={`text-center group ${
                  darkMode ? 'bg-slate-800' : 'bg-white'
                } p-6 rounded-2xl border ${
                  darkMode ? 'border-slate-700' : 'border-slate-200'
                } hover:shadow-lg transition-all duration-300`}
              >
                <div className="relative mb-4">
                  <img
                    src={leader.image}
                    alt={leader.name}
                    className="w-24 h-24 rounded-full mx-auto object-cover"
                  />
                </div>
                <h4 className={`text-lg font-bold mb-1 ${
                  darkMode ? 'text-white' : 'text-slate-900'
                }`}>
                  {leader.name}
                </h4>
                <p className={`text-sm font-medium mb-3 ${
                  darkMode ? 'text-blue-400' : 'text-blue-600'
                }`}>
                  {leader.role}
                </p>
                <p className={`text-sm ${
                  darkMode ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  {leader.bio}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        {/* The achievements section with four cards has been removed as requested. */}

        {/* Company Stats */}
        <div className={`mt-20 p-12 rounded-2xl text-center ${
          darkMode ? 'bg-gradient-to-r from-slate-800 to-slate-700' : 'bg-gradient-to-r from-slate-50 to-slate-100'
        }`}>
        </div>
      </div>
    </section>
  );
};

export default About;