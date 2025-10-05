import mongoose, { Document, Schema } from 'mongoose';

export interface IResume extends Document {
  _id: string;
  userId: string;
  title: string;
  templateId: string;
  data: {
    personalInfo: {
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
      address: string;
      city: string;
      state: string;
      zipCode: string;
      country: string;
      website?: string;
      linkedin?: string;
      github?: string;
      photo?: string;
    };
    summary: string;
    experience: Array<{
      id: string;
      company: string;
      position: string;
      location: string;
      startDate: string;
      endDate: string;
      current: boolean;
      description: string;
      achievements: string[];
    }>;
    education: Array<{
      id: string;
      institution: string;
      degree: string;
      field: string;
      location: string;
      startDate: string;
      endDate: string;
      current: boolean;
      gpa?: string;
      achievements: string[];
    }>;
    projects: Array<{
      id: string;
      name: string;
      description: string;
      technologies: string[];
      url?: string;
      github?: string;
      startDate: string;
      endDate: string;
    }>;
    skills: Array<{
      id: string;
      name: string;
      level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
      category: string;
    }>;
    certifications: Array<{
      id: string;
      name: string;
      issuer: string;
      date: string;
      url?: string;
    }>;
    languages: Array<{
      id: string;
      name: string;
      proficiency: 'basic' | 'conversational' | 'professional' | 'native';
    }>;
    customSections: Array<{
      id: string;
      title: string;
      content: string;
      type: 'text' | 'list' | 'timeline';
    }>;
  };
  settings: {
    showPhoto: boolean;
    showAddress: boolean;
    showWebsite: boolean;
    showLinkedIn: boolean;
    showGithub: boolean;
    fontSize: 'small' | 'medium' | 'large';
    fontFamily: string;
    colorScheme: string;
    spacing: 'compact' | 'normal' | 'spacious';
  };
  isPublic: boolean;
  lastEdited: Date;
  versions: Array<{
    version: number;
    data: any;
    createdAt: Date;
  }>;
  createdAt: Date;
  updatedAt: Date;
}

const ResumeSchema = new Schema<IResume>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: [true, 'Resume title is required'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  templateId: {
    type: Schema.Types.ObjectId,
    ref: 'Template',
    required: true
  },
  data: {
    personalInfo: {
      firstName: { type: String, required: true, trim: true },
      lastName: { type: String, required: true, trim: true },
      email: { type: String, required: true, trim: true },
      phone: { type: String, required: true, trim: true },
      address: { type: String, trim: true },
      city: { type: String, trim: true },
      state: { type: String, trim: true },
      zipCode: { type: String, trim: true },
      country: { type: String, trim: true },
      website: { type: String, trim: true },
      linkedin: { type: String, trim: true },
      github: { type: String, trim: true },
      photo: { type: String }
    },
    summary: { type: String, trim: true },
    experience: [{
      id: { type: String, required: true },
      company: { type: String, required: true, trim: true },
      position: { type: String, required: true, trim: true },
      location: { type: String, trim: true },
      startDate: { type: String, required: true },
      endDate: { type: String },
      current: { type: Boolean, default: false },
      description: { type: String, trim: true },
      achievements: [{ type: String, trim: true }]
    }],
    education: [{
      id: { type: String, required: true },
      institution: { type: String, required: true, trim: true },
      degree: { type: String, required: true, trim: true },
      field: { type: String, trim: true },
      location: { type: String, trim: true },
      startDate: { type: String, required: true },
      endDate: { type: String },
      current: { type: Boolean, default: false },
      gpa: { type: String, trim: true },
      achievements: [{ type: String, trim: true }]
    }],
    projects: [{
      id: { type: String, required: true },
      name: { type: String, required: true, trim: true },
      description: { type: String, trim: true },
      technologies: [{ type: String, trim: true }],
      url: { type: String, trim: true },
      github: { type: String, trim: true },
      startDate: { type: String, required: true },
      endDate: { type: String }
    }],
    skills: [{
      id: { type: String, required: true },
      name: { type: String, required: true, trim: true },
      level: { type: String, enum: ['beginner', 'intermediate', 'advanced', 'expert'], default: 'intermediate' },
      category: { type: String, trim: true }
    }],
    certifications: [{
      id: { type: String, required: true },
      name: { type: String, required: true, trim: true },
      issuer: { type: String, required: true, trim: true },
      date: { type: String, required: true },
      url: { type: String, trim: true }
    }],
    languages: [{
      id: { type: String, required: true },
      name: { type: String, required: true, trim: true },
      proficiency: { type: String, enum: ['basic', 'conversational', 'professional', 'native'], default: 'conversational' }
    }],
    customSections: [{
      id: { type: String, required: true },
      title: { type: String, required: true, trim: true },
      content: { type: String, trim: true },
      type: { type: String, enum: ['text', 'list', 'timeline'], default: 'text' }
    }]
  },
  settings: {
    showPhoto: { type: Boolean, default: true },
    showAddress: { type: Boolean, default: true },
    showWebsite: { type: Boolean, default: true },
    showLinkedIn: { type: Boolean, default: true },
    showGithub: { type: Boolean, default: true },
    fontSize: { type: String, enum: ['small', 'medium', 'large'], default: 'medium' },
    fontFamily: { type: String, default: 'Inter' },
    colorScheme: { type: String, default: 'blue' },
    spacing: { type: String, enum: ['compact', 'normal', 'spacious'], default: 'normal' }
  },
  isPublic: { type: Boolean, default: false },
  lastEdited: { type: Date, default: Date.now },
  versions: [{
    version: { type: Number, required: true },
    data: { type: Schema.Types.Mixed, required: true },
    createdAt: { type: Date, default: Date.now }
  }]
}, {
  timestamps: true
});

// Indexes for better query performance
ResumeSchema.index({ userId: 1 });
ResumeSchema.index({ templateId: 1 });
ResumeSchema.index({ isPublic: 1 });
ResumeSchema.index({ lastEdited: -1 });

export default mongoose.models.Resume || mongoose.model<IResume>('Resume', ResumeSchema);
