import React from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';

export default function Hero({ t, isRTL, openProjects, heroRef }) {
    return (
        <section ref={heroRef} className="flex flex-col items-center text-center pt-10 lg:pt-24 opacity-0 translate-y-12 transition-all duration-1000 ease-out">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[500px] bg-teal-900/20 blur-[120px] rounded-full pointer-events-none -z-10"></div>

            <span className="px-5 py-2 rounded-full bg-teal-900/30 border border-teal-500/30 text-teal-400 text-sm font-bold mb-8 tracking-widest uppercase shadow-[0_0_10px_rgba(20,184,166,0.2)]">
                {t.hero.greeting}
            </span>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-8 text-white max-w-5xl leading-[1.1]">
                {t.hero.name.split(' ').map((word, idx) => (
                    word.toLowerCase().includes('ai') || word.toLowerCase().includes('react') || word.includes('ذكاء') || word.includes('شامل') ? (
                        <span key={idx} className="bg-clip-text text-transparent bg-gradient-to-br from-teal-400 via-cyan-400 to-emerald-400"> {word} </span>
                    ) : (
                        <span key={idx}> {word} </span>
                    )
                ))}
            </h1>

            <p className="text-lg md:text-2xl text-gray-400 max-w-3xl mb-12 leading-relaxed">
                {t.hero.subtitle}
            </p>

            <button
                onClick={() => openProjects('All')}
                className="group flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-teal-600 to-cyan-500 hover:from-teal-500 hover:to-cyan-400 text-white font-bold rounded-2xl shadow-[0_0_30px_rgba(20,184,166,0.3)] hover:shadow-[0_0_40px_rgba(6,182,212,0.4)] transition-all duration-300 transform hover:-translate-y-1 text-lg"
            >
                {t.hero.cta}
                {isRTL ? (
                    <ArrowLeft className="group-hover:-translate-x-2 transition-transform" />
                ) : (
                    <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                )}
            </button>
        </section>
    );
}