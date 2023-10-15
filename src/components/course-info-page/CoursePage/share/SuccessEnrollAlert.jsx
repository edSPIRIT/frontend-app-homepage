/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/prop-types */
import { useMediaQuery } from '@edx/paragon';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSuccessAlertOpen } from '../../../../redux/slice/course/successEnrollmentAlert';
import DesktopSuccessEnrollAlert from './SuccessEnrollAlert/DesktopSuccessEnrollAlert';
import useGetButtonStatus from '../../../../hooks/utils/useGetButtonStatus';

const BottomSheetSuccessEnroll = React.lazy(() => import('./SuccessEnrollAlert/BottomSheetSuccessEnroll'));

const SuccessEnrollAlert = ({ courseMetaData }) => {
  const dispatch = useDispatch();

  const isMobile = useMediaQuery({ maxWidth: '768px' });

  const successEnrollAlertState = useSelector(
    (state) => state.successEnrollmentAlert.open,
  );
  const closeAlert = () => dispatch(setSuccessAlertOpen(false));
  const { isCourseNotStarted, hasPreReqCourse, warningComponent } = useGetButtonStatus(courseMetaData);
  return (
    <>
      {isMobile ? (
        <BottomSheetSuccessEnroll
          courseMetaData={courseMetaData}
          closeAlert={closeAlert}
          successEnrollAlertState={successEnrollAlertState}
          warningComponent={warningComponent}
          isCourseNotStarted={isCourseNotStarted}
          hasPreReqCourse={hasPreReqCourse}
        />
      ) : (
        <DesktopSuccessEnrollAlert
          courseMetaData={courseMetaData}
          closeAlert={closeAlert}
          successEnrollAlertState={successEnrollAlertState}
          warningComponent={warningComponent}
          isCourseNotStarted={isCourseNotStarted}
          hasPreReqCourse={hasPreReqCourse}
        />
      )}
    </>
  );
};

export default SuccessEnrollAlert;
