import { Skeleton } from '@edx/paragon';

const MobileInstructorsSkeleton = () => (
  <div className="d-flex flex-column w-100 instructor-wrapper">
    <div className="d-flex">
      <Skeleton className="mr-4" width={80} height={80} />
      <div className="d-flex flex-column w-100 ">
        <Skeleton height={24} width="40%" />
        <Skeleton height={24} width="60%" className="mb-1" />
      </div>
    </div>
    <Skeleton count={2} height={24} />
    <div className="skeleton-icon-wrapper mt-2">
      <Skeleton height={24} />
      <Skeleton height={24} />
    </div>
  </div>
);

export default MobileInstructorsSkeleton;
