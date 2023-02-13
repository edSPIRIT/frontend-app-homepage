import Scrollspy from 'react-scrollspy';
import { useRef } from 'react';
import classNames from 'classnames';
import { Link } from 'react-scroll';
import AboutCourse from './course-page/AboutCourse';
import CourseInfoSideBar from './course-page/CourseInfoSideBar';
import CourseInfoTopDesc from './course-page/CourseInfoTopDesc';
import Requirements from './course-page/Requirements';
import WhatYouLearn from './course-page/WhatYouLearn';
import useOnScreen from '../../hooks/useOnScreen';
import CourseContent from './course-page/CourseContent';
import CourseInstructors from './course-page/CourseInstructors';
import { PREREQUISITE_COURSES } from '../../constants';
import SimilarCourses from '../shared/similar-courses/SimilarCourses';

const CoursePage = () => {
  const navTopRef = useRef(null);
  const isTopOnScreen = useOnScreen(navTopRef);
  return (
    <>
      <section className="custom-container  pb-6">
        <CourseInfoSideBar />
        <CourseInfoTopDesc />
        <div
          className={classNames(' d-none ', {
            'sticky-trigger py-4': !isTopOnScreen,
          })}
        >
          <div className="d-flex justify-content-between mb-1">
            <h3>Anatomy: Musculoskeletal and Integumentary Systems</h3>
          </div>
          <Link to="/partners/" className="course-institution">
            Michigan X
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
              <Link to="about-course" smooth>
                About
              </Link>
            </li>
            <li>
              <Link to="what-you-learn" smooth>
                What you&apos;ll learn
              </Link>
            </li>

            <li>
              <Link to="requirement" smooth>
                Requirements
              </Link>
            </li>

            <li>
              <Link to="course-content" smooth>
                Course content
              </Link>
            </li>
            <li>
              <Link to="instructors" smooth offset={-50}>
                Instructors
              </Link>
            </li>
          </Scrollspy>
        </div>
        <div className="course-content-container">
          <AboutCourse />
          <WhatYouLearn />
          <Requirements PrerequisiteCourses={PREREQUISITE_COURSES} />
          <CourseContent />
          <CourseInstructors />
        </div>
      </section>
      <SimilarCourses />
    </>
  );
};

export default CoursePage;
