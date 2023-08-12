/* eslint-disable react/prop-types */
import React from 'react';
import { Button, Spinner } from '@edx/paragon';
import { FormattedMessage } from '@edx/frontend-platform/i18n';
import { getConfig } from '@edx/frontend-platform';
import useEnrollClickHandler from '../../../../../../hooks/useEnrollClickHandler';
import useGetEnrollmentStatus from '../../../../../../hooks/useGetEnrollmentStatus';

const AuthenticatedButtonStatus = ({ courseMetaData }) => {
  const baseUrl = new URL(getConfig().LMS_BASE_URL).hostname;
  const { enrollmentStatus, loading } = useGetEnrollmentStatus(courseMetaData?.course_id);
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
  if (enrollmentStatus) {
    return (
      <Button
        variant="primary"
        className="enroll-btn"
        loading={enrollLoading}
        href={`https://apps.${baseUrl}/learning/course/${courseMetaData?.course_id}/home`}
        target="_blank"
        rel="noreferrer"
      >
        <FormattedMessage
          id="courseInfo.goToCourse.button"
          defaultMessage="Go to course"
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
      disabled={courseMetaData?.paid_course?.price > 0 && !availablePaymentData}
    >
      {courseMetaData?.paid_course?.price > 0 ? (
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
