import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

// Custom Layout Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// shadcn/ui Components
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User } from 'lucide-react';

const DashboardPage = () => {
  console.log('DashboardPage loaded');
  const navigate = useNavigate();

  // Mock user data for display
  const user = {
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    imageUrl: `https://i.pravatar.cc/150?u=${'jane.doe@example.com'}`, // Using email for a unique avatar
  };

  // Trigger a welcome toast on page load
  useEffect(() => {
    toast.success('Login successful!', {
      description: `Welcome back, ${user.name}.`,
    });
  }, [user.name]);

  // The Header component already handles navigation on logout.
  // This function is for any additional page-specific logout logic if needed.
  const handleLogout = () => {
    console.log("Logout initiated from DashboardPage.");
    // In a real app, you might clear local state here.
    // The Header component will handle the navigation to '/'.
  };

  return (
    <div className="flex flex-col min-h-screen bg-muted/40">
      <Header isAuthenticated={true} user={user} onLogout={handleLogout} />
      
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 md:p-8">
        <Card className="w-full max-w-lg shadow-lg">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={user.imageUrl} alt={user.name} />
                <AvatarFallback>
                  <User className="h-10 w-10" />
                </AvatarFallback>
              </Avatar>
            </div>
            <CardTitle className="text-2xl">Welcome to Your Dashboard</CardTitle>
            <CardDescription>
              You have successfully logged in.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground mb-6">
              This is your protected area. From here, you can access all the application's features.
            </p>
            <Button size="lg">
              Explore Application
            </Button>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default DashboardPage;