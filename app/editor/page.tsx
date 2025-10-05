'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import ResumeEditor from '@/components/ResumeEditor';

export default function EditorPage() {
  const searchParams = useSearchParams();
  const templateId = searchParams.get('template');
  const resumeId = searchParams.get('resume');

  if (!templateId && !resumeId) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">No Template Selected</h1>
          <p className="text-gray-600 mb-6">
            Please select a template to start creating your resume.
          </p>
          <a href="/templates" className="btn-primary">
            Browse Templates
          </a>
        </div>
      </div>
    );
  }

  return (
    <ResumeEditor 
      resumeId={resumeId || undefined}
      templateId={templateId || 'default'}
    />
  );
}
