/* eslint-disable react/prop-types */
import React from 'react';
import { Button, Spinner } from '@edx/paragon';
import { FormattedMessage } from '@edx/frontend-platform/i18n';
import { getConfig } from '@edx/frontend-platform';
import useEnrollClickHandler from '../../../../../../hooks/useEnrollClickHandler';
import useGetOverviewList from '../../../../../../hooks/useGetOverviewList';

const AuthenticatedButtonStatus = ({ courseMetaData }) => {
  const { loading: coursesEnrollLoading, userCourseIds } = useGetOverviewList();
  const {
    enrollClickHandler,
    loading: enrollLoading,
    availablePaymentData,
  } = useEnrollClickHandler(courseMetaData);
  if (coursesEnrollLoading || enrollLoading) {
    return (
      <Button variant="brand" className="mb-3 enroll-btn">
        <Spinner animation="border" />
      </Button>
    );
  }
  if (userCourseIds?.includes(courseMetaData?.course_id)) {
    return (
      <Button
        variant="primary"
        className="enroll-btn"
        href={`https://apps.${getConfig().LMS_BASE_URL.replace(
          'https://',
          '',
        )}/learning/course/${courseMetaData?.course_id}/home`}
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
      disabled={courseMetaData?.paid_course?.price > 0 && !availablePaymentData}
    >
      {courseMetaData?.paid_course?.price > 0 ? (
        <FormattedMessage
          id="courseInfo.purchaseNow.text"
          defaultMessage="Purchase now"
        />
      ) : (
        <FormattedMessage
          id="courseInfo.enrollNow.text"
          defaultMessage="Enroll now"
        />
      )}
    </Button>
  );
};

export default AuthenticatedButtonStatus;
