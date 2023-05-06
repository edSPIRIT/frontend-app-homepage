import { Icon } from '@edx/paragon';
import { BookOpen, People } from '@edx/paragon/icons';
import { INSTRUCTORS } from '../../../utils/constants';
import userAvatar from '../../../assets/place-holders/user-placeholder.svg';

const MobileInstructors = () => (
  <div className="custom-container mb-5.5" id="instructors">
    <h2 className="popular-courses-wrapper">Instructors</h2>
    <div className="instructors-wrapper">
      {INSTRUCTORS.map((instructor) => (
        <div className="instructor-wrapper d-flex" key={instructor.name}>
          <div className="d-flex flex-column">
            <div className="d-flex">
              <div className="instructor-img-wrapper mr-4">
                <img src={instructor.image ?? userAvatar} alt="instructor-avatar" />
              </div>
              <div className="d-flex flex-column">
                <span className="instructor-title mb-1">{instructor.name}</span>
                <span className="instructor-short-bio">
                  {instructor.shortBio}
                </span>
              </div>
            </div>
            <p className="instructor-bio mb-3 mt-3">{instructor.bio}</p>
            <div className="d-flex icons-bottom-wrapper">
              <div className="d-flex mr-4.5 align-items-center">
                <Icon src={People} className="mr-2" />
                <p>
                  <span>{instructor.students} Students</span>
                </p>
              </div>
              <div className="d-flex align-items-center">
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
  </div>
);

export default MobileInstructors;
