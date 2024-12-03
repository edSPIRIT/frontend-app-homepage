import { useParams } from 'react-router';
import { Link } from 'react-scroll';

import useGetCourseMetaData from '../../../hooks/useGetCourseMetaData';
import AboutCourse from './share/AboutCourse';
import WhatYouLearn from './share/WhatYouLearn';
import Requirements from './share/Requirements';
import CourseContent from './share/CourseContent';
import MobileCourseInstructors from './MobileCourseInfo/MobileCourseInstructors';
import useGetInstructorCourses from '../../../hooks/useGetCourseInstructors';
import MobilePriceWrapper from './MobileCourseInfo/MobilePriceWrapper';
import useGetCourseToc from '../../../hooks/useGetCourseToc';
import MobileCourseNavItems from './MobileCourseInfo/MobileCourseNavItems';
import MobileCourseCover from './MobileCourseInfo/MobileCourseCover';
import MobileInfoSection from './MobileCourseInfo/MobileInfoSection';

const MobileCourseInfo = () => {
  const { slug } = useParams();
  const { courseMetaData, loading } = useGetCourseMetaData(slug);
  const { instructors } = useGetInstructorCourses(slug);
  const { sections } = useGetCourseToc(courseMetaData?.course_id);
  return (
    <section className="pb-6 mobile-course-info-container">
      <MobileCourseNavItems
        courseMetaData={courseMetaData}
        sections={sections}
        instructors={instructors}
      />
      <MobileCourseCover courseMetaData={courseMetaData} />

      <div className="d-flex flex-column custom-container">
        <Link
          to={`/partners/${courseMetaData?.partner?.organization?.short_name}`}
          className="course-institution"
        >
          {/* Todo: Here we have to show the org_display_name from additional_metadata in course */}
          {/* But due to a bug in backend, we'll show the original partner name */}
          {courseMetaData?.partner?.organization?.name}
        </Link>
        <MobileInfoSection
          courseMetaData={courseMetaData}
          instructors={instructors}
        />
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
              courseMetaData={courseMetaData}
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

export default MobileCourseInfo;
