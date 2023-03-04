import { getConfig } from '@edx/frontend-platform';
import { useQuery } from 'react-query';

const useGetSubjects = () => {
  const fetchSubjects = async () => {
    const apiRes = await fetch(
      `${getConfig().LMS_BASE_URL}/admin-console/api/subject-list/`,
    );

    if (!apiRes.ok) {
      throw new Error('fetch not ok');
    }

    return apiRes.json();
  };
  const { data, isLoading } = useQuery('Subjects', fetchSubjects);
  return {
    subjects: data?.items,
    coursesCounter: data?.course_counter,
    popularSubjects: data?.items?.filter((item) => item.popular),
    loading: isLoading,
  };
};
export default useGetSubjects;
