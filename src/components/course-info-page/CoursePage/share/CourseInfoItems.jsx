/* eslint-disable react/prop-types */
import { FormattedMessage } from '@edx/frontend-platform/i18n';
import { Icon, OverlayTrigger, Tooltip } from '@edx/paragon';
import {
  HowToReg, Language, PostOutline, Verified,
} from '@edx/paragon/icons';
import React from 'react';
import { getLangName } from '../../../../utils/transcriptLang';

const CourseInfoItems = ({ courseMetaData }) => (
  <>
    {courseMetaData?.additional_metadata?.language && (
      <OverlayTrigger
        placement="top"
        overlay={(
          <Tooltip variant="light" id="tooltip-top" className="course-tooltip">
            <FormattedMessage
              id="search.facets.language"
              defaultMessage="Language"
            />
          </Tooltip>
        )}
      >
        <div className="d-flex align-items-start mb-2">
          <Icon src={Language} />
          <span>
            {getLangName(courseMetaData?.additional_metadata?.language)}
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
                <span key={transLang}>{getLangName(transLang)}</span>
              ))}
            </Tooltip>
          )}
        >
          <div className="d-flex align-items-start mb-2">
            <Icon src={PostOutline} />
            <span className="course-tooltip transcript-title">
              {courseMetaData?.transcript_langs?.map((transLang) => (
                <span key={transLang}>{getLangName(transLang)}</span>
              ))}
            </span>
          </div>
        </OverlayTrigger>
    )}
    <div className="d-flex align-items-start mb-2">
      <Icon src={HowToReg} />
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
      <div className="d-flex align-items-start mb-2">
        <Icon src={Verified} />
        <FormattedMessage
          id="courseInfo.verifiedCertificate.text"
          defaultMessage="Verified certificate"
        />
      </div>
    )}
  </>
);

export default CourseInfoItems;
