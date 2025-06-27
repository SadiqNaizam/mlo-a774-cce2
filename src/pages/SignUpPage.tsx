import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { z } from 'zod';
import { toast } from 'sonner';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AuthForm from '@/components/AuthForm';
import { Checkbox } from '@/components/ui/checkbox';
import PasswordStrengthIndicator from '@/components/PasswordStrengthIndicator'; // Although used inside AuthForm, it's good practice to know it's part of the feature.

// The form values type from AuthForm is not exported, but we can infer it for the handler.
// This is a basic representation for the sake of the handler's signature.
const signupSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
});
type SignupFormValues = z.infer<typeof signupSchema>;


const SignUpPage = () => {
  console.log('SignUpPage loaded');
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleSignUp = async (values: SignupFormValues) => {
    if (!agreedToTerms) {
      toast.error('You must agree to the Terms of Service to continue.');
      return;
    }

    setIsLoading(true);
    console.log('Signing up with:', values);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Simulate a successful response
    toast.success('Account created successfully!', {
      description: 'Redirecting you to the dashboard...',
    });
    
    setIsLoading(false);
    navigate('/dashboard'); // Navigate to dashboard as per App.tsx
  };

  return (
    <div className="flex flex-col min-h-screen bg-muted/40">
      <Header isAuthenticated={false} />
      
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-6">
          {/* AuthForm is a card itself */}
          <AuthForm 
            mode="signup" 
            onSubmit={handleSignUp} 
            isLoading={isLoading} 
          />

          {/* Terms of Service Checkbox, as required by page_type_info */}
          <div className="flex items-center space-x-2 px-1">
            <Checkbox 
              id="terms" 
              checked={agreedToTerms}
              onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
              disabled={isLoading}
            />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              I agree to the{' '}
              <Link to="/terms-of-service" className="text-primary underline-offset-4 hover:underline">
                Terms of Service
              </Link>
            </label>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SignUpPage;