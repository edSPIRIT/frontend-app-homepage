import { getConfig } from '@edx/frontend-platform';
import { useQuery } from 'react-query';

const useGetSubjects = () => {
  const fetchSubjects = async (pageNum = 1) => {
    const apiRes = await fetch(
      `${
        getConfig().LMS_BASE_URL
      }/admin-console/api/subject-list/?page_size=25&page=${pageNum}`,
    );

    if (!apiRes.ok) {
      throw new Error('fetch not ok');
    }

    return apiRes.json();
  };
  const fetchAllFetchSubjects = async () => {
    let allResults = [];
    let pageNum = 1;
    let courseCounter = 0;
    // eslint-disable-next-line no-constant-condition
    while (true) {
      // eslint-disable-next-line no-await-in-loop
      const { results, next, course_counter: courseCount } = await fetchSubjects(pageNum);
      allResults = allResults.concat(results);
      if (pageNum === 1) {
        courseCounter = courseCount;
      }
      if (!next) {
        break;
      }
      pageNum++;
    }

    return { results: allResults, courseCounter };
  };

  const { data, isLoading } = useQuery('allSubjects', fetchAllFetchSubjects);

  return {
    subjects: data?.results,
    coursesCounter: data?.courseCounter,
    loading: isLoading,
  };
};
export default useGetSubjects;
