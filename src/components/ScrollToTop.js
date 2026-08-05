import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { resetScroll } from './motion/Motion';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Goes through Lenis when Lenis is running. A bare window.scrollTo is
    // written back over by Lenis on the very next frame, which is why a
    // project opened at whatever position the previous page was left at.
    resetScroll();
  }, [pathname]);

  return null;
};

export default ScrollToTop;
