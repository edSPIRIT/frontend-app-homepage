import { Card, Skeleton } from '@edx/paragon';

const HorizontalCardSkeleton = () => (
  <Card
    className="mb-4 horizontal-card-course"
    orientation="horizontal"
  >
    <Card.ImageCap src="" srcAlt="Card image" />
    <Card.Body>
      <Card.Section>
        <Skeleton width="100%" height={28} className="mb-1" />
        <Skeleton width="40%" height={28} className="mb-6" />
        <Skeleton width="50%" height={16} />
      </Card.Section>
    </Card.Body>
  </Card>
);

export default HorizontalCardSkeleton;
