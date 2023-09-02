import { useInView } from 'react-intersection-observer';
import { useParams } from 'react-router';
import classNames from 'classnames';
import { Link as RouterLink } from 'react-router-dom';
import { useMediaQuery } from '@edx/paragon';
import CourseInfoSideBar from './DesktopCourseInfo/CourseInfoSideBar';
import CourseInfoTopDesc from './DesktopCourseInfo/CourseInfoTopDesc';
import AboutCourse from './share/AboutCourse';
import WhatYouLearn from './share/WhatYouLearn';
import Requirements from './share/Requirements';
import CourseContent from './share/CourseContent';
import CourseInstructors from './DesktopCourseInfo/CourseInstructors';
import useGetCourseMetaData from '../../../hooks/useGetCourseMetaData';
import CourseNavItems from './DesktopCourseInfo/CourseNavItems';
import MobileCourseInstructors from './MobileCourseInfo/MobileCourseInstructors';
import CourseInfoBreadcrumb from './DesktopCourseInfo/CourseInfoBreadcrumb';
import useGetCourseToc from '../../../hooks/useGetCourseToc';

const DesktopCourseInfo = () => {
  const { ref: navTopRef, inView: isTopOnScreen } = useInView();
  const { slug } = useParams();
  const { courseMetaData, loading } = useGetCourseMetaData(slug);
  const isTablet = useMediaQuery({ maxWidth: '1300px' });
  const { sections } = useGetCourseToc(courseMetaData?.course_id);

  return (
    <>
      <CourseInfoBreadcrumb />
      <section className="custom-container  pb-6">
        <CourseInfoSideBar courseMetaData={courseMetaData} loading={loading} />
        <CourseInfoTopDesc
          courseMetaData={courseMetaData}
          loading={loading}
          navTopRef={navTopRef}
        />
        <div
          className={classNames('d-none', {
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
            {courseMetaData?.partner?.organization?.name}
          </RouterLink>
        </div>
        <CourseNavItems
          courseMetaData={courseMetaData}
          isTopOnScreen={isTopOnScreen}
          loading={loading}
        />

        <div className="course-content-container d-flex flex-column">
          {courseMetaData?.additional_metadata?.about_overview && (
            <AboutCourse
              courseVideoUrl={courseMetaData?.additional_metadata?.intro_video}
              aboutCourse={courseMetaData?.additional_metadata?.about_overview}
              loading={loading}
            />
          )}
          {courseMetaData?.what_you_will_learn.length > 0 && (
            <WhatYouLearn
              learningItems={courseMetaData?.what_you_will_learn}
              loading={loading}
            />
          )}
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
          {isTablet ? (
            <MobileCourseInstructors
              courseSlug={courseMetaData?.course_slug}
            />
          ) : (
            <CourseInstructors
              courseSlug={courseMetaData?.course_slug}
            />
          )}
        </div>
      </section>
    </>
  );
};

export default DesktopCourseInfo;
