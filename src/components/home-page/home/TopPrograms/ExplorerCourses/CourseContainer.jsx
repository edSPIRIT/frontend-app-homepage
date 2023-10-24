import { useMediaQuery } from '@edx/paragon';
import React, { lazy } from 'react';
import useGetTopRecentCourses from '../../../../../hooks/useGetTopRecentCourses';
import CourseCard from '../../../../shared/course-card/CourseCard';
import CourseCardSkeleton from '../../../../shared/skeleton/CourseCardSkeleton';

const ScrollableCourses = lazy(() => import(
  '../../../../shared/scrollable-courses-component-discovery-api/ScrollableCourses'
));
const EmptyStateCourses = lazy(() => import('../../ExplorerCourses/EmptyStateCourses'));

const CourseContainer = ({ courseType }) => {
  const isMobile = useMediaQuery({ maxWidth: '1024px' });
  const { topRecentCourses, loading } = useGetTopRecentCourses(courseType);

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
    if (loading) {
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
      return <ScrollableCourses courses={courses} loading={loading} />;
    }
    return renderCourseCards(courses);
  };

  return renderCourseContent(topRecentCourses);
};

export default CourseContainer;
