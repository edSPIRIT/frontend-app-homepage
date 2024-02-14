import { useEffect } from 'react';
import SearchHeader from '../shared/search-header/SearchHeader';
import FeaturedSubjects from './discover/FeaturedSubjects';
import useSubjectsWithCoursesInfinite from '../../hooks/useSubjectsWithCoursesInfinite';
import SubjectsWithCourses from './discover/SubjectsWithCourses';
import useGetFeaturedSubjects from '../../hooks/useGetFeaturedSubjects';
import FeaturedSubjectsSkeleton from './discover/FeaturedSubjects/FeaturedSubjectsSkeleton';
import useGetConfig from '../../hooks/useGetConfig';

const Discover = () => {
  const { featuredSubjects, loading } = useGetFeaturedSubjects();
  const {
    subjectsWithCourses,
    loading: subjectsWithCoursesLoading,
    isFetching: subjectsWithCoursesFetching,
  } = useSubjectsWithCoursesInfinite();
  const { platformName } = useGetConfig();
  useEffect(() => {
    document.title = `Discover | ${platformName}`;
  }, [platformName]);
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
