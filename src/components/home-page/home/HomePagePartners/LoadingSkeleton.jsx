import { Skeleton } from '@edx/paragon';

const LoadingSkeleton = () => (
  <section id="partners" className="partners-container">
    <div className="custom-container  d-flex justify-content-center flex-column align-items-center w-100">
      <Skeleton className="mr-4 mb-3.5" width={150} height={40} />
      <div className="w-100 mb-5">
        <Skeleton className="mr-4" width="100%" height={32} />
      </div>
      <div className="d-flex flex-row w-100">
        {Array(5)
          .fill(1)
          .map((item, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <div className="w-100 h-100 partner-logo-skeleton-wrapper" key={i}>
              <Skeleton className="mr-4 partner-logo-skeleton" />
            </div>
          ))}
      </div>
    </div>
  </section>
);

export default LoadingSkeleton;
