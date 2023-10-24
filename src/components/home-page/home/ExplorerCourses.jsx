import { Button, Tab, Tabs } from '@edx/paragon';
import { Suspense, lazy, useState } from 'react';
import { ArrowForward } from '@edx/paragon/icons';
import { useHistory } from 'react-router';
import {
  FormattedMessage,
  injectIntl,
  intlShape,
} from '@edx/frontend-platform/i18n';
import { useDispatch } from 'react-redux';
import messages from '../../../messages';
import { resetSearchFilters } from '../../../redux/slice/searchQuerySlice';
import Loading from '../../shared/loading/Loading';

const CourseContainer = lazy(() => import('./TopPrograms/ExplorerCourses/CourseContainer'));
const ExplorerCourses = ({ intl }) => {
  const [key, setKey] = useState('top-courses');
  const history = useHistory();
  const dispatch = useDispatch();
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
            <CourseContainer courseType="popular" />
          </Tab>
          <Tab
            eventKey="recently-added"
            title={intl.formatMessage(messages['homePage.tab.recentlyAdded'])}
          >
            <Suspense fallback={<Loading />}>
              <CourseContainer courseType="recent" />
            </Suspense>
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
