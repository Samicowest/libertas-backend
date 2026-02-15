import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
    Send,
    Mail,
    MessageSquare,
    User,
    Globe,
    Twitter,
    Send as Discord,
    CheckCircle2,
    ArrowRight
} from "lucide-react";
import { toast } from "sonner";
import { Link } from "wouter";
import SmartHeader from "@/components/SmartHeader";

export default function Contact() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        setIsSubmitting(false);
        setSubmitted(true);
        toast.success("Message sent successfully! Our team will get back to you soon.");
    };

    return (
        <div className="min-h-screen bg-[#0A0628] text-white selection:bg-purple-500/30 overflow-hidden relative">
            <SmartHeader />
            {/* Background Elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/10 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px] animate-pulse delay-1000" />
            </div>

            <div className="container px-4 py-20 relative z-10">
                <div className="max-w-5xl mx-auto">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-16"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold mb-6">
                            <MessageSquare className="w-3.5 h-3.5" />
                            GET IN TOUCH
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
                            Connect with <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">Libertas Alpha</span>
                        </h1>
                        <p className="text-white/50 text-lg max-w-2xl mx-auto leading-relaxed mb-8">
                            Have questions about our mission, interested in becoming a Human Node, or looking to partner? We're here to help.
                        </p>

                        {/* Quick Social Buttons */}
                        <div className="flex flex-wrap justify-center gap-4">
                            {[
                                { icon: <Twitter className="w-5 h-5" />, href: "https://x.com/LibertasAlpha", label: "X (Twitter)", color: "from-blue-400 to-blue-600" },
                                { icon: <Discord className="w-5 h-5" />, href: "https://discord.gg/r4uT4jZsd", label: "Discord", color: "from-indigo-400 to-indigo-600" },
                                { icon: <Globe className="w-5 h-5" />, href: "https://www.linkedin.com/company/libertas-alpha", label: "LinkedIn", color: "from-blue-600 to-blue-800" },
                                { icon: <User className="w-5 h-5" />, href: "https://www.instagram.com/libertasalpha?igsh=MWt2OHRrMnh2dnJ0Mg==", label: "Instagram", color: "from-pink-500 to-orange-500" },
                                { icon: <MessageSquare className="w-5 h-5" />, href: "https://wa.me/2347065779669", label: "WhatsApp", color: "from-green-400 to-green-600" },
                            ].map((social, i) => (
                                <motion.a
                                    key={i}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all hover:bg-white/10 group`}
                                    title={social.label}
                                >
                                    <div className={`text-white transition-colors group-hover:text-purple-400`}>
                                        {social.icon}
                                    </div>
                                    <span className="text-sm font-bold text-white/70 group-hover:text-white transition-colors">{social.label}</span>
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                        {/* Contact Info */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="space-y-8"
                        >
                            <div className="grid gap-6">
                                {[
                                    {
                                        icon: <Mail className="w-5 h-5" />,
                                        title: "Email Us",
                                        value: "libertasalpha@gmail.com",
                                        href: "mailto:libertasalpha@gmail.com",
                                        sub: "Official channel for all inquiries",
                                        color: "purple"
                                    },
                                    {
                                        icon: <Twitter className="w-5 h-5" />,
                                        title: "X (Twitter)",
                                        value: "@LibertasAlpha",
                                        href: "https://x.com/LibertasAlpha",
                                        sub: "Real-time updates and community news",
                                        color: "blue"
                                    },
                                    {
                                        icon: <MessageSquare className="w-5 h-5" />,
                                        title: "WhatsApp Support",
                                        value: "+234 706 577 9669",
                                        href: "https://wa.me/2347065779669",
                                        sub: "Direct interaction via WhatsApp",
                                        color: "green"
                                    }
                                ].map((item, i) => (
                                    <a key={i} href={item.href} target="_blank" rel="noopener noreferrer" className="group p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all hover:bg-white/[0.07] block">
                                        <div className="flex items-start gap-4">
                                            <div className={`w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center border border-white/10 text-white group-hover:text-purple-400 group-hover:border-purple-500/50 transition-colors`}>
                                                {item.icon}
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                                                <p className="text-white font-medium mb-1">{item.value}</p>
                                                <p className="text-white/40 text-sm">{item.sub}</p>
                                            </div>
                                        </div>
                                    </a>
                                ))}
                            </div>

                            <div className="p-8 rounded-3xl bg-gradient-to-br from-purple-600/20 to-blue-600/20 border border-white/10 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <Globe className="w-32 h-32" />
                                </div>
                                <h3 className="text-xl font-bold mb-4 relative z-10">The Nigerian Epicenter</h3>
                                <p className="text-white/60 mb-6 leading-relaxed relative z-10">
                                    Strategically focused on Nigeria, the global hub for Real-World Asset innovation. Our team is local, accessible, and dedicated to impact.
                                </p>
                                <Link href="/whitepaper">
                                    <Button variant="ghost" className="p-0 text-purple-400 hover:text-purple-300 hover:bg-transparent group/btn">
                                        Read the Imperative <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                                    </Button>
                                </Link>
                            </div>
                        </motion.div>

                        {/* Contact Form */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                            className="relative"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-blue-600/5 rounded-3xl blur-3xl -z-10" />

                            <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8 md:p-10 shadow-2xl">
                                {!submitted ? (
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <Label htmlFor="name" className="text-white/70 ml-1">Your Name</Label>
                                                <div className="relative">
                                                    <User className="absolute left-4 top-3.5 w-4 h-4 text-white/30" />
                                                    <Input
                                                        id="name"
                                                        placeholder="John Doe"
                                                        required
                                                        className="pl-11 bg-white/5 border-white/10 text-white focus:border-purple-500 focus:ring-purple-500/20 h-12 rounded-xl"
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="email" className="text-white/70 ml-1">Email Address</Label>
                                                <div className="relative">
                                                    <Mail className="absolute left-4 top-3.5 w-4 h-4 text-white/30" />
                                                    <Input
                                                        id="email"
                                                        type="email"
                                                        placeholder="john@example.com"
                                                        required
                                                        className="pl-11 bg-white/5 border-white/10 text-white focus:border-purple-500 focus:ring-purple-500/20 h-12 rounded-xl"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="type" className="text-white/70 ml-1">Inquiry Type</Label>
                                            <select
                                                id="type"
                                                className="w-full bg-white/5 border border-white/10 text-white focus:border-purple-500 focus:ring-purple-500/20 h-12 rounded-xl px-4 outline-none appearance-none"
                                                required
                                            >
                                                <option className="bg-[#0A0628]" value="">Select a category</option>
                                                <option className="bg-[#0A0628]" value="node">Human Node Inquiry</option>
                                                <option className="bg-[#0A0628]" value="partner">Strategic Partnership</option>
                                                <option className="bg-[#0A0628]" value="liquidity">Liquidity Provider</option>
                                                <option className="bg-[#0A0628]" value="general">General Question</option>
                                            </select>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="message" className="text-white/70 ml-1">Your Message</Label>
                                            <Textarea
                                                id="message"
                                                placeholder="How can we help you realize freedom?"
                                                required
                                                className="min-h-[150px] bg-white/5 border-white/10 text-white focus:border-purple-500 focus:ring-purple-500/20 rounded-xl p-4 resize-none"
                                            />
                                        </div>

                                        <Button
                                            disabled={isSubmitting}
                                            className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 text-white h-14 rounded-2xl font-bold text-lg shadow-xl shadow-purple-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                                        >
                                            {isSubmitting ? (
                                                <div className="flex items-center gap-2">
                                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                    Sending Message...
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-2">
                                                    <Send className="w-5 h-5" />
                                                    Send Inquiry
                                                </div>
                                            )}
                                        </Button>
                                    </form>
                                ) : (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="py-12 text-center"
                                    >
                                        <div className="w-20 h-20 bg-green-500/20 border border-green-500/30 rounded-full flex items-center justify-center mx-auto mb-6">
                                            <CheckCircle2 className="w-10 h-10 text-green-500" />
                                        </div>
                                        <h2 className="text-3xl font-bold mb-4">Message Received!</h2>
                                        <p className="text-white/50 mb-8 max-w-sm mx-auto">
                                            Thank you for reaching out. A department head will review your inquiry and respond within 24-48 hours.
                                        </p>
                                        <Button
                                            onClick={() => setSubmitted(false)}
                                            variant="outline"
                                            className="border-white/10 hover:bg-white/5"
                                        >
                                            Send another message
                                        </Button>
                                    </motion.div>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            <footer className="border-t border-white/10 bg-black/20 py-12 mt-20 relative z-10">
                <div className="container px-4 text-center">
                    <p className="text-white/20 text-xs tracking-widest uppercase italic mb-2">Architecting Freedom</p>
                    <p className="text-white/10 text-[10px]">&copy; 2026 Libertas Alpha Technologies. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}
