import { Button, Card, useMediaQuery } from '@edx/paragon';
import { Search } from '@edx/paragon/icons';
import React from 'react';
import { useHistory } from 'react-router';
import cardImageCap from '../../../assets/card-image-cap.png';

const NotEnrolledCardCourse = () => {
  const history = useHistory();
  const isSmall = useMediaQuery({ maxWidth: '800px' });
  return (
    <div className="not-enrolled-wrapper">
      <Card orientation={isSmall ? 'vertical' : 'horizontal'}>
        <Card.ImageCap src={cardImageCap} srcAlt="Card image" />
        <Card.Body>
          <Card.Section>
            <h2 className="mt-5 mb-3.5">
              Earn a certificate Advance your career
            </h2>
            <p>You are not enrolled in any courses yet.</p>
          </Card.Section>
        </Card.Body>
        <Card.Footer className="justify-content-end">
          <Button
            variant="brand"
            iconAfter={Search}
            onClick={() => history.push('/search')}
          >
            Explore programs
          </Button>
        </Card.Footer>
      </Card>
    </div>
  );
};

export default NotEnrolledCardCourse;
