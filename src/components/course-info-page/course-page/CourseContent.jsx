import { COURSE_TOC } from '../../../constants';
import useGetCourseToc from '../../../hooks/useGetCourseToc';
import ChapterCourse from './course-content/ChapterCourse';

const CourseContent = () => {
  const { sections } = useGetCourseToc('course-v1:vahid-org+cs101+2020_lt');
  return (
    <div className="course-content-wrapper" id="course-content">
      <h2 className="mb-3">Course content</h2>
      {COURSE_TOC.sections.map((section) => (
        <ChapterCourse key={section.name} section={section} />
      ))}
    </div>
  );
};

export default CourseContent;
