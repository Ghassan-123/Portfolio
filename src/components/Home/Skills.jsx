import React from 'react';
import { Cpu, Target } from 'lucide-react';
import { skillsData } from '../../data/skills';

export default function Skills({ t, lang, skillsRef }) {
    return (
        <section id="skills" ref={skillsRef} className="scroll-mt-32 opacity-0 translate-y-12 transition-all duration-1000 ease-out">
            <div className="text-center mb-20">
                <h2 className="text-5xl font-bold mb-6 text-white">{t.skills.title}</h2>
                <div className="w-32 h-1.5 bg-gradient-to-r from-teal-500 to-cyan-500 mx-auto rounded-full"></div>
            </div>

            <div className="space-y-24">
                {/* Core Expertise */}
                <div>
                    <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-200 mb-10 flex items-center gap-4 justify-center md:justify-start">
                        <Cpu className="text-teal-500" size={32} />
                        {t.skills.coreTitle}
                    </h3>
                    <div className="grid md:grid-cols-2 gap-8">
                        {skillsData.core.map((skill) => (
                            <div key={skill.id} className="bg-zinc-900 border border-zinc-800 p-8 rounded-3xl hover:border-cyan-500/50 transition-all duration-300 flex flex-col gap-5 hover:-translate-y-2 group shadow-lg">
                                <div className="p-4 bg-zinc-950 rounded-2xl border border-zinc-800 w-fit group-hover:border-teal-500/30 transition-colors">
                                    {skill.icon}
                                </div>
                                <div>
                                    <h4 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
                                        {lang === 'en' ? skill.nameEn : skill.nameAr}
                                    </h4>
                                    <p className="text-gray-400 text-base leading-relaxed">
                                        {lang === 'en' ? skill.descEn : skill.descAr}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Familiar With */}
                <div>
                    <h3 className="text-3xl font-bold text-white mb-10 flex items-center gap-4 justify-center md:justify-start">
                        <Target className="text-emerald-400" size={32} />
                        {t.skills.familiarTitle}
                    </h3>
                    <div className="flex flex-wrap gap-5 justify-center md:justify-start">
                        {skillsData.familiar.map((skill) => (
                            <div
                                key={skill.id}
                                className="group flex items-center gap-3 bg-zinc-900 border border-zinc-800 hover:border-cyan-500/50 p-4 pr-6 pl-4 rounded-2xl transition-all duration-300 hover:-translate-y-1 cursor-default text-gray-300 hover:text-cyan-400 shadow-sm hover:bg-cyan-500/5"
                            >
                                <div className="p-2 bg-zinc-950 rounded-xl border border-zinc-800 group-hover:border-cyan-500/30 shadow-inner">
                                    <span className="text-teal-500 group-hover:text-cyan-400 transition-colors">
                                        {skill.icon}
                                    </span>
                                </div>
                                <span className="text-lg font-bold tracking-wide">
                                    {skill.name}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}