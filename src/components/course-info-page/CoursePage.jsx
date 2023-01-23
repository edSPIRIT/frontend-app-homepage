import Scrollspy from 'react-scrollspy';
import { useRef } from 'react';
import AboutCourse from './course-page/AboutCourse';
import CourseInfoSideBar from './course-page/CourseInfoSideBar';
import CourseInfoTopDesc from './course-page/CourseInfoTopDesc';
import Requirements from './course-page/Requirements';
import WhatYouLearn from './course-page/WhatYouLearn';

const CoursePage = () => {
  const aboutRef = useRef(null);
  const whatLearnRef = useRef(null);
  const requirementRef = useRef(null);
  return (
    <section className="custom-container  pb-6 mb-6">
      <CourseInfoSideBar />
      <CourseInfoTopDesc />
      <div className="sticky-nav-wrapper">
        <div className="custom-container">
          <Scrollspy
            items={[
              'about-course',
              'what-you-learn',
              'requirement',
              'Course content',
              'Instructors',
            ]}
            className=""
            currentClassName="active-item"
          >
            <li>
              <button
                type="button"
                onClick={() => aboutRef.current.scrollIntoView({ behavior: 'smooth' })}
              >
                About
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => whatLearnRef.current.scrollIntoView({ behavior: 'smooth', top: whatLearnRef.current.offsetTop })}
              >
                What you&apos;ll learn
              </button>
            </li>

            <li>
              <button
                type="button"
                onClick={() => requirementRef.current.scrollIntoView({ behavior: 'smooth', top: requirementRef.current.offsetTop })}
              >
                Requirements
              </button>
            </li>

            <li>
              <button type="button">Course content</button>
            </li>
            <li>
              <button type="button">Instructors</button>
            </li>
          </Scrollspy>
        </div>
      </div>

      <AboutCourse Ref={aboutRef} />
      <WhatYouLearn Ref={whatLearnRef} />
      <Requirements Ref={requirementRef} />
    </section>
  );
};

export default CoursePage;
