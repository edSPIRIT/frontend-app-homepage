import AboutCourse from './about-course/AboutCourse';
import CourseInfoSideBar from './course-info-sidebar/CourseInfoSideBar';
import CourseInfoTopDesc from './course-info-top-desc/CourseInfoTopDesc';
import Requirements from './requirements/Requirements';
import WhatYouLearn from './what-you-learn/WhatYouLearn';

const CourseInfoPage = () => (
  <section className="custom-container d-flex flex-column pb-6 mb-6">
    <CourseInfoSideBar />
    <CourseInfoTopDesc />

    <div className="course-nav-wrapper">
      <nav className="custom-container">
        <ul className="list-unstyled d-flex">
          <li>
            <button className="" type="button" id="nav-about">
              About
            </button>
          </li>
          <li>
            <button className="" type="button" id="nav-outcome">
              What you&apos;ll learn
            </button>
          </li>
          <li>
            <button className="" type="button" id="nav-instructors">
              Requirements
            </button>
          </li>
          <li>
            <button className="" type="button" id="nav-faqs">
              Course content
            </button>
          </li>
          <li>
            <button className="" type="button" id="nav-modes">
              Instructors
            </button>
          </li>
        </ul>
      </nav>
    </div>
    <AboutCourse />
    <WhatYouLearn />
    <Requirements />
  </section>
);

export default CourseInfoPage;
