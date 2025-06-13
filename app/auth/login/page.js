"use client";
import { BiLogoKickstarter } from "react-icons/bi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useState } from "react";
import Link from "next/link";

export default function Login() {
  const [isOtpRequested, setIsOtpRequested] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  

  const handleRequestOtp = async () => {
    if (!mobileNumber || mobileNumber.length !== 10) return;
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    setIsOtpRequested(true);
  };

  const handleVerifyOtp = async () => {
    if (!otp || otp.length !== 6) return;
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    // Handle successful login
    router.push('/dashboard');
    
  };

  return (
    <main className="min-h-screen flex flex-col items-center p-6 bg-background relative">
      {/* Logo Section */}
      <div className="flex-1 flex flex-col items-center pt-20 gap-8 w-full max-w-md">
        <div className="w-32 h-32 rounded-full bg-muted flex items-center justify-center animate-fade-in">
          <BiLogoKickstarter className="size-12 text-primary" />
        </div>
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Kattunar Kuzhu</h1>
          <p className="text-muted-foreground">Welcome back!</p>
        </div>
      </div>

      {/* Bottom Container with Border Radius */}
      <div className="fixed bottom-0 left-0 right-0 border-t rounded-t-[32px] shadow-lg bg-gray-300">
        <div className="max-w-md mx-auto p-6 space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold tracking-tight">Login</h2>
            <p className="text-muted-foreground">
              {!isOtpRequested
                ? "Enter your mobile number to receive OTP"
                : "Enter the OTP sent to your mobile"}
            </p>
          </div>

          <div className="space-y-4">
            {!isOtpRequested ? (
              <>
                <div className="space-y-2">
                  <Input
                    type="tel"
                    placeholder="Enter mobile number"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ""))}
                    className="h-14 text-lg rounded-full pl-6 border-gray-500"
                    maxLength={10}
                  />
                  <p className="text-sm text-muted-foreground">
                    We&apos;ll send you a one-time password
                  </p>
                </div>
                <Button
                  className="w-full h-14 text-lg rounded-full"
                  size="lg"
                  onClick={handleRequestOtp}
                  disabled={mobileNumber.length !== 10 || isLoading}
                >
                  {isLoading ? "Sending OTP..." : "Request OTP"}
                </Button>
              </>
            ) : (
              <>
                <div className="space-y-4">
                  <InputOTP
                    maxLength={6}
                    className=""
                    value={otp}
                    onChange={setOtp}
                    render={({ slots }) => (
                      <InputOTPGroup>
                        {slots.map((slot, index) => (
                          <InputOTPSlot
                            key={index}
                            {...slot}
                            className="size-13 text-lg border-2 border-gray-400"
                          />
                        ))}
                      </InputOTPGroup>
                    )}
                  />
                  <p className="text-sm text-muted-foreground text-center">
                    OTP sent to {mobileNumber}
                  </p>
                </div>
                <Button
                  className="w-full h-14 text-lg rounded-full"
                  size="lg"
                  onClick={handleVerifyOtp}
                  disabled={otp.length !== 6 || isLoading}
                >
                  {isLoading ? "Verifying..." : "Submit OTP"}
                </Button>
                <Button
                  variant="link"
                  className="w-full"
                  onClick={() => {
                    setIsOtpRequested(false);
                    setOtp("");
                  }}
                  disabled={isLoading}
                >
                  Change mobile number
                </Button>
              </>
            )}
          </div>

          {/* Registration Link */}
          <div className="text-center pt-4">
            <p className="text-muted-foreground">
              Not a member?{" "}
              <Link 
                href="/auth/register" 
                className="text-primary hover:underline font-medium"
              >
                Register here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}