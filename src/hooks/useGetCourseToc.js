import { getConfig } from '@edx/frontend-platform';
import { useEffect, useState } from 'react';

const useGetCourseToc = (courseId) => {
  const initialCourseToc = {
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
  };
  const [courseTocData, setCourseTocData] = useState(initialCourseToc);
  const getCourseTocData = async () => {
    try {
      const Res = await fetch(
        `${getConfig().LMS_BASE_URL}/admin-console/api/course-toc/${courseId}/`
      );
      const Data = await Res.json();
      setCourseTocData(Data);
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    getCourseTocData();
  }, []);
  return {
    sections: courseTocData?.sections,
  };
};
export default useGetCourseToc;
