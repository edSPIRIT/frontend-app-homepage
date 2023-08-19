/* eslint-disable react/prop-types */
import { Button } from '@edx/paragon';
import { FormattedMessage } from '@edx/frontend-platform/i18n';
import { useContext } from 'react';
import { AppContext } from '@edx/frontend-platform/react';
import AuthenticatedButtonStatus from './course-content/course-info-button-status/AuthenticatedButtonStatus';
import handleRedirect from '../../../../utils/handleRedirect';
import useEnrollClickHandler from '../../../../hooks/useEnrollClickHandler';

const CourseInfoButtonStatus = ({
  courseMetaData,
  isCourseNotStarted,
  isEnrollActive,
}) => {
  const { authenticatedUser } = useContext(AppContext);
  const { availablePaymentData } = useEnrollClickHandler(courseMetaData);
  if (!authenticatedUser) {
    return (
      <Button
        variant="brand"
        className="enroll-btn"
        onClick={handleRedirect}
        disabled={
          courseMetaData?.paid_course?.price > 0
            ? (courseMetaData?.paid_course?.price > 0
                && !availablePaymentData)
              || isEnrollActive
            : isEnrollActive
        }
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
  }
  return (
    <AuthenticatedButtonStatus
      courseMetaData={courseMetaData}
      isCourseNotStarted={isCourseNotStarted}
      isEnrollActive={isEnrollActive}
    />
  );
};

export default CourseInfoButtonStatus;
