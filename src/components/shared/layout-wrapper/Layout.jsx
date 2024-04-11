/* eslint-disable react/prop-types */
import React, { Suspense, useMemo } from 'react';
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

  // const removeOldFavicon = () => {
  //   const oldFavicon = document.querySelector("link[rel*='icon']");
  //   if (oldFavicon) {
  //     oldFavicon.parentNode.removeChild(oldFavicon);
  //   }
  // };

  // useEffect(() => {
  //   removeOldFavicon();
  // }, []);

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
        className={`layout-container ${
          hasPriceWrapper ? 'has-price-wrapper' : ''
        }`}
      >
        {!getConfigLoading && (
          <Helmet>
            <link rel="shortcut icon" href={`${favicon}?${new Date().getTime()}`} type="image/x-icon" sizes="16x16" />
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
