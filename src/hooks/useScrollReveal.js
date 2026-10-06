import { useEffect, useRef } from 'react';

export function useScrollReveal() {
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    entry.target.classList.remove('opacity-0', 'translate-y-12');
                    entry.target.classList.add('opacity-100', 'translate-y-0');
                }
            },
            { threshold: 0.1 }
        );

        const currentElem = ref.current;
        if (currentElem) {
            observer.observe(currentElem);
        }

        return () => {
            if (currentElem) {
                observer.unobserve(currentElem);
            }
        };
    }, []);

    return ref;
}