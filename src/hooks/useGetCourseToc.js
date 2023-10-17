import { getConfig } from '@edx/frontend-platform';
import { useQuery } from 'react-query';

const useGetCourseToc = (courseId) => {
  // const initialCourseToc = {
  //   toc: {
  //     name: null,
  //     lms_url: null,
  //     sections: [
  //       {
  //         name: null,
  //         lms_url: null,
  //         subsections: [
  //           {
  //             name: null,
  //             lms_url: null,
  //             units: [
  //               {
  //                 name: null,
  //                 lms_url: null,
  //                 type: null,
  //               },
  //             ],
  //           },
  //         ],
  //       },
  //     ],
  //   },
  // };
  const fetchCourseToc = async ({ queryKey }) => {
    const id = queryKey[1];
    const apiRes = await fetch(
      `${getConfig().LMS_BASE_URL}/admin-console/api/course-toc/${id}/`,
    );

    if (!apiRes.ok) {
      throw new Error('fetch not ok');
    }

    return apiRes.json();
  };
  const { data, isLoading } = useQuery(
    ['CourseToc', courseId],
    fetchCourseToc,
    {
      enabled: !!courseId,
    },
  );
  return {
    sections: data?.toc?.sections,
    loading: isLoading,
  };
};
export default useGetCourseToc;
