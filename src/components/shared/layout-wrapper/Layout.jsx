/* eslint-disable react/prop-types */
import React, { Suspense, useEffect, useMemo } from 'react';
import { Toast } from '@edx/paragon';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import Header from '../header-component/Header';
import { setToastMessage } from '../../../redux/slice/toastSlice';
import useManageLocale from '../../../hooks/utils/useManageLocale';
import Loading from '../loading/Loading';
import useUpdateBodyClassName from '../../../hooks/utils/useUpdateBodyClassName';
import useSetGtm from '../../../hooks/utils/useSetGtm';
import useGetConfig from '../../../hooks/useGetConfig';
import FooterSection from '../footer/FooterSection';

const Layout = ({ children }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const message = useSelector((state) => state.toast.message);
  const isLoading = useManageLocale();
  const {
    gtm,
    favicon,
    platformName,
    loading: getConfigLoading,
  } = useGetConfig();
  useSetGtm(gtm);

  useUpdateBodyClassName();

  console.log('>>>>favicon', favicon);

  useEffect(() => {
    // Remove existing favicon link
    const existingFavicon = document.querySelector("link[rel*='icon']");
    if (existingFavicon) {
      existingFavicon.parentNode.removeChild(existingFavicon);
    }

    // Add new favicon link
    const link = document.createElement('link');
    link.rel = 'icon';
    link.href = favicon;
    document.getElementsByTagName('head')[0].appendChild(link);
  }, [favicon]);

  const hasPriceWrapper = useMemo(
    () => location.pathname.includes('/course'),
    [location],
  );
  const isProfileRoute = location.pathname === '/profile';

  if (isLoading) {
    return <Loading />;
  }

  // const handleClientStateChange = (favicn) => {
  //   // Remove existing favicon links
  //   const existingFavicons = document.querySelectorAll('link[rel="icon"]');
  //   existingFavicons.forEach(link => link.parentNode.removeChild(link));

  //   // Add the new favicon link
  //   const link = document.createElement('link');
  //   link.rel = 'icon';
  //   link.href = favicn; // Assuming newState.link.href contains the new favicon URL
  //   document.head.appendChild(link);
  // };

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
        className={`layout-container ${hasPriceWrapper ? 'has-price-wrapper' : ''
        }`}
      >
        {!getConfigLoading && (
          <Helmet>
            <link rel="shortcut icon" href={favicon} type="image/x-icon" />
            <link rel="apple-touch-icon" href={favicon} sizes="32x32" />
            {/* <link
              rel="shortcut icon"
              href="https://edx-orgs-test.s3.eu-central-1.amazonaws.com/namak/admin_console/images/Favicon.ico?40"
              type="image/x-icon"
            />
            <link
              rel="apple-touch-icon"
              href="https://edx-orgs-test.s3.eu-central-1.amazonaws.com/namak/admin_console/images/Favicon.ico?40"
            /> */}
            {platformName && <title>{`${platformName}`}</title>}
          </Helmet>
        )}
        <Header />
        <main className="main-container">{children}</main>
        {!isProfileRoute && <FooterSection />}
      </div>
    </Suspense>
  );
};

export default Layout;
