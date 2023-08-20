/* eslint-disable react/prop-types */
import { Breadcrumb } from '@edx/paragon';
import React from 'react';
import { Link } from 'react-router-dom';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import { useDispatch } from 'react-redux';
import messages from '../../../../messages';
import {
  resetSearchFilters,
  setSearchSubject,
} from '../../../../redux/slice/searchQuerySlice';

const CourseInfoBreadcrumb = ({ courseMetaData, intl }) => {
  const dispatch = useDispatch();
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
  const handleSubjectOnclick = () => {
    dispatch(resetSearchFilters());
    dispatch(setSearchSubject([courseMetaData.subject[0].title]));
  };
  if (courseMetaData?.subject?.length && courseMetaData.subject[0]?.title) {
    breadcrumbLinks.push({
      label: `${courseMetaData.subject[0].title}`,
      to: '/search',
      onClick: handleSubjectOnclick,
    });
  }
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
