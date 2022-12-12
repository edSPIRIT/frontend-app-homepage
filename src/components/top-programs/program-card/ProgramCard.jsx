/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
// variables taken from algolia not in camelcase
import React from 'react';

import {
  Button,
  Card,
} from '@edx/paragon';

const ProgramCard = ({ info }) => {
  const {
    title,
    institution,
    cover,
    logo,
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
      <div className="mt-4.5 px-4 d-flex flex-column program-card-container">
        <h3 className="program-title">{title}</h3>
        <a className="program-link" href="#institution">{institution}</a>

      </div>

      <Card.Section>
        <Button variant="outline-primary" size="sm">Degree</Button>

        {/* <div className="d-flex flex-column mb-3">
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
        </div> */}
      </Card.Section>

      <Card.Footer>
        <span className="program-desc">Professional Certificate (9 courses)</span>

      </Card.Footer>
    </Card>
  );
};

export default ProgramCard;
