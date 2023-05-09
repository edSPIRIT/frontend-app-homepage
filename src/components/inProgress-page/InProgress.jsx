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

const InProgress = ({ intl }) => {
  const { loading, userInprogressCourses } = useGetEnrollmentList();
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
        ) : userInprogressCourses?.length === 0 ? (
          <NotEnrolledCardCourse
            title={intl.formatMessage(messages['inProgress.notEnroll.title'])}
            description={intl.formatMessage(
              messages['inProgress.notEnroll.description'],
            )}
          />
        ) : (
          <div className="d-flex ">
            <div className="w-100">
              <TotalCourseWrapper
                coursesCount={userInprogressCourses?.length}
                loading={loading}
              />
              {loading
                ? Array(4)
                  .fill(1)
                  .map((item, i) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <UserCourseCardSkeleton key={i} />
                  ))
                : userInprogressCourses?.map((courseInfo) => (
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

InProgress.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(InProgress);
