/* eslint-disable react/prop-types */
import React, { Suspense } from 'react';
import Footer from './footer/Footer';
import Header from './header/Header';

const Layout = ({ children }) => (
  <Suspense fallback={<div>Loading...</div>}>
    <Header />
    {children}
    <Footer />
  </Suspense>
);
export default Layout;
