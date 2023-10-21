/* eslint-disable react/prop-types */
import { FormattedMessage } from '@edx/frontend-platform/i18n';
import useGetCourseToc from '../../../../hooks/useGetCourseToc';
import ChapterCourse from './CourseContent/ChapterCourse';

const CourseContent = ({ courseMetaData }) => {
  const { sections, loading } = useGetCourseToc(courseMetaData?.course_id);
  return (
    <div className="course-content-wrapper" id="course-content">
      <h2 className="mb-3">
        <FormattedMessage
          id="courseInfo.tab.courseContent.text"
          defaultMessage="Course content"
        />
      </h2>
      {sections?.map((section) => (
        <ChapterCourse
          key={section.lms_url}
          section={section}
          loading={loading}
          sectionCount={sections?.length}
          courseMetaData={courseMetaData}
        />
      ))}
    </div>
  );
};

export default CourseContent;
