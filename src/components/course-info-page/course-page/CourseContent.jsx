import PropTypes from 'prop-types';
import { FormattedMessage } from '@edx/frontend-platform/i18n';
import useGetCourseToc from '../../../hooks/useGetCourseToc';
import ChapterCourse from './course-content/ChapterCourse';

const CourseContent = ({ courseId }) => {
  const { sections, loading } = useGetCourseToc(courseId);
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
          key={section.name}
          section={section}
          loading={loading}
          sectionCount={sections?.length}
        />
      ))}
    </div>
  );
};
CourseContent.propTypes = {
  courseId: PropTypes.string,
};
CourseContent.defaultProps = {
  courseId: '',
};
export default CourseContent;
