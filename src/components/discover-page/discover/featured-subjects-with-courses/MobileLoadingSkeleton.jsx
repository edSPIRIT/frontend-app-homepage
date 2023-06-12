import { Skeleton } from '@edx/paragon';
import React from 'react';
import ScrollableExplorerCourses from '../../../home-page/top-recent-courses/explorer-courses/ScrollableExplorerCourses';

const MobileLoadingSkeleton = () => (
  <div className="pt-4">
    <Skeleton width="40%" height={40} />
    <div className="d-flex flex-column pt-4">
      <ScrollableExplorerCourses courses={[]} loading />
      <div className="pt-4 w-100">
        <Skeleton width="100%" height={44} />
      </div>
    </div>
  </div>
);

export default MobileLoadingSkeleton;
