import { getConfig } from '@edx/frontend-platform';
import { useQuery } from 'react-query';

const useGetInstructor = (slug) => {
  const fetchInstructor = async () => {
    const apiRes = await fetch(
      `${getConfig().LMS_BASE_URL}/admin-console/api/instructor/${slug}/`,
    );

    if (!apiRes.ok) {
      throw new Error('fetch not ok');
    }

    return apiRes.json();
  };
  const { data, isLoading } = useQuery('Instructor', fetchInstructor, {
    enabled: !!slug,
  });

  return {
    InstructorData: data,
    loading: isLoading,
  };
};
export default useGetInstructor;
