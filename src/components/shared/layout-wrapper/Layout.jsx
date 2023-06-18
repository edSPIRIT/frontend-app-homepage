/* eslint-disable react/prop-types */
import React, { Suspense } from 'react';
import { Spinner } from '@edx/paragon';
import Header from '../header/Header';
import FooterSection from '../footer/FooterSection';
import SearchModal from './layout/SearchModal';

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
    <SearchModal />
    <div className="layout-container">
      <Header />
      <main className="main-container">
        {children}
      </main>
      <FooterSection />
    </div>
  </Suspense>
);

export default Layout;
