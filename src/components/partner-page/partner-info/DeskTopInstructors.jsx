/* eslint-disable react/prop-types */
import { FormattedMessage } from '@edx/frontend-platform/i18n';
import { Skeleton } from '@edx/paragon';
import PartnerInstructorSkeleton from './desktop-instructors/PartnerInstructorSkeleton';
import PartnerInstructor from './desktop-instructors/PartnerInstructor';

const DeskTopInstructors = ({ partnerInstructors, loading, isFetching }) => {
  if (loading) {
    return (
      <div className="custom-container mb-5.5" id="instructors">
        <h2 className="text-center pb-4.5">
          <Skeleton className="mr-4" width={200} height={44} />
        </h2>
        <div className="instructors-wrapper">
          {Array(4)
            .fill(1)
            .map((_, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <PartnerInstructorSkeleton key={i} />
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
      <h2 className="text-center pb-4.5">
        <FormattedMessage id="instructors.text" defaultMessage="Instructors" />
      </h2>
      <div className="instructors-wrapper">
        {partnerInstructors?.map((instructor) => (
          <PartnerInstructor instructor={instructor} key={instructor.name} />
        ))}
        {isFetching
          && Array.from({ length: 4 }).map((_, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <PartnerInstructorSkeleton key={i} />
          ))}
      </div>
    </div>
  );
};

export default DeskTopInstructors;
