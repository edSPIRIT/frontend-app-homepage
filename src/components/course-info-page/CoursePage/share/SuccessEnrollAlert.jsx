/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/prop-types */
import { useMediaQuery } from '@edx/paragon';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSuccessAlertOpen } from '../../../../redux/slice/course/successEnrollmentAlert';
import DesktopSuccessEnrollAlert from './SuccessEnrollAlert/DesktopSuccessEnrollAlert';

const BottomSheetSuccessEnroll = React.lazy(() => import('./SuccessEnrollAlert/BottomSheetSuccessEnroll'));

const SuccessEnrollAlert = ({ courseMetaData }) => {
  const dispatch = useDispatch();

  const isMobile = useMediaQuery({ maxWidth: '768px' });

  const successEnrollAlertState = useSelector(
    (state) => state.successEnrollmentAlert.open,
  );
  const closeAlert = () => dispatch(setSuccessAlertOpen(false));

  return (
    <>
      {isMobile ? (
        <BottomSheetSuccessEnroll
          courseMetaData={courseMetaData}
          closeAlert={closeAlert}
          successEnrollAlertState={successEnrollAlertState}
        />
      ) : (
        <DesktopSuccessEnrollAlert
          courseMetaData={courseMetaData}
          closeAlert={closeAlert}
          successEnrollAlertState={successEnrollAlertState}
        />
      )}
    </>
  );
};

export default SuccessEnrollAlert;
