import { Button, Skeleton } from '@edx/paragon';
import { INSTRUCTORS } from '../../../constants';
import InstructorCard from './course-instructors/InstructorCard';

const CourseInstructors = () => {
  const loading = false;

  return (
    <div className="course-info-instructors mt-5" id="instructors">
      <h2 className="mb-3">Instructors</h2>
      <div className="instructors-wrapper ">
        {
          loading ? (
            Array(4)
              .fill(1).map((item, i) => (
              // eslint-disable-next-line react/no-array-index-key
                <div className="instructor-wrapper d-flex" key={i}>
                  <Skeleton className="mr-4" width={96} height={96} />
                  <div className="d-flex flex-column w-100 ">
                    <Skeleton height={24} />
                    <Skeleton className="mb-2.5" height={24} />
                    <div className="skeleton-icon-wrapper">
                      <Skeleton height={24} />
                      <Skeleton height={24} />
                    </div>
                  </div>
                </div>
              ))

          ) : (
            INSTRUCTORS.map((instructor) => (
              <InstructorCard instructor={instructor} key={instructor.name} />
            ))
          )
}
      </div>
      <Button variant="outline-primary" className="my-4">
        Show more Instructors
      </Button>
    </div>
  );
};

export default CourseInstructors;
