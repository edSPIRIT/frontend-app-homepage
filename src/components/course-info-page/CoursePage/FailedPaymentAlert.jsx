/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/prop-types */
import { useMediaQuery } from '@edx/paragon';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import DesktopFailedPaymentAlert from './FailedPaymentAlert/DesktopFailedPaymentAlert';

const BottomSheetFailedPayment = React.lazy(() => import('./FailedPaymentAlert/BottomSheetFailedPayment'));

const FailedPaymentAlert = ({ courseMetaData }) => {
  const isMobile = useMediaQuery({ maxWidth: '768px' });

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const paymentStatus = queryParams.get('payment_status');

  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    if (paymentStatus === 'failed') {
      setOpen(true);
    }
  }, [paymentStatus]);
  return (
    <>
      {isMobile ? (
        <BottomSheetFailedPayment
          courseMetaData={courseMetaData}
          isOpen={isOpen}
          setOpen={setOpen}
        />
      ) : (
        <DesktopFailedPaymentAlert
          courseMetaData={courseMetaData}
          isOpen={isOpen}
          setOpen={setOpen}
        />
      )}
    </>
  );
};

export default FailedPaymentAlert;
