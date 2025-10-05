'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  CheckCircle, 
  Star, 
  Users, 
  Download, 
  Sparkles,
  Shield,
  Zap,
  Globe,
  Heart
} from 'lucide-react';

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: "ATS-Friendly",
      description: "Optimized for Applicant Tracking Systems"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "AI-Powered",
      description: "Smart suggestions and auto-completion"
    },
    {
      icon: <Download className="w-6 h-6" />,
      title: "Multiple Formats",
      description: "Export as PDF, DOCX, or PNG"
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Mobile Responsive",
      description: "Works perfectly on all devices"
    }
  ];

  const templates = [
    { name: "Professional", category: "Business", color: "blue" },
    { name: "Creative", category: "Design", color: "purple" },
    { name: "Modern", category: "Tech", color: "green" },
    { name: "Classic", category: "Traditional", color: "gray" }
  ];

  const steps = [
    {
      number: "01",
      title: "Choose Template",
      description: "Select from our collection of professional templates"
    },
    {
      number: "02", 
      title: "Fill Your Details",
      description: "Add your experience, education, and skills"
    },
    {
      number: "03",
      title: "Download & Apply",
      description: "Export your resume and start applying to jobs"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-100 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-resume-primary font-playfair">
                ResumeShala
              </h1>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="#features" className="text-gray-600 hover:text-resume-primary transition-colors">
                Features
              </Link>
              <Link href="#templates" className="text-gray-600 hover:text-resume-primary transition-colors">
                Templates
              </Link>
              <Link href="#pricing" className="text-gray-600 hover:text-resume-primary transition-colors">
                Pricing
              </Link>
              <Link href="/login" className="text-gray-600 hover:text-resume-primary transition-colors">
                Login
              </Link>
              <Link href="/signup" className="btn-primary">
                Get Started Free
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-16 gradient-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 font-playfair">
                Making dream resumes{' '}
                <span className="text-transparent bg-clip-text hero-gradient">
                  simple and free
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Create ATS-friendly, professional, and mobile-responsive resumes in minutes. 
                Join thousands of job seekers who landed their dream jobs with ResumeShala.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/signup" className="btn-primary text-lg px-8 py-4">
                  Start Building Resume
                  <ArrowRight className="w-5 h-5 ml-2 inline" />
                </Link>
                <Link href="#templates" className="btn-secondary text-lg px-8 py-4">
                  View Templates
                </Link>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto"
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-resume-primary">50K+</div>
                <div className="text-gray-600">Resumes Created</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-resume-primary">95%</div>
                <div className="text-gray-600">ATS Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-resume-primary">4.9★</div>
                <div className="text-gray-600">User Rating</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-playfair">
              Why Choose ResumeShala?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to create a professional resume that gets you noticed
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card text-center hover:shadow-xl transition-shadow duration-300"
              >
                <div className="text-resume-primary mb-4 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-playfair">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Create your professional resume in just 3 simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-resume-primary text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-6">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Templates Preview */}
      <section id="templates" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-playfair">
              Professional Templates
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose from our collection of ATS-friendly templates designed for every industry
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {templates.map((template, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card hover:shadow-xl transition-all duration-300 cursor-pointer group"
              >
                <div className={`w-full h-48 bg-${template.color}-100 rounded-lg mb-4 flex items-center justify-center`}>
                  <div className="text-4xl font-bold text-gray-400">
                    {template.name}
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {template.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {template.category}
                </p>
                <button className="w-full btn-outline text-sm py-2 group-hover:border-resume-primary group-hover:text-resume-primary">
                  Preview Template
                </button>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/templates" className="btn-primary">
              View All Templates
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 hero-gradient">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 font-playfair">
            Ready to land your dream job?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of successful job seekers who created their resumes with ResumeShala
          </p>
          <Link href="/signup" className="bg-white text-resume-primary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors duration-200 inline-flex items-center">
            Start Building Now
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold font-playfair mb-4">ResumeShala</h3>
              <p className="text-gray-400 mb-4">
                Making dream resumes simple and free for every job seeker.
              </p>
              <div className="flex space-x-4">
                <Heart className="w-5 h-5 text-red-400" />
                <span className="text-gray-400">Made with love in India</span>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/templates" className="hover:text-white transition-colors">Templates</Link></li>
                <li><Link href="/features" className="hover:text-white transition-colors">Features</Link></li>
                <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/help" className="hover:text-white transition-colors">Help Center</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/twitter" className="hover:text-white transition-colors">Twitter</Link></li>
                <li><Link href="/linkedin" className="hover:text-white transition-colors">LinkedIn</Link></li>
                <li><Link href="/facebook" className="hover:text-white transition-colors">Facebook</Link></li>
                <li><Link href="/instagram" className="hover:text-white transition-colors">Instagram</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 ResumeShala. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
