/* eslint-disable react/prop-types */
import React, { Suspense, useEffect, useState } from 'react';
import { Spinner, Toast } from '@edx/paragon';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../header/Header';
import FooterSection from '../footer/FooterSection';
import SearchModal from './layout/SearchModal';
import { setToastMessage } from '../../../redux/slice/toastSlice';

const Layout = ({ children }) => {
  const [hasPriceWrapper, setHasPriceWrapper] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const message = useSelector((state) => state.toast.message);
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
      <Toast
        onClose={() => dispatch(setToastMessage(null))}
        show={!!message}
        delay={3000}
      >
        {message}
      </Toast>
      <SearchModal />
      <div
        className={`layout-container ${
          hasPriceWrapper ? 'has-price-wrapper' : ''
        }`}
      >
        <Header />
        <main className="main-container">{children}</main>
        <FooterSection />
      </div>
    </Suspense>
  );
};

export default Layout;
