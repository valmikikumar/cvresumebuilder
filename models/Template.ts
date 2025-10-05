import mongoose, { Document, Schema } from 'mongoose';

export interface ITemplate extends Document {
  _id: string;
  name: string;
  description: string;
  category: 'fresher' | 'experienced' | 'executive' | 'creative' | 'technical' | 'healthcare' | 'sales' | 'education';
  price: number; // 0 for free templates
  isPremium: boolean;
  previewUrl: string;
  thumbnailUrl: string;
  htmlTemplate: string;
  css: string;
  features: string[];
  tags: string[];
  isActive: boolean;
  downloadCount: number;
  rating: number;
  reviewCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const TemplateSchema = new Schema<ITemplate>({
  name: {
    type: String,
    required: [true, 'Template name is required'],
    trim: true,
    maxlength: [100, 'Name cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Template description is required'],
    trim: true,
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  category: {
    type: String,
    enum: ['fresher', 'experienced', 'executive', 'creative', 'technical', 'healthcare', 'sales', 'education'],
    required: [true, 'Template category is required']
  },
  price: {
    type: Number,
    required: true,
    min: [0, 'Price cannot be negative'],
    default: 0
  },
  isPremium: {
    type: Boolean,
    default: false
  },
  previewUrl: {
    type: String,
    required: [true, 'Preview URL is required'],
    trim: true
  },
  thumbnailUrl: {
    type: String,
    required: [true, 'Thumbnail URL is required'],
    trim: true
  },
  htmlTemplate: {
    type: String,
    required: [true, 'HTML template is required']
  },
  css: {
    type: String,
    required: [true, 'CSS is required']
  },
  features: [{
    type: String,
    trim: true
  }],
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  downloadCount: {
    type: Number,
    default: 0
  },
  rating: {
    type: Number,
    min: [0, 'Rating cannot be less than 0'],
    max: [5, 'Rating cannot be more than 5'],
    default: 0
  },
  reviewCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Indexes for better query performance
TemplateSchema.index({ category: 1 });
TemplateSchema.index({ isPremium: 1 });
TemplateSchema.index({ isActive: 1 });
TemplateSchema.index({ price: 1 });
TemplateSchema.index({ downloadCount: -1 });
TemplateSchema.index({ rating: -1 });
TemplateSchema.index({ tags: 1 });

export default mongoose.models.Template || mongoose.model<ITemplate>('Template', TemplateSchema);
