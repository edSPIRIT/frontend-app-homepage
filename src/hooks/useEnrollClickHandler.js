import { getConfig } from '@edx/frontend-platform';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import { AppContext } from '@edx/frontend-platform/react';
import axios from 'axios';
import { useContext } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';

const fetchAvailablePayment = async (id) => {
  try {
    const response = await axios.get(
      `${getConfig().LMS_BASE_URL}/admin-console/api/paid-courses/${id}`,
    );
    return response.data;
  } catch (err) {
    console.error(err);
  }
};
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
  const { authenticatedUser } = useContext(AppContext);
  const { data: availablePaymentData, loading } = useQuery(
    ['Transaction', courseMetaData?.course_id],
    () => fetchAvailablePayment(courseMetaData?.course_id),
    {
      enabled: courseMetaData?.paid_course?.price > 0,
    },
  );
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
      queryClient.invalidateQueries(['EnrollmentList']);
    },
    onError: () => {
      alert('there was an error');
    },
  });
  const enrollClickHandler = () => {
    if (!authenticatedUser) {
      window.location.href = getConfig().LOGIN_URL;
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
