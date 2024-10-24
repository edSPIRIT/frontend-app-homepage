/* eslint-disable @typescript-eslint/naming-convention */
import { useEffect, useState } from 'react';
import { FormattedMessage } from '@edx/frontend-platform/i18n';
import { Warning } from '@edx/paragon/icons';
import { Icon } from '@edx/paragon';
import { Link } from 'react-router-dom';
import useGetEnrollmentStatus from '../useGetEnrollmentStatus';
import useEnrollClickHandler from '../useEnrollClickHandler';
import useCheckPrerequisiteStatus from '../useCheckPrerequisiteStatus';

const useGetButtonStatus = (courseMetaData) => {
  const { isEnrollmentActive } = useGetEnrollmentStatus(
    courseMetaData?.course_id,
  );
  const { availablePaymentData } = useEnrollClickHandler(courseMetaData);

  const [status, setStatus] = useState({});

  // check if user has done pre req course or not
  const { isCompletePreReq } = useCheckPrerequisiteStatus(
    courseMetaData?.course_slug,
    courseMetaData?.additional_metadata?.pre_req_courses,
  );
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
      const isActiveInvitation = metadata.invitation_only;
      // check whether user has completed the pre req course or not
      const hasPreReqCourse = () => (courseMetaData?.additional_metadata?.pre_req_courses?.length > 0
        ? isCompletePreReq === false
        : false);

      // New code to check for maximum enrollment
      const maxEnrollments = metadata?.max_enrollments;
      const totalEnrollments = metadata?.total_enrollments;
      const isEnrollmentFull = maxEnrollments !== null && totalEnrollments >= maxEnrollments;

      if (isEnrollmentFull && !isEnrollmentActive) {
        warningMessage = (
          <FormattedMessage
            id="courseInfo.maxEnrollment.attention"
            defaultMessage="This course has reached its maximum enrollment capacity. You cannot enroll at this time."
          />
        );
      } else if (isEnrollmentActive && isCourseNotStarted) {
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
      } else if (paid_course?.active && !availablePaymentData) {
        warningMessage = paid_course?.has_trial ? undefined : (
          <FormattedMessage
            id="courseInfo.ecommerceDeactivated.attention"
            defaultMessage="Purchases are temporarily unavailable. Please try again later"
          />
        );
      } else if (hasPreReqCourse()) {
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
      } else if (isActiveInvitation && !(paid_course?.active
    && !paid_course?.has_trial)) {
        warningMessage = (
          <FormattedMessage
            id="courseInfo.invitation.attention"
            defaultMessage="Enrollment in this course is by invitation only."
          />
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
        isEnrollNotActive: (isEnrollmentNotStarted || isEnrollmentOver
          || (isActiveInvitation && !paid_course?.active) || (isEnrollmentFull && !isEnrollmentActive)),
        hasPreReqCourse: hasPreReqCourse(),
        warningComponent,
        isEnrollmentFull: isEnrollmentFull && !isEnrollmentActive,
      });
    }
  }, [
    courseMetaData,
    isEnrollmentActive,
    availablePaymentData,
    isCompletePreReq,
  ]);

  return status;
};

export default useGetButtonStatus;
