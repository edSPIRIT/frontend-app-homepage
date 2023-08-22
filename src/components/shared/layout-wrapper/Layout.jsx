/* eslint-disable react/prop-types */
import React, { Suspense, useEffect, useState } from 'react';
import { Toast } from '@edx/paragon';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import Header from '../header-component/Header';
import FooterSection from '../footer/FooterSection';
import { setToastMessage } from '../../../redux/slice/toastSlice';
import useManageLocale from '../../../hooks/utils/useManageLocale';
import Loading from '../loading/Loading';
import useUpdateBodyClassName from '../../../hooks/utils/useUpdateBodyClassName';
import useSetGtm from '../../../hooks/utils/useSetGtm';
import useGetConfig from '../../../hooks/useGetConfig';

const Layout = ({ children }) => {
  const [hasPriceWrapper, setHasPriceWrapper] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const message = useSelector((state) => state.toast.message);
  const isLoading = useManageLocale();
  const { gtm, favicon, platformName } = useGetConfig();
  useSetGtm(gtm);

  useUpdateBodyClassName();

  const isProfileRoute = location.pathname === '/profile';

  useEffect(() => {
    setHasPriceWrapper(location.pathname.includes('/course'));
  }, [location]);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <Suspense fallback={<Loading />}>
      <Toast
        onClose={() => dispatch(setToastMessage(null))}
        show={!!message}
        delay={3000}
      >
        {message}
      </Toast>
      <div
        className={`layout-container ${
          hasPriceWrapper ? 'has-price-wrapper' : ''
        }`}
      >
        <Helmet>
          <link rel="shortcut icon" href={favicon} type="image/x-icon" />
          <title>{`edSPIRIT App | ${platformName}`}</title>
        </Helmet>
        <Header />
        <main className="main-container">{children}</main>
        {!isProfileRoute && <FooterSection />}
      </div>
    </Suspense>
  );
};

export default Layout;
