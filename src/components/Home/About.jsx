import { GraduationCap, Code, PenTool, Sparkles } from 'lucide-react';
import SpotlightCard from '../ui/SpotlightCard';

const CARD_ICONS = [GraduationCap, Code, PenTool];

export default function About({ t }) {
    return (
        <section id="about" className="scroll-mt-32">
            <div data-reveal className="relative bg-zinc-900/70 border border-zinc-800 rounded-[2.5rem] p-8 md:p-14 overflow-hidden">
                <div className="aurora-blob w-[420px] h-[420px] bg-teal-600 -top-40 -end-32" />
                <div className="aurora-blob w-[320px] h-[320px] bg-cyan-700 -bottom-40 -start-20" style={{ animationDelay: '-6s' }} />

                <div className="relative z-10 grid lg:grid-cols-[1.4fr_1fr] gap-12 items-start">
                    <div>
                        <div className="flex items-center gap-3 text-teal-400 font-bold uppercase tracking-widest text-sm mb-5">
                            <Sparkles size={18} /> {t.about.title}
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black text-white mb-8 leading-tight">
                            {t.about.lead}
                        </h2>
                        <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-6">{t.about.content}</p>
                        <p className="text-gray-400 text-lg leading-relaxed">{t.about.content2}</p>
                    </div>

                    <div className="grid gap-5">
                        {t.about.cards.map((card, i) => {
                            const Icon = CARD_ICONS[i];
                            return (
                                <SpotlightCard
                                    key={card.title}
                                    data-reveal="right"
                                    style={{ '--delay': `${150 + i * 120}ms` }}
                                    className="flex gap-5 items-start bg-zinc-950/70 border border-zinc-800 rounded-3xl p-6"
                                >
                                    <div className="p-3 rounded-2xl bg-gradient-to-br from-teal-500/20 to-cyan-500/10 border border-teal-500/20 text-cyan-300 shrink-0">
                                        <Icon size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-white mb-1">{card.title}</h3>
                                        <p className="text-gray-400 leading-relaxed">{card.text}</p>
                                    </div>
                                </SpotlightCard>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
