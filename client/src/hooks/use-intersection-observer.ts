import { useEffect, useRef } from 'react';

interface UseIntersectionObserverProps<T extends HTMLElement> {
  threshold?: number;
  rootMargin?: string;
  onIntersect?: (entry: IntersectionObserverEntry) => void;
}

export function useIntersectionObserver<T extends HTMLElement>({
  threshold = 0.1,
  rootMargin = '0px',
  onIntersect,
}: UseIntersectionObserverProps<T> = {} as UseIntersectionObserverProps<T>) {
  const elementRef = useRef<T | null>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            element.classList.add('animate-in');
            onIntersect?.(entry);
          } else {
            element.classList.remove('animate-in');
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, rootMargin, onIntersect]);

  return elementRef;
} 