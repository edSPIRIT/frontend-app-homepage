import { getConfig } from '@edx/frontend-platform';
import axios from 'axios';
import { useEffect, useState } from 'react';

const useCheckPayment = (courseId) => {
  const [paymentData, setPaymentData] = useState();
  const checkPayment = async () => {
    try {
      const Res = await axios.get(
        `${getConfig().LMS_BASE_URL}/admin-console/api/paid-courses/${courseId}/`,
      );
      setPaymentData(Res.data);
    } catch (err) {
      console.error(err);
    }
    // try {
    //   const Res = await fetch(
    //     `${getConfig().LMS_BASE_URL}/admin-console/api/paid-courses/${courseId}/`,
    //   );
    //   const Data = await Res.json();
    //   setPaymentData(Data);
    // } catch (e) {
    //   console.error(e);
    // }
  };
  useEffect(() => {
    if (courseId) {
      checkPayment();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseId]);
  return {
    paymentData,
  };
};
export default useCheckPayment;
