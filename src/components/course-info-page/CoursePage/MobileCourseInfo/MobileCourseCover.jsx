/* eslint-disable react/prop-types */
import { getConfig } from '@edx/frontend-platform';
import { Icon, useMediaQuery } from '@edx/paragon';
import { Share } from '@edx/paragon/icons';
import React from 'react';
import { useDispatch } from 'react-redux';
import SharedToastMessage from '../../../shared/base-components/SharedToastMessage';
import partnerBanner from '../../../../assets/place-holders/cover-course-place-holder.svg';
import logoPlaceholder from '../../../../assets/place-holders/org-place-holder.svg';
import { setToastMessage } from '../../../../redux/slice/toastSlice';

const MobileCourseCover = ({ courseMetaData }) => {
  const isTablet = useMediaQuery({ minWidth: '600px', maxWidth: '768px' });
  const dispatch = useDispatch();

  const handleShareClick = () => {
    navigator.clipboard.writeText(window.location.href);
    dispatch(setToastMessage(<SharedToastMessage />));
  };

  return (
    <>
      {isTablet ? (
        <div className="course-cover-container">
          <div className="partner-img-wrapper">
            <img
              src={`${getConfig().LMS_BASE_URL}${
                courseMetaData?.additional_metadata?.course_image_url
                || partnerBanner
              }`}
              alt="course-banner"
            />
          </div>
          <div className="partner-logo-container">
            <div className="partner-logo-wrapper">
              <img
                src={
                  courseMetaData?.partner?.organization.logo || logoPlaceholder
                }
                alt="partnerLogo"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="course-info-img-wrapper mb-4 custom-container">
          <div className="d-flex justify-content-between pt-4">
            <div className="org-img-wrapper">
              <img
                className="org-img"
                src={
                  courseMetaData?.partner?.organization?.logo || logoPlaceholder
                }
                alt="org-img"
              />
            </div>
            <Icon
              className="share-icon"
              src={Share}
              onClick={handleShareClick}
            />
          </div>
        </div>
      )}

      <div className="d-flex justify-content-between title-share-wrapper custom-container">
        <h1 className="mb-1">
          {courseMetaData?.additional_metadata?.display_name}
        </h1>
        <Icon className="share-icon" src={Share} onClick={handleShareClick} />
      </div>
    </>
  );
};

export default MobileCourseCover;
