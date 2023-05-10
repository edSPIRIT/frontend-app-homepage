import { Button } from '@edx/paragon';
import { ArrowForward } from '@edx/paragon/icons';
import { useHistory } from 'react-router';
import { FormattedMessage } from '@edx/frontend-platform/i18n';
import CourseCard from '../../shared/course-card/CourseCard';
import { COURSES_INFO } from '../../../utils/constants';

const PartnerCourses = () => {
  const history = useHistory();

  return (
    <div className="custom-container d-flex flex-column pb-5" id="courses">
      <h2 className="d-flex popular-courses-wrapper">
        <span className="ml-2">
          <FormattedMessage
            id="popularCourses.firstPartTitle.text"
            defaultMessage="Popular"
          />
        </span>
        <span className="highlighted ml-2">
          <FormattedMessage
            id="popularCourses.secondPartTitle.text"
            defaultMessage="Courses"
          />
        </span>
      </h2>
      <div className="course-container mb-4">
        {COURSES_INFO.map((course) => (
          <CourseCard info={course} key={course.title} />
        ))}
      </div>
      <div className="d-flex justify-content-center">
        <Button
          className="view-all-courses-btn"
          iconAfter={ArrowForward}
          onClick={() => history.push('/search')}
        >
          <FormattedMessage
            id="viewAllCourses.button"
            defaultMessage="View All Courses"
          />
        </Button>
      </div>
    </div>
  );
};

export default PartnerCourses;
