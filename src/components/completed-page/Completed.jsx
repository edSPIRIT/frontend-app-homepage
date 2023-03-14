/* eslint-disable no-nested-ternary */
import useGetEnrollmentList from '../../hooks/useGetEnrollmentList';
import NotEnrolledCardCourse from '../overview-page/not-enrolled-course-card/NotEnrolledCourseCard';
import HorizontalCard from '../shared/horizontal-card/HorizontalCard';
import HorizontalCardSkeleton from '../shared/horizontal-card/HorizontalCardSkeleton';
import TotalCourseWrapper from '../shared/total-course-wrapper/TotalCourseWrapper';

const Completed = () => {
  const { coursesEnrollment, loading } = useGetEnrollmentList();

  return (
    <main>
      <div className="d-flex custom-container py-5 flex-column">
        {loading ? (
          Array(4)
            .fill(1)
            .map((item, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <HorizontalCardSkeleton key={i} />
            ))
        ) : coursesEnrollment?.filter(
          (courseInfo) => courseInfo?.progress?.complete_count > 0
              && courseInfo?.progress?.incomplete_count === 0,
        )?.length === 0 ? (
          <div className="w-100">
            <NotEnrolledCardCourse />
          </div>
          ) : (
            <div className="w-100">
              <TotalCourseWrapper
                coursesCount={
                coursesEnrollment?.filter(
                  (courseInfo) => courseInfo?.progress?.complete_count > 0
                    && courseInfo?.progress?.incomplete_count === 0,
                )?.length
              }
                loading={loading}
              />
              {loading
                ? Array(4)
                  .fill(1)
                  .map((item, i) => (
                  // eslint-disable-next-line react/no-array-index-key
                    <HorizontalCardSkeleton key={i} />
                  ))
                : coursesEnrollment
                  ?.filter(
                    (courseInfo) => courseInfo?.progress?.complete_count > 0
                      && courseInfo?.progress?.incomplete_count === 0,
                  )
                  ?.map((courseInfo) => (
                    <HorizontalCard
                      courseInfo={courseInfo}
                      key={courseInfo?.course_details?.course_id}
                    />
                  ))}
            </div>
          )}
        {/* <AdCard /> */}
      </div>
    </main>
  );
};
export default Completed;
