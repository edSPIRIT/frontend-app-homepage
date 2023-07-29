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
  const fetchAllfetchSubjects = async () => {
    let allResults = [];
    let pageNum = 1;
    let courseCounter = 0;
    while (true) {
      const { results, next, course_counter } = await fetchSubjects(pageNum);
      allResults = allResults.concat(results);
      if (pageNum === 1) {
        courseCounter = course_counter;
      }
      if (!next) {
        break;
      }
      pageNum++;
    }

    return { results: allResults, courseCounter };
  };

  const { data, isLoading } = useQuery('allSubjects', fetchAllfetchSubjects);

  return {
    subjects: data?.results,
    coursesCounter: data?.courseCounter,
    loading: isLoading,
  };
};
export default useGetSubjects;
