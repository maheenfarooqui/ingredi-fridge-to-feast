import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Har baar jab rasta (URL) badle, screen ko 0,0 (top) par le jao
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;