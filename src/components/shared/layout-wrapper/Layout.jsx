/* eslint-disable react/prop-types */
import React, { Suspense, useEffect, useState } from 'react';
import { Spinner, Toast } from '@edx/paragon';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getLocale } from '@edx/frontend-platform/i18n';
import { getConfig } from '@edx/frontend-platform';
import Header from '../header/Header';
import FooterSection from '../footer/FooterSection';
import SearchModal from './layout/SearchModal';
import { setToastMessage } from '../../../redux/slice/toastSlice';
import useGetActiveLangs from '../../../hooks/useGetActiveLangs';

const Layout = ({ children }) => {
  const [hasPriceWrapper, setHasPriceWrapper] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const message = useSelector((state) => state.toast.message);
  const { activeLangs, loading: activeLangsLoading } = useGetActiveLangs();
  useEffect(() => {
    setHasPriceWrapper(location.pathname.includes('/course'));
  }, [location]);

  useEffect(() => {
    if (activeLangs) {
      const currentLocale = getLocale();
      const newLocale = activeLangs[0]?.code;
      const url = new URL(getConfig().LMS_BASE_URL).hostname;
      if (currentLocale !== newLocale) {
        const cookies = document.cookie;
        if (!cookies.includes('openedx-language-preference')) {
          document.cookie = `openedx-language-preference=${newLocale}; path=/; domain=.${url}`;
          window.location.reload();
        }
      }
    }
  }, [activeLangs]);
  useEffect(() => {
    const body = document.querySelector('body');
    if (getLocale() === 'fa') {
      body.className = 'lang_fa';
    } else if (getLocale() === 'ar') {
      body.className = 'lang_ar';
    } else {
      body.removeAttribute('class');
    }
  }, []);
  if (activeLangsLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner
          animation="border"
          className="mie-3 "
          screenReaderText="loading"
        />
      </div>
    );
  }
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
