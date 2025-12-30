import Link from "next/link";
import { Code2, ArrowLeft } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-[#020617]">
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/5 blur-[120px] rounded-full" />
            </div>

            <div className="text-center">
                <div className="w-16 h-16 bg-slate-900 border border-white/10 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-2xl">
                    <Code2 className="text-indigo-500 w-8 h-8" />
                </div>
                <h1 className="text-6xl md:text-8xl font-black font-outfit mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-600">
                    404
                </h1>
                <h2 className="text-2xl font-bold font-outfit mb-6 text-slate-300">
                    This problem seems unsolvable.
                </h2>
                <p className="text-slate-500 max-w-md mx-auto mb-10 text-lg">
                    The page you're looking for was either deleted, moved, or never existed in the first place.
                </p>

                <Link
                    href="/"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-indigo-600 text-white font-bold hover:bg-indigo-500 transition-all shadow-xl shadow-indigo-500/20"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to CodeBlitz
                </Link>
            </div>
        </div>
    );
}
