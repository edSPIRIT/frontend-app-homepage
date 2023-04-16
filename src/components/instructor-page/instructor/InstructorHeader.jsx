import { Breadcrumb, Button, Icon } from '@edx/paragon';
import {
  ArrowBack, BookOpen, People, Share,
} from '@edx/paragon/icons';
import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { Link, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ReactComponent as Linkedin } from '../../../assets/linkedin.svg';
import { ReactComponent as Facebook } from '../../../assets/facebook.svg';
import { ReactComponent as Globe } from '../../../assets/language-filled.svg';
import { ReactComponent as Twitter } from '../../../assets/twitter.svg';
import InstructorSkeleton from './InstructorSkeleton';

const InstructorHeader = ({ InstructorData, loading }) => {
  const [showMore, setShowMore] = useState(false);
  const [showShowMoreButton, setShowMoreButton] = useState(false);
  const history = useHistory();
  const pElement = useRef(null);
  useEffect(() => {
    if (pElement.current?.offsetHeight >= 112) {
      setShowMoreButton(true);
    }
  }, [pElement.current?.offsetHeight]);
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
            links={[{ label: 'Home', to: '/home' }]}
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
                    src={InstructorData?.image}
                    alt="instructor-img"
                  />
                </div>
                <Icon
                  src={Share}
                  className="instructor-share-icon-mobile d-none"
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
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
                    }}
                  />
                </div>
                <span className="short-bio mb-3">
                  {InstructorData?.short_bio}
                </span>
                <div>
                  <p
                    ref={pElement}
                    className={classNames('mb-2', {
                      'long-bio-instructor': !showMore,
                    })}
                  >
                    {InstructorData?.bio}
                  </p>
                  {showShowMoreButton && (
                    <Button
                      variant="tertiary"
                      className="showMore-btn"
                      onClick={() => setShowMore(!showMore)}
                    >
                      {showMore ? 'Show less' : 'Show more'}
                    </Button>
                  )}
                </div>
                <div className="instructor-icons-wrapper pt-4 mt-auto">
                  <div className="d-flex ">
                    <div className="d-flex mr-4.5 align-items-center">
                      <Icon src={People} className="mr-2" />
                      <p>
                        <span>0 Students</span>
                      </p>
                    </div>
                    <div className="d-flex">
                      <Icon src={BookOpen} className="mr-2" />
                      <p>
                        <span>{InstructorData?.courses?.length} Courses</span>
                      </p>
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
                        <Icon src={Globe} className="social-icon-footer" />
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
  }),
  loading: PropTypes.bool,
};
InstructorHeader.defaultProps = {
  InstructorData: {},
  loading: false,
};
export default InstructorHeader;
