/* eslint-disable @typescript-eslint/naming-convention */
import { useEffect, useState } from 'react';
import { FormattedMessage } from '@edx/frontend-platform/i18n';
import { Warning } from '@edx/paragon/icons';
import { Icon } from '@edx/paragon';
import { Link } from 'react-router-dom';
import useGetEnrollmentStatus from '../useGetEnrollmentStatus';
import useEnrollClickHandler from '../useEnrollClickHandler';
import useGetPaidCourses from '../useGetPaidCourses';

const useGetButtonStatus = (courseMetaData) => {
  const { isEnrollmentActive } = useGetEnrollmentStatus(
    courseMetaData?.course_id,
  );
  const { availablePaymentData } = useEnrollClickHandler(courseMetaData);
  const { paidCourses } = useGetPaidCourses(courseMetaData);

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

      let warningMessage;

      if (isEnrollmentActive && isCourseNotStarted) {
        warningMessage = (
          <FormattedMessage
            id="courseInfo.starCourseDate.attention"
            defaultMessage="Course coming soon! Stay tuned for the start date"
          />
        );
      } else if (!isEnrollmentActive && isEnrollmentNotStarted) {
        warningMessage = (
          <FormattedMessage
            id="courseInfo.startEnrollDate.attention"
            defaultMessage="Registration opens soon! Save the date and get ready to sign up"
          />
        );
      } else if (!isEnrollmentActive && isEnrollmentOver) {
        warningMessage = (
          <FormattedMessage
            id="courseInfo.endEnrollDate.attention"
            defaultMessage="Registration Closed: Date Passed"
          />
        );
      } else if (
        paid_course?.price > 0
        && !paidCourses?.has_trial
        && !availablePaymentData
      ) {
        warningMessage = (
          <FormattedMessage
            id="courseInfo.ecommerceDeactivated.attention"
            defaultMessage="Purchases are temporarily unavailable. Please try again later"
          />
        );
      } else if (
        courseMetaData?.additional_metadata?.pre_req_courses?.length > 0
      ) {
        warningMessage = (
          <>
            <FormattedMessage
              id="courseInfo.prerequisiteFistPart.attention"
              defaultMessage="You must successfully complete the"
            />
            <Link
              className="px-1 text-gray-700 text-decoration-underline"
              to={`/course/${courseMetaData?.additional_metadata?.pre_req_courses[0]?.course_slug}`}
            >
              <FormattedMessage
                id="courseInfo.prerequisiteMiddlePart.attention"
                defaultMessage="prerequisite course"
              />
            </Link>
            <FormattedMessage
              id="courseInfo.prerequisiteSecondPart.attention"
              defaultMessage="before you begin this course."
            />
          </>
        );
      }

      const warningComponent = warningMessage && (
        <div className="d-flex align-items-start">
          <Icon className="mr-1 warning-icon" src={Warning} />
          <p className="font-sm">{warningMessage}</p>
        </div>
      );

      setStatus({
        isCourseNotStarted,
        isEnrollNotActive: isEnrollmentNotStarted || isEnrollmentOver,
        hasPreReqCourse:
          courseMetaData?.additional_metadata?.pre_req_courses?.length > 0,
        warningComponent,
      });
    }
  }, [
    courseMetaData,
    isEnrollmentActive,
    availablePaymentData,
    paidCourses?.has_trial,
  ]);

  return status;
};

export default useGetButtonStatus;
