/* eslint-disable @typescript-eslint/naming-convention */
import { useEffect, useState } from 'react';
import { FormattedMessage } from '@edx/frontend-platform/i18n';
import { Warning } from '@edx/paragon/icons';
import { Icon } from '@edx/paragon';
import useGetEnrollmentStatus from '../useGetEnrollmentStatus';
import useEnrollClickHandler from '../useEnrollClickHandler';

const useGetButtonStatus = (courseMetaData) => {
  const { isEnrollmentActive } = useGetEnrollmentStatus(
    courseMetaData?.course_id,
  );
  const { availablePaymentData } = useEnrollClickHandler(courseMetaData);

  const [status, setStatus] = useState({});

  useEffect(() => {
    if (courseMetaData) {
      const { additional_metadata: metadata, paid_course } = courseMetaData;
      const currentDate = new Date();
      const courseStartDate = metadata?.course_start
        ? new Date(metadata.course_start)
        : null;
      const courseEnrollStartDate = metadata?.enrollment_start
        ? new Date(metadata.enrollment_start)
        : null;
      const courseEnrollEndDate = metadata?.enrollment_end
        ? new Date(metadata.enrollment_end)
        : null;
      const isCourseNotStarted = courseStartDate && currentDate < courseStartDate;
      const isEnrollmentNotStarted = courseEnrollStartDate && currentDate < courseEnrollStartDate;
      const isEnrollmentOver = courseEnrollEndDate && currentDate > courseEnrollEndDate;

      let warningComponent;
      let messageId;
      let defaultMessage;

      if (isEnrollmentActive && isCourseNotStarted) {
        messageId = 'courseInfo.starCourseDate.attention';
        defaultMessage = 'Course coming soon! Stay tuned for the start date';
      } else if (!isEnrollmentActive && isEnrollmentNotStarted) {
        messageId = 'courseInfo.startEnrollDate.attention';
        defaultMessage = 'Registration opens soon! Save the date and get ready to sign up';
      } else if (!isEnrollmentActive && isEnrollmentOver) {
        messageId = 'courseInfo.endEnrollDate.attention';
        defaultMessage = 'Registration Closed: Date Passed';
      } else if (paid_course?.price > 0 && !availablePaymentData) {
        messageId = 'courseInfo.ecommerceDeactivated.attention';
        defaultMessage = 'Purchases are temporarily unavailable. Please try again later';
      } else if (
        courseMetaData?.additional_metadata?.pre_req_courses?.length > 0
      ) {
        messageId = 'courseInfo.prerequisite.attention';
        defaultMessage = 'You must successfully complete the prerequisite course before you begin this course.';
      }

      if (messageId && defaultMessage) {
        warningComponent = (
          <div className="d-flex align-items-start">
            <Icon className="mr-1 warning-icon" src={Warning} />
            <span className="font-sm">
              <FormattedMessage
                id={messageId}
                defaultMessage={defaultMessage}
              />
            </span>
          </div>
        );
      }

      setStatus({
        isCourseNotStarted,
        isEnrollNotActive: isEnrollmentNotStarted || isEnrollmentOver,
        hasPreReqCourse:
          courseMetaData?.additional_metadata?.pre_req_courses?.length > 0,
        warningComponent,
      });
    }
  }, [courseMetaData, isEnrollmentActive, availablePaymentData]);

  return status;
};

export default useGetButtonStatus;
