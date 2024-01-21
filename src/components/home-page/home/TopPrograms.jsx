import { Button, Skeleton } from '@edx/paragon';
import { useState } from 'react';
import { TOP_PROGRAM } from '../../../utils/constants';
import ProgramCard from '../../shared/program-card/ProgramCard';

const TopPrograms = () => {
  const loading = false;
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
          {loading ? (
            <div className="btn-skeleton-wrapper">
              <Skeleton height={28} className="mb-1" />
              <Skeleton height={28} className="mb-1" />
              <Skeleton height={28} className="mb-1" />
              <Skeleton height={28} className="mb-1" />
            </div>
          ) : (
            programNames.map((program) => (
              <Button
                key={program}
                className="chip-btn mr-2.5"
                variant={
                  program === selectedProgram ? 'primary' : 'outline-primary'
                }
                size="sm"
                onClick={(e) => {
                  setSelectedProgram(e.target.textContent);
                }}
              >
                {program}
              </Button>
            ))
          )}
        </div>
        <div className="programs-container">
          {loading
            ? Array(5)
              .fill(1)
              .map((item, i) => (
                <div
                  className="d-flex flex-column skeleton-wrapper"
                    // eslint-disable-next-line react/no-array-index-key
                  key={i}
                >
                  <Skeleton className="mb-2" height={92} />
                  <div className="skeleton-logo" />
                  <div className="p-4">
                    <Skeleton className="mb-2" height={24} />
                    <Skeleton width="40%" height={24} />
                    <Skeleton className="mt-3" width="40%" height={24} />
                    <Skeleton className="mt-3" borderRadius={4} height={36} />
                  </div>
                </div>
              ))
            : TOP_PROGRAM.map((course) => (
              <ProgramCard info={course} key={course.title} />
            ))}
        </div>
      </div>
    </section>
  );
};
export default TopPrograms;
