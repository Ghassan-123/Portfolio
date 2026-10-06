import React from 'react';
import { Briefcase } from 'lucide-react';

export default function About({ t, aboutRef }) {
    return (
        <section id="about" ref={aboutRef} className="scroll-mt-32 opacity-0 translate-y-12 transition-all duration-1000 ease-out">
            <div className="bg-zinc-900 border border-zinc-800 rounded-[2.5rem] p-10 md:p-16 shadow-2xl relative overflow-hidden group hover:border-teal-500/30 transition-colors duration-500">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-teal-900/20 to-cyan-900/10 rounded-full blur-3xl -mr-40 -mt-40 pointer-events-none"></div>
                <div className="flex flex-col md:flex-row gap-10 items-start relative z-10">
                    <div className="p-6 bg-gradient-to-br from-zinc-950 to-zinc-900 rounded-3xl border border-zinc-800 text-teal-500 shrink-0 shadow-inner">
                        <Briefcase size={48} className="text-cyan-400" />
                    </div>
                    <div>
                        <h2 className="text-4xl font-bold mb-6 text-white">{t.about.title}</h2>
                        <p className="text-gray-300 text-lg md:text-xl leading-relaxed max-w-4xl">
                            {t.about.content}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}