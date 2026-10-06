import React from 'react';
import { Shield } from 'lucide-react';

export default function Contact({ t, contactRef }) {
    return (
        <section id="contact" ref={contactRef} className="scroll-mt-32 max-w-4xl mx-auto text-center bg-gradient-to-b from-zinc-900 to-zinc-950 border border-zinc-800 rounded-[3rem] p-16 shadow-2xl opacity-0 translate-y-12 transition-all duration-1000 ease-out relative overflow-hidden group hover:border-cyan-500/30">
            <div className="absolute inset-0 bg-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
            <Shield className="mx-auto text-cyan-500 mb-8 relative z-10" size={56} />
            <h2 className="text-5xl font-bold mb-8 text-white relative z-10">{t.contact.title}</h2>
            <p className="text-gray-400 text-xl mb-12 leading-relaxed max-w-2xl mx-auto relative z-10">
                {t.contact.desc}
            </p>
            <button className="relative z-10 px-10 py-4 rounded-2xl border-2 border-teal-500 text-teal-400 hover:bg-teal-500 hover:text-white transition-all duration-300 font-bold text-xl shadow-[0_0_20px_rgba(20,184,166,0.2)] hover:shadow-[0_0_30px_rgba(20,184,166,0.5)]">
                {t.contact.btn}
            </button>
        </section>
    );
}