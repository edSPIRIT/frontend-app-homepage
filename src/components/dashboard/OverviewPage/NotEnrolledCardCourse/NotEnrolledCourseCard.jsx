import { Button, Card, useMediaQuery } from '@edx/paragon';
import { Search } from '@edx/paragon/icons';
import React from 'react';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
import { FormattedMessage } from '@edx/frontend-platform/i18n';
import cardImageCap from '../../../../assets/card-image-cap.png';

const NotEnrolledCardCourse = ({ title, description }) => {
  const history = useHistory();
  const isSmall = useMediaQuery({ maxWidth: '600px' });
  return (
    <div className="not-enrolled-wrapper mt-6">
      <Card orientation={isSmall ? 'vertical' : 'horizontal'}>
        <Card.ImageCap
          src={cardImageCap}
          srcAlt="Card image"
          imageLoadingType="lazy"
        />
        <Card.Body>
          <Card.Section>
            <div className="d-flex align-items-center explorer-wrapper w-100">
              <div className="d-flex flex-column mr-4 w-100">
                <h2>{title}</h2>
                <p className="mt-3.5">{description}</p>
              </div>
              <Button
                variant="brand"
                iconAfter={Search}
                onClick={() => history.push('/search')}
              >
                <FormattedMessage
                  id="exploreCourses.text"
                  defaultMessage="Explore Courses"
                />
              </Button>
            </div>
          </Card.Section>
        </Card.Body>
      </Card>
    </div>
  );
};
NotEnrolledCardCourse.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default NotEnrolledCardCourse;
