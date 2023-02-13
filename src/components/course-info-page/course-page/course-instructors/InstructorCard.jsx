import { Icon, IconButton } from '@edx/paragon';
import { ArrowForward, BookOpen, People } from '@edx/paragon/icons';
import PropTypes from 'prop-types';

const InstructorCard = ({ instructor }) => (
  <div className="instructor-wrapper d-flex">
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
);
InstructorCard.defaultProps = {
  instructor: PropTypes.shape({
    name: PropTypes.string,
    slug: PropTypes.string,
    shortBio: PropTypes.string,
    bio: PropTypes.string,
    students: PropTypes.string,
    courses: PropTypes.string,
    image: PropTypes.string,
  }),
};

InstructorCard.propTypes = {
  instructor: [],
};
export default InstructorCard;
