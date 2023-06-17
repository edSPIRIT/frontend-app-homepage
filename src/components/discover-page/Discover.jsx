import useGetFeaturedSubjectsInfinite from '../../hooks/useGetFeaturedSubjectsInfinite';
import SearchHeader from '../shared/search-header/SearchHeader';
import FeaturedSubjects from './discover/FeaturedSubjects';
import FeaturedSubjectsWithCourses from './discover/FeaturedSubjectsWithCourses';

const Discover = () => {
  const {
    featuredSubjectsWithCourses, featuredSubjects, isFetching, loading,
  } = useGetFeaturedSubjectsInfinite();

  return (
    <main>
      <SearchHeader />
      <FeaturedSubjects
        featuredSubjects={featuredSubjects}
        loading={loading}
      />
      <FeaturedSubjectsWithCourses
        featuredSubjectsWithCourses={featuredSubjectsWithCourses}
        loading={loading}
        isFetching={isFetching}
      />
    </main>
  );
};

export default Discover;
