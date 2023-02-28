import { Button } from '@edx/paragon';
import { ArrowForward } from '@edx/paragon/icons';
import { useHistory } from 'react-router-dom';
import HorizontalCard from '../shared/horizontal-card/HorizontalCard';
import AvatarInfo from './avatar-info/AvatarInfo';
import NotEnrolledCardCourse from './not-enrolled-course-card/NotEnrolledCourseCard';
import SimilarCourses from '../shared/similar-courses/SimilarCourses';
import useGetSimilarCourses from '../../hooks/useGetSimilarCourses';
import useGetCourses from '../../hooks/useGetCourses';
import HorizontalCardSkeleton from '../shared/horizontal-card/HorizontalCardSkeleton';

const OverviewPage = () => {
  const history = useHistory();
  const notEnrolled = false;
  const { courses, courseTitles, loading: coursesLoading } = useGetCourses();
  const { similarCourses, loading } = useGetSimilarCourses(courseTitles);
  console.log('similarCourses', similarCourses);
  console.log('courses', courses);
  console.log('coursesTitles', courseTitles);
  return (
    <main>
      {notEnrolled ? (
        <div className="custom-container d-flex flex-column mt-6">
          <AvatarInfo />
          <NotEnrolledCardCourse />
        </div>
      ) : (
        <div className="d-flex flex-column">
          <div className=" mt-5 custom-container">
            <AvatarInfo />
            <div className="overview-courses-wrapper">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <h3 className="text-gray-500">Recent In-Progress Courses</h3>
                <Button
                  variant="outline-primary"
                  iconAfter={ArrowForward}
                  className="view-all-btn"
                  onClick={() => history.push('/inprogress')}
                >
                  View All
                </Button>
              </div>
              {coursesLoading
                ? Array(4)
                  .fill(1)
                  .map((item, i) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <HorizontalCardSkeleton key={i} />
                  ))
                : courses.map((course) => (
                  <HorizontalCard
                    key={course.course_id}
                    progressValue={33}
                    showButtons={false}
                    course={course}
                  />
                ))}
            </div>
            {/* <div className="recommended-program-wrapper">
                <RecommendedPrograms />
              </div> */}
          </div>
          <div className="recommendationCourse-wrapper mt-6 py-6">
            <SimilarCourses courses={courses} loading={loading} />
          </div>
        </div>
      )}
    </main>
  );
};
export default OverviewPage;
