/* eslint-disable no-nested-ternary */
import { Button, Skeleton } from '@edx/paragon';
import { ArrowForward } from '@edx/paragon/icons';
import { useHistory } from 'react-router-dom';
import HorizontalCard from '../shared/horizontal-card/HorizontalCard';
import AvatarInfo from './avatar-info/AvatarInfo';
import NotEnrolledCardCourse from './not-enrolled-course-card/NotEnrolledCourseCard';
import HorizontalCardSkeleton from '../shared/horizontal-card/HorizontalCardSkeleton';
import useGetEnrollmentList from '../../hooks/useGetEnrollmentList';
import SimilarCourses from '../shared/similar-courses/SimilarCourses';

const OverviewPage = () => {
  const history = useHistory();
  const { coursesEnrollment, loading: coursesEnrollLoading } = useGetEnrollmentList();
  return (
    <main>
      <div className="d-flex flex-column">
        <div className=" mt-5 custom-container">
          <AvatarInfo />
          {coursesEnrollLoading ? (
            <>
              <div className="d-flex align-items-center justify-content-between mb-3 mt-5.5">
                <Skeleton width={300} height={24} />
                <Skeleton width={100} height={24} />
              </div>
              {Array(4)
                .fill(1)
                .map((item, i) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <HorizontalCardSkeleton key={i} />
                ))}
            </>
          ) : coursesEnrollment?.length === 0 ? (
            <NotEnrolledCardCourse />
          ) : (
            <div className="overview-courses-wrapper">
              <div className="d-flex align-items-center justify-content-between mb-3 mt-5.5">
                <h3 className="recent-title">Recent In-Progress Courses</h3>
                <Button
                  variant="outline-primary"
                  iconAfter={ArrowForward}
                  className="view-all-btn"
                  onClick={() => history.push('/inprogress')}
                >
                  View All
                </Button>
              </div>
              {coursesEnrollment?.map((courseInfo) => (
                <HorizontalCard
                  key={courseInfo?.course_details?.course_id}
                  courseInfo={courseInfo}
                />
              ))}
            </div>
          )}
          {/* <div className="recommended-program-wrapper">
                <RecommendedPrograms />
              </div> */}
        </div>
        <SimilarCourses />
      </div>
    </main>
  );
};
export default OverviewPage;
