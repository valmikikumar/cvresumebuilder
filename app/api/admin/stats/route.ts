import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import Resume from '@/models/Resume';
import Payment from '@/models/Payment';
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

    // Get current date for monthly calculations
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    // Fetch stats in parallel
    const [
      totalUsers,
      totalResumes,
      totalPayments,
      monthlyRevenue,
      activeUsers,
      premiumUsers
    ] = await Promise.all([
      User.countDocuments(),
      Resume.countDocuments(),
      Payment.countDocuments({ status: 'completed' }),
      Payment.aggregate([
        {
          $match: {
            status: 'completed',
            createdAt: { $gte: startOfMonth }
          }
        },
        {
          $group: {
            _id: null,
            total: { $sum: '$amount' }
          }
        }
      ]),
      User.countDocuments({
        lastLoginAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
      }),
      User.countDocuments({ plan: { $in: ['premium', 'enterprise'] } })
    ]);

    const stats = {
      totalUsers,
      totalResumes,
      totalPayments,
      monthlyRevenue: monthlyRevenue[0]?.total || 0,
      activeUsers,
      premiumUsers
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
