/* eslint-disable react/prop-types */
import React from 'react';

import { Button, Card, Icon } from '@edx/paragon';
import {
  Person, BookOpen, WatchFilled, Groups,
} from '@edx/paragon/icons';
import { Link, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getConfig } from '@edx/frontend-platform';
import logoPlaceholder from '../../../assets/card-placeholder.png';

const CourseCardNew = ({ course }) => {
  const isProgram = false;
  const history = useHistory();

  return (
    <Link to={`/course/${course?.course_slug}`}>
      <Card className="cards-wrapper">
        <Card.ImageCap
          src={`${getConfig().LMS_BASE_URL}${
            course?.additional_metadata?.course_image_url
          }`}
          logoSrc={course?.partner?.organization?.logo ?? logoPlaceholder}
          variant="top"
          srcAlt="course-header"
          logoAlt="partner-logo"
        />
        <div className="mt-4.5 px-4">
          <h4 className="mb-1 course-title">
            {course?.additional_metadata?.display_name}
          </h4>
          <Link
            to={`/partners/${course?.partner?.organization?.short_name}`}
            className="institution-title font-sm"
            href="#institution"
          >
            <p className="institution-title font-sm">
              {course?.additional_metadata?.org}
            </p>
          </Link>
        </div>
        <Card.Section>
          <div className="d-flex flex-column mb-3 font-sm">
            <div className="d-flex flex-row align-items-center mb-2">
              <Icon className="card-icon" src={isProgram ? Groups : Person} />
              <p className="program-instructors-wrapper">
                {course?.instructors?.map((ins) => (
                  <Link
                    key={ins.slug}
                    className="instructor-title"
                    to={`/instructor/${ins.slug}`}
                  >
                    {ins.name}
                  </Link>
                ))}
              </p>
            </div>
            <div className="d-flex flex-row align-items-center mb-2">
              <Icon className="card-icon" src={BookOpen} />
              <p className="color-black">
                <span className="mr-1">
                  {course?.additional_metadata?.units_count}
                </span>
                <span>lessons</span>
              </p>
            </div>
            {course?.total_weeks_of_effort > 0 && (
              <div className="d-flex flex-row align-items-center mb-3">
                <Icon className="card-icon" src={WatchFilled} />
                <p className="color-black">
                  {`${course?.total_weeks_of_effort} weeks `}
                  {course?.hours_effort_per_week_min
                    && course?.hours_effort_per_week_max && (
                      <span className="color-gray-700">
                        {`(${course?.hours_effort_per_week_min}-${course?.hours_effort_per_week_max} hours per week)`}
                      </span>
                  )}
                </p>
              </div>
            )}
            {course?.paid_course?.price > 0 ? (
              <span className="price-title mt-auto">
                {course?.paid_course?.price_human}
              </span>
            ) : (
              <span className="price-title mt-auto">Free</span>
            )}
          </div>
        </Card.Section>
        <Card.Footer>
          <div className="btn-card-container">
            <Button
              variant="primary"
              className="learn-btn"
              onClick={() => history.push(course?.course_slug)}
            >
              Learn more
            </Button>
          </div>
        </Card.Footer>
      </Card>
    </Link>
  );
};
CourseCardNew.propTypes = {
  course: {
    additional_metadata: PropTypes.shape({
      self_paced: PropTypes.bool,
      total_enrollments: PropTypes.number,
      last_modification_date: PropTypes.string,
      course_created_at: PropTypes.string,
      enrollment_start: PropTypes.string,
      enrollment_end: PropTypes.string,
      banner_image_url: PropTypes.string,
      course_image_url: PropTypes.string,
      language: PropTypes.string,
      certificate_enabled: PropTypes.bool,
      short_description: PropTypes.string,
      org: PropTypes.string,
      display_name: PropTypes.string,
      effort: PropTypes.string,
      // eslint-disable-next-line react/forbid-prop-types
      pre_req_courses: PropTypes.array,
      sections_count: PropTypes.number,
      units_count: PropTypes.number,
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
    partner: PropTypes.shape({
      organization: PropTypes.shape({
        id: PropTypes.number,
        created: PropTypes.string,
        modified: PropTypes.string,
        name: PropTypes.string,
        short_name: PropTypes.string,
        description: PropTypes.string,
        logo: PropTypes.string,
        active: PropTypes.bool,
      }),
      header: PropTypes.string,
      featured: PropTypes.bool,
      courses_count: PropTypes.number,
      created: PropTypes.string,
    }),
  },
};
CourseCardNew.defaultProps = {
  course: undefined,
};
export default CourseCardNew;
