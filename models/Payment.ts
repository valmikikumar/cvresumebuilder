import mongoose, { Document, Schema } from 'mongoose';

export interface IPayment extends Document {
  _id: string;
  userId: string;
  amount: number;
  currency: string;
  gateway: 'razorpay' | 'stripe' | 'paypal';
  gatewayPaymentId: string;
  gatewayOrderId?: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded' | 'cancelled';
  plan: 'premium' | 'enterprise';
  duration: number; // in months
  metadata: {
    razorpayPaymentId?: string;
    razorpayOrderId?: string;
    stripePaymentIntentId?: string;
    stripeSessionId?: string;
    paypalOrderId?: string;
  };
  refundAmount?: number;
  refundReason?: string;
  refundedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const PaymentSchema = new Schema<IPayment>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  amount: {
    type: Number,
    required: [true, 'Amount is required'],
    min: [0, 'Amount cannot be negative']
  },
  currency: {
    type: String,
    required: true,
    default: 'INR',
    enum: ['INR', 'USD', 'EUR', 'GBP']
  },
  gateway: {
    type: String,
    required: [true, 'Payment gateway is required'],
    enum: ['razorpay', 'stripe', 'paypal']
  },
  gatewayPaymentId: {
    type: String,
    required: [true, 'Gateway payment ID is required'],
    trim: true
  },
  gatewayOrderId: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    required: true,
    enum: ['pending', 'completed', 'failed', 'refunded', 'cancelled'],
    default: 'pending'
  },
  plan: {
    type: String,
    required: [true, 'Plan is required'],
    enum: ['premium', 'enterprise']
  },
  duration: {
    type: Number,
    required: [true, 'Duration is required'],
    min: [1, 'Duration must be at least 1 month'],
    default: 1
  },
  metadata: {
    razorpayPaymentId: String,
    razorpayOrderId: String,
    stripePaymentIntentId: String,
    stripeSessionId: String,
    paypalOrderId: String
  },
  refundAmount: {
    type: Number,
    min: [0, 'Refund amount cannot be negative']
  },
  refundReason: {
    type: String,
    trim: true
  },
  refundedAt: Date
}, {
  timestamps: true
});

// Indexes for better query performance
PaymentSchema.index({ userId: 1 });
PaymentSchema.index({ gateway: 1 });
PaymentSchema.index({ status: 1 });
PaymentSchema.index({ gatewayPaymentId: 1 });
PaymentSchema.index({ createdAt: -1 });

export default mongoose.models.Payment || mongoose.model<IPayment>('Payment', PaymentSchema);
