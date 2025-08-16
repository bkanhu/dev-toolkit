import { useCallback, useEffect, useState } from "react";

/**
 * React hook that returns `true` if the user has scrolled past the given threshold.
 *
 * @param {number} threshold - The vertical scroll offset (in pixels) at which the hook
 * should consider the page "scrolled".
 * @returns {boolean} Whether the page has been scrolled beyond the threshold.
 *
 * @example
 * const scrolled = useScroll(100);
 * return <div className={scrolled ? "shadow-md" : ""}>Header</div>;
 */

export default function useScroll(threshold: number): boolean {
  const [scrolled, setScrolled] = useState(false);

  const onScroll = useCallback(() => {
    setScrolled(window.scrollY > threshold);
  }, [threshold]);

  useEffect(() => {
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [onScroll]);

  return scrolled;
}
