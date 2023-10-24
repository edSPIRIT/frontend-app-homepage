import { Card, Skeleton, useMediaQuery } from '@edx/paragon';

const UserCourseCardSkeleton = () => {
  const isTablet = useMediaQuery({ maxWidth: '768px' });
  const isMobile = useMediaQuery({ maxWidth: '600px' });

  return (
    <Card
      className="mb-4 user-card-course"
      orientation={isMobile ? 'vertical' : 'horizontal'}
    >
      <Card.ImageCap src="" srcAlt="Card image" imageLoadingType="lazy" />
      <Card.Body>
        <Card.Section>
          <Skeleton width="70%" height={28} className="" />
          <Skeleton width="40%" height={28} className="mb-3" />
          <Skeleton width="30%" height={24} className="mb-2" />
          <div className="d-flex justify-content-between align-items-center w-100">
            <div className="w-50">
              <Skeleton height={16} />
            </div>
            {!isMobile && !isTablet && (
              <div className="d-flex">
                <Skeleton className="mr-2" width={142} height={44} />
                <Skeleton width={142} height={44} />
              </div>
            )}
          </div>
        </Card.Section>
      </Card.Body>
    </Card>
  );
};

export default UserCourseCardSkeleton;
