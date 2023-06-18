import { Skeleton } from '@edx/paragon';

const FeaturedSubjectsSkeleton = () => (
  <div className="d-flex flex-column bg-light-200 align-items-center p-2 ">
    <Skeleton circle className="mr-1 mt-0" width={54} height={54} />
    <div className="w-100">
      <Skeleton width="100%" height={40} />
    </div>
  </div>
);

export default FeaturedSubjectsSkeleton;
