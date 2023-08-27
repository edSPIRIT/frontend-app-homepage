/* eslint-disable react/prop-types */
import { Skeleton } from '@edx/paragon';
import React from 'react';

const CourseSideBarSkeleton = () => (
  <div className="d-flex flex-column skeleton-wrapper">
    <Skeleton className="mb-2" height={204} />
    <div className="skeleton-logo" />
    <div className="p-4 bg-white">
      <Skeleton className="mb-1" width="60%" height={24} />
      <Skeleton className="mb-3.5" width="60%" height={24} />
      <Skeleton height={24} />
      <Skeleton count={3} height={24} />
      <Skeleton className="mt-4.5" borderRadius={4} height={44} />
      <div className="mt-2 px-5">
        <Skeleton width="100%" height={24} />
      </div>
    </div>
  </div>
);

export default CourseSideBarSkeleton;
