import { Breadcrumb, Icon } from '@edx/paragon';
import {
  ArrowBack, BookOpen, Groups, Share,
} from '@edx/paragon/icons';
import { Link, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import ShowMoreText from 'react-show-more-text';
import {
  FormattedMessage,
  injectIntl,
  intlShape,
} from '@edx/frontend-platform/i18n';
import { useDispatch } from 'react-redux';
import { ReactComponent as Linkedin } from '../../../assets/linkedin.svg';
import { ReactComponent as Facebook } from '../../../assets/facebook.svg';
import { ReactComponent as Globe } from '../../../assets/language-filled.svg';
import { ReactComponent as Twitter } from '../../../assets/twitter.svg';
import userAvatar from '../../../assets/place-holders/user-placeholder.svg';
import InstructorSkeleton from './InstructorSkeleton';
import messages from '../../../messages';
import { setToastMessage } from '../../../redux/slice/toastSlice';
import SharedToastMessage from '../../shared/base-components/SharedToastMessage';

const InstructorHeader = ({ InstructorData, loading, intl }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  return (
    <>
      <div className="d-flex px-4.5 py-3 align-items-center back-btn-wrapper">
        <Icon src={ArrowBack} onClick={history.goBack} className="mr-1.5" />
        <h4 className="ml-3.5"> {InstructorData?.name}</h4>
      </div>
      <div className="d-flex instructor-header flex-column">
        <div className="custom-container pb-5 breadcrumb-wrapper">
          <Breadcrumb
            ariaLabel="Breadcrumb basic"
            links={[
              {
                label: `${intl.formatMessage(messages['breadcrumb.home'])}`,
                to: '/',
              },
            ]}
            linkAs={Link}
            activeLabel={InstructorData?.name}
          />
        </div>
        <div className="d-flex custom-container header-container">
          {loading ? (
            <InstructorSkeleton />
          ) : (
            <>
              <div className="d-flex justify-content-between img-container">
                <div className="instructor-img-wrapper">
                  <img
                    className="img-instructor"
                    src={InstructorData?.image ?? userAvatar}
                    alt="instructor-img"
                  />
                </div>
                <Icon
                  src={Share}
                  className="instructor-share-icon-mobile d-none"
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    dispatch(setToastMessage(<SharedToastMessage />));
                  }}
                />
              </div>
              <div className="d-flex flex-column w-100">
                <div className="d-flex justify-content-between align-items-center">
                  <h1>{InstructorData?.name}</h1>
                  <Icon
                    src={Share}
                    className="instructor-share-icon"
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                      dispatch(setToastMessage(<SharedToastMessage />));
                    }}
                  />
                </div>
                <span className="short-bio mb-3">
                  {InstructorData?.short_bio}
                </span>
                <ShowMoreText
                  lines={3}
                  more={intl.formatMessage(messages['showMore.text'])}
                  less={intl.formatMessage(messages['showLess.text'])}
                  className="content-css long-bio-instructor"
                  anchorClass="show-more-less-clickable"
                  expanded={false}
                  truncatedEndingComponent="... "
                >
                  <p className="mb-2">{InstructorData?.bio}</p>
                </ShowMoreText>
                <div className="instructor-icons-wrapper pt-4 mt-auto">
                  <div className="instructor-specs">
                    <div className="d-flex mr-4.5 align-items-center">
                      <Icon src={Groups} className="mr-2" />
                      <FormattedMessage
                        id="learners.text"
                        defaultMessage="{learnerCount, number} {learnerCount, plural, one {Learner} other {Learners}}"
                        values={{
                          learnerCount: InstructorData?.students_count,
                        }}
                      />
                    </div>
                    <div className="d-flex align-items-center">
                      <Icon src={BookOpen} className="mr-2" />
                      <FormattedMessage
                        id="instructor.courses.text"
                        defaultMessage="{courseCount, number} {courseCount, plural, one {Course} other {Courses}}"
                        values={{
                          courseCount: InstructorData?.courses?.length,
                        }}
                      />
                    </div>
                  </div>
                  <div className="social-container">
                    {InstructorData?.twitter && (
                      <a
                        href={InstructorData?.twitter}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <Icon className="social-icon-footer" src={Twitter} />
                      </a>
                    )}
                    {InstructorData?.linkedin && (
                      <a
                        href={InstructorData?.linkedin}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <Icon className="social-icon-footer" src={Linkedin} />
                      </a>
                    )}
                    {InstructorData?.facebook && (
                      <a
                        href={InstructorData?.facebook}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <Icon className="social-icon-footer" src={Facebook} />
                      </a>
                    )}
                    {InstructorData?.website && (
                      <a
                        href={InstructorData?.website}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <Icon className="social-icon-footer" src={Globe} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};
InstructorHeader.propTypes = {
  InstructorData: PropTypes.shape({
    bio: PropTypes.string,
    // eslint-disable-next-line react/forbid-prop-types
    courses: PropTypes.object,
    facebook: PropTypes.string,
    image: PropTypes.string,
    linkedin: PropTypes.string,
    name: PropTypes.string,
    short_bio: PropTypes.string,
    slug: PropTypes.string,
    twitter: PropTypes.string,
    website: PropTypes.string,
    students_count: PropTypes.number,
  }),
  loading: PropTypes.bool,
  intl: intlShape.isRequired,
};
InstructorHeader.defaultProps = {
  InstructorData: {},
  loading: false,
};

export default injectIntl(InstructorHeader);
