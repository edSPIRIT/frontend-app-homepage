/* eslint-disable react/prop-types */
import React, { Suspense } from 'react';
import { Spinner } from '@edx/paragon';
import Footer from './footer/Footer';
import Header from './header/Header';

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
    <Footer />
  </Suspense>
);
export default Layout;
