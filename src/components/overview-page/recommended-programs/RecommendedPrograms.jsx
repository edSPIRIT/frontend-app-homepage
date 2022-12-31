import { Button } from '@edx/paragon';
import React from 'react';
import { TOP_PROGRAM } from '../../../constants';

const RecommendationProgram = () => (
  <div className="recommendation-container">
    <h4 className="px-3 py-3">Recommended Programs</h4>
    <div className="d-flex flex-column px-3">
      {TOP_PROGRAM.map((program) => (
        <div className="recommendation-card-container" key={program.title}>
          <img className="recommendation-logo" src={program.logo} alt={program.title} />
          <span className="recommendation-title pr-2">{program.title}</span>
        </div>
      ))}
    </div>
    <Button variant="tertiary" className="mx-3 mb-3 mt-2">
      Explore Programs
    </Button>
  </div>
);

export default RecommendationProgram;
