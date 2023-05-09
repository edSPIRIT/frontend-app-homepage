/* eslint-disable no-nested-ternary */
import { useMediaQuery } from '@edx/paragon';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import useGetEnrollmentList from '../../hooks/useGetEnrollmentList';
import NotEnrolledCardCourse from '../overview-page/not-enrolled-course-card/NotEnrolledCourseCard';
import NavHeader from '../shared/header/nav-header/NavHeader';
import UserCourseCard from '../shared/user-courses/UserCourseCard';
import UserCourseCardSkeleton from '../shared/user-courses/UserCourseCardSkeleton';
import TotalCourseWrapper from '../shared/total-course-wrapper/TotalCourseWrapper';
import messages from '../../messages';

const Completed = ({ intl }) => {
  const { userCompletedCourses, loading } = useGetEnrollmentList();
  const isMobile = useMediaQuery({ maxWidth: '768px' });

  return (
    <>
      {isMobile && <NavHeader />}
      <main>
        <div className="d-flex custom-container py-5 flex-column">
          {loading ? (
            Array(4)
              .fill(1)
              .map((item, i) => (
                // eslint-disable-next-line react/no-array-index-key
                <UserCourseCardSkeleton key={i} />
              ))
          ) : userCompletedCourses?.length === 0 ? (
            <div className="w-100">
              <NotEnrolledCardCourse
                title={intl.formatMessage(
                  messages['completed.notEnroll.title'],
                )}
                description={intl.formatMessage(
                  messages['completed.notEnroll.description'],
                )}
              />
            </div>
          ) : (
            <div className="w-100">
              <TotalCourseWrapper
                coursesCount={userCompletedCourses?.length}
                loading={loading}
              />
              {loading
                ? Array(4)
                  .fill(1)
                  .map((item, i) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <UserCourseCardSkeleton key={i} />
                  ))
                : userCompletedCourses?.map((courseInfo) => (
                  <UserCourseCard
                    courseInfo={courseInfo}
                    key={courseInfo?.course_details?.course_id}
                  />
                ))}
            </div>
          )}
          {/* <AdCard /> */}
        </div>
      </main>
    </>
  );
};
Completed.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(Completed);
