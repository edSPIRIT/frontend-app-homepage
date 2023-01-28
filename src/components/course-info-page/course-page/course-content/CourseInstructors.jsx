import { Button, Icon, IconButton } from '@edx/paragon';
import { ArrowForward, BookOpen, People } from '@edx/paragon/icons';
import { INSTRUCTORS } from '../../../../constants';

const CourseInstructors = () => (
  <div className="course-info-instructors mt-5" id="instructors">
    <h2 className="mb-3">Instructors</h2>
    <div className="instructors-wrapper ">
      {INSTRUCTORS.map((instructor) => (
        <div className="instructor-wrapper d-flex" key={instructor.name}>
          <div className="instructor-img-wrapper mr-4">
            <img src={instructor.image} alt="instructor-avator" />
          </div>
          <div className="d-flex flex-column w-100">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div>
                <span className="instructor-title mr-5 mb-1">{instructor.name}</span>
                <span className="instructor-short-bio mr-3.5">
                  {instructor.shortBio}
                </span>
              </div>
              <IconButton
                className="arrow-forward-btn"
                src={ArrowForward}
                iconAs={Icon}
                alt="ArrowForward"
                variant="light"
              />
            </div>
            <div className="d-flex icons-bottom-wrapper">
              <div className="d-flex mr-4.5">
                <Icon src={People} className="mr-2" />
                <p>
                  <span>{instructor.students} Students</span>
                </p>
              </div>
              <div className="d-flex">
                <Icon src={BookOpen} className="mr-2" />
                <p>
                  <span>{instructor.courses} Courses</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
    <Button variant="outline-primary" className="my-4">
      Show more Instructors
    </Button>
  </div>
);

export default CourseInstructors;
