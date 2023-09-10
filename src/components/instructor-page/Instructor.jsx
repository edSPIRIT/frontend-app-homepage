/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Skeleton } from '@edx/paragon';
import { ArrowForward } from '@edx/paragon/icons';
import { useHistory, useParams } from 'react-router-dom';

import { FormattedMessage } from '@edx/frontend-platform/i18n';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getConfig } from '@edx/frontend-platform';
import useGetInstructor from '../../hooks/useGetInstructor';
import CourseCard from '../shared/course-card/CourseCard';
import CourseCardSkeleton from '../shared/skeleton/CourseCardSkeleton';
import InstructorHeader from './instructor/InstructorHeader';
import {
  resetSearchFilters,
  setSearchInstructors,
} from '../../redux/slice/searchQuerySlice';
import useGetInstructorPopularCourses from '../../hooks/useGetInstructorPopularCourses';

const Instructor = () => {
  const { slug } = useParams();
  const { InstructorData, loading } = useGetInstructor(slug);
  const history = useHistory();
  const dispatch = useDispatch();
  const { instructorPopularCourses, loading: instructorPopularCoursesLoading } = useGetInstructorPopularCourses(slug);

  useEffect(() => {
    if (InstructorData?.name) {
      document.title = `${InstructorData?.name} | ${getConfig().SITE_NAME}`;
    }
  }, [InstructorData]);

  return (
    <>
      <InstructorHeader InstructorData={InstructorData} loading={loading} />
      <div className="custom-container d-flex flex-column pb-5">
        <h2 className="d-flex popular-courses-wrapper">
          <span className="ml-2">
            <FormattedMessage
              id="popularCourses.firstPartTitle.text"
              defaultMessage="Popular"
            />
          </span>
          <span className="highlighted ml-2">
            <FormattedMessage
              id="popularCourses.secondPartTitle.text"
              defaultMessage="Courses"
            />
          </span>
        </h2>
        <div className="course-container mb-4">
          {instructorPopularCoursesLoading
            ? Array(4)
              .fill(1)
              .map((item, i) => (
                // eslint-disable-next-line react/no-array-index-key
                <CourseCardSkeleton key={i} />
              ))
            : instructorPopularCourses?.map((course) => (
              <CourseCard course={course} key={course.slug} />
            ))}
        </div>
        <div className="d-flex justify-content-center">
          {loading ? (
            <Skeleton
              width={276}
              height={44}
              className="view-all-courses-btn"
            />
          ) : (
            <Button
              className="view-all-courses-btn"
              iconAfter={ArrowForward}
              onClick={() => {
                dispatch(resetSearchFilters());
                dispatch(setSearchInstructors([InstructorData?.name]));
                history.push('/search');
              }}
            >
              <FormattedMessage
                id="viewAllCourses.button"
                defaultMessage="View All Courses"
              />
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default Instructor;
