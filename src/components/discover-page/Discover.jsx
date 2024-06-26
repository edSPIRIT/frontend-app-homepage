/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import { injectIntl } from '@edx/frontend-platform/i18n';
import SearchHeader from '../shared/search-header/SearchHeader';
import FeaturedSubjects from './discover/FeaturedSubjects';
import useSubjectsWithCoursesInfinite from '../../hooks/useSubjectsWithCoursesInfinite';
import SubjectsWithCourses from './discover/SubjectsWithCourses';
import useGetFeaturedSubjects from '../../hooks/useGetFeaturedSubjects';
import FeaturedSubjectsSkeleton from './discover/FeaturedSubjects/FeaturedSubjectsSkeleton';
import useGetConfig from '../../hooks/useGetConfig';
import messages from '../../messages';

const Discover = ({ intl }) => {
  const { featuredSubjects, loading } = useGetFeaturedSubjects();
  const {
    subjectsWithCourses,
    loading: subjectsWithCoursesLoading,
    isFetching: subjectsWithCoursesFetching,
  } = useSubjectsWithCoursesInfinite();
  const { platformName } = useGetConfig();

  useEffect(() => {
    if (intl && platformName) {
      document.title = `${intl.formatMessage(messages['header.nav.discover'])} | ${platformName}`;
    }
  }, [intl, platformName]);

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

export default injectIntl(Discover);
