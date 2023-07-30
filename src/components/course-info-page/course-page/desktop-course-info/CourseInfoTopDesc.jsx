import {
  Icon, OverlayTrigger, Skeleton, Tooltip,
} from '@edx/paragon';
import React from 'react';
import { Link } from 'react-router-dom';
import {
  Share,
  Language,
  PostOutline,
  HowToReg,
  Verified,
} from '@edx/paragon/icons';
import PropTypes from 'prop-types';
import ShowMoreText from 'react-show-more-text';
import { FormattedMessage } from '@edx/frontend-platform/i18n';
import { useDispatch } from 'react-redux';
import { setToastMessage } from '../../../../redux/slice/toastSlice';
import getTransLangName from '../../../../utils/transcriptLang';

const CourseInfoTopDesc = ({ courseMetaData, loading, navTopRef }) => {
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
                    dispatch(
                      setToastMessage(
                        'The link has been saved to your clipboard',
                      ),
                    );
                  }}
                />
              </div>
              <Link
                to={`/partners/${courseMetaData?.partner?.organization?.short_name}`}
                className="course-institution"
              >
                {courseMetaData.additional_metadata?.org}
              </Link>
            </div>
            <ShowMoreText
              lines={3}
              more="Show more"
              less="Show less"
              className="d-flex flex-column pt-3.5"
              anchorClass="show-more-less-clickable"
              expanded={false}
              truncatedEndingComponent="... "
            >
              <p>{courseMetaData?.additional_metadata?.short_description}</p>
            </ShowMoreText>
            <div
              className="icons-wrapper d-flex text-gray-500 mt-3 pb-4.5 font-sm"
              ref={navTopRef}
            >
              {courseMetaData?.additional_metadata?.language && (
                <OverlayTrigger
                  placement="top"
                  overlay={(
                    <Tooltip
                      variant="light"
                      id="tooltip-top"
                      className="course-tooltip"
                    >
                      <FormattedMessage
                        id="search.facets.language"
                        defaultMessage="Language"
                      />
                    </Tooltip>
                  )}
                >
                  <div className="d-flex justify-content-center align-items-center mr-4.5">
                    <Icon className="mr-2" src={Language} />
                    <span>
                      {getTransLangName(
                        courseMetaData?.additional_metadata?.language,
                      )}
                    </span>
                  </div>
                </OverlayTrigger>
              )}
              {courseMetaData?.transcript_langs
                && courseMetaData?.transcript_langs.length > 0 && (
                  <OverlayTrigger
                    placement="top"
                    overlay={(
                      <Tooltip
                        variant="light"
                        id="tooltip-top"
                        className="course-tooltip"
                      >
                        {courseMetaData?.transcript_langs?.map((transLang) => (
                          <span key={transLang}>
                            {getTransLangName(transLang)}
                          </span>
                        ))}
                      </Tooltip>
                    )}
                  >
                    <div className="d-flex justify-content-center align-items-center mr-4.5">
                      <Icon className="mr-2" src={PostOutline} />
                      <span className="course-tooltip transcript-title">
                        {courseMetaData?.transcript_langs?.map((transLang) => (
                          <span key={transLang}>
                            {getTransLangName(transLang)}
                          </span>
                        ))}
                      </span>
                    </div>
                  </OverlayTrigger>
              )}
              <div className="d-flex justify-content-center align-items-center mr-4.5">
                <Icon className="mr-2" src={HowToReg} />
                {courseMetaData?.additional_metadata?.self_paced ? (
                  <FormattedMessage
                    id="courseInfo.selfPaced.text"
                    defaultMessage="Self Paced"
                  />
                ) : (
                  <FormattedMessage
                    id="courseInfo.instructorPaced.text"
                    defaultMessage="Instructor Paced"
                  />
                )}
              </div>
              {courseMetaData?.additional_metadata?.certificate_enabled && (
                <div className="d-flex justify-content-center align-items-center mr-4.5">
                  <Icon className="mr-2" src={Verified} />
                  <FormattedMessage
                    id="courseInfo.verifiedCertificate.text"
                    defaultMessage="Verified certificate"
                  />
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
CourseInfoTopDesc.propTypes = {
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
      subject: PropTypes.shape({
        image: PropTypes.string,
        popular: PropTypes.string,
        slug: PropTypes.string,
        title: PropTypes.string,
      }),
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
  navTopRef: PropTypes.element,
};
CourseInfoTopDesc.defaultProps = {
  courseMetaData: [],
  loading: false,
  navTopRef: undefined,
};

export default CourseInfoTopDesc;
