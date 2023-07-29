/* eslint-disable react/prop-types */
import { Icon, Skeleton } from '@edx/paragon';
import { BookOpen, Groups, Share } from '@edx/paragon/icons';
import ShowMoreText from 'react-show-more-text';
import { FormattedMessage, FormattedNumber } from '@edx/frontend-platform/i18n';
import { useDispatch } from 'react-redux';
import partnerBanner from '../../../assets/place-holders/cover-course-place-holder.svg';
import logoPlaceholder from '../../../assets/place-holders/org-place-holder.svg';
import { ReactComponent as Instructors } from '../../../assets/instructors.svg';
import { setToastMessage } from '../../../redux/slice/toastSlice';

const PartnerHeader = ({ partnerData, loading }) => {
  const dispatch = useDispatch();
  return (
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
              dispatch(
                setToastMessage('The link has been saved to your clipboard'),
              );
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
              dispatch(
                setToastMessage('The link has been saved to your clipboard'),
              );
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
            <Icon src={BookOpen} style={{ width: '40px' }} />
            <p className="partner-count">
              <FormattedNumber value={partnerData?.courses_count} />
            </p>
            <span className="partner-title">
              <FormattedMessage
                id="partners.snapShut.courses.text"
                defaultMessage="{courseCount, plural, one {Course} other {Courses}}"
                values={{
                  courseCount: partnerData?.courses_count,
                }}
              />
            </span>
          </a>
          <div className="vertical-line" />
          <div className="icon-wrapper" href="#">
            <Icon src={Groups} style={{ width: '40px' }} />
            <span className="partner-count">
              <FormattedNumber value={partnerData?.students_count} />
            </span>
            <span className="partner-title">
              <FormattedMessage
                id="partners.snapShut.learners.text"
                defaultMessage="{learnerCount, plural, one {Learner} other {Learners}}"
                values={{
                  learnerCount: partnerData?.students_count,
                }}
              />
            </span>
          </div>
          <div className="vertical-line" />
          <a className="icon-wrapper" href="#instructors">
            <Icon src={Instructors} style={{ width: '40px' }} />
            <span className="partner-count">
              <FormattedNumber value={partnerData?.instructors_count} />
            </span>
            <span className="partner-title">
              <FormattedMessage
                id="partners.snapShut.instructors.text"
                defaultMessage="{instructorCount, plural, one {Instructor} other {Instructors}}"
                values={{
                  instructorCount: partnerData?.instructors_count,
                }}
              />
            </span>
          </a>
        </div>
      </div>
    </>
  );
};

export default PartnerHeader;
