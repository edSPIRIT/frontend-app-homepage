/* eslint-disable react/prop-types */
import React from 'react';
import { Button, Spinner } from '@edx/paragon';
import { FormattedMessage } from '@edx/frontend-platform/i18n';
import { getConfig } from '@edx/frontend-platform';
import useEnrollClickHandler from '../../../../../../hooks/useEnrollClickHandler';
import useGetEnrollmentStatus from '../../../../../../hooks/useGetEnrollmentStatus';

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
      <Button
        variant="primary"
        className="enroll-btn"
        loading={enrollLoading}
        href={`${getConfig().LEARNING_BASE_URL}/course/${
          courseMetaData?.course_id
        }/home`}
        target="_blank"
        rel="noreferrer"
        disabled={isCourseNotStarted || hasPreReqCourse}
      >
        <FormattedMessage
          id="userCourseCard.goToYourCourse.button"
          defaultMessage="Go To Your Course"
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
      disabled={
        courseMetaData?.paid_course?.price > 0 && !hasTrial
          ? (courseMetaData?.paid_course?.price > 0 && !availablePaymentData)
            || isEnrollNotActive
          : isEnrollNotActive
      }
    >
      {courseMetaData?.paid_course?.price > 0 && !hasTrial ? (
        <FormattedMessage
          id="courseInfo.purchaseNow.text"
          defaultMessage="Purchase"
        />
      ) : (
        <FormattedMessage
          id="courseInfo.enrollNow.text"
          defaultMessage="Enroll Now"
        />
      )}
    </Button>
  );
};

export default AuthenticatedButtonStatus;
