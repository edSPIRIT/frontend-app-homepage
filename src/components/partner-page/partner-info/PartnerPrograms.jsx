import React from 'react';
import { ArrowForwardIos } from '@edx/paragon/icons';
import { FormattedMessage } from '@edx/frontend-platform/i18n';
import { Button } from 'react-scroll';
import { TOP_PROGRAM } from '../../../utils/constants';
import ProgramCard from '../../shared/program-card/ProgramCard';

const PartnerPrograms = () => (
  <div className="custom-container d-flex flex-column pb-6" id="programs">
    <h2 className="d-flex justify-content-center mb-4">
      <h2 className="d-flex justify-content-center mb-4">
        Popular<span className="highlighted ml-2">Programs</span>
      </h2>
    </h2>
    <div className="programs-container">
      {TOP_PROGRAM.map((course) => (
        <ProgramCard info={course} key={course.title} />
      ))}
    </div>
    <div className="d-flex justify-content-center">
      <Button className="view-all-course-btn" iconAfter={ArrowForwardIos}>
        <FormattedMessage
          id="viewAllCourses.button"
          defaultMessage="View All Courses"
        />
      </Button>
    </div>
  </div>
);

export default PartnerPrograms;
