import {
  Button, Card, Icon, Skeleton,
} from '@edx/paragon';
import { Record, Event, WatchFilled } from '@edx/paragon/icons';
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getConfig } from '@edx/frontend-platform';
import imageCap from '../../../assets/card-image-cap-partner.png';
import logoPlaceholder from '../../../assets/card-placeholder.png';

const CourseInfoSideBar = ({ courseMetaData, loading }) => {
  console.log(
    'asb',
    `${getConfig().LMS_BASE_URL}${
      courseMetaData.additional_metadata?.banner_image_url
    }`,
    `${getConfig().LMS_BASE_URL}${
      courseMetaData.additional_metadata?.course_image_url
    }`,
  );
  return (
    <div className="course-info-side-wrapper">
      {loading ? (
        <div className="d-flex flex-column skeleton-wrapper">
          <Skeleton className="mb-2" height={204} />
          <div className="skeleton-logo" />
          <div className="p-4 bg-white">
            <Skeleton className="mb-1" width="60%" height={24} />
            <Skeleton className="mb-3.5" width="60%" height={24} />
            <Skeleton count={4} height={24} />
            <Skeleton className="mt-4.5" borderRadius={4} height={44} />
            <div className="mt-2 px-5">
              <Skeleton width="100%" height={24} />
            </div>
          </div>
        </div>
      ) : (
        <Card className="cards-wrapper">
          <Card.ImageCap
            src={
              `${getConfig().LMS_BASE_URL}${
                courseMetaData.additional_metadata?.banner_image_url
              }` ?? imageCap
            }
            logoSrc={
              `${getConfig().LMS_BASE_URL}${
                courseMetaData.additional_metadata?.course_image_url
              }` ?? logoPlaceholder
            }
            variant="top"
            alt=""
          />
          <div className="mt-4.5 px-4">
            <h2 className="mb-1">
              {courseMetaData.paid_course?.price > 0
                ? `$ ${courseMetaData.paid_course?.price}`
                : 'Free'}
            </h2>
            <span className="text-gray-500 font-sm">Lifetime access</span>
          </div>
          <Card.Section>
            <div className="d-flex flex-column  font-sm">
              <div className="d-flex flex-row align-items-center mb-2">
                <Icon className="card-icon" src={Record} />
                <p className="program-instructors-wrapper">
                  {courseMetaData?.instructors?.map((ins) => (
                    <Link
                      key={ins.name}
                      className="color-black"
                      to={`/bio/${ins.slug}`}
                    >
                      {ins.name}
                    </Link>
                  ))}
                </p>
              </div>
              <div className="d-flex flex-row align-items-center mb-2">
                <Icon className="card-icon" src={Event} />
                <p>
                  <span className="color-black">Starting</span>{' '}
                  <span>(6 January 2022)</span>
                </p>
              </div>
              <div className="d-flex flex-row align-items-center mb-2">
                <Icon className="card-icon" src={Event} />
                <p>
                  <span className="color-black">Ending</span>{' '}
                  <span>(3 August 2022)</span>
                </p>
              </div>
              <div className="d-flex flex-row align-items-center mb-2">
                <Icon className="card-icon" src={WatchFilled} />
                <p className="course-text">
                  {`${courseMetaData?.total_weeks_of_effort} weeks `}
                  {courseMetaData?.hours_effort_per_week_min
                    && courseMetaData?.hours_effort_per_week_max && (
                      <span className="color-gray-700">
                        {`(${courseMetaData?.hours_effort_per_week_min}
                        -${courseMetaData?.hours_effort_per_week_max} hours per week)`}
                      </span>
                  )}
                </p>
              </div>
            </div>
          </Card.Section>
          <Card.Footer>
            <div className="btn-card-container d-flex flex-column justify-content-center align-items-center">
              <Button variant="brand" href="#course" className="mb-3">
                Enroll now
              </Button>
              <p>
                <span>
                  {courseMetaData.additional_metadata?.total_enrollments}
                </span>
                <span className="font-sm"> already enrolled!</span>{' '}
              </p>
            </div>
          </Card.Footer>
        </Card>
      )}
      {loading ? (
        <div className="mt-4 px-5">
          <Skeleton width="100%" height={24} />
        </div>
      ) : (
        <p className="font-sm d-flex justify-content-center py-4 date-text">
          <span className="mr-1">Last update on</span>
          <span>
            {courseMetaData.additional_metadata?.last_modification_date}
          </span>
        </p>
      )}
    </div>
  );
};
CourseInfoSideBar.propTypes = {
  courseMetaData: {
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
  },
  loading: PropTypes.bool,
};
CourseInfoSideBar.defaultProps = {
  courseMetaData: [],
  loading: false,
};
export default CourseInfoSideBar;
