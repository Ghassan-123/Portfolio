import { ChevronRight, ChevronLeft, BrainCircuit, Eye, MessageSquareText, Code, Smartphone, PenTool } from 'lucide-react';
import { countByTag } from '../../lib/projects';
import SpotlightCard from '../ui/SpotlightCard';

const AREAS = [
    { tag: 'AI', icon: BrainCircuit, accent: 'text-emerald-400', glow: 'bg-emerald-500/15' },
    { tag: 'Computer Vision', icon: Eye, accent: 'text-teal-400', glow: 'bg-teal-500/15' },
    { tag: 'LLM & NLP', icon: MessageSquareText, accent: 'text-cyan-400', glow: 'bg-cyan-500/15' },
    { tag: 'React', icon: Code, accent: 'text-cyan-300', glow: 'bg-cyan-400/15' },
    { tag: 'Mobile', icon: Smartphone, accent: 'text-teal-300', glow: 'bg-teal-400/15' },
    { tag: 'Design', icon: PenTool, accent: 'text-emerald-300', glow: 'bg-emerald-400/15' },
];

export default function Categories({ t, isRTL, openProjects }) {
    return (
        <section id="categories" className="scroll-mt-32">
            <div data-reveal className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-3">{t.categories.title}</h2>
                    <p className="text-lg text-gray-400">{t.categories.subtitle}</p>
                </div>
                <button onClick={() => openProjects('All')} className="text-cyan-400 hover:text-teal-300 font-bold flex items-center gap-2 group cursor-pointer">
                    {t.categories.explore}
                    {isRTL
                        ? <ChevronLeft className="group-hover:-translate-x-1 transition-transform" />
                        : <ChevronRight className="group-hover:translate-x-1 transition-transform" />}
                </button>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {AREAS.map(({ tag, icon: Icon, accent, glow }, i) => {
                    const item = t.categories.items[tag];
                    return (
                        <SpotlightCard
                            as="button"
                            key={tag}
                            data-reveal
                            style={{ '--delay': `${(i % 3) * 100}ms` }}
                            onClick={() => openProjects(tag)}
                            className="group text-start cursor-pointer bg-zinc-900/80 border border-zinc-800 hover:border-teal-500/40 p-7 rounded-3xl overflow-hidden shadow-lg"
                        >
                            <div className={`absolute -end-6 -top-6 w-28 h-28 ${glow} rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700`} />
                            <div className="flex items-center justify-between mb-6 relative">
                                <Icon size={38} className={`${accent} group-hover:scale-110 transition-transform duration-300`} />
                                <span className="text-4xl font-black text-zinc-800 group-hover:text-zinc-700 transition-colors tabular-nums">
                                    {String(countByTag(tag)).padStart(2, '0')}
                                </span>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2 relative">{item.title}</h3>
                            <p className="text-gray-400 group-hover:text-gray-300 transition-colors relative">{item.desc}</p>
                        </SpotlightCard>
                    );
                })}
            </div>
        </section>
    );
}
