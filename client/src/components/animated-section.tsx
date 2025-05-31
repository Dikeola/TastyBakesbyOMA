import { ReactNode } from 'react';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export default function AnimatedSection({ children, className = '', id }: AnimatedSectionProps) {
  const elementRef = useIntersectionObserver<HTMLElement>({
    threshold: 0.1,
    rootMargin: '-50px',
  });

  return (
    <section
      ref={elementRef}
      id={id}
      className={`animate-section ${className}`}
    >
      {children}
    </section>
  );
} 