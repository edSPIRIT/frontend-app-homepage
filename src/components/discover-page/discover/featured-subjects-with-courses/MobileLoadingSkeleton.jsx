import { Skeleton } from '@edx/paragon';
import React from 'react';
import ScrollableCourses from '../../../shared/scrollable-courses-component/ScrollableCourses';

const MobileLoadingSkeleton = () => (
  <div className="pt-4">
    <Skeleton width="40%" height={40} />
    <div className="d-flex flex-column pt-4">
      <ScrollableCourses courses={[]} loading />
      <div className="pt-4 w-100">
        <Skeleton width="100%" height={44} />
      </div>
    </div>
  </div>
);

export default MobileLoadingSkeleton;
