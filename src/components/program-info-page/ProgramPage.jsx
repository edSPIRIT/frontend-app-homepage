import classNames from 'classnames';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-scroll';
import Scrollspy from 'react-scrollspy';

import ProgramCourses from './ProgramPage/ProgramCourses';
import CourseInfoSideBar from '../course-info-page/CoursePage/DesktopCourseInfo/CourseInfoSideBar';
import CourseInfoTopDesc from '../course-info-page/CoursePage/DesktopCourseInfo/CourseInfoTopDesc';
import AboutCourse from '../course-info-page/CoursePage/share/AboutCourse';
import WhatYouLearn from '../course-info-page/CoursePage/share/WhatYouLearn';
import Requirements from '../course-info-page/CoursePage/share/Requirements';

const ProgramPage = () => {
  const { ref: navTopRef, inView: isTopOnScreen } = useInView();

  return (
    <section className="custom-container program-container pb-6">
      <CourseInfoSideBar />
      <CourseInfoTopDesc />
      <div className={classNames(' d-none ', { 'sticky-trigger py-4': !isTopOnScreen })}>
        <div className="d-flex justify-content-between mb-1">
          <h3>
            Anatomy: Musculoskeletal and Integumentary Systems
          </h3>
        </div>
        <Link to="/partners/" className="course-institution">Michigan X</Link>
      </div>
      <div id="sticky-trigger" ref={navTopRef} />
      <div className={classNames('sticky-nav-wrapper', { 'sticky-nav': !isTopOnScreen })}>
        <Scrollspy
          items={[
            'about-course',
            'what-you-learn',
            'requirement',
            'courses',
          ]}
          className=""
          currentClassName="active-item"
        >
          <li>
            <Link
              to="about-course"
              smooth
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="what-you-learn"
              smooth
            >
              What you&apos;ll learn
            </Link>
          </li>

          <li>
            <Link
              to="requirement"
              smooth
            >
              Requirements
            </Link>
          </li>
          <li>
            <Link
              to="courses"
              smooth
            >Courses
            </Link>
          </li>
        </Scrollspy>
      </div>
      <div className="course-content-container">
        <AboutCourse />
        <WhatYouLearn />
        <Requirements />
        <ProgramCourses />
      </div>
    </section>
  );
};

export default ProgramPage;
