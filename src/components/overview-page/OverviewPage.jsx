/* eslint-disable no-nested-ternary */
import { Skeleton, useMediaQuery } from '@edx/paragon';
import UserCourseCard from '../shared/user-courses/UserCourseCard';
import AvatarInfo from './avatar-info/AvatarInfo';
import NotEnrolledCardCourse from './not-enrolled-course-card/NotEnrolledCourseCard';
import UserCourseCardSkeleton from '../shared/user-courses/UserCourseCardSkeleton';
import useGetEnrollmentList from '../../hooks/useGetEnrollmentList';
import SimilarCourses from '../shared/similar-courses/SimilarCourses';
import NavHeader from '../shared/header/nav-header/NavHeader';

const OverviewPage = () => {
  const {
    loading, userCourseTitles, userCourseIds, userInprogressCourses,
  } = useGetEnrollmentList();
  const isMobile = useMediaQuery({ maxWidth: '768px' });
  return (
    <>
      {isMobile && <NavHeader />}
      <main>
        <div className="d-flex flex-column">
          <div className="custom-container">
            <AvatarInfo />
            {loading ? (
              <>
                <Skeleton width={100} height={24} className="mb-4 mt-5.5" />
                {Array(4)
                  .fill(1)
                  .map((item, i) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <UserCourseCardSkeleton key={i} />
                  ))}
              </>
            ) : userInprogressCourses?.length === 0 ? (
              <NotEnrolledCardCourse
                title="Earn a certificate Advance your career"
                description="You are not enrolled in any courses yet."
              />
            ) : (
              <div className="overview-courses-wrapper">
                <h3 className="recent-title mb-4 mt-5.5">Recent Activity</h3>
                {userInprogressCourses?.map((courseInfo) => (
                  <UserCourseCard
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
          <SimilarCourses
            courseTitles={userCourseTitles}
            courseIds={userCourseIds}
            loading={loading}
          />
        </div>
      </main>
    </>
  );
};

export default OverviewPage;
