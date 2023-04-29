import { useMediaQuery } from '@edx/paragon';
import React from 'react';
import DesktopHeader from './desktop-header/DesktopHeader';

const MobileHeader = React.lazy(() => import('./mobile-header/MobileHeader'));

const HeaderED = () => {
  const isMobile = useMediaQuery({ maxWidth: '768px' });

  return <header>{isMobile ? <MobileHeader /> : <DesktopHeader />}</header>;
};

export default HeaderED;
