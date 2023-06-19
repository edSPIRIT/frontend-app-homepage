/* eslint-disable react/prop-types */
import React, { Suspense, useEffect, useState } from 'react';
import { Spinner } from '@edx/paragon';
import { useLocation } from 'react-router-dom';
import Header from '../header/Header';
import FooterSection from '../footer/FooterSection';
import SearchModal from './layout/SearchModal';

const Layout = ({ children }) => {
  const [hasPriceWrapper, setHasPriceWrapper] = useState(false);
  const location = useLocation();
  console.log('location', location, location.pathname.includes('/course'));
  useEffect(() => {
    setHasPriceWrapper(location.pathname.includes('/course'));
  }, [location]);

  return (
    <Suspense
      fallback={(
        <div className="d-flex justify-content-center align-items-center">
          <Spinner
            animation="border"
            className="mie-3 "
            screenReaderText="loading"
          />
        </div>
    )}
    >
      <SearchModal />
      <div className={`layout-container ${hasPriceWrapper ? 'has-price-wrapper' : ''}`}>
        <Header />
        <main className="main-container">
          {children}
        </main>
        <FooterSection />
      </div>
    </Suspense>
  );
};

export default Layout;
  <div className="price-wrapper">price</div>;
