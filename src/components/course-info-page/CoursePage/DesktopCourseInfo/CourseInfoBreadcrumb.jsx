/* eslint-disable react/prop-types */
import { Breadcrumb } from '@edx/paragon';
import React from 'react';
import { Link } from 'react-router-dom';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import messages from '../../../../messages';

const CourseInfoBreadcrumb = ({ courseMetaData, intl }) => {
  const breadcrumbLinks = [
    {
      label: `${intl.formatMessage(messages['breadcrumb.home'])}`,
      to: '/',
    },
    {
      label: `${intl.formatMessage(messages['breadcrumb.discover'])}`,
      to: '/Discover',
    },
  ];

  return (
    <div className="course-info-breadcrumb  py-4.5">
      <div className="custom-container">
        <Breadcrumb
          ariaLabel="Breadcrumb basic"
          links={breadcrumbLinks}
          linkAs={Link}
          activeLabel={courseMetaData?.additional_metadata?.display_name}
        />
      </div>
    </div>
  );
};

CourseInfoBreadcrumb.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(CourseInfoBreadcrumb);
