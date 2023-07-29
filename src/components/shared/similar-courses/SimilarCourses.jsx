import { ChevronLeft, ChevronRight } from '@edx/paragon/icons';
import { Carousel, Icon } from '@edx/paragon';
import PropTypes from 'prop-types';
import { FormattedMessage } from '@edx/frontend-platform/i18n';
import CourseCardSkeleton from '../skeleton/CourseCardSkeleton';
import CourseCardNew from '../course-card/CourseCardNew';
import useGetSimilarCourses from '../../../hooks/useGetSimilarCourses';

const SimilarCourses = ({
  courseTitles,
  courseIds,
  loading: coursesTitlesLoading,
}) => {
  const { similarCourses, loading } = useGetSimilarCourses(
    courseTitles,
    courseIds,
  );
  const chunkedArray = [];
  const chunkSize = () => {
    for (let i = 0; i < similarCourses?.length; i += 4) {
      chunkedArray.push(similarCourses?.slice(i, i + 4));
    }
  };
  chunkSize();
  return (
    chunkedArray?.length > 0 && (
      <div className="recommendationCourse-wrapper mt-6 py-6">
        <section className="custom-container similar-courses-wrapper">
          <h3 className="mb-1">
            <FormattedMessage
              id="similarCourses.text"
              defaultMessage="Similar Courses"
            />
          </h3>
          <FormattedMessage
            id="similarCoursesDesc.text"
            defaultMessage="Recommendation based on your activity and whether you like"
          />
          {coursesTitlesLoading && loading ? (
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
              controls={similarCourses?.length > 4}
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
              {chunkedArray?.map((chunkCourses, i) => (
                // eslint-disable-next-line react/no-array-index-key
                <Carousel.Item key={i}>
                  <div className="course-container mt-4.5">
                    {chunkCourses.map((course) => (
                      <CourseCardNew
                        course={course?.data?.course_metadata}
                        key={course?.data?.id}
                      />
                    ))}
                  </div>
                </Carousel.Item>
              ))}
            </Carousel>
          )}
        </section>
      </div>
    )
  );
};
SimilarCourses.propTypes = {
  courseTitles: PropTypes.string,
  courseIds: PropTypes.arrayOf(PropTypes.string),
  loading: PropTypes.bool,
};
SimilarCourses.defaultProps = {
  courseTitles: '',
  courseIds: [],
  loading: false,
};
export default SimilarCourses;
