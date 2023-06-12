import useGetFeaturedSubjectsInfinite from '../../hooks/useGetFeaturedSubjectsInfinite';
import DiscoverBanner from '../shared/discover-banner/DiscoverBanner';
import FeaturedSubjects from './discover/FeaturedSubjects';
import FeaturedSubjectsWithCourses from './discover/FeaturedSubjectsWithCourses';

const Discover = () => {
  const {
    featuredSubjectsWithCourses, featuredSubjects, isFetching, loading,
  } = useGetFeaturedSubjectsInfinite();

  return (
    <main>
      <DiscoverBanner />
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
