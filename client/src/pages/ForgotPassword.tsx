
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";
import { Link } from "wouter";
import { Mail, Sparkles, ArrowLeft, KeyRound } from "lucide-react";
import { useAuth } from "@/_core/hooks/useAuth";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const { forgotPassword, loading: isLoading } = useAuth();
    const [emailSent, setEmailSent] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email) {
            toast.error("Email is required");
            return;
        }

        try {
            await forgotPassword(email);
            setEmailSent(true);
            toast.success("Reset link sent to your email!");
        } catch (error: any) {
            console.error("Forgot password error:", error);
            toast.error(error.message || "Failed to send reset link");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0A0628] via-[#1a0f3d] to-[#0A0628] text-white overflow-hidden flex items-center justify-center px-4 py-8">
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>

            <div className="relative w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-4">
                        <KeyRound className="w-4 h-4 text-purple-400" />
                        <span className="text-sm font-medium text-white/90">Account Recovery</span>
                    </div>

                    <h1 className="text-4xl font-bold mb-2">
                        <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                            Reset Password
                        </span>
                    </h1>
                    <p className="text-white/70">
                        Enter your email to receive a reset link
                    </p>
                </div>

                <div className="relative p-8 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 backdrop-blur-xl shadow-2xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-blue-600/5 rounded-3xl"></div>

                    {emailSent ? (
                        <div className="relative text-center space-y-4">
                            <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Mail className="w-8 h-8 text-green-400" />
                            </div>
                            <h3 className="text-xl font-semibold text-white">Check your email</h3>
                            <p className="text-white/70">
                                We have sent a password reset link to <strong>{email}</strong>.
                            </p>
                            <p className="text-sm text-white/50">
                                Didn't receive the email? Check your spam folder or try again.
                            </p>
                            <Button
                                variant="outline"
                                className="mt-4 border-white/20 text-white hover:bg-white/10"
                                onClick={() => setEmailSent(false)}
                            >
                                Try another email
                            </Button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="relative space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-white font-medium flex items-center gap-2">
                                    <Mail className="w-4 h-4 text-purple-400" />
                                    Email Address
                                </Label>
                                <div className="relative">
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="your.email@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        disabled={isLoading}
                                        className="bg-white/5 border-white/20 text-white placeholder:text-white/40 focus:border-purple-500 focus:ring-purple-500/50 h-12 px-4 rounded-xl"
                                    />
                                </div>
                            </div>

                            <Button
                                type="submit"
                                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 shadow-xl shadow-purple-500/50 h-12 text-base font-semibold rounded-xl group"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <span className="flex items-center gap-2">
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        Sending Link...
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-2">
                                        Send Reset Link
                                        <Sparkles className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                )}
                            </Button>
                        </form>
                    )}
                </div>

                <div className="mt-6 text-center">
                    <Link href="/login" className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors group">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        <span>Back to Sign In</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}
