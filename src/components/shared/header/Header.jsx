import { useToggle, useMediaQuery } from '@edx/paragon';
import React from 'react';
import DesktopHeader from './desktop-header/DesktopHeader';

const MobileHeader = React.lazy(() => import('./mobile-header/MobileHeader'));

const HeaderED = () => {
  const [isOpen, open, close] = useToggle(false);
  const isMobile = useMediaQuery({ maxWidth: '1024px' });

  return (
    <header>
      {isMobile ? (
        <MobileHeader isOpen={isOpen} close={close} openMenu={open} />
      ) : (
        <DesktopHeader />
      )}
    </header>
  );
};

export default HeaderED;
