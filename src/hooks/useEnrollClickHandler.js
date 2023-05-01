import { getConfig } from '@edx/frontend-platform';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import { AppContext } from '@edx/frontend-platform/react';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';

const useEnrollClickHandler = (courseId) => {
  const { authenticatedUser } = useContext(AppContext);
  const [availablePaymentData, setAvailablePaymentData] = useState();

  useEffect(() => {
    const availablePayment = async () => {
      try {
        const Res = await axios.get(
          `${getConfig().LMS_BASE_URL}/admin-console/api/paid-courses/${courseId}`,
        );
        setAvailablePaymentData(Res.data);
      } catch (err) {
        console.error(err);
      }
    };
    if (courseId) {
      availablePayment();
    }
  }, [courseId]);

  const fetchTransaction = async () => {
    const url = `${
      getConfig().LMS_BASE_URL
    }/admin-console/api/create-transaction/`;
    const { data, status } = await getAuthenticatedHttpClient().post(url, {
      course_id: courseId,
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

  const {
    refetch,
  } = useQuery('Transaction', fetchTransaction, {
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
      mutate(courseId);
    }
  };
  return {
    enrollClickHandler,
    isLoading,
    availablePaymentData,
  };
};

export default useEnrollClickHandler;
