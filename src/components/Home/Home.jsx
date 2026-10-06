import React from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import Hero from './Hero';
import About from './About';
import Skills from './Skills';
import Categories from './Categories';
import Contact from './Contact';

export default function Home({ t, lang, isRTL, openProjects }) {
    const heroRef = useScrollReveal();
    const aboutRef = useScrollReveal();
    const skillsRef = useScrollReveal();
    const catRef = useScrollReveal();
    const contactRef = useScrollReveal();

    return (
        <div id="home-top" className="space-y-40 pb-20">
            <Hero t={t} isRTL={isRTL} openProjects={openProjects} heroRef={heroRef} />
            <About t={t} aboutRef={aboutRef} />
            <Skills t={t} lang={lang} skillsRef={skillsRef} />
            <Categories t={t} openProjects={openProjects} catRef={catRef} />
            <Contact t={t} contactRef={contactRef} />
        </div>
    );
}