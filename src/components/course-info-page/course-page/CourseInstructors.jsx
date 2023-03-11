import { getConfig } from '@edx/frontend-platform';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import { Button, Skeleton } from '@edx/paragon';
import PropTypes from 'prop-types';
import useGetCourseInstructors from '../../../hooks/useGetCourseInstructors';
import useGetEnrollmentList from '../../../hooks/useGetEnrollmentList';
import InstructorCard from './course-instructors/InstructorCard';

const CourseInstructors = ({ instructors, loading }) =>
// const { InstructorCourses } = useGetInstructorCourses();
// console.log('InstructorCourses', InstructorCourses);
// const { courseEnrollment } = useGetEnrollmentList();
// async function deleteEnroll() {
//   return getAuthenticatedHttpClient().post(

  //     `${
  //       getConfig().LMS_BASE_URL
  //     }/admin-console/api/openedx/api/unenroll/`,
  //     {
  //       course_id: 'course-v1:test+test1+2014',
  //     },
  //   );
  // }
  // deleteEnroll();
  (
    <div className="course-info-instructors mt-5" id="instructors">
      <h2 className="mb-3">Instructors</h2>
      <div className="instructors-wrapper ">
        {loading
          ? Array(4)
            .fill(1)
            .map((item, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <div className="instructor-wrapper d-flex" key={i}>
                <Skeleton className="mr-4" width={96} height={96} />
                <div className="d-flex flex-column w-100 ">
                  <Skeleton height={24} />
                  <Skeleton className="mb-2.5" height={24} />
                  <div className="skeleton-icon-wrapper">
                    <Skeleton height={24} />
                    <Skeleton height={24} />
                  </div>
                </div>
              </div>
            ))
          : instructors?.map((instructor) => (
            <InstructorCard instructor={instructor} key={instructor.name} />
          ))}
      </div>
      {/* <Button variant="outline-primary" className="my-4">
        Show more Instructors
      </Button> */}
    </div>
  );
CourseInstructors.propTypes = {
  instructors: PropTypes.arrayOf(PropTypes.string),
  loading: PropTypes.bool,
};
CourseInstructors.defaultProps = {
  instructors: [],
  loading: false,
};
export default CourseInstructors;
