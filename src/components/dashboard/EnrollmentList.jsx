/* eslint-disable react/prop-types */
/* eslint-disable no-nested-ternary */
import { useContext, useEffect, useState } from 'react';
import { Pagination, useMediaQuery } from '@edx/paragon';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import { AppContext } from '@edx/frontend-platform/react';
import { getConfig } from '@edx/frontend-platform';
import useGetEnrollmentList from '../../hooks/useGetEnrollmentList';
import messages from '../../messages';
import NavHeader from '../shared/header-component/Header/DesktopHeader/NavHeader';
import NotEnrolledCardCourse from './OverviewPage/NotEnrolledCardCourse/NotEnrolledCourseCard';
import TotalCourseWrapper from './EnrollmentList/TotalCourseWrapper';
import UserCourseCardSkeleton from '../shared/user-courses/UserCourseCardSkeleton';
import UserCourseCard from '../shared/user-courses/UserCourseCard';
import LogInFirst from './OverviewPage/LogInFirst';
import AccountActivationAlert from '../shared/activate-account-component/AccountActivationAlert';

const EnrollmentList = ({ type, intl }) => {
  const { authenticatedUser } = useContext(AppContext);
  const [page, setPage] = useState(1);
  const { loading, userCourses, courseCount } = useGetEnrollmentList(
    type,
    page,
  );
  const isMobile = useMediaQuery({ maxWidth: '768px' });

  const notEnrollTitle = type === 'completed'
    ? messages['completed.notEnroll.title']
    : messages['inProgress.notEnroll.title'];

  const notEnrollDescription = type === 'completed'
    ? messages['completed.notEnroll.description']
    : messages['inProgress.notEnroll.description'];

  useEffect(() => {
    setPage(1);
  }, [type]);

  useEffect(() => {
    document.title = `Dashboard | ${getConfig().SITE_NAME}`;
  }, []);

  if (!authenticatedUser) {
    return <LogInFirst />;
  }
  return (
    <>
      {isMobile && <NavHeader />}
      <div className="d-flex custom-container py-5 flex-column">
        <AccountActivationAlert />
        {loading ? (
          Array(4)
            .fill(1)
            .map((item, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <UserCourseCardSkeleton key={i} />
            ))
        ) : courseCount === 0 ? (
          <NotEnrolledCardCourse
            title={intl.formatMessage(notEnrollTitle)}
            description={intl.formatMessage(notEnrollDescription)}
          />
        ) : (
          <div className="d-flex ">
            <div className="w-100">
              <TotalCourseWrapper
                coursesCount={courseCount}
                loading={loading}
              />
              {loading
                ? Array(4)
                  .fill(1)
                  .map((item, i) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <UserCourseCardSkeleton key={i} />
                  ))
                : userCourses?.map((courseInfo) => (
                  <UserCourseCard
                    courseInfo={courseInfo}
                    key={courseInfo?.course_details?.course_id}
                  />
                ))}
              <div className="pb-5.5 pt-4.5">
                {courseCount > 12 && (
                  <Pagination
                    className="d-flex justify-content-center transform-rtl"
                    paginationLabel="pagination navigation"
                    pageCount={Math.ceil(courseCount / 12)}
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
                      page: `${intl.formatMessage(
                        messages['pagination.page.text'],
                      )}`,
                      currentPage: `${intl.formatMessage(
                        messages['pagination.currentPage.text'],
                      )}`,
                      pageOfCount: `${intl.formatMessage(
                        messages['pagination.of.text'],
                      )}`,
                    }}
                  />
                )}
              </div>
            </div>
            {/* <AdCard /> */}
          </div>
        )}
      </div>
    </>
  );
};

EnrollmentList.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(EnrollmentList);
