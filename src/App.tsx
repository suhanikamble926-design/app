import React, { useState } from 'react';
import { 
  Zap, 
  Code, 
  Smartphone, 
  Globe, 
  Brain, 
  Rocket, 
  Users, 
  Star,
  ArrowRight,
  Check,
  Menu,
  X
} from 'lucide-react';
import { AppGenerator } from './components/AppGenerator';

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface PricingTier {
  name: string;
  price: string;
  features: string[];
  popular?: boolean;
}

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('home');

  const features: Feature[] = [
    {
      icon: <Brain className="w-8 h-8 text-blue-600" />,
      title: "Advanced AI Generation",
      description: "Leverage GPT-4, Claude, and specialized AI models to generate production-ready code"
    },
    {
      icon: <Code className="w-8 h-8 text-purple-600" />,
      title: "Multi-Language Support",
      description: "Generate apps in React, Vue, Angular, Python, Node.js, PHP, and 20+ frameworks"
    },
    {
      icon: <Smartphone className="w-8 h-8 text-green-600" />,
      title: "Responsive Design",
      description: "Automatically optimized for desktop, tablet, and mobile with modern UI/UX"
    },
    {
      icon: <Globe className="w-8 h-8 text-orange-600" />,
      title: "One-Click Deploy",
      description: "Deploy to Vercel, Netlify, AWS, or your own servers with automated CI/CD"
    },
    {
      icon: <Zap className="w-8 h-8 text-yellow-600" />,
      title: "Real-time Preview",
      description: "See your app come to life instantly with hot-reload and live editing"
    },
    {
      icon: <Users className="w-8 h-8 text-indigo-600" />,
      title: "Collaboration Tools",
      description: "Team workspaces, version control, and real-time collaborative editing"
    }
  ];

  const pricingTiers: PricingTier[] = [
    {
      name: "Free",
      price: "$0",
      features: [
        "5 projects per month",
        "Basic AI models",
        "Community templates",
        "Standard deployment"
      ]
    },
    {
      name: "Pro",
      price: "$29",
      popular: true,
      features: [
        "Unlimited projects",
        "Advanced AI models (GPT-4, Claude)",
        "Premium templates",
        "Custom domains",
        "Priority support",
        "Team collaboration"
      ]
    },
    {
      name: "Enterprise",
      price: "$99",
      features: [
        "Everything in Pro",
        "Custom AI training",
        "White-label solution",
        "Dedicated support",
        "Advanced analytics",
        "API access"
      ]
    }
  ];

  const templates = [
    "E-commerce Store",
    "Portfolio Website", 
    "SaaS Dashboard",
    "Blog Platform",
    "Social Network",
    "Mobile App"
  ];

  const generationSteps = [
    "Analyzing requirements...",
    "Selecting optimal tech stack...",
    "Generating architecture...",
    "Building components...",
    "Styling and optimization...",
    "Finalizing deployment..."
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Navigation */}
      <nav className="bg-white/90 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Rocket className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                AI Builder Pro
              </span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors">Features</a>
              <a href="#pricing" className="text-gray-600 hover:text-blue-600 transition-colors">Pricing</a>
              <button 
                onClick={() => setActiveTab('generator')}
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                Generator
              </button>
              <button 
                onClick={() => setActiveTab('generator')}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Start Building
              </button>
            </div>

            <button 
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {isMobileMenuOpen && (
            <div className="md:hidden py-4 space-y-4">
              <a href="#features" className="block text-gray-600 hover:text-blue-600">Features</a>
              <a href="#pricing" className="block text-gray-600 hover:text-blue-600">Pricing</a>
              <button 
                onClick={() => setActiveTab('generator')}
                className="block text-gray-600 hover:text-blue-600"
              >
                Generator
              </button>
              <button 
                onClick={() => setActiveTab('generator')}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
              >
                Start Building
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Conditional Content */}
      {activeTab === 'home' ? (
        <>
          {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-8">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
              Build Anything
            </span>
            <br />
            <span className="text-gray-800">with AI Power</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Generate unlimited websites and applications using the most advanced AI models. 
            From concept to deployment in minutes, not months.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-6 mb-16">
            <button
              onClick={() => setActiveTab('generator')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <Zap className="w-5 h-5" />
              <span>Start Building Now</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl text-lg font-semibold hover:border-blue-600 hover:text-blue-600 transition-colors">
              Watch Demo
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <img
                src="https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="AI Technology"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2">AI-Powered</h3>
                <p className="text-gray-600 text-sm">Advanced machine learning generates production-ready code</p>
              </div>
            </div>
            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <img
                src="https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Modern Development"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2">Modern Stack</h3>
                <p className="text-gray-600 text-sm">Latest frameworks and best practices built-in</p>
              </div>
            </div>
            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <img
                src="https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Fast Deployment"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2">Deploy Fast</h3>
                <p className="text-gray-600 text-sm">From idea to production in minutes, not days</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Powered by Advanced AI
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform integrates the latest AI technologies to provide unparalleled development capabilities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow duration-300 hover:transform hover:scale-105"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the plan that fits your needs. All plans include unlimited revisions and 24/7 support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingTiers.map((tier, index) => (
              <div 
                key={index}
                className={`rounded-2xl p-8 ${
                  tier.popular 
                    ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white scale-105 shadow-2xl' 
                    : 'bg-gray-50 border border-gray-200'
                }`}
              >
                {tier.popular && (
                  <div className="flex justify-center mb-4">
                    <span className="bg-white/20 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <h3 className={`text-2xl font-bold mb-2 ${tier.popular ? 'text-white' : 'text-gray-800'}`}>
                  {tier.name}
                </h3>
                
                <div className="mb-6">
                  <span className={`text-4xl font-bold ${tier.popular ? 'text-white' : 'text-gray-800'}`}>
                    {tier.price}
                  </span>
                  <span className={`text-lg ${tier.popular ? 'text-white/80' : 'text-gray-600'}`}>
                    /month
                  </span>
                </div>

                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-3">
                      <Check className={`w-5 h-5 ${tier.popular ? 'text-white' : 'text-green-600'}`} />
                      <span className={tier.popular ? 'text-white' : 'text-gray-600'}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <button 
                  className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                    tier.popular 
                      ? 'bg-white text-blue-600 hover:bg-gray-100' 
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-6 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Rocket className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">AI Builder Pro</span>
            </div>
            
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Support</a>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 AI Builder Pro. All rights reserved. Powered by advanced AI technologies.</p>
          </div>
        </div>
      </footer>
        </>
      ) : (
        <div className="pt-8">
          <AppGenerator />
        </div>
      )}
    </div>
  );
}

export default App;