/* eslint-disable react-hooks/exhaustive-deps */
import { getConfig } from '@edx/frontend-platform';
import { useEffect, useState } from 'react';

const useGetInstructor = (slug) => {
  const [InstructorData, setInstructorData] = useState();
  const [loading, setLoading] = useState(false);

  const getInstructorData = async () => {
    try {
      setLoading(true);
      const Res = await fetch(
        `${getConfig().LMS_BASE_URL}/admin-console/api/instructor/${slug}/`,
      );
      const Data = await Res.json();
      setInstructorData(Data);
      setLoading(false);
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  };
  useEffect(() => {
    getInstructorData();
  }, [slug]);
  return {
    InstructorData,
    loading,
  };
};
export default useGetInstructor;
