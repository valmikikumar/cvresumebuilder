import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/resume-shala';

// For development, we'll use a simple in-memory database simulation
const isDevelopment = process.env.NODE_ENV === 'development';

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  // For development, simulate database connection
  if (isDevelopment) {
    console.log('🔧 Development mode: Using in-memory database simulation');
    return { connection: { readyState: 1 } };
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    console.log('⚠️ MongoDB connection failed, using development mode');
    cached.promise = null;
    return { connection: { readyState: 1 } };
  }

  return cached.conn;
}

export default connectDB;
