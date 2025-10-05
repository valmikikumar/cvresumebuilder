'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Check, 
  CreditCard, 
  Shield, 
  Lock,
  Star,
  Zap
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const plan = searchParams.get('plan') || 'premium';
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('razorpay');

  const plans = {
    premium: {
      name: 'Premium',
      price: 299,
      features: [
        'Unlimited Templates',
        'Advanced ATS Checker',
        'AI-Powered Suggestions',
        'Multiple Export Formats',
        'Priority Support',
        'Resume Analytics',
        'Custom Branding',
        'Cloud Storage'
      ]
    },
    enterprise: {
      name: 'Enterprise',
      price: 999,
      features: [
        'Everything in Premium',
        'Team Collaboration',
        'Bulk Resume Processing',
        'White-label Solution',
        'API Access',
        'Dedicated Support',
        'Custom Templates',
        'Advanced Analytics',
        'SSO Integration'
      ]
    }
  };

  const currentPlan = plans[plan as keyof typeof plans] || plans.premium;

  const handlePayment = async () => {
    setIsLoading(true);
    
    try {
      // Check if user is logged in
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Please login to continue');
        router.push('/login');
        return;
      }

      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('Payment successful! Welcome to Premium!');
      router.push('/dashboard');
      
    } catch (error) {
      toast.error('Payment failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-resume-primary font-playfair">
                ResumeShala
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/pricing" className="text-gray-600 hover:text-resume-primary transition-colors">
                Back to Pricing
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl shadow-lg p-8"
          >
            <div className="flex items-center mb-6">
              <Link href="/pricing" className="text-gray-600 hover:text-resume-primary mr-4">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Complete Your Purchase</h1>
            </div>

            {/* Plan Details */}
            <div className="border border-gray-200 rounded-lg p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{currentPlan.name} Plan</h3>
                  <p className="text-gray-600">Monthly subscription</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">₹{currentPlan.price}</div>
                  <div className="text-sm text-gray-600">per month</div>
                </div>
              </div>

              <div className="space-y-3">
                {currentPlan.features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Method */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Method</h3>
              <div className="space-y-3">
                <label className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="payment"
                    value="razorpay"
                    checked={paymentMethod === 'razorpay'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mr-3"
                  />
                  <div className="flex items-center">
                    <CreditCard className="w-5 h-5 text-gray-600 mr-3" />
                    <div>
                      <div className="font-medium text-gray-900">Razorpay</div>
                      <div className="text-sm text-gray-600">Credit/Debit Card, UPI, Net Banking</div>
                    </div>
                  </div>
                </label>
                
                <label className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="payment"
                    value="stripe"
                    checked={paymentMethod === 'stripe'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mr-3"
                  />
                  <div className="flex items-center">
                    <CreditCard className="w-5 h-5 text-gray-600 mr-3" />
                    <div>
                      <div className="font-medium text-gray-900">Stripe</div>
                      <div className="text-sm text-gray-600">International cards accepted</div>
                    </div>
                  </div>
                </label>
              </div>
            </div>

            {/* Security */}
            <div className="flex items-center text-sm text-gray-600 mb-6">
              <Shield className="w-4 h-4 mr-2" />
              <span>Your payment information is secure and encrypted</span>
            </div>

            {/* Payment Button */}
            <button
              onClick={handlePayment}
              disabled={isLoading}
              className="w-full bg-resume-primary text-white py-4 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Processing Payment...
                </>
              ) : (
                <>
                  <Lock className="w-5 h-5 mr-2" />
                  Pay ₹{currentPlan.price} / month
                </>
              )}
            </button>

            <p className="text-xs text-gray-500 text-center mt-4">
              By completing this purchase, you agree to our Terms of Service and Privacy Policy.
              You can cancel your subscription anytime.
            </p>
          </motion.div>

          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Why Upgrade to Premium?</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <Star className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Unlimited Access</h3>
                    <p className="text-gray-600">Get access to all premium templates and features without any restrictions.</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <Zap className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">AI-Powered Features</h3>
                    <p className="text-gray-600">Get smart suggestions and content optimization powered by AI technology.</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <Shield className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">ATS Optimization</h3>
                    <p className="text-gray-600">Advanced ATS checker ensures your resume passes through applicant tracking systems.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Money-Back Guarantee</h3>
              <p className="text-gray-600 mb-4">
                Not satisfied? Get a full refund within 30 days of your purchase. No questions asked.
              </p>
              <div className="flex items-center text-sm text-gray-600">
                <Check className="w-4 h-4 text-green-500 mr-2" />
                <span>30-day money-back guarantee</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">What Our Users Say</h3>
              <div className="space-y-4">
                <div className="border-l-4 border-resume-primary pl-4">
                  <p className="text-gray-700 italic">
                    "ResumeShala helped me land my dream job! The AI suggestions were incredibly helpful."
                  </p>
                  <p className="text-sm text-gray-600 mt-2">- Priya Sharma, Software Engineer</p>
                </div>
                <div className="border-l-4 border-resume-primary pl-4">
                  <p className="text-gray-700 italic">
                    "The templates are professional and the ATS checker is a game-changer."
                  </p>
                  <p className="text-sm text-gray-600 mt-2">- Rajesh Kumar, Marketing Manager</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
