import React from 'react';
import { ChevronRight, BrainCircuit, ShoppingCart, Gamepad2, PenTool } from 'lucide-react';

export default function Categories({ t, openProjects, catRef }) {
    return (
        <section id="categories" ref={catRef} className="scroll-mt-32 opacity-0 translate-y-12 transition-all duration-1000 ease-out">
            <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h2 className="text-4xl font-bold text-white mb-4">{t.categories.title}</h2>
                    <p className="text-xl text-gray-400">{t.categories.subtitle}</p>
                </div>
                <button onClick={() => openProjects('All')} className="text-cyan-400 hover:text-teal-300 font-bold flex items-center gap-2 group">
                    Explore All <ChevronRight className="group-hover:translate-x-1 transition-transform" />
                </button>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div onClick={() => openProjects('Computer Vision')} className="group cursor-pointer bg-zinc-900 border border-zinc-800 p-8 rounded-3xl hover:border-emerald-500/60 transition-all hover:-translate-y-2 relative overflow-hidden shadow-lg hover:shadow-emerald-900/20">
                    <div className="absolute -right-4 -top-4 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-colors"></div>
                    <BrainCircuit size={40} className="text-emerald-500 mb-6 relative z-10" />
                    <h4 className="text-xl font-bold text-white mb-3 relative z-10">{t.categories.ai}</h4>
                    <p className="text-gray-400 group-hover:text-gray-300 transition-colors relative z-10">{t.categories.aiDesc}</p>
                </div>

                <div onClick={() => openProjects('Web')} className="group cursor-pointer bg-zinc-900 border border-zinc-800 p-8 rounded-3xl hover:border-cyan-500/60 transition-all hover:-translate-y-2 relative overflow-hidden shadow-lg hover:shadow-cyan-900/20">
                    <div className="absolute -right-4 -top-4 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-colors"></div>
                    <ShoppingCart size={40} className="text-cyan-500 mb-6 relative z-10" />
                    <h4 className="text-xl font-bold text-white mb-3 relative z-10">{t.categories.web}</h4>
                    <p className="text-gray-400 group-hover:text-gray-300 transition-colors relative z-10">{t.categories.webDesc}</p>
                </div>

                <div onClick={() => openProjects('Game')} className="group cursor-pointer bg-zinc-900 border border-zinc-800 p-8 rounded-3xl hover:border-teal-500/60 transition-all hover:-translate-y-2 relative overflow-hidden shadow-lg hover:shadow-teal-900/20">
                    <div className="absolute -right-4 -top-4 w-24 h-24 bg-teal-500/10 rounded-full blur-2xl group-hover:bg-teal-500/20 transition-colors"></div>
                    <Gamepad2 size={40} className="text-teal-500 mb-6 relative z-10" />
                    <h4 className="text-xl font-bold text-white mb-3 relative z-10">{t.categories.games}</h4>
                    <p className="text-gray-400 group-hover:text-gray-300 transition-colors relative z-10">{t.categories.gamesDesc}</p>
                </div>

                <div onClick={() => openProjects('Design')} className="group cursor-pointer bg-zinc-900 border border-zinc-800 p-8 rounded-3xl hover:border-cyan-300/60 transition-all hover:-translate-y-2 relative overflow-hidden shadow-lg hover:shadow-cyan-900/20">
                    <div className="absolute -right-4 -top-4 w-24 h-24 bg-cyan-300/10 rounded-full blur-2xl group-hover:bg-cyan-300/20 transition-colors"></div>
                    <PenTool size={40} className="text-cyan-300 mb-6 relative z-10" />
                    <h4 className="text-xl font-bold text-white mb-3 relative z-10">{t.categories.design}</h4>
                    <p className="text-gray-400 group-hover:text-gray-300 transition-colors relative z-10">{t.categories.designDesc}</p>
                </div>
            </div>
        </section>
    );
}