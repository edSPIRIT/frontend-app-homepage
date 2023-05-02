/* eslint-disable react/prop-types */
import React, { Suspense } from 'react';
import { Spinner } from '@edx/paragon';
import Header from './header/Header';
import FooterSection from './footer/FooterSection';

const Layout = ({ children }) => (
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
    <Header />
    {children}
    <FooterSection />
  </Suspense>
);
export default Layout;
