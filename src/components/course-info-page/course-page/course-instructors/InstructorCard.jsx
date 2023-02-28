import { Icon, IconButton } from '@edx/paragon';
import { ArrowForward, BookOpen, People } from '@edx/paragon/icons';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const InstructorCard = ({ instructor }) => (
  <Link to={`/bio/${instructor.slug}`} className="instructor-wrapper d-flex">
    <div className="instructor-img-wrapper mr-4">
      <img src={instructor.image} alt="instructor-avator" />
    </div>
    <div className="d-flex flex-column w-100">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <span className="instructor-title mr-5 mb-1">{instructor.name}</span>
          <span className="instructor-short-bio mr-3.5">
            {instructor.short_bio}
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
            <span>0 Students</span>
          </p>
        </div>
        <div className="d-flex">
          <Icon src={BookOpen} className="mr-2" />
          <p>
            <span>{instructor?.courses.length} Courses</span>
          </p>
        </div>
      </div>
    </div>
  </Link>
);
InstructorCard.defaultProps = {
  instructor: {
    name: PropTypes.string,
    slug: PropTypes.string,
    short_bio: PropTypes.string,
    bio: PropTypes.string,
    image: PropTypes.string,
    website: PropTypes.string,
    linkedin: PropTypes.string,
    facebook: PropTypes.string,
    twitter: PropTypes.string,
    courses: PropTypes.array,
  },
};
InstructorCard.propTypes = {
  instructor: undefined,
};
export default InstructorCard;
