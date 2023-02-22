/* eslint-disable react-hooks/exhaustive-deps */
import { getConfig } from '@edx/frontend-platform';
import { useEffect, useState } from 'react';

const useGetCourseToc = (courseId) => {
  const initialCourseToc = {
    toc: {
      name: null,
      lms_url: null,
      sections: [
        {
          name: null,
          lms_url: null,
          subsections: [
            {
              name: null,
              lms_url: null,
              units: [
                {
                  name: null,
                  lms_url: null,
                  type: null,
                },
              ],
            },
          ],
        },
      ],
    },
  };
  const [courseTocData, setCourseTocData] = useState(initialCourseToc);
  const [loading, setLoading] = useState(false);

  const getCourseTocData = async () => {
    try {
      setLoading(true);
      const Res = await fetch(
        `${getConfig().LMS_BASE_URL}/admin-console/api/course-toc/${courseId}/`,
      );
      const Data = await Res.json();
      setCourseTocData(Data);
      setLoading(false);
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  };
  useEffect(() => {
    if (courseId) {
      getCourseTocData();
    }
  }, [courseId]);
  return {
    sections: courseTocData?.toc?.sections,
    loading,
  };
};
export default useGetCourseToc;
