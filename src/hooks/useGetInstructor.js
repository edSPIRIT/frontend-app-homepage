/* eslint-disable react-hooks/exhaustive-deps */
import { getConfig } from '@edx/frontend-platform';
import { useEffect, useState } from 'react';

const useGetInstructor = (slug) => {
  const [InstructorData, setInstructorData] = useState();

  const getInstructorData = async () => {
    try {
      const Res = await fetch(
        `${getConfig().LMS_BASE_URL}/admin-console/api/instructor/${slug}/`,
      );
      const Data = await Res.json();
      setInstructorData(Data);
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    getInstructorData();
  }, [slug]);
  return {
    InstructorData,
  };
};
export default useGetInstructor;
