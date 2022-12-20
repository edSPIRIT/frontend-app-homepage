/* eslint-disable react/prop-types */
import React from 'react';
import Footer from './footer/Footer';
import HeaderED from './header-home/HeaderED';
import HeaderDashboard from './header-dashboard/HeaderDashboard';

const Layout = ({ children }) => (
  <>
    {/* <HeaderED />
    <HeaderDashboard /> */}
    {children}
    <Footer />

  </>
);
export default Layout;
