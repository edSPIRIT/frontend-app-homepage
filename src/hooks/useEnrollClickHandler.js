import { getConfig } from '@edx/frontend-platform';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import { AppContext } from '@edx/frontend-platform/react';
import axios from 'axios';
import { useContext } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';

const useEnrollClickHandler = (courseMetaData) => {
  const { authenticatedUser } = useContext(AppContext);

  const fetchAvailablePayment = async ({ queryKey }) => {
    const id = queryKey[1];
    try {
      const Res = await axios.get(
        `${getConfig().LMS_BASE_URL}/admin-console/api/paid-courses/${id}`,
      );
      return Res.data;
    } catch (err) {
      console.error(err);
    }
  };

  const { data: availablePaymentData, loading } = useQuery(
    ['Transaction', courseMetaData?.course_id],
    fetchAvailablePayment,
    {
      enabled: courseMetaData?.paid_course?.price > 0,
    },
  );
  const fetchTransaction = async () => {
    const url = `${
      getConfig().LMS_BASE_URL
    }/admin-console/api/create-transaction/`;
    const { data, status } = await getAuthenticatedHttpClient().post(url, {
      course_id: courseMetaData?.course_id,
      username: authenticatedUser?.username,
    });
    if (status !== 200) {
      throw new Error('fetch not ok');
    }
    if (status === 200) {
      window.location.href = data?.paymentURL;
    }

    return data;
  };

  const { refetch } = useQuery('Transaction', fetchTransaction, {
    refetchOnWindowFocus: false,
    enabled: false, // disable this query from automatically running
  });

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
    onSuccess: () => {
      queryClient.invalidateQueries(['EnrollmentList']);
    },
    onError: () => {
      alert('there was an error');
    },
  });
  const enrollClickHandler = () => {
    if (availablePaymentData) {
      refetch();
    } else {
      mutate(courseMetaData?.course_id);
    }
  };
  return {
    enrollClickHandler,
    isLoading,
    availablePaymentData,
  };
};

export default useEnrollClickHandler;
