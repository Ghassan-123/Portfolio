import { useState } from 'react';
import { BrainCircuit, Eye, MessageSquareText, Code, Smartphone, PenTool, Gamepad2, Box, LineChart, Server, Binary } from 'lucide-react';

const ICONS = {
    'Computer Vision': Eye,
    'LLM & NLP': MessageSquareText,
    'Machine Learning': LineChart,
    AI: BrainCircuit,
    React: Code,
    Mobile: Smartphone,
    Design: PenTool,
    Game: Gamepad2,
    Simulation: Box,
    Laravel: Server,
    Algorithms: Binary,
};

// Each project gets a stable gradient derived from its id.
const PALETTES = [
    ['#0f766e', '#0891b2'],
    ['#065f46', '#0d9488'],
    ['#155e75', '#0f766e'],
    ['#134e4a', '#047857'],
    ['#164e63', '#0e7490'],
    ['#064e3b', '#0891b2'],
];

function hash(str) {
    let h = 0;
    for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) | 0;
    return Math.abs(h);
}

/**
 * Shows the project's image if it has one (and it loads),
 * otherwise a generated, on-brand cover with the project's main icon.
 */
export default function ProjectCover({ project, title, className = '', imgClassName = '', large = false }) {
    const [failed, setFailed] = useState(false);
    const src = project.mainImg;

    if (src && !failed) {
        return (
            <img
                src={src}
                alt={title}
                loading="lazy"
                onError={() => setFailed(true)}
                className={`w-full h-full object-cover object-top ${imgClassName}`}
            />
        );
    }

    const mainTag = project.tags.find((t) => ICONS[t]) ?? 'AI';
    const Icon = ICONS[mainTag];
    const [from, to] = PALETTES[hash(project.id) % PALETTES.length];

    return (
        <div
            className={`w-full h-full relative overflow-hidden flex items-center justify-center ${className}`}
            style={{ background: `radial-gradient(circle at 25% 20%, ${to}55, transparent 55%), linear-gradient(135deg, ${from}, #09090b 85%)` }}
            role="img"
            aria-label={title}
        >
            <div className="absolute inset-0 bg-grid opacity-60" />
            <Icon
                size={large ? 260 : 150}
                strokeWidth={0.6}
                className="absolute -right-6 -bottom-8 text-white/10 rotate-12 transition-transform duration-700 group-hover:rotate-0 group-hover:scale-110"
            />
            <div className={`relative z-10 flex flex-col items-center gap-3 px-6 text-center ${imgClassName}`}>
                <div className="p-4 rounded-2xl bg-black/30 backdrop-blur-sm border border-white/10 text-cyan-300">
                    <Icon size={large ? 44 : 32} />
                </div>
                {!large && <span className="text-white/80 font-bold text-sm tracking-wide line-clamp-1">{title.split(':')[0]}</span>}
            </div>
        </div>
    );
}
