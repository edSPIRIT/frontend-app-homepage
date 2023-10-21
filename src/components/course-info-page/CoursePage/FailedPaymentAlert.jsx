/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/prop-types */
import { useMediaQuery } from '@edx/paragon';
import React from 'react';
import DesktopFailedPaymentAlert from './FailedPaymentAlert/DesktopFailedPaymentAlert';

const BottomSheetFailedPayment = React.lazy(() => import('./FailedPaymentAlert/BottomSheetFailedPayment'));

const FailedPaymentAlert = ({
  courseMetaData,
  isOpenFailedAlert,
  setOpenFailedAlert,
}) => {
  const isMobile = useMediaQuery({ maxWidth: '768px' });

  return (
    <>
      {isMobile ? (
        <BottomSheetFailedPayment
          courseMetaData={courseMetaData}
          isOpen={isOpenFailedAlert}
          setOpen={setOpenFailedAlert}
        />
      ) : (
        <DesktopFailedPaymentAlert
          courseMetaData={courseMetaData}
          isOpen={isOpenFailedAlert}
          setOpen={setOpenFailedAlert}
        />
      )}
    </>
  );
};

export default FailedPaymentAlert;
