import { useMediaQuery } from '@edx/paragon';
import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import useGetCourseMetaData from '../../hooks/useGetCourseMetaData';
import SimilarCourses from '../shared/similar-courses/SimilarCourses';
import DesktopCourseInfo from './CoursePage/DesktopCourseInfo';

const MobileCourseInfo = React.lazy(() => import('./CoursePage/MobileCourseInfo'));

const CoursePage = () => {
  const { slug } = useParams();
  const { courseMetaData, loading } = useGetCourseMetaData(slug);
  const isMobile = useMediaQuery({ maxWidth: '768px' });

  useEffect(() => {
    if (courseMetaData) {
      document.title = `${courseMetaData?.additional_metadata?.display_name} | ${process.env.SITE_NAME}`;
    }
  }, [courseMetaData]);
  return (
    <>
      {isMobile ? <MobileCourseInfo /> : <DesktopCourseInfo />}
      <SimilarCourses
        courseTitles={courseMetaData?.additional_metadata?.display_name}
        courseIds={[`${courseMetaData?.course_id}`]}
        loading={loading}
      />
    </>
  );
};

export default CoursePage;
