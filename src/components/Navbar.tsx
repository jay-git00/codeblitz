"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import { Menu, X, User, LogOut, LayoutDashboard, Calendar, Code2, Trophy } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
    const { data: session } = useSession();
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { name: "Practice", href: "/practice", icon: <Code2 className="w-4 h-4" /> },
        { name: "Calendar", href: "/calendar", icon: <Calendar className="w-4 h-4" /> },
        { name: "Ladder", href: "/ladder", icon: <Trophy className="w-4 h-4" /> },
        { name: "Leaderboard", href: "/leaderboard", icon: <Trophy className="w-4 h-4 text-yellow-500" /> },
        { name: "Dashboard", href: "/dashboard", icon: <LayoutDashboard className="w-4 h-4" /> },
    ];

    return (
        <nav className="fixed top-0 w-full z-50 bg-slate-950/50 backdrop-blur-xl border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link href="/" className="flex items-center gap-2 group">
                            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform">
                                <Code2 className="text-white w-5 h-5" />
                            </div>
                            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 font-outfit">
                                CodeBlitz
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Nav */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="px-3 py-2 rounded-md text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-all flex items-center gap-2"
                                >
                                    {link.icon}
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Auth Button / Profile */}
                    <div className="hidden md:block">
                        {session ? (
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                                    <div className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center text-[10px] font-bold">
                                        {session.user?.name?.[0] || session.user?.email?.[0] || "U"}
                                    </div>
                                    <span className="text-xs font-medium text-slate-300">
                                        {(session.user as any).username || session.user?.name || session.user?.email?.split("@")[0]}
                                    </span>
                                </div>
                                <button
                                    onClick={() => signOut()}
                                    className="p-2 text-slate-400 hover:text-red-400 transition-colors"
                                    title="Logout"
                                >
                                    <LogOut className="w-5 h-5" />
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-4">
                                <Link
                                    href="/auth/login"
                                    className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/auth/signup"
                                    className="px-4 py-2 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-sm font-bold text-white shadow-lg shadow-indigo-500/20 hover:opacity-90 transition-all"
                                >
                                    Sign Up
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 rounded-md text-slate-400 hover:text-white"
                        >
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-slate-900 border-b border-white/10 overflow-hidden"
                    >
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-white/5"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <div className="flex items-center gap-3">
                                        {link.icon}
                                        {link.name}
                                    </div>
                                </Link>
                            ))}
                            {!session ? (
                                <div className="grid grid-cols-2 gap-2 mt-4 px-3">
                                    <Link
                                        href="/auth/login"
                                        className="flex justify-center items-center px-4 py-2 rounded-lg border border-white/10 text-sm font-medium"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        href="/auth/signup"
                                        className="flex justify-center items-center px-4 py-2 rounded-lg bg-indigo-600 text-sm font-semibold"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Sign Up
                                    </Link>
                                </div>
                            ) : (
                                <button
                                    onClick={() => {
                                        signOut();
                                        setIsOpen(false);
                                    }}
                                    className="w-full flex items-center gap-3 px-3 py-2 text-red-400 font-medium"
                                >
                                    <LogOut className="w-5 h-5" />
                                    Logout
                                </button>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
