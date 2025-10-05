'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Upload, 
  FileText, 
  CheckCircle, 
  AlertCircle, 
  TrendingUp,
  Target,
  Lightbulb,
  ArrowLeft,
  Download
} from 'lucide-react';
import toast from 'react-hot-toast';

interface ATSResult {
  score: number;
  suggestions: string[];
  keywords: {
    found: string[];
    missing: string[];
  };
  sections: {
    [key: string]: {
      score: number;
      feedback: string;
    };
  };
}

export default function ATSCheckerPage() {
  const [resumeText, setResumeText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<ATSResult | null>(null);
  const [activeTab, setActiveTab] = useState<'upload' | 'results'>('upload');

  const handleAnalyze = async () => {
    if (!resumeText.trim()) {
      toast.error('Please paste your resume content');
      return;
    }

    setIsAnalyzing(true);
    try {
      const response = await fetch('/api/ats/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          resumeText,
          jobDescription: jobDescription.trim() || undefined
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setResult(data.analysis);
        setActiveTab('results');
        toast.success('Analysis completed!');
      } else {
        const error = await response.json();
        toast.error(error.message || 'Analysis failed');
      }
    } catch (error) {
      toast.error('Network error. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return 'bg-green-100';
    if (score >= 60) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-resume-primary font-playfair">
                ResumeShala
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/dashboard" className="text-gray-600 hover:text-resume-primary transition-colors">
                Dashboard
              </Link>
              <Link href="/templates" className="text-gray-600 hover:text-resume-primary transition-colors">
                Templates
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 font-playfair mb-4">
            ATS Resume Checker
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get your resume analyzed by AI to ensure it passes Applicant Tracking Systems (ATS) 
            and increases your chances of landing interviews.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-1 shadow-sm border border-gray-200">
            <button
              onClick={() => setActiveTab('upload')}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                activeTab === 'upload'
                  ? 'bg-resume-primary text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Upload className="w-4 h-4 mr-2 inline" />
              Upload & Analyze
            </button>
            <button
              onClick={() => setActiveTab('results')}
              disabled={!result}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                activeTab === 'results' && result
                  ? 'bg-resume-primary text-white'
                  : 'text-gray-400 cursor-not-allowed'
              }`}
            >
              <TrendingUp className="w-4 h-4 mr-2 inline" />
              Results
            </button>
          </div>
        </div>

        {activeTab === 'upload' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Resume Input */}
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-resume-primary" />
                  Your Resume Content *
                </h3>
                <textarea
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                  className="input-field h-64 resize-none"
                  placeholder="Paste your resume content here (plain text)..."
                />
                <p className="text-sm text-gray-500 mt-2">
                  Copy and paste the text content of your resume. Avoid formatting and focus on the actual content.
                </p>
              </div>

              {/* Job Description Input */}
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Target className="w-5 h-5 mr-2 text-resume-primary" />
                  Job Description (Optional)
                </h3>
                <textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  className="input-field h-64 resize-none"
                  placeholder="Paste the job description to get targeted analysis..."
                />
                <p className="text-sm text-gray-500 mt-2">
                  Including the job description will provide more targeted feedback and keyword suggestions.
                </p>
              </div>
            </div>

            {/* Analyze Button */}
            <div className="text-center mt-8">
              <button
                onClick={handleAnalyze}
                disabled={isAnalyzing || !resumeText.trim()}
                className="btn-primary text-lg px-8 py-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isAnalyzing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2 inline-block"></div>
                    Analyzing Resume...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5 mr-2 inline" />
                    Analyze My Resume
                  </>
                )}
              </button>
            </div>
          </motion.div>
        )}

        {activeTab === 'results' && result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto"
          >
            {/* Overall Score */}
            <div className="card mb-8 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">ATS Compatibility Score</h3>
              <div className={`inline-flex items-center justify-center w-32 h-32 rounded-full ${getScoreBgColor(result.score)} mb-4`}>
                <span className={`text-4xl font-bold ${getScoreColor(result.score)}`}>
                  {result.score}
                </span>
              </div>
              <p className="text-gray-600 text-lg">
                {result.score >= 80 ? 'Excellent! Your resume is well-optimized for ATS.' :
                 result.score >= 60 ? 'Good, but there\'s room for improvement.' :
                 'Needs improvement to pass ATS filters effectively.'}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Section Scores */}
              <div className="card">
                <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-resume-primary" />
                  Section Analysis
                </h3>
                <div className="space-y-4">
                  {Object.entries(result.sections).map(([section, data]) => (
                    <div key={section} className="border-b border-gray-100 pb-4 last:border-b-0">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium text-gray-900 capitalize">{section}</h4>
                        <span className={`font-semibold ${getScoreColor(data.score)}`}>
                          {data.score}/100
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{data.feedback}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Keywords Analysis */}
              <div className="card">
                <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                  <Target className="w-5 h-5 mr-2 text-resume-primary" />
                  Keywords Analysis
                </h3>
                
                {result.keywords.found.length > 0 && (
                  <div className="mb-6">
                    <h4 className="font-medium text-green-700 mb-3 flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Found Keywords
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {result.keywords.found.map((keyword, index) => (
                        <span key={index} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {result.keywords.missing.length > 0 && (
                  <div>
                    <h4 className="font-medium text-red-700 mb-3 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-2" />
                      Missing Keywords
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {result.keywords.missing.map((keyword, index) => (
                        <span key={index} className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Suggestions */}
            <div className="card mt-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <Lightbulb className="w-5 h-5 mr-2 text-resume-primary" />
                Improvement Suggestions
              </h3>
              <div className="space-y-3">
                {result.suggestions.map((suggestion, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700">{suggestion}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center space-x-4 mt-8">
              <button
                onClick={() => setActiveTab('upload')}
                className="btn-outline"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Analyze Another Resume
              </button>
              <Link href="/templates" className="btn-primary">
                <FileText className="w-4 h-4 mr-2" />
                Create Optimized Resume
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
