import { Skeleton } from '@edx/paragon';

const PartnerInstructorSkeleton = () => (
  <div className="instructor-wrapper d-flex ">
    <Skeleton className="mr-4" width={88} height={88} />
    <div className="d-flex flex-column w-100 ">
      <Skeleton height={24} width="40%" />
      <Skeleton height={24} width="60%" className="mb-1" />
      <Skeleton count={2} height={24} />
      <div className="skeleton-icon-wrapper mt-2">
        <Skeleton height={24} />
        <Skeleton height={24} />
      </div>
    </div>
  </div>
);

export default PartnerInstructorSkeleton;
