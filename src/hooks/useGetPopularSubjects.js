import { getConfig } from '@edx/frontend-platform';

import { useQuery } from 'react-query';

const useGetPopularSubjects = () => {
  // const [popularSubjects, setPopularSubject] = useState();
  // const isMobile = useMediaQuery({ maxWidth: '1024px' });

  const fetchSubjects = async () => {
    const apiRes = await fetch(
      `${getConfig().LMS_BASE_URL}/admin-console/api/popular-subject-list/`,
    );

    if (!apiRes.ok) {
      throw new Error('fetch not ok');
    }

    return apiRes.json();
  };

  const { data, isLoading } = useQuery('Subjects', fetchSubjects);

  // useEffect(() => {
  //   const processResults = (results) => {
  //     let limit;
  //     if (isMobile) {
  //       limit = results.length > 6 ? 6 : results.length;
  //     } else {
  //       limit = results.length >= 10 ? 10 : results.length >= 5 ? 5 : 0;
  //     }
  //     setPopularSubject(results.slice(0, limit));
  //   };
  //   if (data?.results) {
  //     processResults(data.results);
  //   }
  // }, [data?.results, isMobile]);

  return {
    popularSubjects: data?.results,
    loading: isLoading,
  };
};

export default useGetPopularSubjects;
