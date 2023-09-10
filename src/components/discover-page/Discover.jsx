import { useEffect } from 'react';
import { getConfig } from '@edx/frontend-platform';
import SearchHeader from '../shared/search-header/SearchHeader';
import FeaturedSubjects from './discover/FeaturedSubjects';
import useSubjectsWithCoursesInfinite from '../../hooks/useSubjectsWithCoursesInfinite';
import SubjectsWithCourses from './discover/SubjectsWithCourses';
import useGetFeaturedSubjects from '../../hooks/useGetFeaturedSubjects';
import FeaturedSubjectsSkeleton from './discover/FeaturedSubjects/FeaturedSubjectsSkeleton';

const Discover = () => {
  const { featuredSubjects, loading } = useGetFeaturedSubjects();
  const {
    subjectsWithCourses,
    loading: subjectsWithCoursesLoading,
    isFetching: subjectsWithCoursesFetching,
  } = useSubjectsWithCoursesInfinite();
  useEffect(() => {
    document.title = `Discover | ${getConfig().SITE_NAME}`;
  }, []);
  return (
    <>
      <SearchHeader />
      {loading ? (
        <FeaturedSubjectsSkeleton />
      ) : (
        featuredSubjects?.length > 0 && (
          <FeaturedSubjects featuredSubjects={featuredSubjects} />
        )
      )}
      <SubjectsWithCourses
        featuredSubjectsWithCourses={subjectsWithCourses}
        loading={subjectsWithCoursesLoading}
        isFetching={subjectsWithCoursesFetching}
      />
    </>
  );
};

export default Discover;
