/* eslint-disable react/prop-types */
import React from 'react';
import { Button, Spinner } from '@edx/paragon';
import { FormattedMessage } from '@edx/frontend-platform/i18n';
import { getConfig } from '@edx/frontend-platform';
import useEnrollClickHandler from '../../../../../../hooks/useEnrollClickHandler';
import useGetEnrollmentStatus from '../../../../../../hooks/useGetEnrollmentStatus';
import GoResumeCourseButton from '../../../../../shared/user-courses/share/GoResumeCourseButton';

const AuthenticatedButtonStatus = ({
  courseMetaData,
  isCourseNotStarted,
  isEnrollNotActive,
  hasPreReqCourse,
  hasTrial,
}) => {
  const { isEnrollmentActive, loading } = useGetEnrollmentStatus(
    courseMetaData?.course_id,
  );
  const {
    enrollClickHandler,
    isLoading: enrollLoading,
    availablePaymentData,
  } = useEnrollClickHandler(courseMetaData);
  if (loading || enrollLoading) {
    return (
      <Button variant="brand" className="mb-3 enroll-btn">
        <Spinner animation="border" />
      </Button>
    );
  }
  if (isEnrollmentActive) {
    return (
      <GoResumeCourseButton
        courseId={courseMetaData?.course_id}
        isCourseNotStarted={isCourseNotStarted}
        hasPreReqCourse={hasPreReqCourse}
      />
    );
  }
  if (courseMetaData?.paid_course?.price > 0 && !hasTrial) {
    return (
      <Button
        variant="brand"
        className="enroll-btn"
        onClick={enrollClickHandler}
        loading={enrollLoading}
        disabled={!availablePaymentData || isEnrollNotActive}
      >
        <FormattedMessage
          id="courseInfo.purchaseNow.text"
          defaultMessage="Purchase"
        />
      </Button>
    );
  }
  return (
    <Button
      variant="brand"
      className="enroll-btn"
      onClick={enrollClickHandler}
      loading={enrollLoading}
      disabled={isEnrollNotActive}
    >
      <FormattedMessage
        id="courseInfo.enrollNow.text"
        defaultMessage="Enroll Now"
        a
      />
    </Button>
  );
};

export default AuthenticatedButtonStatus;
