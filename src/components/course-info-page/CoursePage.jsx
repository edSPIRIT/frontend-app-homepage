import Scrollspy from 'react-scrollspy';
import { NavHashLink } from 'react-router-hash-link';
import AboutCourse from './course-page/AboutCourse';
import CourseInfoSideBar from './course-page/CourseInfoSideBar';
import CourseInfoTopDesc from './course-page/CourseInfoTopDesc';
import Requirements from './course-page/Requirements';
import WhatYouLearn from './course-page/WhatYouLearn';

const CoursePage = () => (
  <section className="custom-container d-flex flex-column pb-6 mb-6">
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
            <NavHashLink to="#about-course">
              About
            </NavHashLink>
          </li>
          <li>
            <NavHashLink to="#what-you-learn">
              What you&apos;ll learn
            </NavHashLink>
          </li>

          <li>
            <NavHashLink to="#requirement">
              Requirements
            </NavHashLink>
          </li>

          <li>
            <NavHashLink to="#course-content">
              Course content
            </NavHashLink>
          </li>
          <li>
            <NavHashLink to="#instructors">
              Instructors
            </NavHashLink>
          </li>
          <li>
            <NavHashLink to="#linked-accounts">
              linked-accounts
            </NavHashLink>
          </li>
          <li>
            <NavHashLink to="#delete-account">
              delete-account
            </NavHashLink>
          </li>
        </Scrollspy>
      </div>

    </div>

    <AboutCourse />
    <WhatYouLearn />
    <Requirements />
  </section>
);

export default CoursePage;
