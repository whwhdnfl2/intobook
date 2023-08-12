import { useEffect, useRef } from 'react';

function useInfiniteScroll(onIntersect) {
  const targetRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        onIntersect();
      }
    });

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    return () => {
      if (targetRef.current) {
        observer.unobserve(targetRef.current);
      }
    };
  }, [onIntersect]);

  return targetRef;
}

export default useInfiniteScroll;
