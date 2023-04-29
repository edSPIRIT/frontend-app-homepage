import { useState, useEffect } from 'react';

const useHideNavbarOnScroll = () => {
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [lastScrollPosition, setLastScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPosition = window.pageYOffset;
      const isScrollingDown = currentScrollPosition > lastScrollPosition;

      if (isScrollingDown && isNavbarVisible) {
        setIsNavbarVisible(false);
      } else if (!isScrollingDown && !isNavbarVisible) {
        setIsNavbarVisible(true);
      }

      setLastScrollPosition(currentScrollPosition);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isNavbarVisible, lastScrollPosition]);

  return isNavbarVisible;
};
export default useHideNavbarOnScroll;
