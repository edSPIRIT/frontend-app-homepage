import React from 'react';
import { FormattedMessage } from '@edx/frontend-platform/i18n';
import ScrollableCourses from '../../../shared/scrollable-courses-component/ScrollableCourses';

const EmptyStateCourses = () => (
  <div className="skeletonCard-container">
    <div className="blur-background" />
    <ScrollableCourses courses={[]} loading={1} />
    <div className="loading-text">
      <FormattedMessage
        id="homePage.exploreCourses.skeletonDesc"
        defaultMessage="We're excited to bring you amazing content very soon! "
      />
    </div>
  </div>
);

export default EmptyStateCourses;
