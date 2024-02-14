/* eslint-disable react/prop-types */
import { useMediaQuery } from '@edx/paragon';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router';
import useGetCourseMetaData from '../../hooks/useGetCourseMetaData';
import SimilarCourses from '../shared/similar-courses/SimilarCourses';
import DesktopCourseInfo from './CoursePage/DesktopCourseInfo';
import useGetConfig from '../../hooks/useGetConfig';

const MobileCourseInfo = React.lazy(() => import('./CoursePage/MobileCourseInfo'));
const FailedPaymentAlert = React.lazy(() => import('./CoursePage/FailedPaymentAlert'));
const SuccessEnrollAlert = React.lazy(() => import('./CoursePage/share/SuccessEnrollAlert'));
const InactiveEmailAlert = React.lazy(() => import('./CoursePage/InactiveEmailAlert'));

const CoursePage = () => {
  const activateState = useSelector((state) => state.activateAlert.open);

  const { slug } = useParams();
  const { courseMetaData, loading } = useGetCourseMetaData(slug);
  const isMobile = useMediaQuery({ maxWidth: '768px' });
  const [isOpenFailedAlert, setOpenFailedAlert] = useState(false);

  const successEnrollAlertState = useSelector(
    (state) => state.successEnrollmentAlert.open,
  );
  const { platformName } = useGetConfig();
  useEffect(() => {
    if (courseMetaData) {
      document.title = `${
        courseMetaData?.additional_metadata?.display_name
      } | ${platformName}`;
    }
  }, [courseMetaData, platformName]);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const paymentStatus = queryParams.get('payment_status');
  useEffect(() => {
    if (paymentStatus === 'failed') {
      setOpenFailedAlert(true);
    }
  }, [paymentStatus]);

  return (
    <>
      {isMobile ? <MobileCourseInfo /> : <DesktopCourseInfo />}
      <SimilarCourses
        courseTitles={courseMetaData?.additional_metadata?.display_name}
        courseIds={[`${courseMetaData?.course_id}`]}
        loading={loading}
      />
      {successEnrollAlertState && (
        <SuccessEnrollAlert
          courseMetaData={courseMetaData}
          successEnrollAlertState={successEnrollAlertState}
        />
      )}
      {isOpenFailedAlert && (
        <FailedPaymentAlert
          isOpenFailedAlert={isOpenFailedAlert}
          setOpenFailedAlert={setOpenFailedAlert}
          courseMetaData={courseMetaData}
        />
      )}
      {activateState && <InactiveEmailAlert activateState={activateState} />}
    </>
  );
};

export default CoursePage;
