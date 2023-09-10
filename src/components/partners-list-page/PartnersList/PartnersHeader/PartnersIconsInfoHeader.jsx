/* eslint-disable react/prop-types */
import { FormattedMessage, FormattedNumber } from '@edx/frontend-platform/i18n';
import { Icon } from '@edx/paragon';
import { BookOpen, Groups } from '@edx/paragon/icons';
import React from 'react';
import { ReactComponent as Instructors } from '../../../../assets/instructors.svg';

const PartnersIconsInfoHeader = ({ partnersMetaData }) => (
  <div className="banner-icons-wrapper mt-4">
    <div className="icon-wrapper">
      <Icon src={BookOpen} style={{ width: '40px' }} />
      <FormattedNumber value={partnersMetaData?.total_courses} />
      <p>
        <FormattedMessage
          id="partners.snapShut.courses.text"
          defaultMessage="{courseCount, plural, one {Course} other {Courses}}"
          values={{
            courseCount: partnersMetaData?.total_courses,
          }}
        />
      </p>
    </div>
    <div className="icon-wrapper">
      <Icon src={Groups} style={{ width: '40px' }} />
      <FormattedNumber value={partnersMetaData?.total_learners} />
      <p>
        <FormattedMessage
          id="partners.snapShut.learners.text"
          defaultMessage="{learnerCount, plural, one {Learner} other {Learners}}"
          values={{
            learnerCount: partnersMetaData?.total_learners,
          }}
        />
      </p>
    </div>
    <div className="icon-wrapper">
      <Icon src={Instructors} style={{ width: '40px' }} />
      <FormattedNumber value={partnersMetaData?.total_instructors} />
      <p>
        <FormattedMessage
          id="partners.snapShut.instructors.text"
          defaultMessage="{instructorCount, plural, one {Instructor} other {Instructors}}"
          values={{
            instructorCount: partnersMetaData?.total_instructors,
          }}
        />
      </p>
    </div>
  </div>
);

export default PartnersIconsInfoHeader;
