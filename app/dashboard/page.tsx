'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Plus, 
  FileText, 
  Download, 
  Edit, 
  Trash2, 
  Eye,
  Star,
  Calendar,
  User,
  Settings
} from 'lucide-react';
import toast from 'react-hot-toast';

interface Resume {
  _id: string;
  title: string;
  templateId: string;
  lastEdited: string;
  isPublic: boolean;
}

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchUser();
    fetchResumes();
  }, []);

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        window.location.href = '/login';
        return;
      }

      const response = await fetch('/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      } else {
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
  };

  const fetchResumes = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/resumes', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setResumes(data.resumes);
      }
    } catch (error) {
      console.error('Error fetching resumes:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteResume = async (resumeId: string) => {
    if (!confirm('Are you sure you want to delete this resume?')) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/resumes/${resumeId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        setResumes(resumes.filter(resume => resume._id !== resumeId));
        toast.success('Resume deleted successfully');
      } else {
        toast.error('Failed to delete resume');
      }
    } catch (error) {
      toast.error('Error deleting resume');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-resume-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

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
              <div className="flex items-center space-x-2">
                <User className="w-5 h-5 text-gray-400" />
                <span className="text-gray-700">{user?.name}</span>
              </div>
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 font-playfair mb-2">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-gray-600">
            Manage your resumes and create new ones to land your dream job.
          </p>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <Link href="/templates" className="card hover:shadow-xl transition-shadow duration-300 group">
            <div className="flex items-center">
              <div className="p-3 bg-resume-primary/10 rounded-lg mr-4">
                <Plus className="w-6 h-6 text-resume-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 group-hover:text-resume-primary transition-colors">
                  Create New Resume
                </h3>
                <p className="text-gray-600 text-sm">Start with a template</p>
              </div>
            </div>
          </Link>

          <Link href="/templates" className="card hover:shadow-xl transition-shadow duration-300 group">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg mr-4">
                <Star className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 group-hover:text-resume-primary transition-colors">
                  Browse Templates
                </h3>
                <p className="text-gray-600 text-sm">Professional designs</p>
              </div>
            </div>
          </Link>

          <Link href="/ats-checker" className="card hover:shadow-xl transition-shadow duration-300 group">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-lg mr-4">
                <FileText className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 group-hover:text-resume-primary transition-colors">
                  ATS Checker
                </h3>
                <p className="text-gray-600 text-sm">Optimize your resume</p>
              </div>
            </div>
          </Link>
        </motion.div>

        {/* Resumes Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 font-playfair">
              Your Resumes
            </h2>
            <Link href="/templates" className="btn-primary">
              <Plus className="w-4 h-4 mr-2" />
              New Resume
            </Link>
          </div>

          {resumes.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No resumes yet
              </h3>
              <p className="text-gray-600 mb-6">
                Create your first resume to get started
              </p>
              <Link href="/templates" className="btn-primary">
                <Plus className="w-4 h-4 mr-2" />
                Create Resume
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resumes.map((resume, index) => (
                <motion.div
                  key={resume._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="card hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {resume.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Last edited {new Date(resume.lastEdited).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center space-x-1">
                      {resume.isPublic && (
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                          Public
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Link
                      href={`/editor/${resume._id}`}
                      className="flex-1 btn-outline text-sm py-2 text-center"
                    >
                      <Edit className="w-4 h-4 mr-1 inline" />
                      Edit
                    </Link>
                    <Link
                      href={`/preview/${resume._id}`}
                      className="flex-1 btn-outline text-sm py-2 text-center"
                    >
                      <Eye className="w-4 h-4 mr-1 inline" />
                      Preview
                    </Link>
                    <button
                      onClick={() => handleDeleteResume(resume._id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
