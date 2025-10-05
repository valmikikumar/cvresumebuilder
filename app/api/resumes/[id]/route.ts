import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import mockDB from '@/lib/mock-db';
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

    const resume = mockDB.resumes.findOne({ _id: params.id });
    if (!resume || resume.userId !== user._id) {
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

    const resume = mockDB.resumes.findOne({ _id: params.id });
    if (!resume || resume.userId !== user._id) {
      return NextResponse.json(
        { error: 'Resume not found' },
        { status: 404 }
      );
    }

    const updatedResume = mockDB.resumes.findByIdAndUpdate(params.id, {
      title: title || resume.title,
      data: data || resume.data,
      lastEdited: new Date()
    });

    return NextResponse.json({
      message: 'Resume updated successfully',
      resume: {
        id: updatedResume._id,
        title: updatedResume.title,
        templateId: updatedResume.templateId,
        lastEdited: updatedResume.lastEdited,
        isPublic: updatedResume.isPublic
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

    const resume = mockDB.resumes.findOne({ _id: params.id });
    if (!resume || resume.userId !== user._id) {
      return NextResponse.json(
        { error: 'Resume not found' },
        { status: 404 }
      );
    }

    mockDB.resumes.findByIdAndDelete(params.id);

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