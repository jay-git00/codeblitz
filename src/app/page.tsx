"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Code2, Calendar, Trophy, Zap, Star, Target, Users } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function HomePage() { // Renamed Home to HomePage
  const { data: session } = useSession(); // Added useSession hook
  const router = useRouter(); // Added useRouter hook

  const handleFeatureClick = (path: string) => { // Added handleFeatureClick function
    if (!session) {
      router.push("/auth/login");
    } else {
      router.push(path);
    }
  };

  // Defined features array based on existing FeatureCard components and the instruction's example
  const features = [
    {
      icon: Code2, // Changed from LayoutGrid to Code2 based on instruction's example for "Multi-Platform Practice"
      title: "Multi-Platform Practice", // Changed title from "Unified CP Pulse" to "Multi-Platform Practice"
      description: "Access problems from Codeforces, LeetCode, AtCoder, and more in one place.", // Changed description
      path: "/practice",
    },
    {
      icon: Zap,
      title: "Blitz-Fast Filters",
      description: "Find problems by rating, topic, or platform in milliseconds with our optimized indexing.",
      path: "/problems", // Assuming a path for filters/problems
    },
    {
      icon: Target, // Changed from Shield to Target, assuming a more fitting icon for "Structured Mastery"
      title: "Structured Mastery",
      description: "Follow our algorithmic ladders specifically designed by top competitive programmers.",
      path: "/ladders", // Assuming a path for ladders
    },
    {
      icon: Calendar,
      title: "Contest Calendar",
      description: "Never miss a contest with our integrated calendar from multiple platforms.",
      path: "/calendar",
    },
    {
      icon: Trophy,
      title: "CodeBlitz Ladders",
      description: "Structured problem sets from beginner to advanced levels.",
      path: "/ladder",
    },
    {
      icon: Users,
      title: "Global Leaderboard",
      description: "Compete with programmers worldwide and track your progress.",
      path: "/leaderboard",
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-screen min-h-[700px] flex items-center pt-20 overflow-hidden">
        {/* Background Image / Overlay */}
        <div className="absolute inset-0 -z-10 w-full h-full">
          <Image
            src="/hero.png"
            alt="Hero Background"
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-[#020617]/80 to-[#020617]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="flex flex-col items-start text-left space-y-8 animate-fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-bold tracking-wide">
                <Sparkles className="w-4 h-4" />
                <span>MEET CODEBLITZ 2.0</span>
              </div>

              <h1 className="text-6xl md:text-8xl font-black font-outfit tracking-tighter leading-none">
                Dominate <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-indigo-300 to-purple-400">
                  Every Contest.
                </span>
              </h1>

              <p className="max-w-xl text-xl text-slate-400 leading-relaxed font-inter">
                The most advanced competitive programming platform for training, tracking, and triumphing. Curated problems, real-time schedules, and structured ladders.
              </p>

              <div className="flex flex-wrap items-center gap-6 pt-4">
                <Link
                  href="/auth/signup"
                  className="px-10 py-5 rounded-2xl bg-white text-slate-950 font-black hover:scale-105 transition-all shadow-2xl shadow-white/10 flex items-center gap-3"
                >
                  Join CodeBlitz
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/calendar"
                  className="px-8 py-5 rounded-2xl bg-slate-800/50 border border-white/10 text-white font-bold hover:bg-slate-800 transition-all backdrop-blur-md"
                >
                  Explore Schedule
                </Link>
              </div>
            </div>

            {/* Visual Element to balance the page */}
            <div className="hidden lg:block relative">
              <div className="relative w-full aspect-square rounded-[4rem] overflow-hidden border border-white/10 shadow-3xl">
                <Image
                  src="/hero.png"
                  alt="Feature Visual"
                  fill
                  className="object-cover scale-110 hover:scale-100 transition-transform duration-[2s]"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#020617]/60 to-transparent" />

                {/* Floating Card */}
                <div className="absolute bottom-8 left-8 right-8 p-6 rounded-3xl bg-white/10 backdrop-blur-2xl border border-white/20">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-green-500 flex items-center justify-center">
                      <Trophy className="text-white w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white">Daily Milestone</h4>
                      <p className="text-xs text-slate-300">3 Problems Solved Today</p>
                    </div>
                  </div>
                  <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="w-3/4 h-full bg-green-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section with better spacing */}
      <section className="py-12 border-y border-white/5 bg-slate-950/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatItem label="Active Users" value="50k+" />
            <StatItem label="Problems Solved" value="2.5M+" />
            <StatItem label="Ladders Completed" value="12k" />
            <StatItem label="Global Rank" value="#1" />
          </div>
        </div>
      </section>

      {/* Redesigned Features Section */}
      <section className="py-32 bg-[#020617]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-24">
            <h2 className="text-4xl md:text-6xl font-bold font-outfit mb-6">Designed for the <br /> <span className="text-indigo-500">1% of coders.</span></h2>
            <p className="text-xl text-slate-400">We&apos;ve removed all the noise so you can focus on what matters: solving problems and winning contests.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            <FeatureCard
              icon={<LayoutGrid className="w-8 h-8 text-indigo-400" />}
              title="Unified CP Pulse"
              description="Get a single view of contest schedules across CF, AtCoder, LeetCode, and CodeChef."
            />
            <FeatureCard
              icon={<Zap className="w-8 h-8 text-yellow-400" />}
              title="Blitz-Fast Filters"
              description="Find problems by rating, topic, or platform in milliseconds with our optimized indexing."
            />
            <FeatureCard
              icon={<Shield className="w-8 h-8 text-purple-400" />}
              title="Structured Mastery"
              description="Follow our algorithmic ladders specifically designed by top competitive programmers."
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function StatItem({ label, value }: { label: string, value: string }) {
  return (
    <div className="text-center">
      <div className="text-3xl font-black font-outfit text-white mb-1 tracking-tighter">{value}</div>
      <div className="text-xs font-bold uppercase tracking-widest text-slate-500">{label}</div>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="group p-10 rounded-[2.5rem] bg-slate-900/40 border border-white/5 hover:border-indigo-500/30 transition-all duration-500">
      <div className="w-20 h-20 rounded-3xl bg-slate-800 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-indigo-500/10 transition-all duration-500">
        {icon}
      </div>
      <h3 className="text-2xl font-bold mb-4 font-outfit tracking-tight">{title}</h3>
      <p className="text-slate-400 text-lg leading-relaxed font-inter">{description}</p>
    </div>
  );
}
