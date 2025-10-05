import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Resume from '@/models/Resume';
import { getCurrentUser } from '@/lib/auth';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const resume = await Resume.findOne({ 
      _id: params.id, 
      userId: user._id 
    });

    if (!resume) {
      return NextResponse.json(
        { error: 'Resume not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ resume });

  } catch (error) {
    console.error('Get resume error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const { title, data } = await request.json();

    const resume = await Resume.findOne({ 
      _id: params.id, 
      userId: user._id 
    });

    if (!resume) {
      return NextResponse.json(
        { error: 'Resume not found' },
        { status: 404 }
      );
    }

    // Create version backup
    const version = {
      version: resume.versions.length + 1,
      data: resume.data,
      createdAt: new Date()
    };

    resume.title = title || resume.title;
    resume.data = data || resume.data;
    resume.lastEdited = new Date();
    resume.versions.push(version);

    await resume.save();

    return NextResponse.json({
      message: 'Resume updated successfully',
      resume: {
        id: resume._id,
        title: resume.title,
        templateId: resume.templateId,
        lastEdited: resume.lastEdited,
        isPublic: resume.isPublic
      }
    });

  } catch (error) {
    console.error('Update resume error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const resume = await Resume.findOne({ 
      _id: params.id, 
      userId: user._id 
    });

    if (!resume) {
      return NextResponse.json(
        { error: 'Resume not found' },
        { status: 404 }
      );
    }

    await Resume.findByIdAndDelete(params.id);

    return NextResponse.json({
      message: 'Resume deleted successfully'
    });

  } catch (error) {
    console.error('Delete resume error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
