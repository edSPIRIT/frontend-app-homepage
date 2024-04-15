/* eslint-disable react/prop-types */
import React, {
  Suspense, useEffect, useMemo, useRef,
} from 'react';
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

  function updateFavicon(rel) {
    // Remove existing favicon link
    const existingFavicon = document.querySelector("link[rel*='icon']");
    if (existingFavicon) {
      existingFavicon.parentNode.removeChild(existingFavicon);
    }

    // Add new favicon link
    const link = document.createElement('link');
    link.rel = rel;
    link.type = 'image/x-icon';
    // link.href = 'https://edx-orgs-test.s3.eu-central-1.amazonaws.com/namak/admin_console/images/Favicon.ico?v=12';
    link.href = 'https://media.geeksforgeeks.org/wp-content/cdn-uploads/gfg_favicon.png';
    document.getElementsByTagName('head')[0].appendChild(link);
  }

  const scrollTimeoutId = useRef();

  useEffect(() => {
    scrollTimeoutId.current = setTimeout(() => {
      updateFavicon('apple-touch-icon');
      updateFavicon('shortcut icon');
      updateFavicon('icon');
    }, 1000);
    return () => {
      if (scrollTimeoutId.current !== null) {
        clearTimeout(scrollTimeoutId.current);
      }
    };
  }, []);

  const hasPriceWrapper = useMemo(
    () => location.pathname.includes('/course'),
    [location],
  );
  const isProfileRoute = location.pathname === '/profile';

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
        className={`layout-container ${hasPriceWrapper ? 'has-price-wrapper' : ''
        }`}
      >
        {!getConfigLoading && (
          <Helmet>
            {/* <link rel="shortcut icon" href={favicon} type="image/x-icon" /> */}
            {/* <link rel="apple-touch-icon" href={favicon} /> */}
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
