import {
  Breadcrumb, Button, Icon, Skeleton,
} from '@edx/paragon';
import { Link, useHistory, useParams } from 'react-router-dom';
import {
  ArrowForwardIos,
  BookOpen,
  DrawShapes,
  Groups,
  Share,
} from '@edx/paragon/icons';
import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import partnerBanner from '../../assets/card-image-cap-partner.png';
import CourseCard from '../shared/course-card/CourseCard';
import { COURSES_INFO } from '../../constants';
import Instructors from './partner-page/Instructors';
import useGetPartner from '../../hooks/useGetPartner';
import logoPlaceholder from '../../assets/card-placeholder.png';

const PartnerPage = () => {
  const { slug } = useParams();
  const { partnerData, loading } = useGetPartner(slug);
  const [showMore, setShowMore] = useState(false);
  const [showShowMoreButton, setShowMoreButton] = useState(false);
  const pElement = useRef(null);
  const history = useHistory();

  useEffect(() => {
    if (pElement.current?.offsetHeight >= 112) {
      setShowMoreButton(true);
    }
  }, [pElement.current?.offsetHeight]);
  return (
    <section>
      <div className="custom-container py-4.5">
        <Breadcrumb
          ariaLabel="Breadcrumb basic"
          links={[
            { label: 'Home', to: '/home' },
            { label: 'Our-Partners', to: '/partners' },
          ]}
          linkAs={Link}
          activeLabel={slug}
        />
      </div>
      <div className="banner-container">
        <div className="partner-img-wrapper">
          <img
            src={partnerData.header ? partnerData.header : partnerBanner}
            alt="partnerBanner"
          />
        </div>
        <div className="partner-logo-wrapper">
          <img
            src={partnerData.organization.logo ?? logoPlaceholder}
            alt="partnerLogo"
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
            <h1>{partnerData.organization.name}</h1>
          )}
          <Icon
            className="color-gray-500 share-icon"
            src={Share}
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
            }}
          />
        </div>
        <div>
          <p
            ref={pElement}
            className={classNames('mb-2', {
              'long-desc-break': !showMore,
            })}
          >
            {loading ? (
              <Skeleton count={4} width="100%" height={24} />
            ) : (
              partnerData.organization.description
            )}
          </p>
          {showShowMoreButton && (
            <Button
              variant="tertiary"
              className="showMore-btn mb-4"
              onClick={() => setShowMore(!showMore)}
            >
              {showMore ? 'Show less' : 'Show more'}
            </Button>
          )}
        </div>
        <div className="d-flex justify-content-center partner-snapshot-wrapper mt-2">
          <a className="icon-wrapper" href="#courses">
            <Icon src={BookOpen} style={{ width: '36px' }} />
            <span className="partner-title">Courses</span>
            <span className="partner-count">{partnerData.courses_count}</span>
          </a>
          <div className="vertical-line" />
          <div className="icon-wrapper" href="#">
            <Icon src={DrawShapes} />
            <span className="partner-title">Learners</span>
            <span className="partner-count">0</span>
          </div>
          <div className="vertical-line" />
          <a className="icon-wrapper" href="#instructors">
            <Icon src={Groups} />
            <span className="partner-title">Instructors</span>
            <span className="partner-count">0</span>
          </a>
        </div>
      </div>
      <div
        className="custom-container d-flex flex-column pt-5 pb-5.5"
        id="courses"
      >
        <h2 className="d-flex justify-content-center mb-4">
          <h2 className="d-flex justify-content-center mb-4">
            Popular<span className="highlighted ml-2">Courses</span>
          </h2>
        </h2>
        <div className="course-container">
          {COURSES_INFO.map((course) => (
            <CourseCard info={course} key={course.title} />
          ))}
        </div>
        <div className="d-flex justify-content-center">
          <Button
            className="view-all-course-btn"
            iconAfter={ArrowForwardIos}
            onClick={() => history.push('/search')}
          >
            View all Courses
          </Button>
        </div>
      </div>
      {/* <div className="custom-container d-flex flex-column pb-6" id="programs">
        <h2 className="d-flex justify-content-center mb-4">
          <h2 className="d-flex justify-content-center mb-4">
            Popular<span className="highlighted ml-2">Programs</span>
          </h2>
        </h2>
        <div className="programs-container">
          {TOP_PROGRAM.map((course) => (
            <ProgramCard info={course} key={course.title} />
          ))}
        </div>
        <div className="d-flex justify-content-center">
          <Button className="view-all-course-btn" iconAfter={ArrowForwardIos}>
            View all Courses
          </Button>
        </div>
      </div> */}
      <Instructors />
    </section>
  );
};
export default PartnerPage;
