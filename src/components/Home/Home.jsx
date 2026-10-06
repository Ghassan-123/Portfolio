import { useScrollReveal } from '../../hooks/useScrollReveal';
import Hero from './Hero';
import About from './About';
import Skills from './Skills';
import FeaturedProjects from './FeaturedProjects';
import Categories from './Categories';
import Contact from './Contact';

export default function Home({ t, lang, isRTL, openProjects, scrollToSection }) {
    // One observer reveals every [data-reveal] element on the page.
    const revealRef = useScrollReveal([lang]);

    return (
        <div id="home-top" ref={revealRef} className="space-y-32 md:space-y-40 pb-20">
            <Hero t={t} lang={lang} isRTL={isRTL} openProjects={openProjects} scrollToSection={scrollToSection} />
            <About t={t} />
            <FeaturedProjects t={t} lang={lang} isRTL={isRTL} openProjects={openProjects} />
            <Skills t={t} lang={lang} openProjects={openProjects} />
            <Categories t={t} isRTL={isRTL} openProjects={openProjects} />
            <Contact t={t} lang={lang} />
        </div>
    );
}
