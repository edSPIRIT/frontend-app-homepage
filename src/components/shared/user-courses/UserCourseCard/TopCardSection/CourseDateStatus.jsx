/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable react/prop-types */
import { FormattedMessage } from '@edx/frontend-platform/i18n';
import CourseDate from './CourseDateStatus/CourseDate';

const CourseDateStatus = ({ courseInfo }) => {
  const currentDate = new Date();

  const calcProgress = () => {
    const { complete_count, incomplete_count } = courseInfo?.progress;

    if (complete_count === 0) {
      return 0;
    }

    const progress = (complete_count / (complete_count + incomplete_count)) * 100;
    return Math.round(progress);
  };
  const hasVisited = calcProgress();
  const courseEnd = courseInfo?.course_details?.course_end
    ? new Date(courseInfo?.course_details?.course_end)
    : null;
  const courseStart = courseInfo?.course_details?.course_start
    ? new Date(courseInfo?.course_details?.course_start)
    : null;

  if (hasVisited > 0) {
    if (courseEnd && courseEnd < currentDate) {
      return (
        <CourseDate
          courseInfo={courseInfo}
          messageId="userCourseCard.course_end.text"
          defaultMessage="Access has expired on - "
        />
      );
    }

    if (courseEnd && courseEnd > currentDate) {
      return (
        <CourseDate
          courseInfo={courseInfo}
          messageId="userCourseCard.course_end.text"
          defaultMessage="Access will expire on - "
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
        courseInfo={courseInfo}
        messageId="userCourseCard.courseStart.text"
        defaultMessage="Course has started on - "
      />
    );
  }

  return (
    <CourseDate
      courseInfo={courseInfo}
      messageId="userCourseCard.courseStart.text"
      defaultMessage="Course will start on - "
    />
  );
};

export default CourseDateStatus;
