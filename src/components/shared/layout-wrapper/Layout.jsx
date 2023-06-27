/* eslint-disable react/prop-types */
import React, { Suspense, useEffect, useState } from 'react';
import { Spinner, Toast } from '@edx/paragon';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getConfig } from '@edx/frontend-platform';
import { getLocale } from '@edx/frontend-platform/i18n';
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
  console.log('SITE_NAME', process.env.SITE_NAME, getConfig().SITE_NAME);
  console.log('NODE_ENV', process.env.NODE_ENV, getConfig().NODE_ENV);
  console.log(
    'ACCESS_TOKEN_COOKIE_NAME',
    process.env.ACCESS_TOKEN_COOKIE_NAME,
    getConfig().ACCESS_TOKEN_COOKIE_NAME,
  );
  console.log('BASE_URL', process.env.BASE_URL, getConfig().BASE_URL);
  console.log(
    'CREDENTIALS_BASE_URL',
    process.env.CREDENTIALS_BASE_URL,
    getConfig().CREDENTIALS_BASE_URL,
  );
  console.log(
    'CSRF_TOKEN_API_PATH',
    process.env.CSRF_TOKEN_API_PATH,
    getConfig().CSRF_TOKEN_API_PATH,
  );
  console.log(
    'ECOMMERCE_BASE_URL',
    process.env.ECOMMERCE_BASE_URL,
    getConfig().BASE_URL,
  );
  console.log(
    'LMS_BASE_URL',
    process.env.LMS_BASE_URL,
    getConfig().LMS_BASE_URL,
  );
  console.log('LOGIN_URL', process.env.LOGIN_URL, getConfig().LOGIN_URL);
  console.log('LOGO_URL', process.env.LOGO_URL, getConfig().LOGO_URL);
  console.log(
    'LOGO_TRADEMARK_URL',
    process.env.LOGO_TRADEMARK_URL,
    getConfig().LOGO_TRADEMARK_URL,
  );
  console.log(
    'LOGO_WHITE_URL',
    process.env.LOGO_WHITE_URL,
    getConfig().LOGO_WHITE_URL,
  );
  console.log(
    'MARKETING_SITE_BASE_URL',
    process.env.MARKETING_SITE_BASE_URL,
    getConfig().MARKETING_SITE_BASE_URL,
  );
  console.log(
    'ORDER_HISTORY_URL',
    process.env.ORDER_HISTORY_URL,
    getConfig().ORDER_HISTORY_URL,
  );
  console.log(
    'REFRESH_ACCESS_TOKEN_ENDPOINT',
    process.env.REFRESH_ACCESS_TOKEN_ENDPOINT,
    getConfig().REFRESH_ACCESS_TOKEN_ENDPOINT,
  );
  console.log('SEGMENT_KEY', process.env.SEGMENT_KEY, getConfig().SEGMENT_KEY);
  console.log('SITE_NAME', process.env.SITE_NAME, getConfig().SITE_NAME);
  console.log(
    'USER_INFO_COOKIE_NAME',
    process.env.USER_INFO_COOKIE_NAME,
    getConfig().USER_INFO_COOKIE_NAME,
  );
  console.log('APP_ID', process.env.APP_ID, getConfig().APP_ID);
  console.log(
    'MFE_CONFIG_API_URL',
    process.env.MFE_CONFIG_API_URL,
    getConfig().MFE_CONFIG_API_URL,
  );
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
