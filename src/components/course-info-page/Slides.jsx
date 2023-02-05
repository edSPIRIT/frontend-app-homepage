import { Carousel, Icon } from '@edx/paragon';
import { ChevronLeft, ChevronRight } from '@edx/paragon/icons';
import { SIMILAR_COURSES } from '../../constants';
import CourseCard from '../shared/course-card/CourseCard';

const Slides = () => {
  const chunkedArray = [];
  const chunkSize = () => {
    for (let i = 0; i < SIMILAR_COURSES.length; i += 4) {
      chunkedArray.push(SIMILAR_COURSES.slice(i, i + 4));
    }
  };
  chunkSize();

  return (
    <section className="custom-container similar-courses-wrapper">
      <h3>Similar Courses</h3>
      <span>Recommended based on your activity and whether you like</span>
      <Carousel
        interval={null}
        indicators={false}
        nextIcon={(
          <Icon
            style={{ height: '38px', width: '38px' }}
            src={ChevronRight}
          />
            )}
        prevIcon={(
          <Icon
            style={{ height: '38px', width: '38px' }}
            src={ChevronLeft}
          />
            )}
      >
        {chunkedArray.map((chunkCourses, i) => (
          <Carousel.Item key={i}>
            <div className="course-container mt-4.5">
              {chunkCourses.map((course) => (
                <CourseCard info={course} key={course.id} />
              ))}
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </section>
  );
};

export default Slides;
