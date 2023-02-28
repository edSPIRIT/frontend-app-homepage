import Scrollspy from 'react-scrollspy';
import { useRef } from 'react';
import classNames from 'classnames';
import { Link } from 'react-scroll';
import { useParams } from 'react-router';
import AboutCourse from './course-page/AboutCourse';
import CourseInfoSideBar from './course-page/CourseInfoSideBar';
import CourseInfoTopDesc from './course-page/CourseInfoTopDesc';
import Requirements from './course-page/Requirements';
import WhatYouLearn from './course-page/WhatYouLearn';
import useOnScreen from '../../hooks/useOnScreen';
import CourseContent from './course-page/CourseContent';
import CourseInstructors from './course-page/CourseInstructors';
import SimilarCourses from '../shared/similar-courses/SimilarCourses';
import useGetCourseMetaData from '../../hooks/useGetCourseMetaData';

const CoursePage = () => {
  const navTopRef = useRef(null);
  const isTopOnScreen = useOnScreen(navTopRef);
  const { slug } = useParams();
  const { courseMetaData, loading } = useGetCourseMetaData(slug);

  return (
    <>
      <section className="custom-container  pb-6">
        <CourseInfoSideBar courseMetaData={courseMetaData} loading={loading} />
        <CourseInfoTopDesc courseMetaData={courseMetaData} loading={loading} />
        <div
          className={classNames(' d-none ', {
            'sticky-trigger py-4': !isTopOnScreen,
          })}
        >
          <div className="d-flex justify-content-between mb-1">
            <h3>{courseMetaData.additional_metadata?.display_name}</h3>
          </div>
          <Link to="/partners/" className="course-institution">
            {courseMetaData.additional_metadata?.org}
          </Link>
        </div>
        <div id="sticky-trigger" ref={navTopRef} />
        <div
          className={classNames('sticky-nav-wrapper', {
            'sticky-nav': !isTopOnScreen,
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
            className=""
            currentClassName="active-item"
          >
            <li>
              <Link to="about-course" smooth offset={-100}>
                About
              </Link>
            </li>
            <li>
              <Link to="what-you-learn" smooth offset={-100}>
                What you&apos;ll learn
              </Link>
            </li>

            <li>
              <Link to="requirement" smooth offset={-100}>
                Requirements
              </Link>
            </li>

            <li>
              <Link to="course-content" smooth offset={-100}>
                Course content
              </Link>
            </li>
            <li>
              <Link to="instructors" smooth offset={-100}>
                Instructors
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
          <Requirements courseMetaData={courseMetaData} loading={loading} />
          <CourseContent
            courseId={courseMetaData.course_id}
            loading={loading}
          />
          <CourseInstructors instructors={courseMetaData?.instructors} loading={loading} />
        </div>
      </section>
      <SimilarCourses />
    </>
  );
};

export default CoursePage;
