/* eslint-disable react/prop-types */
import React from 'react';

import { Button, Card } from '@edx/paragon';

const ProgramCard = ({ info }) => {
  const {
    title, institution, cover, logo,
  } = info;

  return (
    <Card>
      <Card.ImageCap src={cover} logoSrc={logo} variant="top" alt="" />
      <div className="mt-4.5 px-4 d-flex flex-column">
        <h3 className="program-title">{title}</h3>
        <a className="program-link mb-3 font-sm" href="#institution">
          {institution}
        </a>
      </div>
      <Card.Footer>
        <Button className="btn-program" variant="outline-primary" size="sm">
          Degree
        </Button>
        <span className="program-desc mt-2.5">
          Professional Certificate (9 courses)
        </span>
      </Card.Footer>
    </Card>
  );
};

export default ProgramCard;
