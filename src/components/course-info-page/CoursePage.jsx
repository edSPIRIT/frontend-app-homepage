import { useParams } from 'react-router';
import { useMediaQuery } from '@edx/paragon';
import SimilarCourses from '../shared/similar-courses/SimilarCourses';
import useGetCourseMetaData from '../../hooks/useGetCourseMetaData';
import MobileCourseInfo from './course-page/MobileCourseInfo';
import DesktopCourseInfo from './course-page/DesktopCourseInfo';

const CoursePage = () => {
  const { slug } = useParams();
  const { courseMetaData, loading } = useGetCourseMetaData(slug);
  const isMobile = useMediaQuery({ maxWidth: '768px' });

  return (
    <>
      {isMobile ? <MobileCourseInfo /> : <DesktopCourseInfo />}
      <SimilarCourses
        courseTitles={courseMetaData?.additional_metadata?.display_name}
        courseIds={[`${courseMetaData?.course_id}`]}
      />
    </>
  );
};

export default CoursePage;
