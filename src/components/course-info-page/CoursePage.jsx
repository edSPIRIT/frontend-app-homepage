import Scrollspy from 'react-scrollspy';
import classNames from 'classnames';
import { useParams } from 'react-router';
import { useInView } from 'react-intersection-observer';
import { Link as RouterLink } from 'react-router-dom';
import { Link } from 'react-scroll';
import AboutCourse from './course-page/AboutCourse';
import CourseInfoSideBar from './course-page/CourseInfoSideBar';
import CourseInfoTopDesc from './course-page/CourseInfoTopDesc';
import Requirements from './course-page/Requirements';
import WhatYouLearn from './course-page/WhatYouLearn';
import CourseContent from './course-page/CourseContent';
import CourseInstructors from './course-page/CourseInstructors';
import SimilarCourses from '../shared/similar-courses/SimilarCourses';
import useGetCourseMetaData from '../../hooks/useGetCourseMetaData';

const CoursePage = () => {
  const { ref: navTopRef, inView: isTopOnScreen } = useInView();
  const { slug } = useParams();
  const { courseMetaData, loading } = useGetCourseMetaData(slug);

  return (
    <>
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
          className={classNames('sticky-nav-wrapper', {
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
            offset={-220}
          >
            <li>
              <Link to="about-course" smooth offset={-120}>
                About
              </Link>
            </li>
            <li>
              <Link to="what-you-learn" smooth offset={-160}>
                What you&apos;ll learn
              </Link>
            </li>

            <li>
              <Link to="requirement" smooth offset={-120}>
                Requirements
              </Link>
            </li>

            <li>
              <Link to="course-content" smooth offset={-160}>
                Course content
              </Link>
            </li>
            <li>
              <Link to="instructors" smooth offset={-160}>
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
            courseId={courseMetaData?.course_id}
            loading={loading}
          />
          <CourseInstructors
            instructors={courseMetaData?.instructors}
            loading={loading}
          />
        </div>
      </section>
      <SimilarCourses />
    </>
  );
};

export default CoursePage;
