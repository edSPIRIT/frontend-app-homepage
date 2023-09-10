import { Skeleton } from '@edx/paragon';
import React from 'react';
import CourseCardSkeleton from '../../../shared/skeleton/CourseCardSkeleton';

const DesktopLoadingSkeleton = () => (
  <div className="pt-4">
    <div className="d-flex justify-content-between w-100">
      <Skeleton width={300} height={36} />
      <Skeleton width={80} height={36} />
    </div>
    <div className="course-container mt-4.5">
      {Array.from({ length: 4 }).map((_, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <CourseCardSkeleton key={index} />
      ))}
    </div>
  </div>
);

export default DesktopLoadingSkeleton;
