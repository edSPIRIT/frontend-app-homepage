import { Card, Icon, Skeleton } from '@edx/paragon';
import { BookOpen, Person, WatchFilled } from '@edx/paragon/icons';
import logoPlaceholder from '../../../assets/place-holders/org-place-holder.svg';
import coverPlaceholder from '../../../assets/place-holders/cover-course-place-holder.svg';

const CourseCardSkeleton = () => (
  <Card className="cards-wrapper d-flex">
    <Card.ImageCap
      src={coverPlaceholder}
      logoSrc={logoPlaceholder}
      variant="top"
      srcAlt="course-header"
      logoAlt="partner-logo"
      fallbackSrc={coverPlaceholder}
      imageLoadingType="lazy"
    />
    <div className="skeleton-logo" />
    <div className="p-4">
      <Skeleton className="" width="80%" height={24} />
      <Skeleton className="mb-2" width="40%" height={24} />
      <div className="d-flex">
        <Icon
          className="text-light-500 mr-2"
          src={Person}
          style={{ height: '20px', width: '20px' }}
        />
        <div className="w-100">
          <Skeleton width="60%" height={24} />
        </div>
      </div>
      <div className="d-flex">
        <Icon
          className="text-light-500 mr-2"
          src={BookOpen}
          style={{ height: '20px', width: '20px' }}
        />
        <div className="w-100">
          <Skeleton width="60%" height={24} />
        </div>
      </div>
      <div className="d-flex">
        <Icon
          className="text-light-500 mr-2"
          src={WatchFilled}
          style={{ height: '20px', width: '20px' }}
        />
        <div className="w-100">
          <Skeleton width="60%" height={24} />
        </div>
      </div>
      <Skeleton className="mt-3" borderRadius={4} height={44} />
    </div>
  </Card>
);

export default CourseCardSkeleton;
