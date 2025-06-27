import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { AlertCircle } from 'lucide-react';

// Import custom components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AuthForm from '@/components/AuthForm';

// Import shadcn/ui components
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const LoginPage = () => {
  console.log('LoginPage loaded');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Handle form submission
  const handleLogin = async (values: any) => {
    setIsLoading(true);
    setError(null);
    console.log('Login form submitted with:', values);

    // Simulate API call
    setTimeout(() => {
      // Simulate a failed login for demonstration
      if (values.email !== 'test@example.com' || values.password !== 'password123') {
        setError('Invalid email or password. Please try again.');
        toast.error('Login Failed');
        setIsLoading(false);
      } else {
        // Simulate a successful login
        toast.success('Login Successful!');
        setIsLoading(false);
        // Navigate to the dashboard on successful login, as defined in App.tsx
        navigate('/dashboard');
      }
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header is shown, but user is not authenticated yet */}
      <Header isAuthenticated={false} />

      <main className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md space-y-4">
            {error && (
            <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Authentication Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>
            )}

            <AuthForm
            mode="login"
            onSubmit={handleLogin}
            isLoading={isLoading}
            />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LoginPage;