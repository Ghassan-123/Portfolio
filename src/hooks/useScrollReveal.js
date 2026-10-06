import { useEffect, useRef, useState } from 'react';

/**
 * Reveals every [data-reveal] element inside the returned ref's container
 * (and the container itself, if it has the attribute) as it scrolls into view.
 * `deps` re-scans the container when its children change (e.g. a filter).
 */
export function useScrollReveal(deps = []) {
    const ref = useRef(null);

    useEffect(() => {
        const root = ref.current;
        if (!root) return;

        const targets = [
            ...(root.hasAttribute('data-reveal') ? [root] : []),
            ...root.querySelectorAll('[data-reveal]:not(.is-visible)'),
        ];

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
        );

        targets.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);

    return ref;
}

/** Counts from 0 to `end` once the element becomes visible. */
export function useCountUp(end, duration = 1600) {
    const ref = useRef(null);
    const [value, setValue] = useState(0);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        let timer;

        // Timer-based rather than requestAnimationFrame, so it still finishes
        // in background tabs and headless renderers where rAF is paused.
        const observer = new IntersectionObserver(([entry]) => {
            if (!entry.isIntersecting) return;
            observer.disconnect();
            const start = Date.now();
            const tick = () => {
                const progress = Math.min((Date.now() - start) / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                setValue(Math.round(end * eased));
                if (progress < 1) timer = setTimeout(tick, 16);
            };
            tick();
        }, { threshold: 0.2 });

        observer.observe(el);
        return () => {
            observer.disconnect();
            clearTimeout(timer);
        };
    }, [end, duration]);

    return [ref, value];
}

/** Cycles through `items`, typing and deleting each one. */
export function useTypewriter(items, { typeSpeed = 70, deleteSpeed = 35, pause = 1600 } = {}) {
    const [index, setIndex] = useState(0);
    const [text, setText] = useState('');
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        const word = items[index % items.length] ?? '';
        let delay = deleting ? deleteSpeed : typeSpeed;

        if (!deleting && text === word) delay = pause;

        const timer = setTimeout(() => {
            if (!deleting && text === word) {
                setDeleting(true);
            } else if (deleting && text === '') {
                setDeleting(false);
                setIndex((i) => (i + 1) % items.length);
            } else {
                setText(word.slice(0, text.length + (deleting ? -1 : 1)));
            }
        }, delay);

        return () => clearTimeout(timer);
    }, [text, deleting, index, items, typeSpeed, deleteSpeed, pause]);

    return text;
}
