import {
  Button, Tab, Tabs, useMediaQuery,
} from '@edx/paragon';
import { lazy, useState } from 'react';
import { ArrowForward } from '@edx/paragon/icons';
import { useHistory } from 'react-router';
import {
  FormattedMessage,
  injectIntl,
  intlShape,
} from '@edx/frontend-platform/i18n';
import { useDispatch } from 'react-redux';
import useGetTopRecentCourses from '../../../hooks/useGetTopRecentCourses';
import CourseCard from '../../shared/course-card/CourseCard';
import CourseCardSkeleton from '../../shared/skeleton/CourseCardSkeleton';
import messages from '../../../messages';
import { resetSearchFilters } from '../../../redux/slice/searchQuerySlice';

const ScrollableCourses = lazy(() => import(
  '../../shared/scrollable-courses-component-discovery-api/ScrollableCourses'
));
const EmptyStateCourses = lazy(() => import(
  './ExplorerCourses/EmptyStateCourses'
));

const ExplorerCourses = ({ intl }) => {
  const [key, setKey] = useState('top-courses');
  const { topRecentCourses: topCourses, loading: topCoursesLoading } = useGetTopRecentCourses('popular');
  const { topRecentCourses: recentCourses, loading: recentCoursesLoading } = useGetTopRecentCourses('recent');
  const isMobile = useMediaQuery({ maxWidth: '1024px' });
  const history = useHistory();
  const dispatch = useDispatch();
  const renderCourseCards = (courses) => (
    <div className="course-container">
      {courses.map((course) => (
        <CourseCard
          course={course?.data?.course_metadata}
          key={course?.data?.id}
        />
      ))}
    </div>
  );
  const renderCourseContent = (courses) => {
    if (topCoursesLoading && recentCoursesLoading) {
      return (
        <div className="course-container">
          {Array(4)
            .fill(1)
            .map((_, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <CourseCardSkeleton key={i} />
            ))}
        </div>
      );
    }
    if (courses.length === 0) {
      return <EmptyStateCourses />;
    }
    if (isMobile) {
      return (
        <ScrollableCourses
          courses={courses}
          loading={topCoursesLoading && recentCoursesLoading}
        />
      );
    }
    return renderCourseCards(courses);
  };
  return (
    <section id="explore-courses" className="explore-courses-container">
      <div className="custom-container d-flex flex-column explore-course-wrapper">
        <h2 className="d-flex explorer-title mb-4">
          <span className="ml-2">
            <FormattedMessage
              id="homePage.explore.text"
              defaultMessage="Explore"
            />
          </span>
          <span className="highlighted ml-2">
            <FormattedMessage
              id="homePage.courses.text"
              defaultMessage="Courses"
            />
          </span>
        </h2>
        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
        >
          <Tab
            eventKey="top-courses"
            title={intl.formatMessage(messages['homePage.tab.topCourses'])}
          >
            {renderCourseContent(topCourses)}
          </Tab>
          <Tab
            eventKey="recently-added"
            title={intl.formatMessage(messages['homePage.tab.recentlyAdded'])}
          >
            {renderCourseContent(recentCourses)}
          </Tab>
        </Tabs>
        <div className="d-flex justify-content-center">
          <Button
            className="view-all-courses-btn mt-5"
            iconAfter={ArrowForward}
            onClick={() => {
              dispatch(resetSearchFilters());
              history.push('/search');
            }}
          >
            <FormattedMessage
              id="viewAllCourses.button"
              defaultMessage="View All Courses"
            />
          </Button>
        </div>
      </div>
    </section>
  );
};

ExplorerCourses.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(ExplorerCourses);
