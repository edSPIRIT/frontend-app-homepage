import { FormattedMessage } from '@edx/frontend-platform/i18n';
import useGetEnrollmentStatus from '../useGetEnrollmentStatus';
import useEnrollClickHandler from '../useEnrollClickHandler';

const useGetButtonStatus = (courseMetaData) => {
  const courseStartDate = courseMetaData?.additional_metadata?.course_start
    ? new Date(courseMetaData.additional_metadata.course_start)
    : null;

  const courseEnrollStartDate = courseMetaData?.additional_metadata
    ?.enrollment_start
    ? new Date(courseMetaData.additional_metadata.enrollment_start)
    : null;

  const courseEnrollEndDate = courseMetaData?.additional_metadata
    ?.enrollment_end
    ? new Date(courseMetaData.additional_metadata.enrollment_end)
    : null;
  const currentDate = new Date(); // Current date and time

  const isCourseNotStarted = courseStartDate && currentDate < courseStartDate;
  const isEnrollmentNotStarted = courseEnrollStartDate
    && courseEnrollEndDate
    && currentDate < courseEnrollStartDate;
  const isEnrollmentOver = courseEnrollStartDate
    && courseEnrollEndDate
    && currentDate > courseEnrollEndDate;
  const isEnrollActive = isEnrollmentNotStarted || isEnrollmentOver;
  const { isEnrollmentActive } = useGetEnrollmentStatus(
    courseMetaData?.course_id,
  );
  const { availablePaymentData } = useEnrollClickHandler(courseMetaData);
  const warningMessage = () => {
    if (isEnrollmentActive) {
      if (isCourseNotStarted) {
        return (
          <FormattedMessage
            id="courseInfo.starCourseDate.attention"
            defaultMessage="Course coming soon! Stay tuned for the start date"
          />
        );
      }
    } else {
      if (isEnrollmentNotStarted) {
        return (
          <FormattedMessage
            id="courseInfo.startEnrollDate.attention"
            defaultMessage="Registration opens soon! Save the date and get ready to sign up"
          />
        );
      }
      if (isEnrollmentOver) {
        return (
          <FormattedMessage
            id="courseInfo.endEnrollDate.attention"
            defaultMessage="Registration Closed: Date Passed"
          />
        );
      }
      if (courseMetaData?.paid_course?.price > 0 && !availablePaymentData) {
        return (
          <FormattedMessage
            id="courseInfo.ecommerceDeactivated.attention"
            defaultMessage="Purchases are temporarily unavailable. Please try again later"
          />
        );
      }
    }
    return undefined;
  };
  return {
    isCourseNotStarted,
    isEnrollActive,
    warningMessage,
  };
};

export default useGetButtonStatus;
