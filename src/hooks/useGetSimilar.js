import { getConfig } from '@edx/frontend-platform';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

const useGetSimilar = () => {
  //   const fetchCourses = async () => {
  //     const client = getAuthenticatedHttpClient();
  //     const baseUrl = getConfig().LMS_BASE_URL;
  //     const response = await client.get(`${baseUrl}/api/courses/v1/courses/`);

  //     return response.data.results;
  //   };
  //   const { data, isLoading } = useQuery('Courses', fetchCourses);
  const [similarCourses, setSimilarCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const getSimilarCoursesData = async () => {
    // fetch(`${getConfig().LMS_BASE_URL}/admin-console/api/full-course-discovery/`, {
    //   method: 'POST',
    //   // headers: {
    //   //     'Accept': 'application/json',
    //   //     'Content-Type': 'application/json'
    //   // },
    //   body: JSON.stringify({ search_string: 'test' }),
    // })
    //   .then(response => response.json())
    //   .then(response => console.log(JSON.stringify(response)));
    const Data = getAuthenticatedHttpClient().post(
      `${getConfig().LMS_BASE_URL}/admin-console/api/full-course-discovery/`,
      {
        search_string: '-v',
      },
    );
    setSimilarCourses(Data);
  };
  useEffect(() => {
    getSimilarCoursesData();
  }, []);
  return {
    courses: similarCourses,
    loading,
  };
};
export default useGetSimilar;
