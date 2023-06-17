/* eslint-disable react/prop-types */
import React from 'react';
import { Button, useMediaQuery } from '@edx/paragon';
import { FormattedMessage } from '@edx/frontend-platform/i18n';
import { ArrowForward } from '@edx/paragon/icons';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import ScrollableExplorerCourses from '../../home-page/top-recent-courses/explorer-courses/ScrollableExplorerCourses';
import CourseCardNew from '../../shared/course-card/CourseCardNew';
import MobileLoadingSkeleton from './featured-subjects-with-courses/MobileLoadingSkeleton';
import DesktopLoadingSkeleton from './featured-subjects-with-courses/DesktopLoadingSkeleton';
import { resetSearchFilters, setSearchSubject } from '../../../redux/slice/searchQuerySlice';

const FeaturedSubjectsWithCourses = ({
  featuredSubjectsWithCourses,
  loading,
  isFetching,
}) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const isMobile = useMediaQuery({ maxWidth: '1350px' });
  return (
    <div className="custom-container subjects-courses-wrapper pb-4.5">
      {featuredSubjectsWithCourses?.map((subject) => {
        if (subject?.some_of_its_courses.length === 0) {
          return null;
        }
        return (
          <div key={subject.slug}>
            <div className="d-flex justify-content-between pb-4 pt-5">
              <h2>{subject.title}</h2>
              <Button
                variant="outline-primary"
                iconAfter={ArrowForward}
                className="view-all-btn"
                onClick={() => {
                  dispatch(resetSearchFilters());
                  dispatch(setSearchSubject([subject.title]));
                  history.push('/search');
                }}
              >
                <FormattedMessage id="viewAll.text" defaultMessage="View All" />
              </Button>
            </div>

            {isMobile ? (
              <div className="d-flex flex-column">
                <ScrollableExplorerCourses
                  courses={subject?.some_of_its_courses}
                  loading={loading}
                />
                <div className="d-flex justify-content-center pt-4">
                  <Button
                    className="view-all-courses-btn "
                    iconAfter={ArrowForward}
                    onClick={() => history.push('/discover')}
                  >
                    <FormattedMessage
                      id="viewAll.text"
                      defaultMessage="View All"
                    />
                  </Button>
                </div>
              </div>
            ) : (
              <div className="course-container">
                {subject?.some_of_its_courses?.map((course) => (
                  <CourseCardNew course={course} key={course.course_slug} />
                ))}
              </div>
            )}
          </div>
        );
      })}
      {isFetching
        && (isMobile ? <MobileLoadingSkeleton /> : <DesktopLoadingSkeleton />)}
    </div>
  );
};

export default FeaturedSubjectsWithCourses;
