import { getConfig } from '@edx/frontend-platform';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import { AppContext } from '@edx/frontend-platform/react';
import { useContext } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useDispatch } from 'react-redux';
import { setActivateAlert } from '../redux/slice/activateAlertSlice';
import useGetUserProfile from './useGetUserProfile';
import { setSuccessAlertOpen } from '../redux/slice/course/successEnrollmentAlert';
import useGetPaidCourses from './useGetPaidCourses';

const fetchTransaction = async (courseId, username) => {
  const url = `${
    getConfig().LMS_BASE_URL
  }/admin-console/api/create-transaction/`;
  const { data, status } = await getAuthenticatedHttpClient().post(url, {
    course_id: courseId,
    username,
  });
  if (status !== 200) {
    throw new Error('fetch not ok');
  }
  window.location.href = data?.paymentURL;
  return data;
};
const postCourseEnrollment = async (id) => {
  const url = `${getConfig().LMS_BASE_URL}/api/enrollment/v1/enrollment`;
  const { data, status } = await getAuthenticatedHttpClient().post(url, {
    course_details: { course_id: id },
  });
  if (status !== 200) {
    throw new Error('fetch not ok');
  }
  return data;
};
const useEnrollClickHandler = (courseMetaData) => {
  const dispatch = useDispatch();

  const { authenticatedUser } = useContext(AppContext);
  const { userProfile } = useGetUserProfile();

  const { paidCourses: availablePaymentData } = useGetPaidCourses(courseMetaData);
  const { refetch } = useQuery(
    'Transaction',
    () => fetchTransaction(courseMetaData?.course_id, authenticatedUser?.username),
    {
      refetchOnWindowFocus: false,
      enabled: false,
    },
  );
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(postCourseEnrollment, {
    onSuccess: () => {
      dispatch(setSuccessAlertOpen(true));
      queryClient.invalidateQueries(['enrollmentStatus']);
      queryClient.invalidateQueries(['EnrollmentList']);
      queryClient.invalidateQueries(['OverviewList']);
    },
    onError: () => {
      alert('there was an error');
    },
  });
  const enrollClickHandler = () => {
    if (!userProfile?.is_active) {
      dispatch(setActivateAlert(true));
      return;
    }
    if (availablePaymentData) {
      refetch();
      return;
    }

    mutate(courseMetaData?.course_id);
  };
  return {
    enrollClickHandler,
    isLoading,
    availablePaymentData,
  };
};
export default useEnrollClickHandler;
