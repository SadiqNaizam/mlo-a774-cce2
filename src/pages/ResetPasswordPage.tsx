import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

// Custom Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PasswordStrengthIndicator from '@/components/PasswordStrengthIndicator';

// shadcn/ui components
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
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

// Zod Schema for validation
const formSchema = z.object({
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long.",
  }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"], // Error will be shown on the confirmPassword field
});

const ResetPasswordPage: React.FC = () => {
    console.log('ResetPasswordPage loaded');
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Note: In a real app, you would get a reset token from the URL parameters
    // const [searchParams] = useSearchParams();
    // const token = searchParams.get('token');
    // if (!token) { navigate('/forgot-password'); }

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            password: "",
            confirmPassword: "",
        },
    });

    const passwordValue = form.watch('password');

    function onSubmit(values: z.infer<typeof formSchema>) {
        setIsSubmitting(true);
        console.log("Form submitted with new password:", { password: values.password });

        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            // On success:
            toast.success("Password has been successfully changed.", {
                description: "You have been logged in automatically.",
            });
            // As per user journey, redirect to dashboard on success
            navigate('/dashboard'); 
        }, 2000);
    }

    return (
        <div className="flex flex-col min-h-screen bg-muted/40">
            <Header isAuthenticated={false} />
            <main className="flex-grow flex items-center justify-center p-4 sm:p-6 lg:p-8">
                <Card className="w-full max-w-md">
                    <CardHeader className="text-center">
                        <CardTitle className="text-2xl">Reset Your Password</CardTitle>
                        <CardDescription>Enter a new password for your account.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                <div className="space-y-4">
                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>New Password</FormLabel>
                                                <FormControl>
                                                    <Input type="password" placeholder="••••••••" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <PasswordStrengthIndicator password={passwordValue} />
                                    <FormField
                                        control={form.control}
                                        name="confirmPassword"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Confirm New Password</FormLabel>
                                                <FormControl>
                                                    <Input type="password" placeholder="••••••••" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <Button type="submit" className="w-full" disabled={isSubmitting}>
                                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    {isSubmitting ? 'Updating...' : 'Update Password'}
                                </Button>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </main>
            <Footer />
        </div>
    );
};

export default ResetPasswordPage;