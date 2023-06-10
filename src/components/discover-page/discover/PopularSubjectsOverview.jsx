import React from 'react';
import { Button, useMediaQuery } from '@edx/paragon';
import { FormattedMessage } from '@edx/frontend-platform/i18n';
import { ArrowForward } from '@edx/paragon/icons';
import { useHistory } from 'react-router';
import { POPULAR_SUBJECTS } from '../../../utils/constants';
import ScrollableExplorerCourses from '../../home-page/top-recent-courses/explorer-courses/ScrollableExplorerCourses';
import CourseCardNew from '../../shared/course-card/CourseCardNew';

const PopularSubjectsOverview = () => {
  const history = useHistory();
  const isMobile = useMediaQuery({ maxWidth: '1350px' });

  return (
    <div className="custom-container subjects-courses-wrapper pb-4.5">
      {POPULAR_SUBJECTS?.map((subject) => (
        <>
          <div className="d-flex justify-content-between pb-4 pt-5">
            <h2>{subject.title}</h2>
            <Button
              variant="outline-primary"
              iconAfter={ArrowForward}
              className="view-all-btn"
              onClick={() => history.push('/search')}
            >
              <FormattedMessage id="viewAll.text" defaultMessage="View All" />
            </Button>
          </div>
          {isMobile ? (
            <div className="d-flex flex-column">
              <ScrollableExplorerCourses
                courses={subject.courses}
                loading={false}
              />
              <div className="d-flex justify-content-center pt-4">
                <Button
                  className="view-all-courses-btn "
                  iconAfter={ArrowForward}
                  onClick={() => history.push('/discover')}
                >
                  <FormattedMessage id="viewAll.text" defaultMessage="View All" />
                </Button>
              </div>
            </div>
          ) : (
            <div className="course-container">
              {subject.courses?.map((course) => (
                <CourseCardNew course={course} key={course.course_slug} />
              ))}
            </div>
          )}
        </>
      ))}
    </div>
  );
};

export default PopularSubjectsOverview;
