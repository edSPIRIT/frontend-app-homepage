import { useMutation, useQueryClient } from 'react-query';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import { getConfig } from '@edx/frontend-platform';
import { useDispatch } from 'react-redux';
import { FormattedMessage } from '@edx/frontend-platform/i18n';
import { setToastMessage } from '../redux/slice/toastSlice';
import { hideUnenrollAlert } from '../redux/slice/course/unenrollAlert';

export const useUnenrollCourse = (courseId) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const deleteEnrollCourse = useMutation({
    mutationFn: (id) => getAuthenticatedHttpClient().post(
      `${getConfig().LMS_BASE_URL}/admin-console/api/openedx/api/unenroll/`,
      {
        course_id: id,
      },
    ),
    onSuccess: () => {
      queryClient.invalidateQueries(['OverviewList']);
      queryClient.invalidateQueries(['EnrollmentList']);
      queryClient.invalidateQueries(['enrollmentStatus']);
    },
  });

  const handleUnenroll = (e) => {
    e.preventDefault();
    deleteEnrollCourse.mutate(courseId);
    dispatch(
      setToastMessage(
        <FormattedMessage
          id="userCourseCard.unrollMessage.text"
          defaultMessage="You have successfully unenrolled from the course"
        />,
      ),
    );
    dispatch(hideUnenrollAlert());
  };

  return { handleUnenroll, deleteEnrollCourse };
};
export default useUnenrollCourse;
