import { Skeleton } from '@edx/paragon';

const FeaturedSubjectsSkeleton = () => (
  <div className="custom-container pt-5 explore-container">
    <Skeleton className="" width="20%" height={40} />
    <div className="subjects-container pt-4">
      { Array(10)
        .fill(1)
        .map((_, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <div className="d-flex flex-column bg-light-200 align-items-center p-2 " key={i}>
            <Skeleton className="mr-1 mt-0" width={54} height={54} />
            <div className="w-100">
              <Skeleton width="100%" height={40} />
            </div>
          </div>
        ))}
    </div>
  </div>
);

export default FeaturedSubjectsSkeleton;
