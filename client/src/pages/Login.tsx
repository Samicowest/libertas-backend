import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Link, useSearch } from "wouter";
import { Mail, Sparkles, ArrowRight, LogIn, Lock } from "lucide-react";
import { useAuth } from "@/_core/hooks/useAuth";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login, loading: isLoading } = useAuth();
    const search = useSearch();

    useEffect(() => {
        const params = new URLSearchParams(search);
        if (params.get("confirmed") === "true") {
            toast.success("Email confirmed! You can now sign in.");
            // Optional: clean up the URL
            window.history.replaceState({}, document.title, window.location.pathname);
        }
    }, [search]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !password) {
            toast.error("Email and password are required");
            return;
        }

        try {
            await login(email, password);
            toast.success("Welcome back to Libertas Alpha! 🎉");
            // Redirect to dashboard
            setTimeout(() => {
                window.location.href = "/";
            }, 500);
        } catch (error: any) {
            console.error("Login error:", error);
            toast.error(error.message || "An error occurred during login");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0A0628] via-[#1a0f3d] to-[#0A0628] text-white overflow-hidden flex items-center justify-center px-4 py-8">
            {/* Animated background elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>

            {/* Login Container */}
            <div className="relative w-full max-w-md">
                {/* Logo and Header */}

                <div className="text-center mb-4">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-4">
                        <Sparkles className="w-4 h-4 text-purple-400" />
                        <span className="text-sm font-medium text-white/90">Welcome Back</span>
                    </div>

                    <h1 className="text-4xl font-bold mb-2">
                        <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                            Sign In
                        </span>
                    </h1>
                    <p className="text-white/70">
                        Access your dashboard and explore the ecosystem
                    </p>
                </div>
                {/* Login Form Card */}
                <div className="relative p-8 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 backdrop-blur-xl shadow-2xl">
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-blue-600/5 rounded-3xl"></div>

                    <form onSubmit={handleSubmit} className="relative space-y-6">
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
                            <div className="flex justify-end">
                                <Link href="/forgot-password">
                                    <span className="text-sm text-purple-400 hover:text-purple-300 cursor-pointer">
                                        Forgot Password?
                                    </span>
                                </Link>
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
                                    Signing in...
                                </span>
                            ) : (
                                <span className="flex items-center gap-2">
                                    <LogIn className="w-5 h-5" />
                                    Sign In
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </span>
                            )}
                        </Button>

                        {/* Signup Link */}
                        <div className="text-center pt-4">
                            <p className="text-sm text-white/70">
                                Don't have an account?{" "}
                                <Link to="/signup" className="font-medium text-purple-400 hover:text-purple-300">
                                    Sign up
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>


            </div >
        </div >
    );
}
