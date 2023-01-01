/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
// variables taken from algolia not in camelcase
import React from 'react';

import { Button, Card, Icon } from '@edx/paragon';
import { Person, BookOpen, WatchFilled } from '@edx/paragon/icons';
import { Link } from 'react-router-dom';

const CourseCard = ({ info }) => {
  const {
    title, institution, cover, logo, instructor, instructorLink, lessons, time,
  } = info;

  return (
    <Card>
      <Card.ImageCap src={cover} logoSrc={logo} variant="top" alt="" />
      <div className="mt-4.5 px-4">
        <h4 className="mb-1 course-title">{title}</h4>
        <a href="#institution">{institution}</a>
      </div>
      <span className="cards-spacing" />
      <Card.Section>
        <div className="d-flex flex-column mb-3 mt-auto">
          <div className="d-flex flex-row align-items-center mb-2">
            <Icon className="card-icon" src={Person} />
            <Link className="text-black" to={`/bio/${instructorLink}`}>
              {instructor}
            </Link>
          </div>
          <div className="d-flex flex-row align-items-center mb-2">
            <Icon className="card-icon" src={BookOpen} />
            <span className="text-black">{lessons}</span>
          </div>
          <div className="d-flex flex-row align-items-center mb-3.5">
            <Icon className="card-icon" src={WatchFilled} />
            <span className="text-black">{time}</span>
          </div>
          <span className="text-gray-500">$100 . Available Now</span>
        </div>
      </Card.Section>
      <Card.Footer>
        <div className="btn-card-container">
          <Button variant="primary" href="#course">
            Learn more
          </Button>
        </div>
      </Card.Footer>
    </Card>
  );
};

export default CourseCard;
