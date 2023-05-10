import React from 'react';
import { useInView } from 'react-intersection-observer';
import { useParams } from 'react-router';
import classNames from 'classnames';
import Scrollspy from 'react-scrollspy';
import { Link as RouterLink } from 'react-router-dom';
import { Link } from 'react-scroll';
import { FormattedMessage } from '@edx/frontend-platform/i18n';
import CourseInfoSideBar from './CourseInfoSideBar';
import CourseInfoTopDesc from './CourseInfoTopDesc';
import AboutCourse from './AboutCourse';
import WhatYouLearn from './WhatYouLearn';
import Requirements from './Requirements';
import CourseContent from './CourseContent';
import CourseInstructors from './CourseInstructors';
import useGetCourseMetaData from '../../../hooks/useGetCourseMetaData';

const DesktopCourseInfo = () => {
  const { ref: navTopRef, inView: isTopOnScreen } = useInView();
  const { slug } = useParams();
  const { courseMetaData, loading } = useGetCourseMetaData(slug);
  return (
    <section className="custom-container  pb-6">
      <CourseInfoSideBar courseMetaData={courseMetaData} loading={loading} />
      <CourseInfoTopDesc
        courseMetaData={courseMetaData}
        loading={loading}
        navTopRef={navTopRef}
      />
      <div
        className={classNames(' d-none ', {
          'sticky-trigger py-4': !isTopOnScreen && !loading,
        })}
      >
        <div className="d-flex justify-content-between mb-1">
          <h3>{courseMetaData?.additional_metadata?.display_name}</h3>
        </div>
        <RouterLink
          to={`/partners/${courseMetaData?.partner?.organization?.short_name}`}
          className="course-institution"
        >
          {courseMetaData?.additional_metadata?.org}
        </RouterLink>
      </div>
      <div
        className={classNames('sticky-nav-wrapper sticky-nav-wrapper-infinite-border', {
          'sticky-nav': !isTopOnScreen && !loading,
        })}
      >
        <Scrollspy
          items={[
            'about-course',
            'what-you-learn',
            'requirement',
            'course-content',
            'instructors',
          ]}
          currentClassName="active-item"
          offset={-160}
        >
          <li>
            <Link to="about-course" smooth offset={-120}>
              <FormattedMessage
                id="courseInfo.tab.about.text"
                defaultMessage="About"
              />
            </Link>
          </li>
          <li>
            <Link to="what-you-learn" smooth offset={-160}>
              <FormattedMessage
                id="courseInfo.tab.whatYouWillLearn.text"
                defaultMessage="What you'll learn"
              />
            </Link>
          </li>

          <li>
            <Link to="requirement" smooth offset={-120}>
              <FormattedMessage
                id="courseInfo.tab.requirements.text"
                defaultMessage="Requirements"
              />
            </Link>
          </li>

          <li>
            <Link to="course-content" smooth offset={-160}>
              <FormattedMessage
                id="courseInfo.tab.courseContent.text"
                defaultMessage="Course content"
              />
            </Link>
          </li>
          <li>
            <Link to="instructors" smooth offset={-160}>
              <FormattedMessage
                id="courseInfo.tab.instructors.text"
                defaultMessage="Instructors"
              />
            </Link>
          </li>
        </Scrollspy>
      </div>
      <div className="course-content-container">
        <AboutCourse aboutCourse={courseMetaData?.about} loading={loading} />
        <WhatYouLearn
          learningItems={courseMetaData?.what_you_will_learn}
          loading={loading}
        />
        {courseMetaData?.requirements?.length > 0 && (
          <Requirements courseMetaData={courseMetaData} loading={loading} />
        )}
        <CourseContent courseId={courseMetaData?.course_id} loading={loading} />
        <CourseInstructors
          instructors={courseMetaData?.instructors}
          loading={loading}
        />
      </div>
    </section>
  );
};

export default DesktopCourseInfo;
