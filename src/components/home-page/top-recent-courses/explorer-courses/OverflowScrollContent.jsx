/* eslint-disable react/prop-types */
import { OverflowScroll, OverflowScrollContext } from '@edx/paragon';
import React, { useContext } from 'react';
import CourseCardNew from '../../../shared/course-card/CourseCardNew';
import CourseCardSkeleton from '../../../shared/skeleton/CourseCardSkeleton';

const OverflowScrollContent = ({ courses, loading }) => {
  const { setOverflowRef } = useContext(OverflowScrollContext);
  return (
    <div
      ref={setOverflowRef}
      className="d-flex"
    >
      <OverflowScroll.Items>
        <div className="d-flex scroll-wrapper">
          {/* TO DO: Do not use Array index in keys */}
          {loading
            ? Array(4)
              .fill(1)
              .map((item, i) => (
              // eslint-disable-next-line react/no-array-index-key
                <CourseCardSkeleton key={i} />
              ))
            : courses?.map((course) => (
              <CourseCardNew
                course={course}
                key={course.course_slug}
              />
            ))}
        </div>
      </OverflowScroll.Items>
    </div>
  );
};

export default OverflowScrollContent;
