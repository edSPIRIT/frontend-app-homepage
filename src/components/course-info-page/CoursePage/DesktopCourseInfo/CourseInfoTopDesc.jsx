/* eslint-disable react/prop-types */
import { Icon, Skeleton } from '@edx/paragon';
import React from 'react';
import { Link } from 'react-router-dom';
import { Share } from '@edx/paragon/icons';
import ShowMoreText from 'react-show-more-text';
import { injectIntl } from '@edx/frontend-platform/i18n';
import { useDispatch } from 'react-redux';
import { setToastMessage } from '../../../../redux/slice/toastSlice';
import messages from '../../../../messages';
import SharedToastMessage from '../../../shared/base-components/SharedToastMessage';
import CourseInfoItems from '../share/CourseInfoItems';

const CourseInfoTopDesc = ({
  courseMetaData, loading, navTopRef, intl,
}) => {
  const dispatch = useDispatch();

  return (
    <div className="course-info-top-container">
      <div className=" course-info-top-wrapper ">
        {loading ? (
          <div>
            <Skeleton height={44} className="mb-1" />
            <Skeleton width="35%" height={28} className="mb-3.5" />
            <Skeleton height={56} className="mb-3.5" />
            <div className="icons-skeleton-wrapper d-flex pb-4.5">
              <Skeleton height={24} className="mb-1" />
              <Skeleton height={24} className="mb-1" />
              <Skeleton height={24} className="mb-1" />
              <Skeleton height={24} className="mb-1" />
            </div>
          </div>
        ) : (
          <>
            <div className="d-flex flex-column">
              <div className="d-flex justify-content-between mb-1">
                <h1 className="mr-4.5">
                  {courseMetaData.additional_metadata?.display_name}
                </h1>
                <Icon
                  className="share-icon"
                  src={Share}
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    dispatch(setToastMessage(<SharedToastMessage />));
                  }}
                />
              </div>
              <Link
                to={`/partners/${courseMetaData?.partner?.organization?.short_name}`}
                className="course-institution"
              >
                {courseMetaData?.additional_metadata?.org_display_name}
              </Link>
            </div>
            <ShowMoreText
              lines={3}
              more={intl.formatMessage(messages['showMore.text'])}
              less={intl.formatMessage(messages['showLess.text'])}
              className="d-flex flex-column pt-3.5"
              anchorClass="show-more-less-clickable"
              expanded={false}
              truncatedEndingComponent="... "
            >
              <p>{courseMetaData?.additional_metadata?.short_description}</p>
            </ShowMoreText>
            <div
              className="icons-wrapper d-flex text-gray-500 mt-3 pb-4 font-sm "
              ref={navTopRef}
            >
              <CourseInfoItems courseMetaData={courseMetaData} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default injectIntl(CourseInfoTopDesc);
