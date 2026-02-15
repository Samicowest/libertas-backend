
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Link, useSearch } from "wouter";
import { Lock, Sparkles, ArrowRight, CheckCircle } from "lucide-react";
import { useAuth } from "@/_core/hooks/useAuth";

export default function ResetPassword() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const { resetPassword, loading: isLoading } = useAuth();
    const [success, setSuccess] = useState(false);
    const search = useSearch();
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const params = new URLSearchParams(search);
        const t = params.get("token");
        if (t) {
            setToken(t);
        } else {
            toast.error("Invalid reset link");
        }
    }, [search]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!token) {
            toast.error("Missing reset token");
            return;
        }

        if (!password || !confirmPassword) {
            toast.error("Both fields are required");
            return;
        }

        if (password.length < 6) {
            toast.error("Password must be at least 6 characters");
            return;
        }

        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        try {
            await resetPassword(token, password);
            setSuccess(true);
            toast.success("Password reset successfully! 🎉");
        } catch (error: any) {
            console.error("Reset password error:", error);
            toast.error(error.message || "Failed to reset password");
        }
    };

    if (!token) {
        return (
            <div className="min-h-screen bg-[#0A0628] flex items-center justify-center text-white">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Invalid Link</h1>
                    <p className="opacity-70 mb-4">This password reset link is invalid or missing.</p>
                    <Link href="/forgot-password">
                        <Button variant="outline">Request a new link</Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0A0628] via-[#1a0f3d] to-[#0A0628] text-white overflow-hidden flex items-center justify-center px-4 py-8">
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>

            <div className="relative w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-4">
                        <Lock className="w-4 h-4 text-purple-400" />
                        <span className="text-sm font-medium text-white/90">Secure Account</span>
                    </div>

                    <h1 className="text-4xl font-bold mb-2">
                        <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                            Set New Password
                        </span>
                    </h1>
                </div>

                <div className="relative p-8 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 backdrop-blur-xl shadow-2xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-blue-600/5 rounded-3xl"></div>

                    {success ? (
                        <div className="relative text-center space-y-6">
                            <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto">
                                <CheckCircle className="w-8 h-8 text-green-400" />
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-white mb-2">Success!</h3>
                                <p className="text-white/70">
                                    Your password has been securely updated. You can now use your new password to sign in.
                                </p>
                            </div>
                            <Link href="/login">
                                <Button className="w-full bg-green-600 hover:bg-green-700 text-white rounded-xl h-12">
                                    Sign In Now
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="relative space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-white font-medium flex items-center gap-2">
                                    <Lock className="w-4 h-4 text-purple-400" />
                                    New Password
                                </Label>
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
                                <p className="text-xs text-white/50">Minimum 6 characters</p>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword" className="text-white font-medium flex items-center gap-2">
                                    <Lock className="w-4 h-4 text-purple-400" />
                                    Confirm Password
                                </Label>
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

                            <Button
                                type="submit"
                                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 shadow-xl shadow-purple-500/50 h-12 text-base font-semibold rounded-xl group"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <span className="flex items-center gap-2">
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        Updating...
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-2">
                                        Update Password
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                )}
                            </Button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
