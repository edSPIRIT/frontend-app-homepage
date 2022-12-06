/* eslint-disable camelcase */
// variables taken from algolia not in camelcase
import React from 'react';
import PropTypes from 'prop-types';

import {
  Button, Card, Icon,
} from '@edx/paragon';
import { Person, BookOpen, WatchFilled } from '@edx/paragon/icons';

const CourseCard = ({ info }) => {
  const {
    title,
    institution,
    cover,
    logo,
    instructor,
    lessons,
    time,
  } = info;

  return (
    <Card>
      <Card.ImageCap
        src={cover}
        logoSrc={logo}
        variant="top"
        // src={buildLmsUrl(course.media.course_image.uri)}
        alt=""
      />
      <div className="mt-4.5 ml-4">
        <h4 className="mb-1 font-weight-bold">{title}</h4>
        <a href="#institution">{institution}</a>
      </div>
      <span className="cards-spacing" />

      <Card.Section>
        <div className="d-flex flex-column mb-3">
          <div className="d-flex flex-row align-items-center mb-2">
            <Icon className="card-icon" src={Person} />
            <a href="#instructor">{instructor}</a>
          </div>
          <div className="d-flex flex-row align-items-center mb-2">
            <Icon className="card-icon" src={BookOpen} />
            <span>{lessons}</span>
          </div>
          <div className="d-flex flex-row align-items-center mb-3.5">
            <Icon className="card-icon" src={WatchFilled} />
            <span>{ time}</span>
          </div>
          <span className="text-gray-500">$100 . Available Now</span>
        </div>
      </Card.Section>

      <Card.Footer>
        <Button variant="primary" size="lg" href="#course">
          Learn more
        </Button>
      </Card.Footer>
    </Card>
  );
};
CourseCard.defaultProps = {

};

CourseCard.propTypes = {

};

export default CourseCard;
