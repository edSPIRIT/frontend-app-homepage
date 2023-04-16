import { Skeleton } from '@edx/paragon';
import React from 'react';

const InstructorSkeleton = () => (
  <div className="d-flex w-100 skeleton-container">
    <Skeleton height={256} width={256} className="mr-6 img" />
    <div className="w-100">
      <Skeleton height={24} width="40%" className="mb-1" />
      <Skeleton height={24} width="45%" className="mb-3" />
      <Skeleton count={4} height={28} width="100%" className="" />
      <div className="d-flex justify-content-between mt-4 social-instructor-container">
        <div className="d-flex ">
          <Skeleton height={24} width={150} className="mr-4" />
          <Skeleton height={24} width={150} className="" />
        </div>
        <div className="d-flex social-icon-skeleton-wrapper">
          <Skeleton
            count={4}
            height={24}
            width={24}
            className="social-icon-skeleton mr-2"
          />
        </div>
      </div>
    </div>
  </div>
);

export default InstructorSkeleton;
