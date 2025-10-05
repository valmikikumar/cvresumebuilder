// Mock AI service for development
const isDevelopment = process.env.NODE_ENV === 'development';

export interface ATSAnalysis {
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

export interface JobMatchAnalysis {
  matchScore: number;
  missingSkills: string[];
  recommendedKeywords: string[];
  suggestions: string[];
}

export async function analyzeResumeATS(
  resumeText: string,
  jobDescription?: string
): Promise<ATSAnalysis> {
  // Mock analysis for development
  if (isDevelopment) {
    console.log('🔧 Development mode: Using mock ATS analysis');
    
    // Simulate analysis based on resume content
    const hasEmail = resumeText.toLowerCase().includes('@');
    const hasPhone = /\d{3}[-.]?\d{3}[-.]?\d{4}/.test(resumeText);
    const hasExperience = resumeText.toLowerCase().includes('experience');
    const hasEducation = resumeText.toLowerCase().includes('education');
    const hasSkills = resumeText.toLowerCase().includes('skills');
    
    let score = 60;
    const suggestions = [];
    const foundKeywords = [];
    const missingKeywords = [];
    
    if (hasEmail && hasPhone) {
      score += 15;
      foundKeywords.push('Contact Information');
    } else {
      suggestions.push('Add complete contact information (email and phone)');
      missingKeywords.push('Contact Information');
    }
    
    if (hasExperience) {
      score += 10;
      foundKeywords.push('Work Experience');
    } else {
      suggestions.push('Include a detailed work experience section');
      missingKeywords.push('Work Experience');
    }
    
    if (hasEducation) {
      score += 10;
      foundKeywords.push('Education');
    } else {
      suggestions.push('Add your educational background');
      missingKeywords.push('Education');
    }
    
    if (hasSkills) {
      score += 5;
      foundKeywords.push('Skills');
    } else {
      suggestions.push('List your relevant skills');
      missingKeywords.push('Skills');
    }
    
    // Add more suggestions
    if (resumeText.length < 200) {
      suggestions.push('Expand your resume with more detailed descriptions');
      score -= 10;
    }
    
    if (!resumeText.toLowerCase().includes('summary')) {
      suggestions.push('Add a professional summary section');
      missingKeywords.push('Professional Summary');
    }
    
    return {
      score: Math.min(score, 95),
      suggestions: suggestions.length > 0 ? suggestions : [
        'Use standard section headings (Experience, Education, Skills)',
        'Include relevant keywords from the job description',
        'Use bullet points for better readability',
        'Ensure consistent formatting throughout'
      ],
      keywords: {
        found: foundKeywords,
        missing: missingKeywords
      },
      sections: {
        contact: { 
          score: hasEmail && hasPhone ? 90 : 60, 
          feedback: hasEmail && hasPhone ? "Contact information is complete" : "Add email and phone number"
        },
        summary: { 
          score: resumeText.toLowerCase().includes('summary') ? 80 : 50, 
          feedback: resumeText.toLowerCase().includes('summary') ? "Good professional summary" : "Consider adding a professional summary"
        },
        experience: { 
          score: hasExperience ? 85 : 40, 
          feedback: hasExperience ? "Experience section is well detailed" : "Add work experience section"
        },
        education: { 
          score: hasEducation ? 80 : 40, 
          feedback: hasEducation ? "Education section is complete" : "Add education information"
        },
        skills: { 
          score: hasSkills ? 75 : 40, 
          feedback: hasSkills ? "Skills section is good" : "Add skills section"
        }
      }
    };
  }
  
  // Production AI analysis would go here
  throw new Error('AI service not configured for production');
}

export async function generateResumeSummary(
  experience: string,
  skills: string[],
  targetRole?: string
): Promise<string> {
  if (isDevelopment) {
    console.log('🔧 Development mode: Using mock summary generation');
    
    const skillList = skills.slice(0, 3).join(', ');
    const roleText = targetRole ? ` for ${targetRole} positions` : '';
    
    return `Experienced professional with expertise in ${skillList}. Proven track record of delivering results and driving success in dynamic environments. Strong analytical skills and ability to work effectively in team settings. Seeking opportunities to contribute to innovative projects${roleText}.`;
  }
  
  throw new Error('AI service not configured for production');
}

export async function analyzeJobMatch(
  resumeText: string,
  jobDescription: string
): Promise<JobMatchAnalysis> {
  if (isDevelopment) {
    console.log('🔧 Development mode: Using mock job match analysis');
    
    // Simple keyword matching
    const resumeWords = resumeText.toLowerCase().split(/\s+/);
    const jobWords = jobDescription.toLowerCase().split(/\s+/);
    
    const commonWords = resumeWords.filter(word => jobWords.includes(word));
    const matchScore = Math.min(60 + (commonWords.length * 2), 95);
    
    return {
      matchScore,
      missingSkills: ["Communication", "Leadership", "Project Management"],
      recommendedKeywords: ["Team collaboration", "Results-driven", "Problem-solving"],
      suggestions: [
        "Add more specific achievements with quantifiable results",
        "Include relevant industry keywords from the job description",
        "Highlight transferable skills that match the role requirements"
      ]
    };
  }
  
  throw new Error('AI service not configured for production');
}

export async function optimizeResumeContent(
  section: string,
  content: string,
  targetRole?: string
): Promise<string> {
  if (isDevelopment) {
    console.log('🔧 Development mode: Using mock content optimization');
    
    // Simple optimization - add action verbs and make it more professional
    const optimized = content
      .replace(/\bworked\b/gi, 'collaborated')
      .replace(/\bdid\b/gi, 'executed')
      .replace(/\bmade\b/gi, 'developed')
      .replace(/\bhelped\b/gi, 'supported')
      .replace(/\bgood\b/gi, 'excellent')
      .replace(/\bvery\b/gi, 'highly');
    
    return optimized || content;
  }
  
  throw new Error('AI service not configured for production');
}
