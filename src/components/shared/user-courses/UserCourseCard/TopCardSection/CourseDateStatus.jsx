/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable react/prop-types */
import { FormattedMessage } from '@edx/frontend-platform/i18n';
import { Skeleton } from '@edx/paragon';
import CourseDate from './CourseDateStatus/CourseDate';
import useCourseOutline from '../../../../../hooks/useCourseOutline';

const CourseDateStatus = ({ courseInfo }) => {
  const { hasVisitedCourse, loading } = useCourseOutline(
    courseInfo?.course_details?.course_id,
  );

  const currentDate = new Date();

  const courseEnd = courseInfo?.course_details?.course_end
    ? new Date(courseInfo?.course_details?.course_end)
    : null;
  const courseStart = courseInfo?.course_details?.course_start
    ? new Date(courseInfo?.course_details?.course_start)
    : null;

  if (loading) {
    return (
      <p className="course-date-title">
        <Skeleton width={150} height={24} />
      </p>
    );
  }

  if (hasVisitedCourse) {
    if (courseEnd && courseEnd < currentDate) {
      return (
        <CourseDate
          courseDate={courseInfo?.course_details?.course_end}
          messageId="userCourseCard.expired.text"
          defaultMessage="Access has expired on "
        />
      );
    }

    if (courseEnd && courseEnd > currentDate) {
      return (
        <CourseDate
          courseDate={courseInfo?.course_details?.course_end}
          messageId="userCourseCard.willExpired.text"
          defaultMessage="Access will expire on "
        />
      );
    }

    return (
      <p className="course-date-title">
        <FormattedMessage
          id="courseInfo.lifetimeAccess.text"
          defaultMessage="Lifetime access"
        />
      </p>
    );
  }
  if (courseStart && courseStart < currentDate) {
    return (
      <CourseDate
        courseDate={courseInfo?.course_details?.course_start}
        messageId="userCourseCard.hasCourseStart.text"
        defaultMessage="Course has started on "
      />
    );
  }

  return (
    <CourseDate
      courseDate={courseInfo?.course_details?.course_start}
      messageId="userCourseCard.willCourseStart.text"
      defaultMessage="Course will start on "
    />
  );
};

export default CourseDateStatus;
