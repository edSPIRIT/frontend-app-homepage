import { getConfig } from '@edx/frontend-platform';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import { AppContext } from '@edx/frontend-platform/react';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';

const useEnrollClickHandler = (courseId, coursePrice) => {
  const { authenticatedUser } = useContext(AppContext);

  const [availablePaymentData, setAvailablePaymentData] = useState();
  const [transactionData, setTransactionData] = useState();

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
  const postTransaction = async () => {
    try {
      const url = `${
        getConfig().LMS_BASE_URL
      }/admin-console/api/create-transaction/`;

      const { data, status } = await getAuthenticatedHttpClient().post(
        url,
        {
          course_id: courseId,
          username: authenticatedUser?.username,
        },
      );
      // const Res = await fetch(url, {
      //   method: 'POST',
      //   // headers: {
      //   //   'Content-Type': 'application/json',
      //   // },
      //   body: JSON.stringify({
      //     course_id: courseId,
      //     username: authenticatedUser?.username,
      //   }),
      // });
      // const Data = await Res.json();
      // console.log('inside postTransaction', Data);
      console.log('inside postTransaction', data);

      setTransactionData(data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (courseId) {
      availablePayment();
    }
  }, [courseId]);

  // useEffect(() => {
  //   if (availablePaymentData) {
  //     postTransaction();
  //   }
  // }, [availablePaymentData]);
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
      postTransaction();
    }
    mutate(courseId);
  };
  return {
    enrollClickHandler,
    isLoading,
    transactionData,
    availablePaymentData,
  };
};

export default useEnrollClickHandler;
