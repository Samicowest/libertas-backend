import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";
import { Link } from "wouter";
import { Mail, Lock, User as UserIcon, Sparkles, ArrowRight, UserPlus } from "lucide-react";
import { useAuth } from "@/_core/hooks/useAuth";

export default function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [username, setUsername] = useState("");
    const { signup, loading: isLoading } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!username) {
            toast.error("Username is required");
            return;
        }

        if (!email) {
            toast.error("Email is required");
            return;
        }

        if (!password) {
            toast.error("Password is required");
            return;
        }

        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        try {
            await signup(username, email, password);
            toast.success("Account created successfully! 🎉 Please check your email to confirm your account.");
            // Redirect to login page
            setTimeout(() => {
                window.location.href = "/login";
            }, 500);
        } catch (error: any) {
            console.log(error);
            console.error("Signup error:", error);
            toast.error(error.message || "An error occurred during signup");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0A0628] via-[#1a0f3d] to-[#0A0628] text-white overflow-hidden flex items-center justify-center px-4 py-8">
            {/* Animated background elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>

            {/* Signup Container */}
            <div className="relative w-full max-w-md">
                {/* Logo and Header */}
                <div className="text-center mb-4">
                    <Link href="/" className="inline-block mb-6 group">
                        <img
                            src="/libertas-logo-white.png"
                            alt="Libertas Alpha"
                            className="h-16 w-auto mx-auto transition-transform group-hover:scale-105"
                        />
                    </Link>


                </div>
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-4">
                        <Sparkles className="w-4 h-4 text-purple-400" />
                        <span className="text-sm font-medium text-white/90">Join the Ecosystem</span>
                    </div>

                    <h1 className="text-4xl font-bold mb-2">
                        <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                            Create Account
                        </span>
                    </h1>
                    <p className="text-white/70">
                        Start your journey with Libertas Alpha
                    </p>
                </div>

                {/* Signup Form Card */}
                <div className="relative p-8 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 backdrop-blur-xl shadow-2xl">
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-blue-600/5 rounded-3xl"></div>

                    <form onSubmit={handleSubmit} className="relative space-y-6">
                        {/* Username Field */}
                        <div className="space-y-2">
                            <Label htmlFor="username" className="text-white font-medium flex items-center gap-2">
                                <UserIcon className="w-4 h-4 text-purple-400" />
                                Username
                            </Label>
                            <div className="relative">
                                <Input
                                    id="username"
                                    type="text"
                                    placeholder="choose_a_username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                    disabled={isLoading}
                                    className="bg-white/5 border-white/20 text-white placeholder:text-white/40 focus:border-purple-500 focus:ring-purple-500/50 h-12 px-4 rounded-xl"
                                />
                            </div>
                        </div>

                        {/* Email Field */}
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

                        {/* Password Field */}
                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-white font-medium flex items-center gap-2">
                                <Lock className="w-4 h-4 text-purple-400" />
                                Password
                            </Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    disabled={isLoading}
                                    className="bg-white/5 border-white/20 text-white placeholder:text-white/40 focus:border-purple-500 focus:ring-purple-500/50 h-12 px-4 rounded-xl"
                                />
                            </div>
                            <p className="text-xs text-white/50">Minimum 6 characters</p>
                        </div>
                        
                        {/* Confirm Password Field */}
                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword" className="text-white font-medium flex items-center gap-2">
                                <Lock className="w-4 h-4 text-purple-400" />
                                Confirm Password
                            </Label>
                            <div className="relative">
                                <Input
                                    id="confirmPassword"
                                    type="password"
                                    placeholder="••••••••"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    disabled={isLoading}
                                    className="bg-white/5 border-white/20 text-white placeholder:text-white/40 focus:border-purple-500 focus:ring-purple-500/50 h-12 px-4 rounded-xl"
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 shadow-xl shadow-purple-500/50 h-12 text-base font-semibold rounded-xl group"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <span className="flex items-center gap-2">
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Creating account...
                                </span>
                            ) : (
                                <span className="flex items-center gap-2">
                                    <UserPlus className="w-5 h-5" />
                                    Create Account
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </span>
                            )}
                        </Button>

                        {/* Info Text */}
                        <div className="text-center pt-4">
                            <p className="text-xs text-white/50">
                                🔒 Your data is secure and encrypted
                            </p>
                        </div>
                    </form>
                </div>

                {/* Already have account */}
                <div className="mt-6 text-center">
                    <p className="text-white/60 text-sm mb-2">Already have an account?</p>
                    <Link href="/login">
                        <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 backdrop-blur-sm">
                            Sign In Instead
                        </Button>
                    </Link>
                </div>

                {/* Back to Home Link */}
                <div className="mt-6 text-center">
                    <Link href="/" className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors group">
                        <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
                        <span>Back to Home</span>
                    </Link>
                </div>

            </div>
        </div>
    );
}
