/* eslint-disable camelcase */
// variables taken from algolia not in camelcase
import React from 'react';
import PropTypes from 'prop-types';

import { Badge, Card, Icon } from '@edx/paragon';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import { Person, BookOpen, WatchFilled } from '@edx/paragon/icons';
import messages from './CourseCard.messages';

const CourseCard = ({ original, onClick, intl }) => {
  const { name, org } = original;

  return (
    <Card>
      <Card.ImageCap
        src="https://prod-discovery.edx-cdn.org/media/course/image/338e9937-2c57-4832-b7c8-ff55beccdae3-eb0380dfb4f1.small.png"
        logoSrc="https://prod-discovery.edx-cdn.org/organization/logo_override/5b5eeb1f-cb01-4339-9fd2-937c591c5711-b8644097563b.png"
        variant="top"
        // src={buildLmsUrl(course.media.course_image.uri)}
        alt=""
      />
      <Card.Header title={name} subtitle={org} />
      <span className="cards-spacing" />

      <Card.Section>
        <div className="d-flex flex-column mb-3">
          <div className="d-flex flex-row align-items-center">
            <Icon className="mr-2" src={Person} />
            <span>Instructor</span>
          </div>
          <div className="d-flex flex-row align-items-center">
            <Icon className="mr-2" src={BookOpen} />
            <span>11 Lessons</span>
          </div>
          <div className="d-flex flex-row align-items-center">
            <Icon className="mr-2" src={WatchFilled} />
            <span>3 Hours</span>
          </div>
        </div>
        <div style={{ maxWidth: '400vw' }}>
          <Badge variant="dark" className="ml-0 padded-catalog">
            {intl.formatMessage(messages['courseCard.aLaCarteBadge'])}
          </Badge>
          <Badge
            variant="secondary"
            className="business-catalog padded-catalog"
          >
            {intl.formatMessage(messages['courseCard.businessBadge'])}
          </Badge>
          <Badge variant="light" className="padded-catalog">
            {intl.formatMessage(messages['courseCard.educationBadge'])}
          </Badge>
        </div>
      </Card.Section>
      <Card.Footer className="d-flex justify-content-between align-items-start card-footer">
        <p className="x-small text-gray-700 view-course">
          <b>View Course</b> on school page
        </p>
        <span className="pgn__icon">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            focusable="false"
            aria-hidden="true"
          >
            <path
              d="M19 19H5V5h7V3H3v18h18v-9h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"
              fill="currentColor"
            />
          </svg>
          <span className="sr-only">Opens a link in a new tab</span>
        </span>
      </Card.Footer>
      {/* <Button variant="primary" href={buildCourseURL(course.id)}>
                  <FormattedMessage
                    id="catalogCourseView"
                    defaultMessage="View Course"
                    description="Label for the button that brings the user to the course about page."
                  />
                </Button> */}
    </Card>
  );
};
CourseCard.defaultProps = {
  onClick: () => {},
};

CourseCard.propTypes = {
  intl: intlShape.isRequired,
  onClick: PropTypes.func,
  original: PropTypes.shape({
    title: PropTypes.string,
    card_image_url: PropTypes.string,
    partners: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        logo_image_url: PropTypes.string,
      }),
    ),
    first_enrollable_paid_seat_price: PropTypes.number,
    enterprise_catalog_query_titles: PropTypes.arrayOf(PropTypes.string),
    original_image_url: PropTypes.string,
    availability: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default injectIntl(CourseCard);
