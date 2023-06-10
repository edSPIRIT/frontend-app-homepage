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
              {/* <div className="pb-5.5 pt-4.5">
                { 1 && (
                <Pagination
                  className="d-flex justify-content-center transform-rtl"
                  paginationLabel="pagination navigation"
                  pageCount={Math.ceil(userInprogressCourses?.count / 12)}
                  onPageSelect={(e) => setPage(e)}
                  currentPage={page}
                  variant={isMobile ? 'reduced' : 'default'}
                  buttonLabels={{
                    previous: `${intl.formatMessage(
                      messages['pagination.previous.button'],
                    )}`,
                    next: `${intl.formatMessage(
                      messages['pagination.next.button'],
                    )}`,
                    page: `${intl.formatMessage(messages['pagination.page.text'])}`,
                    currentPage: `${intl.formatMessage(
                      messages['pagination.currentPage.text'],
                    )}`,
                    pageOfCount: `${intl.formatMessage(
                      messages['pagination.of.text'],
                    )}`,
                  }}
                />
                )}
              </div> */}
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
