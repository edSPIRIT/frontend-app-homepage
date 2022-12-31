import { Button } from '@edx/paragon';
import { useState } from 'react';
import { TOP_PROGRAM } from '../../../constants';
import ProgramCard from './program-card/ProgramCard';

const TopPrograms = () => {
  const programNames = [
    'History',
    'Business',
    'Science',
    'Art & Culture',
    'Data Analysis & Statics',
  ];
  const [selectedProgram, setSelectedProgram] = useState('');

  return (
    <section id="top-programs" className="py-6">
      <div className="custom-container">
        <h2 className="d-flex justify-content-center mb-4.5">
          Top<span className="highlighted ml-2">Programs</span>
        </h2>
        <div className="chip-btn-container ">
          {programNames.map((program) => (
            <Button
              key={program}
              className="chip-btn mr-2.5"
              variant={program === selectedProgram ? 'primary' : 'outline-primary'}
              size="sm"
              onClick={(e) => {
                setSelectedProgram(e.target.textContent);
              }}
            >
              {program}
            </Button>
          ))}
        </div>
        <div className="programs-container">
          {TOP_PROGRAM.map((course) => (
            <ProgramCard info={course} key={course.title} />
          ))}
        </div>
      </div>
    </section>
  );
};
export default TopPrograms;
