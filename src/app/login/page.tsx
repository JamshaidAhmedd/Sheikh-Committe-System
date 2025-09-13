'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { toast } = useToast();
  const { login } = useAuth();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(username, password)) {
      toast({
        title: 'Login Successful',
        description: 'Welcome back!',
      });
      router.push('/dashboard');
    } else {
      toast({
        variant: 'destructive',
        title: 'Login Failed',
        description: 'Invalid username or password.',
      });
    }
  };

  const handleGuestView = () => {
    router.push('/guest');
  };

<<<<<<< HEAD
  const GlassmorphismBackground = () => (
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700"></div>
      
      {/* Abstract 3D Shapes */}
      <div className="absolute top-20 right-20 w-32 h-32 bg-blue-400/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute top-40 left-20 w-24 h-24 bg-cyan-300/30 rounded-full blur-lg animate-bounce"></div>
      <div className="absolute bottom-32 right-32 w-40 h-40 bg-blue-300/25 rounded-full blur-2xl"></div>
      <div className="absolute bottom-20 left-32 w-28 h-28 bg-cyan-400/20 rounded-full blur-xl animate-pulse"></div>
      
      {/* Wavy shapes */}
      <div className="absolute top-1/3 left-0 w-full h-64 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 transform rotate-12 scale-110"></div>
      <div className="absolute bottom-1/4 right-0 w-full h-48 bg-gradient-to-l from-cyan-400/15 to-blue-400/15 transform -rotate-12 scale-110"></div>
      
      {/* Additional floating elements */}
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/10 rounded-full blur-md animate-pulse"></div>
      <div className="absolute top-1/4 right-1/3 w-20 h-20 bg-cyan-200/20 rounded-full blur-lg animate-bounce"></div>
      <div className="absolute bottom-1/3 left-1/3 w-12 h-12 bg-blue-200/30 rounded-full blur-sm animate-pulse"></div>
=======
  const WavyBackground = () => (
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
      <svg
        className="absolute bottom-0 left-0 mb-[-10px] w-full text-primary/30"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
      >
        <path
          fill="currentColor"
          fillOpacity="1"
          d="M0,224L48,208C96,192,192,160,288,165.3C384,171,480,213,576,202.7C672,192,768,128,864,117.3C960,107,1056,149,1152,160C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </svg>
      <svg
        className="absolute bottom-0 left-0 mb-[-5px] w-full text-primary/50"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
      >
        <path
          fill="currentColor"
          fillOpacity="1"
          d="M0,128L48,138.7C96,149,192,171,288,186.7C384,203,480,213,576,192C672,171,768,117,864,101.3C960,85,1056,107,1152,133.3C1248,160,1344,192,1392,208L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </svg>
>>>>>>> 128a08a90d489ae6002776951dc4a70eeae02f6c
    </div>
  );

  return (
<<<<<<< HEAD
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
      <GlassmorphismBackground />
      <div className="relative z-10 flex flex-col items-center justify-center w-full animate-fade-in-up">
        <div className="flex items-center gap-4 p-2 justify-center mb-8 flex-col">
=======
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-background overflow-hidden">
      <WavyBackground />
      <div className="relative z-10 flex flex-col items-center justify-center w-full animate-fade-in-up">
        <div className="flex items-center gap-4 p-2 justify-center mb-6 flex-col">
>>>>>>> 128a08a90d489ae6002776951dc4a70eeae02f6c
          <Image
            src="/IMG_2065.PNG?v=1"
            alt="Sheikh Committee Logo"
            width={120}
            height={120}
<<<<<<< HEAD
            className="rounded-full shadow-2xl ring-4 ring-white/20"
          />
          <h1 className="text-5xl font-headline font-bold text-white drop-shadow-lg">
            Sheikh Committee
          </h1>
        </div>
        <Card className="w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl rounded-2xl">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-3xl font-bold text-white mb-2">Admin Login</CardTitle>
            <CardDescription className="text-white/80 text-lg">
              Enter your credentials to access the admin dashboard
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleLogin}>
            <CardContent className="grid gap-6 px-8">
              <div className="grid gap-3">
                <Label htmlFor="username" className="text-white font-medium text-sm">Username</Label>
=======
            className="rounded-full shadow-2xl"
          />
          <h1 className="text-5xl font-headline font-bold text-foreground">
            Sheikh Committee
          </h1>
        </div>
        <Card className="w-full max-w-sm bg-card/80 backdrop-blur-sm border-border/50 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-2xl">Admin Login</CardTitle>
            <CardDescription>
              Enter your credentials to access the admin dashboard.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleLogin}>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
>>>>>>> 128a08a90d489ae6002776951dc4a70eeae02f6c
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
<<<<<<< HEAD
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:ring-white/50 focus:border-white/50 rounded-xl h-12"
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="password" className="text-white font-medium text-sm">Password</Label>
=======
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
>>>>>>> 128a08a90d489ae6002776951dc4a70eeae02f6c
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
<<<<<<< HEAD
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:ring-white/50 focus:border-white/50 rounded-xl h-12"
                />
              </div>
              <div className="text-right">
                <button
                  type="button"
                  className="text-cyan-300 hover:text-cyan-200 text-sm font-medium transition-colors"
                >
                  Forgot Password?
                </button>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4 px-8 pb-8">
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-3 rounded-xl shadow-lg transition-all duration-200 transform hover:scale-105"
              >
                Sign in
              </Button>
              <div className="text-center">
                <span className="text-white/60 text-sm">or continue with</span>
              </div>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1 bg-white/10 border-white/30 text-white hover:bg-white/20 rounded-xl h-12"
                  type="button"
                >
                  <span className="font-bold">G</span>
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 bg-white/10 border-white/30 text-white hover:bg-white/20 rounded-xl h-12"
                  type="button"
                >
                  <span className="font-bold">GitHub</span>
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 bg-white/10 border-white/30 text-white hover:bg-white/20 rounded-xl h-12"
                  type="button"
                >
                  <span className="font-bold">f</span>
                </Button>
              </div>
              <Button
                variant="ghost"
                className="w-full text-cyan-300 hover:text-cyan-200 hover:bg-white/10 rounded-xl py-3 transition-all duration-200"
=======
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                Sign in
              </Button>
              <Button
                variant="ghost"
                className="w-full text-primary hover:bg-primary/10 hover:text-primary"
>>>>>>> 128a08a90d489ae6002776951dc4a70eeae02f6c
                onClick={handleGuestView}
                type="button"
              >
                View as Guest
              </Button>
<<<<<<< HEAD
              <div className="text-center">
                <span className="text-white/60 text-sm">
                  Don't have an account? <span className="text-cyan-300 hover:text-cyan-200 cursor-pointer font-medium">Register for free</span>
                </span>
              </div>
=======
>>>>>>> 128a08a90d489ae6002776951dc4a70eeae02f6c
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
