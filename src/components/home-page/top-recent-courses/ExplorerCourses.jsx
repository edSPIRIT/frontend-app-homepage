import {
  Button, Tab, Tabs, useMediaQuery,
} from '@edx/paragon';
import { useState } from 'react';
import { ArrowForward } from '@edx/paragon/icons';
import { useHistory } from 'react-router';
import useGetTopRecentCourses from '../../../hooks/useGetTopRecentCourses';
import CourseCardNew from '../../shared/course-card/CourseCardNew';
import CourseCardSkeleton from '../../shared/skeleton/CourseCardSkeleton';
import ScrollableExplorerCourses from './explorer-courses/ScrollableExplorerCourses';

const ExplorerCourses = () => {
  const [key, setKey] = useState('home');
  const { recentCourses, topCourses, loading } = useGetTopRecentCourses();
  const isMobile = useMediaQuery({ maxWidth: '1024px' });
  const history = useHistory();

  return (
    <section id="explore-courses" className="explore-courses-container">
      <div className="custom-container d-flex flex-column explore-course-wrapper">
        <h2 className="d-flex explorer-title mb-4">
          Explore<span className="highlighted ml-2">Courses</span>
        </h2>
        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
        >
          <Tab eventKey="home" title="Top Courses">
            {isMobile ? (
              <ScrollableExplorerCourses />
            ) : (
              <div className="course-container">
                {/* TO DO: Do not use Array index in keys */}
                {loading
                  ? Array(4)
                    .fill(1)
                    .map((item, i) => (
                      // eslint-disable-next-line react/no-array-index-key
                      <CourseCardSkeleton key={i} />
                    ))
                  : topCourses?.map((course) => (
                    <CourseCardNew
                      course={course}
                      key={course.course_slug}
                    />
                  ))}
              </div>
            )}
          </Tab>
          <Tab eventKey="profile" title="Recently Added">
            {isMobile ? (
              <ScrollableExplorerCourses />
            ) : (
              <div className="course-container">
                {recentCourses?.map((course) => (
                  <CourseCardNew course={course} key={course.course_slug} />
                ))}
              </div>
            )}
          </Tab>
        </Tabs>
        <div className="d-flex justify-content-center">
          <Button
            className="view-all-courses-btn mt-5"
            iconAfter={ArrowForward}
            onClick={() => history.push('/search')}
          >
            View all courses
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ExplorerCourses;
