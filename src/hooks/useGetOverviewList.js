import { getConfig } from '@edx/frontend-platform';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import { useQuery } from 'react-query';

const useGetOverviewList = (page) => {
  const fetchOverviewList = async (pageNum = 1) => {
    const { data, status } = await getAuthenticatedHttpClient().get(
      `${
        getConfig().LMS_BASE_URL
      }/admin-console/api/openedx/api/enrollment-list/?ordering=recent&page=${pageNum}`,
    );
    if (status !== 200) {
      throw new Error('fetch not ok');
    }
    return data;
  };
  const fetchAllOverviewList = async () => {
    let allResults = [];
    let pageNum = 1;

    while (true) {
      const { results, count, next } = await fetchOverviewList(pageNum);
      allResults = allResults.concat(results);

      if (!next) {
        break;
      }

      pageNum++;
    }

    return { results: allResults, count: allResults.length };
  };
  const { data, isLoading } = useQuery(['OverviewList', page], fetchAllOverviewList);
  return {
    userCourseTitles: `${data?.results?.reduce(
      (acc, current) => `${acc}${current?.course_details?.course_name} `,
      '',
    )}`,
    userCourseIds: data?.results?.map(
      (course) => course?.course_details?.course_id,
    ),
    userCourses: data?.results,
    recentUserCourses: data?.results?.slice(0, 5),
    courseCount: data?.count,
    loading: isLoading,
  };
};

export default useGetOverviewList;
