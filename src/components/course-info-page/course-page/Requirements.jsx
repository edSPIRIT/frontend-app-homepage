import {
  Button, Card, Icon, Skeleton,
} from '@edx/paragon';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ReactComponent as Warning } from '../../../assets/warning.svg';
import { PREREQUISITE_COURSES } from '../../../constants';

const Requirements = ({ courseMetaData, loading }) => (
  <div className="requirements-wrapper pt-5" id="requirement">
    <h2 className="mb-3">Requirements</h2>
    {loading ? (
      <div className="mb-4.5">
        <Skeleton count={2} height={24} />
      </div>
    ) : (
      <ul className="pl-3.5 mb-4.5">
        {courseMetaData?.requirements
          && courseMetaData?.requirements?.map((req, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <li key={i}>
              <p>{req}</p>
            </li>
          ))}
      </ul>
    )}

    {PREREQUISITE_COURSES.length > 0 && (
      <div>
        <h3 className="mb-3">Prerequisite Courses</h3>
        <div className="attention-wrapper mb-4">
          <div className="d-flex align-items-center mb-2">
            <Icon className="mr-1" src={Warning} />
            <h4>Attention!</h4>
          </div>
          {loading ? (
            <Skeleton height={24} />
          ) : (
            <p className="font-sm">
              Lorem Ipsum er ganske enkelt fyldtekst fra print- og
              typografiindustrien. Lorem Ipsum har været standard fyldtekst
              siden 1500-tallet.
            </p>
          )}
        </div>
        <div className="prerequisite-courses-wrapper">
          {loading
            ? Array(3)
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
                    <Skeleton className="mb-1" width="60%" height={24} />
                    <Skeleton width="60%" height={24} />
                    <Skeleton
                      className="mt-4.5"
                      borderRadius={4}
                      height={44}
                    />
                  </div>
                </div>
              ))
            : PREREQUISITE_COURSES?.map((course) => (
              <Link to="/course/" key={course.id}>
                <Card className="cards-wrapper">
                  <Card.ImageCap
                    src={course.cover}
                    logoSrc={course.logo}
                    variant="top"
                    alt=""
                  />
                  <div className="my-4.5 px-4">
                    <h4 className="mb-1 course-title">{course.title}</h4>
                    <a
                      className="institution-title font-sm"
                      href="#institution"
                    >
                      {course.institution}
                    </a>
                  </div>
                  <Card.Footer>
                    <Button variant="primary" href="#course">
                      Learn more
                    </Button>
                  </Card.Footer>
                </Card>
              </Link>
            ))}
        </div>
      </div>
    )}
  </div>
);
Requirements.propTypes = {
  courseMetaData: {
    additional_metadata: PropTypes.shape({
      banner_image_url: PropTypes.string,
      certificate_enabled: PropTypes.bool,
      course_created_at: PropTypes.string,
      course_image_url: PropTypes.string,
      enrollment_end: PropTypes.string,
      enrollment_start: PropTypes.string,
      language: PropTypes.string,
      last_modification_date: PropTypes.string,
      org: PropTypes.string,
      self_paced: PropTypes.bool,
      short_description: PropTypes.string,
      total_enrollments: PropTypes.number,
    }),
    course_id: PropTypes.string,
    course_slug: PropTypes.string,
    created: PropTypes.string,
    hours_effort_per_week_max: PropTypes.string,
    hours_effort_per_week_min: PropTypes.string,
    instructors: PropTypes.arrayOf(
      PropTypes.shape({
        bio: PropTypes.string,
        courses: PropTypes.arrayOf(PropTypes.string),
        facebook: PropTypes.string,
        image: PropTypes.string,
        linkedin: PropTypes.string,
        name: PropTypes.string,
        short_bio: PropTypes.string,
        slug: PropTypes.string,
        twitter: PropTypes.string,
        website: PropTypes.string,
      }),
    ),
    paid_course: PropTypes.shape({
      active: PropTypes.bool,
      course_id: PropTypes.string,
      currency: PropTypes.string,
      price: PropTypes.number,
    }),
    requirements: PropTypes.shape({}),
    total_weeks_of_effort: PropTypes.any,
    transcript_langs: PropTypes.shape({}),
    what_you_will_learn: PropTypes.shape({}),
  },
  loading: PropTypes.bool,
};
Requirements.defaultProps = {
  courseMetaData: [],
  loading: false,
};
export default Requirements;
