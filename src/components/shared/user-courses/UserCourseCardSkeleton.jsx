import { Card, Skeleton, useMediaQuery } from '@edx/paragon';

const UserCourseCardSkeleton = () => {
  const isMobile = useMediaQuery({ maxWidth: '768px' });

  return (
    <Card
      className="mb-4 user-card-course"
      orientation={isMobile ? 'vertical' : 'horizontal'}
    >
      <Card.ImageCap src="" srcAlt="Card image" />
      <Card.Body>
        <Card.Section>
          <Skeleton width="100%" height={28} className="" />
          <Skeleton width="40%" height={28} className="mb-3" />
          <Skeleton width="30%" height={24} className="mb-2" />
          <div className="d-flex justify-content-between align-items-center bott">
            <Skeleton width={250} height={16} />
            {!isMobile && <Skeleton width={142} height={44} />}
          </div>
        </Card.Section>
      </Card.Body>
    </Card>
  );
};

export default UserCourseCardSkeleton;
