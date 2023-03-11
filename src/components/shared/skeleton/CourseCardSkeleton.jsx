import { Skeleton } from '@edx/paragon';

const CourseCardSkeleton = () => (
  <div className="d-flex flex-column skeleton-wrapper">
    <Skeleton className="mb-2" height={92} />
    <div className="skeleton-logo" />
    <div className="p-4">
      <Skeleton className="mb-2" width="60%" height={24} />
      <Skeleton count={3} height={24} />
      <Skeleton className="mt-2" width="60%" height={24} />
      <Skeleton className="mt-3" borderRadius={4} height={44} />
    </div>
  </div>
);

export default CourseCardSkeleton;
