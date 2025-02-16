import { useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PaymentForm, CreditCard, GooglePay, ApplePay } from 'react-square-web-payments-sdk';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CreditCard as CreditCardIcon, Wallet, Shield, Clock, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { AuthContext } from "@/context/auth-context";
import { createPaymentService } from "@/services";
import { formatPrice, capitalizeWord } from '@/lib/utils';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

const PaymentFormWrapper = ({ courseDetails, isProcessing, setIsProcessing }) => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  
  const createPaymentRequest = () => {
    return {
      countryCode: "US",
      currencyCode: "USD",
      total: {
        amount: courseDetails?.pricing.toString(),
        label: courseDetails?.title
      }
    };
  };
  
  return (
    <Tabs defaultValue="card" onValueChange={setPaymentMethod}>
      <TabsList className="grid grid-cols-2 mb-6">
        <TabsTrigger value="card" className="flex items-center gap-2 transition-all duration-200 hover:bg-primary/10">
          <CreditCardIcon className="w-4 h-4" />
          Credit Card
        </TabsTrigger>
        <TabsTrigger value="digital" className="flex items-center gap-2 transition-all duration-200 hover:bg-primary/10">
          <Wallet className="w-4 h-4" />
          Digital Wallet
        </TabsTrigger>
      </TabsList>
      
      <AnimatePresence mode="wait">
        <motion.div
          key={paymentMethod}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={fadeIn}
          transition={{ duration: 0.3 }}
        >
          <TabsContent value="card">
            <div className="space-y-6">
              <CreditCard
                buttonProps={{
                  className: "w-full bg-primary hover:bg-primary/90 text-white font-medium py-3 rounded-lg transition-all duration-200 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed",
                  disabled: isProcessing,
                  children: isProcessing ? (
                    <div className="flex items-center justify-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Processing...
                    </div>
                  ) : (
                    "Pay"
                  ),
                  onClick: (event) => {
                    event.preventDefault();
                    setIsProcessing(true);
                    console.log("Payment initiated");
                  },
                }}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="digital">
            <div className="space-y-4">
              <GooglePay
                createPaymentRequest={createPaymentRequest}
                buttonColor="black"
                buttonType="pay"
              />
              <ApplePay
                createPaymentRequest={createPaymentRequest}
                buttonColor="black"
                buttonType="pay"
              />
            </div>
          </TabsContent>
        </motion.div>
      </AnimatePresence>
    </Tabs>
  );
};

const CheckoutPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const courseDetails = location.state?.courseDetails;
  const { auth } = useContext(AuthContext);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const appId = import.meta.env.VITE_SQUARE_APP_ID;
  const locationId = import.meta.env.VITE_SQUARE_LOCATION_ID;

  async function handlePaymentSuccess(token, error) {
    if (error) {
      setIsProcessing(false);
      toast.error("Payment failed. Please try again.");
      console.error("Payment Error:", error);
      return;
    }
  
    if (!token) {
      setIsProcessing(false);
      toast.error("Payment validation failed. Please try again.");
      console.error("Token missing in payment response");
      return;
    }
  
    try {
      const paymentPayload = {
        userId: auth?.user?._id,
        userName: auth?.user?.userName,
        userEmail: auth?.user?.userEmail,
        orderStatus: "pending",
        paymentMethod: "square",
        paymentStatus: "initiated",
        orderDate: new Date(),
        sourceId: token.token,
        locationId: locationId,
        instructorId: courseDetails?.instructorId,
        instructorName: courseDetails?.instructorName,
        courseImage: courseDetails?.image,
        courseTitle: courseDetails?.title,
        courseId: courseDetails?._id,
        coursePricing: courseDetails?.pricing,
      };
    
      const response = await createPaymentService(paymentPayload);
      
      if (response.success) {
        toast.success("Payment successful! Redirecting to your course...");
        sessionStorage.setItem("currentOrderId", JSON.stringify(response?.data?.orderId));
        setTimeout(() => {
          navigate(`/academy/course-progress/${courseDetails?._id}`);
        }, 2000);
      } else {
        throw new Error("Payment processing failed");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error("Payment processing error:", error);
    } finally {
      setIsProcessing(false);
    }
  }
  const createPaymentRequest = () => {
    return {
      countryCode: "US",
      currencyCode: "USD",
      total: {
        amount: courseDetails?.pricing.toString(),
        label: courseDetails?.title
      }
    };
  };

  return (
    <motion.div 
      initial="initial"
      animate="animate"
      variants={fadeIn}
      className="pt-32 min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-4xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-gray-900 mb-8 text-center"
        >
          Secure Checkout
        </motion.h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Order Summary Card */}
          <motion.div
            variants={fadeIn}
            transition={{ delay: 0.2 }}
          >
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <motion.div 
                    className="flex items-center bg-gray-50 p-4 rounded-lg"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <img 
                      src={courseDetails?.image} 
                      alt={courseDetails?.title}
                      className="h-24 w-24 object-cover rounded-lg shadow-md"
                    />
                    <div className="ml-4">
                      <h3 className="font-medium text-lg">{courseDetails?.title}</h3>
                      <p className="text-sm text-gray-500">by {capitalizeWord(courseDetails?.instructorName)}</p>
                      <div className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                        Lifetime Access
                      </div>
                    </div>
                  </motion.div>
                  
                  <div className="border-t pt-4 space-y-3">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal</span>
                      <span>{formatPrice(courseDetails?.pricing)}</span>
                    </div>
                    <div className="flex justify-between font-medium text-lg">
                      <span>Total</span>
                      <span className="text-primary">{formatPrice(courseDetails?.pricing)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Payment Method Card */}
          <motion.div
            variants={fadeIn}
            transition={{ delay: 0.3 }}
          >
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary" />
                  Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent>
                <PaymentForm
                  applicationId={appId}
                  locationId={locationId}
                  cardTokenizeResponseReceived={handlePaymentSuccess}
                  createPaymentRequest={createPaymentRequest}
                >
                  <PaymentFormWrapper 
                    courseDetails={courseDetails} 
                    isProcessing={isProcessing}
                    setIsProcessing={setIsProcessing}
                  />
                </PaymentForm>
                
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Shield className="w-4 h-4" />
                    <span>Secure payment powered by Square</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default CheckoutPage;