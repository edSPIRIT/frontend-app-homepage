/* eslint-disable no-nested-ternary */
import { Skeleton, useMediaQuery } from '@edx/paragon';
import {
  FormattedMessage,
  injectIntl,
  intlShape,
} from '@edx/frontend-platform/i18n';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { useEffect } from 'react';
import UserCourseCard from '../../shared/user-courses/UserCourseCard';
import AvatarInfo from './avatar-info/AvatarInfo';
import NotEnrolledCardCourse from './not-enrolled-course-card/NotEnrolledCourseCard';
import UserCourseCardSkeleton from '../../shared/user-courses/UserCourseCardSkeleton';
import SimilarCourses from '../../shared/similar-courses/SimilarCourses';
import NavHeader from '../../shared/header/nav-header/NavHeader';
import messages from '../../../messages';
import useGetOverviewList from '../../../hooks/useGetOverviewList';

const OverviewPage = ({ intl }) => {
  const {
    loading,
    userCourseTitles,
    userCourseIds,
    recentUserCourses,
    courseCount,
  } = useGetOverviewList();

  const isMobile = useMediaQuery({ maxWidth: '768px' });
  const { pathname } = useLocation();
  useEffect(() => {
    if (pathname === '/overview') {
      document.title = 'Overview';
    }
  }, [pathname, intl]);
  return (
    <>
      {isMobile && <NavHeader />}
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
          ) : courseCount === 0 ? (
            <NotEnrolledCardCourse
              title={intl.formatMessage(
                messages['inProgress.notEnroll.title'],
              )}
              description={intl.formatMessage(
                messages['overview.notEnroll.description'],
              )}
            />
          ) : (
            <div className="overview-courses-wrapper">
              <h3 className="recent-title mb-4 mt-5.5">
                <FormattedMessage
                  id="overview.recentActivity.text"
                  defaultMessage="Recent Activity"
                />
              </h3>
              {recentUserCourses?.map((courseInfo) => (
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
        {userCourseTitles && (
        <SimilarCourses
          courseTitles={userCourseTitles}
          courseIds={userCourseIds}
          loading={loading}
        />
        )}
      </div>
    </>
  );
};

OverviewPage.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(OverviewPage);
