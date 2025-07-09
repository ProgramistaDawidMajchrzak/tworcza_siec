// ScrollToTop.jsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' }); // Możesz użyć 'smooth' jeśli chcesz animację
  }, [pathname]);

  return null;
};

export default ScrollToTop;
