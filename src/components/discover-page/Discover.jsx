import { useEffect } from 'react';
import useGetFeaturedSubjectsInfinite from '../../hooks/useGetFeaturedSubjectsInfinite';
import SearchHeader from '../shared/search-header/SearchHeader';
import FeaturedSubjects from './discover/FeaturedSubjects';
import FeaturedSubjectsWithCourses from './discover/FeaturedSubjectsWithCourses';

const Discover = () => {
  const {
    featuredSubjectsWithCourses, featuredSubjects, isFetching, loading,
  } = useGetFeaturedSubjectsInfinite();

  useEffect(() => {
    document.title = `Discover | ${process.env.SITE_NAME}`;
  }, []);
  return (
    <>
      <SearchHeader />
      <FeaturedSubjects featuredSubjects={featuredSubjects} loading={loading} />
      <FeaturedSubjectsWithCourses
        featuredSubjectsWithCourses={featuredSubjectsWithCourses}
        loading={loading}
        isFetching={isFetching}
      />
    </>
  );
};

export default Discover;
