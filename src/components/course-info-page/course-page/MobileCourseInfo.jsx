import { useParams } from 'react-router';
import Scrollspy from 'react-scrollspy';
import { Link } from 'react-scroll';
import { Icon, useMediaQuery } from '@edx/paragon';
import {
  HowToReg,
  Language,
  Share,
  Verified,
  PostOutline,
  WatchFilled,
  Event,
  Record,
  InfoOutline,
} from '@edx/paragon/icons';
import { getConfig } from '@edx/frontend-platform';
import {
  FormattedDate,
  FormattedMessage,
  FormattedNumber,
  injectIntl,
  intlShape,
} from '@edx/frontend-platform/i18n';
import { useDispatch } from 'react-redux';
import useGetCourseMetaData from '../../../hooks/useGetCourseMetaData';
import AboutCourse from './share/AboutCourse';
import WhatYouLearn from './share/WhatYouLearn';
import Requirements from './share/Requirements';
import CourseContent from './share/CourseContent';
import MobileCourseInstructors from './mobile-course-info/MobileCourseInstructors';
import partnerBanner from '../../../assets/place-holders/cover-course-place-holder.svg';
import logoPlaceholder from '../../../assets/place-holders/org-place-holder.svg';
import messages from '../../../messages';
import { setToastMessage } from '../../../redux/slice/toastSlice';
import SharedToastMessage from '../../shared/base-components/SharedToastMessage';
import useGetInstructorCourses from '../../../hooks/useGetCourseInstructors';
import { getLangName } from '../../../utils/transcriptLang';
import MobilePriceWrapper from './mobile-course-info/MobilePriceWrapper';
import useGetCourseToc from '../../../hooks/useGetCourseToc';

const MobileCourseInfo = ({ intl }) => {
  const { slug } = useParams();
  const { courseMetaData, loading } = useGetCourseMetaData(slug);
  const { instructors } = useGetInstructorCourses(slug);
  const isTablet = useMediaQuery({ minWidth: '600px', maxWidth: '768px' });
  const { sections } = useGetCourseToc(courseMetaData?.course_id);
  const dispatch = useDispatch();
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
          {courseMetaData?.additional_metadata?.about_overview ? (
            <li>
              <Link to="about-course" smooth offset={-20}>
                <FormattedMessage
                  id="courseInfo.tab.about.text"
                  defaultMessage="About"
                />
              </Link>
            </li>
          ) : (
            <span className="d-flex align-items-center disable-link">
              <FormattedMessage
                id="courseInfo.tab.about.text"
                defaultMessage="About"
              />
            </span>
          )}
          {courseMetaData?.what_you_will_learn.length > 0 ? (
            <li>
              <Link to="what-you-learn" smooth offset={-20}>
                <FormattedMessage
                  id="courseInfo.tab.whatYouWillLearn.text"
                  defaultMessage="What you'll learn"
                />
              </Link>
            </li>
          ) : (
            <span className="d-flex align-items-center disable-link">
              <FormattedMessage
                id="courseInfo.tab.whatYouWillLearn.text"
                defaultMessage="What you'll learn"
              />
            </span>
          )}
          {courseMetaData?.requirements?.length > 0
          || courseMetaData?.additional_metadata?.pre_req_courses?.length > 0 ? (
            <li>
              <Link to="requirement" smooth offset={-20}>
                <FormattedMessage
                  id="courseInfo.tab.requirements.text"
                  defaultMessage="Requirements"
                />
              </Link>
            </li>
            ) : (
              <span className="d-flex align-items-center disable-link">
                <FormattedMessage
                  id="courseInfo.tab.requirements.text"
                  defaultMessage="Requirements"
                />
              </span>
            )}
          {sections?.length > 0 ? (
            <li>
              <Link to="course-content" smooth offset={-20}>
                <FormattedMessage
                  id="courseInfo.tab.courseContent.text"
                  defaultMessage="Course content"
                />
              </Link>
            </li>
          ) : (
            <span className="d-flex align-items-center disable-link">
              <FormattedMessage
                id="courseInfo.tab.courseContent.text"
                defaultMessage="Course content"
              />
            </span>
          )}
          {instructors?.length > 0 ? (
            <li>
              <Link to="instructors" smooth offset={-60}>
                <FormattedMessage
                  id="courseInfo.tab.instructors.text"
                  defaultMessage="Instructors"
                />
              </Link>
            </li>
          ) : (
            <span className="d-flex align-items-center disable-link">
              <FormattedMessage
                id="courseInfo.tab.instructors.text"
                defaultMessage="Instructors"
              />
            </span>
          )}
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
            <h1 className="mb-2">
              {courseMetaData?.additional_metadata?.display_name}
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
                  dispatch(setToastMessage(<SharedToastMessage />));
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
                dispatch(setToastMessage(<SharedToastMessage />));
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
            {courseMetaData?.additional_metadata?.language && (
              <div className="d-flex align-items-start mb-2">
                <Icon className="mr-2" src={Language} />
                <span>
                  {getLangName(courseMetaData?.additional_metadata?.language)}
                </span>
              </div>
            )}
            {courseMetaData?.transcript_langs
              && courseMetaData?.transcript_langs.length > 0 && (
                <div className="d-flex align-items-start mb-2">
                  <Icon className="mr-2" src={PostOutline} />
                  <span className="course-tooltip">
                    {courseMetaData?.transcript_langs
                      && courseMetaData?.transcript_langs?.map((transLang) => (
                        <span key={transLang}>{getLangName(transLang)}</span>
                      ))}
                  </span>
                </div>
            )}
            <div className="d-flex align-items-start mb-2">
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
              <div className="d-flex align-items-start mb-2">
                <Icon className="mr-2" src={Verified} />
                <FormattedMessage
                  id="courseInfo.verifiedCertificate.text"
                  defaultMessage="Verified certificate"
                />
              </div>
            )}
            {instructors?.length > 0 && (
              <div className="d-flex align-items-start mb-2">
                <Icon className="mr-2" src={Record} />
                <p className="program-instructors-wrapper">
                  {instructors?.map((ins) => (
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
            )}
            {courseMetaData?.additional_metadata?.enrollment_start && (
              <div className="d-flex align-items-start mb-2">
                <Icon className="mr-2" src={Event} />
                <p>
                  <span className="color-black mr-1">
                    <FormattedMessage
                      id="courseInfo.registrationStarDate.text"
                      defaultMessage="Registration start date"
                    />
                  </span>
                  <span>
                    (
                    <FormattedDate
                      value={
                        courseMetaData?.additional_metadata?.enrollment_start
                      }
                      day="numeric"
                      month="long"
                      year="numeric"
                    />
                    )
                  </span>
                </p>
              </div>
            )}
            {courseMetaData?.additional_metadata?.enrollment_end && (
              <div className="d-flex align-items-start mb-2">
                <Icon className="mr-2" src={Event} />
                <p>
                  <span className="color-black mr-1">
                    <FormattedMessage
                      id="courseInfo.registrationEndDate.text"
                      defaultMessage="Registration end date"
                    />
                  </span>
                  <span>
                    (
                    <FormattedDate
                      value={
                        courseMetaData?.additional_metadata?.enrollment_end
                      }
                      day="numeric"
                      month="long"
                      year="numeric"
                    />
                    )
                  </span>
                </p>
              </div>
            )}
            {courseMetaData?.additional_metadata?.course_start && (
              <div className="d-flex align-items-start mb-2">
                <Icon className="card-icon mr-2" src={Event} />
                <p>
                  <span className="color-black mr-1">
                    <FormattedMessage
                      id="courseInfo.starting.text"
                      defaultMessage="Starting"
                    />
                  </span>
                  <span>
                    (
                    <FormattedDate
                      value={courseMetaData?.additional_metadata?.course_start}
                      day="numeric"
                      month="long"
                      year="numeric"
                    />
                    )
                  </span>
                </p>
              </div>
            )}
            {courseMetaData?.additional_metadata?.course_end && (
              <div className="d-flex align-items-start mb-2">
                <Icon className="card-icon mr-2" src={Event} />
                <p>
                  <span className="color-black mr-1">
                    <FormattedMessage
                      id="courseInfo.ending.text"
                      defaultMessage="Ending"
                    />
                  </span>
                  <span>
                    (
                    <FormattedDate
                      value={courseMetaData?.additional_metadata?.course_end}
                      day="numeric"
                      month="long"
                      year="numeric"
                    />
                    )
                  </span>
                </p>
              </div>
            )}
            {courseMetaData?.total_weeks_of_effort > 0 && (
              <div className="d-flex align-items-start mb-2">
                <Icon className="card-icon mr-2" src={WatchFilled} />
                <p className="color-black">
                  <span className="mr-1">
                    <FormattedMessage
                      id="courseCard.weeks.text"
                      defaultMessage="{weekCount, number} {weekCount, plural, one {Week} other {Weeks}}"
                      values={{
                        weekCount: courseMetaData?.total_weeks_of_effort,
                      }}
                    />
                  </span>
                  {courseMetaData?.hours_effort_per_week_min
                    && courseMetaData?.hours_effort_per_week_max && (
                      <span className="text-gray-700">
                        (
                        <FormattedNumber
                          value={courseMetaData?.hours_effort_per_week_min}
                        />
                        -
                        <FormattedNumber
                          value={courseMetaData?.hours_effort_per_week_max}
                        />{' '}
                        {intl.formatMessage(
                          messages['courseCard.hoursPerWeek.text'],
                        )}
                        )
                      </span>
                  )}
                </p>
              </div>
            )}
            {courseMetaData?.additional_metadata?.total_enrollments && (
              <div className="d-flex align-items-start mb-2">
                <Icon className="card-icon mr-2" src={InfoOutline} />
                {courseMetaData?.additional_metadata?.total_enrollments && (
                  <p>
                    <span className="mr-1">
                      <FormattedNumber
                        value={
                          courseMetaData?.additional_metadata?.total_enrollments
                        }
                      />
                    </span>
                    <span className="font-sm">
                      <FormattedMessage
                        id="courseInfo.alreadyEnrolled.text"
                        defaultMessage="already enrolled!"
                      />
                    </span>{' '}
                  </p>
                )}
              </div>
            )}
            {courseMetaData?.additional_metadata?.last_modification_date && (
              <p className="d-flex align-items-start mb-2">
                <Icon className="card-icon mr-2" src={Event} />
                <span className="mr-1">
                  <FormattedMessage
                    id="courseInfo.lastUpdateOn.text"
                    defaultMessage="Last update on"
                  />
                </span>
                <span>
                  <FormattedDate
                    value={
                      courseMetaData?.additional_metadata
                        ?.last_modification_date
                    }
                    day="numeric"
                    month="long"
                    year="numeric"
                  />
                </span>
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="course-content-container">
        {courseMetaData?.additional_metadata?.about_overview && (
          <div className="custom-container">
            <AboutCourse
              aboutCourse={courseMetaData?.additional_metadata?.about_overview}
              loading={loading}
            />
          </div>
        )}
        {courseMetaData?.what_you_will_learn.length > 0 && (
          <WhatYouLearn
            learningItems={courseMetaData?.what_you_will_learn}
            loading={loading}
          />
        )}
        <div className="custom-container">
          {(courseMetaData?.requirements?.length > 0
            || courseMetaData?.additional_metadata?.pre_req_courses?.length
              > 0) && (
              <Requirements courseMetaData={courseMetaData} loading={loading} />
          )}
          {sections?.length > 0 && (
            <CourseContent
              courseId={courseMetaData?.course_id}
              loading={loading}
            />
          )}
          <MobileCourseInstructors courseSlug={courseMetaData?.course_slug} />
        </div>
      </div>
      <MobilePriceWrapper courseMetaData={courseMetaData} />
    </section>
  );
};

MobileCourseInfo.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(MobileCourseInfo);
