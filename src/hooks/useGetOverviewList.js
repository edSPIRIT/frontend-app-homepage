import { getConfig } from '@edx/frontend-platform';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import { AppContext } from '@edx/frontend-platform/react';
import { useContext } from 'react';
import { useQuery } from 'react-query';

const useGetOverviewList = () => {
  const { authenticatedUser } = useContext(AppContext);

  const fetchOverviewList = async () => {
    const { data, status } = await getAuthenticatedHttpClient().get(
      `${
        getConfig().LMS_BASE_URL
      }/admin-console/api/openedx/api/enrollment-list/?ordering=recent&page=1&page_size=5`,
    );
    if (status !== 200) {
      throw new Error('fetch not ok');
    }
    return data;
  };

  const { data, isLoading } = useQuery('OverviewList', fetchOverviewList, {
    enabled: !!authenticatedUser,
  });
  return {
    userCourses: data?.results,
    recentUserCourses: data?.results?.slice(0, 5),
    courseCount: data?.count,
    loading: isLoading,
  };
};

export default useGetOverviewList;
