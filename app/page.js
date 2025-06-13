'use client';
import { BiLogoKickstarter } from "react-icons/bi";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/onboarding');
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);
  
  return (
    <main className="min-h-screen flex flex-col items-center justify-between p-6 bg-background">
      {/* Logo Section */}
      <div className="flex-1 flex flex-col items-center justify-center gap-8 w-full">
        <div className="w-32 h-32 rounded-full bg-muted flex items-center justify-center animate-fade-in">
          <BiLogoKickstarter className="w-20 h-20 text-primary" />
        </div>
        
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Kattunar Kuzhu</h1>
          <p className="text-muted-foreground">Welcome to our community</p>
        </div>
      </div>
    </main>
  );
}