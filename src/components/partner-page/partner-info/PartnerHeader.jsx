/* eslint-disable react/prop-types */
import { Icon, Skeleton } from '@edx/paragon';
import {
  BookOpen, DrawShapes, Groups, Share,
} from '@edx/paragon/icons';
import ShowMoreText from 'react-show-more-text';
import { FormattedMessage } from '@edx/frontend-platform/i18n';
import partnerBanner from '../../../assets/place-holders/cover-course-place-holder.svg';
import logoPlaceholder from '../../../assets/place-holders/org-logo-place-holder.svg';

const PartnerHeader = ({ partnerData, loading }) => (
  <>
    <div className="banner-container">
      <div className="partner-img-wrapper">
        <img src={partnerData?.header ?? partnerBanner} alt="partnerBanner" />
      </div>
      <div className="partner-logo-container">
        <div className="partner-logo-wrapper">
          <img
            src={partnerData?.organization.logo ?? logoPlaceholder}
            alt="partnerLogo"
          />
        </div>
        <Icon
          className="text-gray-500 share-icon"
          src={Share}
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
          }}
        />
      </div>
    </div>
    <div className="custom-container desc-partner-wrapper">
      <div className="d-flex justify-content-between align-items-center mb-3">
        {loading ? (
          <div className="w-100">
            <Skeleton width="30%" height={44} />
          </div>
        ) : (
          <h1>{partnerData?.organization.name}</h1>
        )}
        <Icon
          className="text-gray-500 share-icon"
          src={Share}
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
          }}
        />
      </div>
      <ShowMoreText
        lines={3}
        more="Show more"
        less="Show less"
        className="content-css long-bio-instructor"
        anchorClass="show-more-less-clickable"
        expanded={false}
        truncatedEndingComponent="... "
      >
        <p className="mb-2">
          {loading ? (
            <Skeleton count={4} width="100%" height={24} />
          ) : (
            partnerData?.organization?.description
          )}
        </p>
      </ShowMoreText>

      <div className="d-flex justify-content-center partner-snapshot-wrapper">
        <a className="icon-wrapper" href="#courses">
          <Icon src={BookOpen} />
          <span className="partner-title">
            <FormattedMessage id="courses.text" defaultMessage="Courses" />
          </span>
          <span className="partner-count">{partnerData?.courses_count}</span>
        </a>
        <div className="vertical-line" />
        <div className="icon-wrapper" href="#">
          <Icon src={DrawShapes} />
          <span className="partner-title">
            <FormattedMessage id="learners.text" defaultMessage="Learners" />
          </span>
          <span className="partner-count">
            {partnerData?.students?.total_count}
          </span>
        </div>
        <div className="vertical-line" />
        <a className="icon-wrapper" href="#instructors">
          <Icon src={Groups} />
          <span className="partner-title">
            <FormattedMessage
              id="instructors.text"
              defaultMessage="Instructors"
            />
          </span>
          <span className="partner-count">
            {partnerData?.instructors?.total_count}
          </span>
        </a>
      </div>
    </div>
  </>
);

export default PartnerHeader;
