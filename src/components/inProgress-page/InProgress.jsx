/* eslint-disable no-nested-ternary */
import { useMediaQuery } from '@edx/paragon';
import useGetEnrollmentList from '../../hooks/useGetEnrollmentList';
import NotEnrolledCardCourse from '../overview-page/not-enrolled-course-card/NotEnrolledCourseCard';
import NavHeader from '../shared/header/nav-header/NavHeader';
import UserCourseCard from '../shared/user-courses/UserCourseCard';
import UserCourseCardSkeleton from '../shared/user-courses/UserCourseCardSkeleton';
import TotalCourseWrapper from '../shared/total-course-wrapper/TotalCourseWrapper';

const InProgress = () => {
  const { coursesEnrollment, loading } = useGetEnrollmentList();
  const isMobile = useMediaQuery({ maxWidth: '768px' });

  return (
    <>
      {isMobile && <NavHeader />}
      <main className="d-flex custom-container py-5 flex-column">
        {loading ? (
          Array(4)
            .fill(1)
            .map((item, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <UserCourseCardSkeleton key={i} />
            ))
        ) : coursesEnrollment?.filter(
          (courseInfo) => courseInfo?.progress?.incomplete_count > 0,
        )?.length === 0 ? (
          <NotEnrolledCardCourse
            title="Earn a certificate Advance your career"
            description="You will find your in-progress courses here."
          />
          ) : (
            <div className="d-flex ">
              <div className="w-100">
                <TotalCourseWrapper
                  coursesCount={
                  coursesEnrollment?.filter(
                    (courseInfo) => courseInfo?.progress?.incomplete_count > 0,
                  )?.length
                }
                  loading={loading}
                />
                {loading
                  ? Array(4)
                    .fill(1)
                    .map((item, i) => (
                    // eslint-disable-next-line react/no-array-index-key
                      <UserCourseCardSkeleton key={i} />
                    ))
                  : coursesEnrollment
                    ?.filter(
                      (courseInfo) => courseInfo?.progress?.incomplete_count > 0,
                    )
                    ?.map((courseInfo) => (
                      <UserCourseCard
                        courseInfo={courseInfo}
                        key={courseInfo?.course_details?.course_id}
                      />
                    ))}
                {/*
          <Pagination
            className="d-flex justify-content-center"
            paginationLabel="pagination navigation"
            pageCount={20}
            onPageSelect={() => console.log('page selected')}
          /> */}
              </div>
              {/* <AdCard /> */}
            </div>
          )}
      </main>
    </>
  );
};
export default InProgress;
