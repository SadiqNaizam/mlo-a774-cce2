import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link } from 'react-router-dom';
import { Loader2, Eye, EyeOff } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

// Assuming these components exist and can be imported
import SocialLoginButtons from '@/components/SocialLoginButtons';
import PasswordStrengthIndicator from '@/components/PasswordStrengthIndicator';
import { cn } from '@/lib/utils';

// Schemas for validation
const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address.' }),
  password: z.string().min(1, { message: 'Password is required.' }),
});

const signupSchema = z.object({
    name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
    email: z.string().email({ message: 'Invalid email address.' }),
    password: z.string().min(8, { message: 'Password must be at least 8 characters.' }),
});

type LoginFormValues = z.infer<typeof loginSchema>;
type SignupFormValues = z.infer<typeof signupSchema>;

interface AuthFormProps {
  mode: 'login' | 'signup';
  onSubmit: (values: LoginFormValues | SignupFormValues) => void;
  isLoading?: boolean;
}

const AuthForm: React.FC<AuthFormProps> = ({ mode, onSubmit, isLoading = false }) => {
  const [showPassword, setShowPassword] = useState(false);
  
  console.log('AuthForm loaded in', mode, 'mode');

  const isLoginMode = mode === 'login';
  const schema = isLoginMode ? loginSchema : signupSchema;

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: isLoginMode 
      ? { email: '', password: '' } 
      : { name: '', email: '', password: '' },
  });
  
  const passwordValue = form.watch('password');

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">
          {isLoginMode ? 'Welcome Back!' : 'Create an Account'}
        </CardTitle>
        <CardDescription>
          {isLoginMode ? 'Sign in to continue to SecureLogin' : 'Enter your details to get started'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {!isLoginMode && (
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="name@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                   <div className="flex items-center justify-between">
                    <FormLabel>Password</FormLabel>
                    {isLoginMode && (
                      <Link to="/forgot-password" className="text-sm font-medium text-primary hover:underline">
                        Forgot Password?
                      </Link>
                    )}
                  </div>
                  <FormControl>
                    <div className="relative">
                       <Input 
                         type={showPassword ? 'text' : 'password'} 
                         placeholder="••••••••" 
                         {...field} 
                       />
                       <button 
                         type="button"
                         onClick={() => setShowPassword(!showPassword)}
                         className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500"
                         aria-label={showPassword ? "Hide password" : "Show password"}
                       >
                         {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                       </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {!isLoginMode && passwordValue && (
                <PasswordStrengthIndicator password={passwordValue} />
            )}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isLoginMode ? 'Log In' : 'Sign Up'}
            </Button>
          </form>
        </Form>
        <div className="relative my-6">
          <Separator />
          <span className="absolute left-1/2 -translate-x-1/2 -top-3 bg-card px-2 text-xs text-muted-foreground">
            OR CONTINUE WITH
          </span>
        </div>
        <SocialLoginButtons />
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-muted-foreground">
          {isLoginMode ? "Don't have an account?" : 'Already have an account?'}
          <Link to={isLoginMode ? '/sign-up' : '/'} className="ml-1 font-semibold text-primary hover:underline">
            {isLoginMode ? 'Sign Up' : 'Log In'}
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export default AuthForm;