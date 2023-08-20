/* eslint-disable react/prop-types */
import { FormattedMessage } from '@edx/frontend-platform/i18n';
import React from 'react';
import { Link } from 'react-scroll';
import Scrollspy from 'react-scrollspy';

const MobileCourseNavItems = ({ courseMetaData, sections, instructors }) => (
  <div className="sticky-nav-wrapper custom-container">
    <Scrollspy
      items={[
        'info-course',
        'about-course',
        'what-you-learn',
        'requirement',
        'course-content',
        'instructors',
      ]}
      currentClassName="active-item"
      offset={-70}
    >
      <li>
        <Link to="info-course" smooth offset={-120}>
          <FormattedMessage
            id="courseInfo.tab.info.text"
            defaultMessage="Info"
          />
        </Link>
      </li>
      {courseMetaData?.additional_metadata?.about_overview ? (
        <li>
          <Link to="about-course" smooth offset={-20}>
            <FormattedMessage
              id="courseInfo.tab.about.text"
              defaultMessage="About"
            />
          </Link>
        </li>
      ) : (
        <span className="d-flex align-items-center disable-link">
          <FormattedMessage
            id="courseInfo.tab.about.text"
            defaultMessage="About"
          />
        </span>
      )}
      {courseMetaData?.what_you_will_learn.length > 0 ? (
        <li>
          <Link to="what-you-learn" smooth offset={-20}>
            <FormattedMessage
              id="courseInfo.tab.whatYouWillLearn.text"
              defaultMessage="What you'll learn"
            />
          </Link>
        </li>
      ) : (
        <span className="d-flex align-items-center disable-link">
          <FormattedMessage
            id="courseInfo.tab.whatYouWillLearn.text"
            defaultMessage="What you'll learn"
          />
        </span>
      )}
      {courseMetaData?.requirements?.length > 0
      || courseMetaData?.additional_metadata?.pre_req_courses?.length > 0 ? (
        <li>
          <Link to="requirement" smooth offset={-20}>
            <FormattedMessage
              id="courseInfo.tab.requirements.text"
              defaultMessage="Requirements"
            />
          </Link>
        </li>
        ) : (
          <span className="d-flex align-items-center disable-link">
            <FormattedMessage
              id="courseInfo.tab.requirements.text"
              defaultMessage="Requirements"
            />
          </span>
        )}
      {sections?.length > 0 ? (
        <li>
          <Link to="course-content" smooth offset={-20}>
            <FormattedMessage
              id="courseInfo.tab.courseContent.text"
              defaultMessage="Course content"
            />
          </Link>
        </li>
      ) : (
        <span className="d-flex align-items-center disable-link">
          <FormattedMessage
            id="courseInfo.tab.courseContent.text"
            defaultMessage="Course content"
          />
        </span>
      )}
      {instructors?.length > 0 ? (
        <li>
          <Link to="instructors" smooth offset={-60}>
            <FormattedMessage
              id="courseInfo.tab.instructors.text"
              defaultMessage="Instructors"
            />
          </Link>
        </li>
      ) : (
        <span className="d-flex align-items-center disable-link">
          <FormattedMessage
            id="courseInfo.tab.instructors.text"
            defaultMessage="Instructors"
          />
        </span>
      )}
    </Scrollspy>
  </div>
);

export default MobileCourseNavItems;
