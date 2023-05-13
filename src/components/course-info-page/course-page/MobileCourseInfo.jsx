import { useParams } from 'react-router';
import Scrollspy from 'react-scrollspy';
import { Link } from 'react-scroll';
import {
  Icon, OverlayTrigger, Tooltip, useMediaQuery,
} from '@edx/paragon';
import {
  HowToReg,
  Language,
  Share,
  Verified,
  PostOutline,
  WatchFilled,
  Event,
  Record,
} from '@edx/paragon/icons';
import { getConfig } from '@edx/frontend-platform';
import {
  FormattedMessage,
  injectIntl,
  intlShape,
} from '@edx/frontend-platform/i18n';
import useGetCourseMetaData from '../../../hooks/useGetCourseMetaData';
import AboutCourse from './AboutCourse';
import WhatYouLearn from './WhatYouLearn';
import Requirements from './Requirements';
import CourseContent from './CourseContent';
import CourseInfoButtonStatus from '../shared/CourseInfoButtonStatus';
import MobileCourseInstructors from './course-instructors/mobile-course-info/MobileCourseInstructors';
import partnerBanner from '../../../assets/place-holders/cover-course-place-holder.svg';
import logoPlaceholder from '../../../assets/place-holders/org-logo-place-holder.svg';
import messages from '../../../messages';

const MobileCourseInfo = ({ intl }) => {
  const { slug } = useParams();
  const { courseMetaData, loading } = useGetCourseMetaData(slug);
  const isTablet = useMediaQuery({ minWidth: '600px', maxWidth: '768px' });

  return (
    <section className="pb-6 mobile-course-info-container">
      <div className="sticky-nav-wrapper custom-container">
        <Scrollspy
          items={[
            'info-course',
            'about-course',
            'what-you-learn',
            'requirement',
            'course-content',
            'instructors',
          ]}
          currentClassName="active-item"
          offset={-70}
        >
          <li>
            <Link to="info-course" smooth offset={-120}>
              <FormattedMessage
                id="courseInfo.tab.info.text"
                defaultMessage="Info"
              />
            </Link>
          </li>
          <li>
            <Link to="about-course" smooth offset={-20}>
              <FormattedMessage
                id="courseInfo.tab.about.text"
                defaultMessage="About"
              />
            </Link>
          </li>
          <li>
            <Link to="what-you-learn" smooth offset={-20}>
              <FormattedMessage
                id="courseInfo.tab.whatYouWillLearn.text"
                defaultMessage="What you'll learn"
              />
            </Link>
          </li>

          <li>
            <Link to="requirement" smooth offset={-20}>
              <FormattedMessage
                id="courseInfo.tab.requirements.text"
                defaultMessage="Requirements"
              />
            </Link>
          </li>

          <li>
            <Link to="course-content" smooth offset={-20}>
              <FormattedMessage
                id="courseInfo.tab.courseContent.text"
                defaultMessage="Course content"
              />
            </Link>
          </li>
          <li>
            <Link to="instructors" smooth offset={-60}>
              <FormattedMessage
                id="courseInfo.tab.instructors.text"
                defaultMessage="Instructors"
              />
            </Link>
          </li>
        </Scrollspy>
      </div>
      {isTablet ? (
        <>
          <div className="course-cover-container">
            <div className="partner-img-wrapper">
              <img
                src={
                  `${getConfig().LMS_BASE_URL}${
                    courseMetaData?.additional_metadata?.course_image_url
                  }` ?? partnerBanner
                }
                alt="course-banner"
              />
            </div>
            <div className="partner-logo-container">
              <div className="partner-logo-wrapper">
                <img
                  src={
                    courseMetaData?.partner?.organization.logo
                    ?? logoPlaceholder
                  }
                  alt="partnerLogo"
                />
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-between custom-container">
            <h1 className="mb-1">
              {courseMetaData?.additional_metadata?.display_name}
            </h1>
            <Icon
              className="share-icon"
              src={Share}
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
              }}
            />
          </div>
        </>
      ) : (
        <div className="custom-container">
          <div className="course-info-img-wrapper mb-4">
            <div className="d-flex justify-content-between pt-4">
              <div className="org-img-wrapper">
                <img
                  className="org-img"
                  src={
                    courseMetaData?.partner?.organization?.logo
                    ?? logoPlaceholder
                  }
                  alt="org-img"
                />
              </div>
              <Icon
                className="share-icon"
                src={Share}
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                }}
              />
            </div>
          </div>
          <div className="d-flex justify-content-between title-share-wrapper">
            <h1 className="mb-1">
              {courseMetaData?.additional_metadata?.display_name}
            </h1>
            <Icon
              className="share-icon"
              src={Share}
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
              }}
            />
          </div>
        </div>
      )}
      <div className="d-flex flex-column custom-container">
        <Link
          to={`/partners/${courseMetaData?.partner?.organization?.short_name}`}
          className="course-institution"
        >
          {courseMetaData?.additional_metadata?.org}
        </Link>
        <div id="info-course" className="pt-3.5 pb-4.5">
          <p>{courseMetaData?.additional_metadata?.short_description}</p>
          <div className="mobile-icons-wrapper mt-4 font-sm">
            <div className="d-flex align-items-center mb-3">
              <Icon className="mr-2" src={Language} />
              <span>English</span>
            </div>
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
                      {courseMetaData?.transcript_langs
                        && courseMetaData?.transcript_langs?.map(
                          (transLang, i) => (
                            // eslint-disable-next-line react/no-array-index-key
                            <span key={i}>{transLang}</span>
                          ),
                        )}
                    </Tooltip>
                  )}
                >
                  <div className="d-flex align-items-center mb-3">
                    <Icon className="mr-2" src={PostOutline} />
                    <span className="course-tooltip">
                      {courseMetaData?.transcript_langs
                        && courseMetaData?.transcript_langs?.map(
                          (transLang, i) => (
                            // eslint-disable-next-line react/no-array-index-key
                            <span key={i}>{transLang}</span>
                          ),
                        )}
                    </span>
                  </div>
                </OverlayTrigger>
            )}
            {courseMetaData?.additional_metadata?.self_paced && (
              <div className="d-flex align-items-center mb-3">
                <Icon className="mr-2" src={HowToReg} />
                <FormattedMessage
                  id="courseInfo.selfPaced.text"
                  defaultMessage="Self Paced"
                />
              </div>
            )}
            {courseMetaData?.additional_metadata?.certificate_enabled && (
              <div className="d-flex align-items-center mb-3">
                <Icon className="mr-2" src={Verified} />
                <FormattedMessage
                  id="courseInfo.verifiedCertificate.text"
                  defaultMessage="Verified certificate"
                />
              </div>
            )}
            <div className="d-flex flex-row align-items-center mb-3">
              <Icon className="mr-2" src={Record} />
              <p className="program-instructors-wrapper">
                {courseMetaData?.instructors?.map((ins) => (
                  <Link
                    key={ins.name}
                    className="instructor-title"
                    to={`/instructor/${ins.slug}`}
                  >
                    {ins.name}
                  </Link>
                ))}
              </p>
            </div>
            <div className="d-flex flex-row align-items-center mb-3">
              <Icon className="mr-2" src={Event} />
              <p>
                <span className="color-black">
                  {' '}
                  <FormattedMessage
                    id="courseInfo.starting.text"
                    defaultMessage="Starting"
                  />
                </span>{' '}
                <span className="color-gray-700">(6 January 2022)</span>
              </p>
            </div>
            <div className="d-flex flex-row align-items-center mb-3">
              <Icon className="mr-2" src={Event} />
              <p>
                <span className="color-black">
                  {' '}
                  <FormattedMessage
                    id="courseInfo.ending.text"
                    defaultMessage="Ending"
                  />
                </span>{' '}
                <span className="color-gray-700">(3 August 2022)</span>
              </p>
            </div>
            {courseMetaData?.total_weeks_of_effort > 0 && (
              <div className="d-flex flex-row align-items-center mb-3">
                <Icon className="card-icon" src={WatchFilled} />
                <p className="color-black">
                  <span>{courseMetaData?.total_weeks_of_effort}</span>
                  <span>
                    {' '}
                    <FormattedMessage
                      id="courseCard.weeks.text"
                      defaultMessage="Weeks"
                    />
                  </span>
                  {courseMetaData?.hours_effort_per_week_min
                    && courseMetaData?.hours_effort_per_week_max && (
                      <span className="color-gray-700">
                        {' '}
                        {`(${courseMetaData?.hours_effort_per_week_min}-${
                          courseMetaData?.hours_effort_per_week_max
                        } ${intl.formatMessage(
                          messages['courseCard.hoursPerWeek.text'],
                        )})`}
                      </span>
                  )}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="course-content-container">
        <div className="custom-container">
          <AboutCourse aboutCourse={courseMetaData?.about} loading={loading} />
        </div>
        <WhatYouLearn
          learningItems={courseMetaData?.what_you_will_learn}
          loading={loading}
        />
        <div className="custom-container">
          {courseMetaData?.requirements?.length > 0 && (
            <Requirements courseMetaData={courseMetaData} loading={loading} />
          )}
          <CourseContent
            courseId={courseMetaData?.course_id}
            loading={loading}
          />
          <MobileCourseInstructors
            instructors={courseMetaData?.instructors}
            loading={loading}
          />
        </div>
      </div>
      <div className="d-flex justify-content-between py-3 px-4 price-wrapper">
        <div className="d-flex flex-column">
          <h2>
            {courseMetaData?.paid_course.price === 0 ? (
              <FormattedMessage
                id="courseCard.free.text"
                defaultMessage="Free"
              />
            ) : (
              courseMetaData?.paid_course?.price_human
            )}
          </h2>
          <span className="font-sm">
            <FormattedMessage
              id="courseInfo.lifetimeAccess.text"
              defaultMessage="Lifetime access"
            />
          </span>
        </div>
        <CourseInfoButtonStatus courseMetaData={courseMetaData} />
      </div>
    </section>
  );
};

MobileCourseInfo.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(MobileCourseInfo);
