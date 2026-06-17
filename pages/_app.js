import "../styles/globals.css";
import { useEffect } from "react";
import Lenis from "lenis";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => 1 - Math.pow(1 - t, 4),
      smoothWheel: true,
      wheelMultiplier: 1.1,
      lerp: 0.12,
    });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return <Component {...pageProps} />;
}