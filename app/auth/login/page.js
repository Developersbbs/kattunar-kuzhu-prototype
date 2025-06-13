"use client";
import React from "react";
import { BiLogoKickstarter } from "react-icons/bi";
import { IoCloseOutline } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const countryCodes = [
  { code: "+91", country: "IN" },
  { code: "+94", country: "LK" },
  { code: "+95", country: "MM" },
  { code: "+60", country: "MY" },
  { code: "+65", country: "SG" },
];

export default function Login() {
  const [isOtpRequested, setIsOtpRequested] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const router = useRouter();

  // Handle countdown timer
  React.useEffect(() => {
    if (!isOtpRequested || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isOtpRequested, timeLeft]);

  const handleRequestOtp = async () => {
    if (!mobileNumber || mobileNumber.length !== 10) return;
    setIsLoading(true);
    // Simulate API call with country code
    console.log(`Sending OTP to ${countryCode}${mobileNumber}`);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    setIsOtpRequested(true);
    setTimeLeft(30); // Reset timer when OTP is sent
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
                  <div className="relative">
                    <div className="absolute left-0 top-0 bottom-0 flex items-center">
                      <Select 
                        value={countryCode} 
                        onValueChange={setCountryCode}
                      >
                        <SelectTrigger className="h-14 w-[90px] border-0 bg-transparent focus:ring-0 focus:ring-offset-0">
                          <SelectValue placeholder="+91" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="+91">🇮🇳 +91</SelectItem>
                          <SelectItem value="+1">🇺🇸 +1</SelectItem>
                          <SelectItem value="+44">🇬🇧 +44</SelectItem>
                          <SelectItem value="+971">🇦🇪 +971</SelectItem>
                          <SelectItem value="+65">🇸🇬 +65</SelectItem>
                        </SelectContent>
                      </Select>
                      <div className="h-6 w-[1px] bg-gray-300"></div>
                    </div>
                    <div className="relative w-full">
                      <Input
                        type="tel"
                        placeholder="Enter mobile number"
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ""))}
                        className="h-14 text-lg rounded-full pl-[96px] pr-12 border-gray-500 w-full"
                        maxLength={10}
                      />
                      {mobileNumber && (
                        <button
                          type="button"
                          onClick={() => setMobileNumber("")}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                        >
                          <IoCloseOutline className="w-6 h-6" />
                        </button>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    We&apos;ll send you a one-time password
                  </p>
                </div>
                <Button
                  className={cn(
                    "w-full h-14 text-lg rounded-full",
                    mobileNumber.length !== 10 && "opacity-50"
                  )}
                  onClick={handleRequestOtp}
                  disabled={mobileNumber.length !== 10 || isLoading}
                >
                  {isLoading ? "Sending..." : "Get OTP"}
                </Button>
              </>
            ) : (
              <>
                <div className="space-y-4">
                  <InputOTP
                    value={otp}
                    onChange={setOtp}
                    maxLength={6}
                    containerClassName="justify-center gap-2"
                    render={({ slots }) => (
                      <InputOTPGroup>
                        {slots.map((slot, index) => (
                          <InputOTPSlot key={index} {...slot} className="h-14 w-12 text-lg border-gray-600 rounded-full" />
                        ))}
                      </InputOTPGroup>
                    )}
                  />
                  <div className="space-y-2 flex items-center justify-between">
                    <p className="text-sm text-center text-muted-foreground">
                      OTP sent to {countryCode} {mobileNumber}
                    </p>
                    <div className="flex justify-center items-center gap-2">
                      {timeLeft > 0 ? (
                        <p className="text-sm text-muted-foreground">
                          Resend OTP in {timeLeft}s
                        </p>
                      ) : (
                        <Button
                          variant="link"
                          onClick={handleRequestOtp}
                          disabled={isLoading}
                          className="text-sm font-medium p-0 h-auto"
                        >
                          Resend OTP
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
                <Button
                  className={cn(
                    "w-full h-14 text-lg rounded-full",
                    otp.length !== 6 && "opacity-50"
                  )}
                  onClick={handleVerifyOtp}
                  disabled={otp.length !== 6 || isLoading}
                >
                  {isLoading ? "Verifying..." : "Verify OTP"}
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