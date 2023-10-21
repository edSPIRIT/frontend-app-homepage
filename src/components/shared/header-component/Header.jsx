import { useMediaQuery } from '@edx/paragon';
import React from 'react';
import { useSelector } from 'react-redux';
import DesktopHeader from './Header/DesktopHeader';

const MobileHeader = React.lazy(() => import('./Header/MobileHeader'));
const SearchModal = React.lazy(() => import('./Header/SearchModal'));

const Header = () => {
  const isMobile = useMediaQuery({ maxWidth: '768px' });
  const isOpenSearchModal = useSelector((state) => state.searchModal.open);

  return (
    <header>
      {isOpenSearchModal && (
        <SearchModal isOpenSearchModal={isOpenSearchModal} />
      )}
      {isMobile ? <MobileHeader /> : <DesktopHeader />}
    </header>
  );
};

export default Header;
