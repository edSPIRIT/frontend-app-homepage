import { getConfig } from '@edx/frontend-platform';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import { useMutation, useQueryClient } from 'react-query';

const useEnrollClickHandler = (courseId) => {
  const postCourseEnrollment = async (Id) => {
    const url = `${getConfig().LMS_BASE_URL}/api/enrollment/v1/enrollment`;
    const { data, status } = await getAuthenticatedHttpClient().post(url, {
      course_details: { course_id: Id },
    });
    if (status !== 200) {
      throw new Error('fetch not ok');
    }
    return data;
  };
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(postCourseEnrollment, {
    onSuccess: (data) => {
      console.log('enrooooooool', data);
      queryClient.invalidateQueries(['EnrollmentList']);
    },
    onError: () => {
      alert('there was an error');
    },
  });
  const enrollClickHandler = () => {
    mutate(courseId);
  };
  return { enrollClickHandler, isLoading };
};

export default useEnrollClickHandler;
