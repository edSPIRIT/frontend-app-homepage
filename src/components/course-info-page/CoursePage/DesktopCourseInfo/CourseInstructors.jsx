/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Skeleton } from '@edx/paragon';
import { FormattedMessage } from '@edx/frontend-platform/i18n';
import InstructorCard from './CourseInstructors/InstructorCard';
import useGetInstructorCourses from '../../../../hooks/useGetCourseInstructors';

const CourseInstructors = ({ courseSlug }) => {
  const { instructors, loading } = useGetInstructorCourses(courseSlug);
  if (loading) {
    // Render skeleton loading state
    return (
      <div className="course-info-instructors mt-5" id="instructors">
        <h2 className="mb-3">
          <FormattedMessage
            id="instructors.text"
            defaultMessage="Instructors"
          />
        </h2>
        <div className="instructors-wrapper">
          {Array(4)
            .fill(1)
            .map((item, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <div className="instructor-wrapper d-flex" key={i}>
                <Skeleton className="mr-4" width={96} height={96} />
                <div className="d-flex flex-column w-100">
                  <Skeleton height={24} />
                  <Skeleton className="mb-2.5" height={24} />
                  <div className="skeleton-icon-wrapper">
                    <Skeleton height={24} />
                    <Skeleton height={24} />
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  }
  if (instructors?.length === 0) {
    return null;
  }
  return (
    <div className="course-info-instructors mt-5" id="instructors">
      <h2 className="mb-3">
        <FormattedMessage id="instructors.text" defaultMessage="Instructors" />
      </h2>
      <div className="instructors-wrapper">
        {instructors?.map((instructor) => (
          <InstructorCard instructor={instructor} key={instructor.name} />
        ))}
      </div>
    </div>
  );
};

export default CourseInstructors;
