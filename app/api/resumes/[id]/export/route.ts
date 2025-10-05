import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Resume from '@/models/Resume';
import Template from '@/models/Template';
import { getCurrentUser } from '@/lib/auth';
import { generateResumePDF } from '@/lib/pdf-generator';

export async function POST(
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

    const { format = 'pdf' } = await request.json();

    // Get resume
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

    // Get template
    const template = await Template.findById(resume.templateId);
    if (!template) {
      return NextResponse.json(
        { error: 'Template not found' },
        { status: 404 }
      );
    }

    switch (format.toLowerCase()) {
      case 'pdf':
        try {
          const pdfBuffer = await generateResumePDF(resume, template);
          
          const fileName = `${resume.data.personalInfo.firstName}_${resume.data.personalInfo.lastName}_Resume.pdf`;
          
          return new NextResponse(pdfBuffer, {
            headers: {
              'Content-Type': 'application/pdf',
              'Content-Disposition': `attachment; filename="${fileName}"`,
              'Content-Length': pdfBuffer.length.toString(),
            },
          });
        } catch (error) {
          console.error('PDF generation error:', error);
          return NextResponse.json(
            { error: 'Failed to generate PDF' },
            { status: 500 }
          );
        }

      case 'docx':
        // TODO: Implement DOCX generation
        return NextResponse.json(
          { error: 'DOCX export not yet implemented' },
          { status: 501 }
        );

      case 'png':
        // TODO: Implement PNG generation
        return NextResponse.json(
          { error: 'PNG export not yet implemented' },
          { status: 501 }
        );

      default:
        return NextResponse.json(
          { error: 'Unsupported format. Use pdf, docx, or png' },
          { status: 400 }
        );
    }

  } catch (error) {
    console.error('Export error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
