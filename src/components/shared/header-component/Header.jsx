import { useMediaQuery } from '@edx/paragon';
import React from 'react';
import DesktopHeader from './Header/DesktopHeader';
import SearchModal from './Header/SearchModal';

const MobileHeader = React.lazy(() => import('./Header/MobileHeader'));

const Header = () => {
  const isMobile = useMediaQuery({ maxWidth: '768px' });

  return (
    <header>
      <SearchModal />
      {isMobile ? <MobileHeader /> : <DesktopHeader />}
    </header>
  );
};

export default Header;
