import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import mockDB from '@/lib/mock-db';
import { getCurrentUser } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const user = await getCurrentUser(request);
    if (!user || user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      );
    }

    // Get mock stats
    const users = mockDB.users.find({});
    const resumes = mockDB.resumes.find({});
    const templates = mockDB.templates.find({});

    const stats = {
      totalUsers: users.length,
      totalResumes: resumes.length,
      totalTemplates: templates.length,
      monthlyRevenue: 1250.00, // Mock revenue
      activeUsers: Math.floor(users.length * 0.7), // 70% active
      premiumUsers: users.filter(u => u.plan !== 'free').length
    };

    return NextResponse.json({ stats });

  } catch (error) {
    console.error('Admin stats error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}