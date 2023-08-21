/* eslint-disable react/prop-types */
import { FormattedMessage } from '@edx/frontend-platform/i18n';
import { Skeleton } from '@edx/paragon';
import MobileInstructorsSkeleton from './mobile-instructors/MobileInstructorsSkeleton';
import MobileInstructor from './mobile-instructors/MobileInstructor';

const MobileInstructors = ({ partnerInstructors, loading, isFetching }) => {
  if (loading) {
    return (
      <div className="custom-container mb-5.5" id="instructors">
        <h2 className="popular-courses-wrapper">
          <Skeleton className="mr-4" width={200} height={44} />
        </h2>
        <div className="instructors-wrapper">
          {Array(4)
            .fill(1)
            .map((_, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <MobileInstructorsSkeleton key={i} />
            ))}
        </div>
      </div>
    );
  }
  if (!partnerInstructors.length) {
    return null;
  }
  return (
    <div className="custom-container mb-5.5" id="instructors">
      <h2 className="popular-courses-wrapper">
        <FormattedMessage id="instructors.text" defaultMessage="Instructors" />
      </h2>
      <div className="instructors-wrapper">
        {partnerInstructors?.map((instructor) => (
          <MobileInstructor instructor={instructor} key={instructor.name} />
        ))}
        {isFetching
          && Array(4)
            .fill(1)
            .map((_, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <MobileInstructorsSkeleton key={i} />
            ))}
      </div>
    </div>
  );
};

export default MobileInstructors;
