import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import mockDB from '@/lib/mock-db';
import { getCurrentUser } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const resumes = mockDB.resumes.find({ userId: user._id });

    return NextResponse.json({ resumes });

  } catch (error) {
    console.error('Get resumes error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const { title, templateId, data } = await request.json();

    if (!title || !templateId || !data) {
      return NextResponse.json(
        { error: 'Title, templateId, and data are required' },
        { status: 400 }
      );
    }

    const resume = mockDB.resumes.create({
      userId: user._id,
      title,
      templateId,
      data,
      lastEdited: new Date()
    });

    return NextResponse.json({
      message: 'Resume created successfully',
      resume: {
        id: resume._id,
        title: resume.title,
        templateId: resume.templateId,
        lastEdited: resume.lastEdited,
        isPublic: resume.isPublic
      }
    }, { status: 201 });

  } catch (error) {
    console.error('Create resume error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
