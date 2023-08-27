/* eslint-disable react/prop-types */
import React from 'react';
import {
  Event, InfoOutline,
} from '@edx/paragon/icons';
import { Icon } from '@edx/paragon';
import {
  FormattedDate,
  FormattedMessage,
  FormattedNumber,
} from '@edx/frontend-platform/i18n';
import CourseDateInfo from '../share/CourseDateInfo';
import CourseInfoItems from '../share/CourseInfoItems';
import CourseInstructorsItem from '../share/CourseInstructorsItem';

const MobileInfoSection = ({ courseMetaData }) => (
  <div id="info-course" className="pt-3.5 pb-4.5">
    <p>{courseMetaData?.additional_metadata?.short_description}</p>
    <div className="mobile-icons-wrapper mt-4 font-sm">
      <CourseInstructorsItem course_slug={courseMetaData?.course_slug} />

      <CourseInfoItems courseMetaData={courseMetaData} />

      <CourseDateInfo courseMetaData={courseMetaData} />

      {courseMetaData?.additional_metadata?.total_enrollments && (
        <div className="d-flex align-items-start mb-2">
          <Icon className="card-icon" src={InfoOutline} />
          {courseMetaData?.additional_metadata?.total_enrollments && (
            <p>
              <span className="mr-1">
                <FormattedNumber
                  value={courseMetaData?.additional_metadata?.total_enrollments}
                />
              </span>
              <span className="font-sm">
                <FormattedMessage
                  id="courseInfo.alreadyEnrolled.text"
                  defaultMessage="already enrolled!"
                />
              </span>{' '}
            </p>
          )}
        </div>
      )}
      {courseMetaData?.additional_metadata?.last_modification_date && (
        <p className="d-flex align-items-start mb-2">
          <Icon className="card-icon" src={Event} />
          <span className="mr-1">
            <FormattedMessage
              id="courseInfo.lastUpdateOn.text"
              defaultMessage="Last update on"
            />
          </span>
          <span>
            <FormattedDate
              value={
                courseMetaData?.additional_metadata?.last_modification_date
              }
              day="numeric"
              month="long"
              year="numeric"
            />
          </span>
        </p>
      )}
    </div>
  </div>
);

export default MobileInfoSection;
