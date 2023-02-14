import { Button } from '@edx/paragon';
import { ArrowForward } from '@edx/paragon/icons';
import { useHistory } from 'react-router-dom';
import { getConfig } from '@edx/frontend-platform';
import HorizontalCard from '../shared/horizontal-card/HorizontalCard';
import AvatarInfo from './avatar-info/AvatarInfo';
import NotEnrolledCardCourse from './not-enrolled-course-card/NotEnrolledCourseCard';
import SimilarCourses from '../shared/similar-courses/SimilarCourses';
import useGetSimilarCourses from '../../hooks/useGetSimilarCourses';
import useGetCourses from '../../hooks/useGetCourses';

const OverviewPage = () => {
  const history = useHistory();
  const notEnrolled = false;
  const { similarCourses } = useGetSimilarCourses();
  const { courses, loading } = useGetCourses();
  console.log('getConfig().LMS_BASE_URL', getConfig().LMS_BASE_URL);
  console.log('similarCourses', similarCourses);
  console.log('courses', courses);
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
              {courses.map((course) => (
                <HorizontalCard progressValue={33} showButtons={false} course={course} />
              ))}

            </div>
            {/* <div className="recommended-program-wrapper">
                <RecommendedPrograms />
              </div> */}
          </div>
          <div className="recommendationCourse-wrapper mt-6 py-6">
            <SimilarCourses />
          </div>
        </div>
      )}
    </main>
  );
};
export default OverviewPage;
