import { ChevronLeft, ChevronRight } from '@edx/paragon/icons';
import { Carousel, Icon } from '@edx/paragon';
import PropTypes from 'prop-types';
import CourseCardSkeleton from '../skeleton/CourseCardSkeleton';
import CourseCardNew from '../course-card/CourseCardNew';

const SimilarCourses = ({ courses, loading }) => {
  const chunkedArray = [];
  const chunkSize = () => {
    for (let i = 0; i < courses.length; i += 4) {
      chunkedArray.push(courses.slice(i, i + 4));
    }
  };
  chunkSize();

  return (
    <section className="custom-container similar-courses-wrapper">
      <h3>Similar Courses</h3>
      <span>Recommended based on your activity and whether you like</span>
      {loading ? (
        <div className="course-container mt-4.5">
          {Array(4)
            .fill(1)
            .map((item, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <CourseCardSkeleton key={i} />
            ))}
        </div>
      ) : (
        <Carousel
          interval={null}
          indicators={false}
          nextIcon={(
            <Icon
              style={{ height: '38px', width: '38px' }}
              src={ChevronRight}
            />
          )}
          prevIcon={
            <Icon style={{ height: '38px', width: '38px' }} src={ChevronLeft} />
          }
        >
          {chunkedArray.map((chunkCourses, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <Carousel.Item key={i}>
              <div className="course-container mt-4.5">
                {chunkCourses.map((course) => (
                  <CourseCardNew course={course} key={course.id} />
                ))}
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      )}
    </section>
  );
};
SimilarCourses.propTypes = {
  courses: {
    blocks_url: PropTypes.string,
    effort: PropTypes.any,
    end: PropTypes.any,
    enrollment_start: PropTypes.any,
    enrollment_end: PropTypes.any,
    id: PropTypes.string,
    media: PropTypes.shape({
      banner_image: PropTypes.shape({
        uri: PropTypes.string,
        uri_absolute: PropTypes.string,
      }),
      course_image: PropTypes.shape({
        uri: PropTypes.string,
      }),
      course_video: PropTypes.shape({
        uri: PropTypes.string,
      }),
      image: PropTypes.shape({
        raw: PropTypes.string,
        small: PropTypes.string,
        large: PropTypes.string,
      }),
    }),
    name: PropTypes.string,
    number: PropTypes.string,
    org: PropTypes.string,
    short_description: PropTypes.string,
    start: PropTypes.string,
    start_display: PropTypes.string,
    start_type: PropTypes.string,
    pacing: PropTypes.string,
    mobile_available: PropTypes.bool,
    hidden: PropTypes.bool,
    invitation_only: PropTypes.bool,
    course_id: PropTypes.string,
  },
  loading: PropTypes.bool,
};
SimilarCourses.defaultProps = {
  courses: [],
  loading: false,
};
export default SimilarCourses;
