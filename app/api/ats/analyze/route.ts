import { NextRequest, NextResponse } from 'next/server';
import { analyzeResumeATS } from '@/lib/ai-service';

export async function POST(request: NextRequest) {
  try {
    const { resumeText, jobDescription } = await request.json();

    if (!resumeText || typeof resumeText !== 'string') {
      return NextResponse.json(
        { error: 'Resume text is required' },
        { status: 400 }
      );
    }

    if (resumeText.length < 50) {
      return NextResponse.json(
        { error: 'Resume text is too short. Please provide more content.' },
        { status: 400 }
      );
    }

    if (resumeText.length > 10000) {
      return NextResponse.json(
        { error: 'Resume text is too long. Please limit to 10,000 characters.' },
        { status: 400 }
      );
    }

    const analysis = await analyzeResumeATS(resumeText, jobDescription);

    return NextResponse.json({
      message: 'Analysis completed successfully',
      analysis
    });

  } catch (error) {
    console.error('ATS analysis error:', error);
    
    if (error instanceof Error) {
      if (error.message.includes('API key')) {
        return NextResponse.json(
          { error: 'AI service configuration error. Please try again later.' },
          { status: 503 }
        );
      }
      
      if (error.message.includes('rate limit')) {
        return NextResponse.json(
          { error: 'Service temporarily unavailable due to high demand. Please try again in a few minutes.' },
          { status: 429 }
        );
      }
    }

    return NextResponse.json(
      { error: 'Failed to analyze resume. Please try again.' },
      { status: 500 }
    );
  }
}
