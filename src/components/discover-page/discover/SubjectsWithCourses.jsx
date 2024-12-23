/* eslint-disable react/prop-types */
import React from 'react';
import { Button, useMediaQuery } from '@edx/paragon';
import { FormattedMessage } from '@edx/frontend-platform/i18n';
import { ArrowForward } from '@edx/paragon/icons';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import CourseCard from '../../shared/course-card/CourseCard';
import MobileLoadingSkeleton from './SubjectsWithCourses/MobileLoadingSkeleton';
import DesktopLoadingSkeleton from './SubjectsWithCourses/DesktopLoadingSkeleton';
import {
  resetSearchFilters,
  setSearchSubject,
} from '../../../redux/slice/searchQuerySlice';
import ScrollableCourses from '../../shared/scrollable-courses-component/ScrollableCourses';
import { capitalizeFirstLetter } from '../../../utils/capitalizeFirstLetter';
import EmptyStateCourses from '../../home-page/home/ExplorerCourses/EmptyStateCourses';

const SubjectsWithCourses = ({
  featuredSubjectsWithCourses,
  loading,
  isFetching,
}) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const isMobile = useMediaQuery({ maxWidth: '1350px' });

  const handleClick = (subject) => {
    dispatch(resetSearchFilters());
    dispatch(setSearchSubject([subject.title]));
    history.push('/search');
  };
  return (
    <div className="custom-container subjects-courses-wrapper pb-4.5">
      {featuredSubjectsWithCourses?.map((subject) => {
        if (subject?.some_of_its_courses?.length === 0) {
          return null;
        }
        return (
          <div key={subject.slug}>
            <div className="d-flex justify-content-between pb-4 pt-5">
              <h2>{capitalizeFirstLetter(subject.title)}</h2>
              { subject?.some_of_its_courses?.length >= 4 && (
              <Button
                variant="outline-primary"
                iconAfter={ArrowForward}
                className="view-all-btn"
                onClick={() => handleClick(subject)}
              >
                <FormattedMessage id="viewAll.text" defaultMessage="View All" />
              </Button>
              )}
            </div>

            {isMobile ? (
              <div className="d-flex flex-column">
                <ScrollableCourses
                  courses={subject?.some_of_its_courses}
                  loading={loading}
                />
                { subject?.some_of_its_courses?.length > 1 && (
                <div className="d-flex justify-content-center pt-4">
                  <Button
                    className="view-all-courses-btn "
                    iconAfter={ArrowForward}
                    onClick={() => handleClick(subject)}
                  >
                    <FormattedMessage
                      id="viewAll.text"
                      defaultMessage="View All"
                    />
                  </Button>
                </div>
                )}
              </div>
            ) : (
              <div className="course-container">
                {subject?.some_of_its_courses?.map((course) => (
                  <CourseCard course={course} key={course.course_slug} />
                ))}
              </div>
            )}
          </div>
        );
      })}
      {isFetching
        && (isMobile ? <MobileLoadingSkeleton /> : <DesktopLoadingSkeleton />)}
      {(!featuredSubjectsWithCourses
        || featuredSubjectsWithCourses.length === 0)
      && !isFetching ? (
        <div className="custom-container mt-6">
          <h2 className="mb-4">
            <FormattedMessage id="subjectTitle.text" defaultMessage="Subject" />
          </h2>
          <div className="mb-5">
            <EmptyStateCourses />
          </div>
        </div>
        ) : null}
    </div>
  );
};

export default SubjectsWithCourses;
