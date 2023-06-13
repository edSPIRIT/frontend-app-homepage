import { getConfig } from '@edx/frontend-platform';
import axios from 'axios';
import { useQuery } from 'react-query';

const useGetPartnerPopularCourses = (partner) => {
  const fetchPartnerPopularCourses = async (partnerName) => {
    try {
      const response = await axios.get(
        `${
          getConfig().LMS_BASE_URL
        }/admin-console/api/popular-course-list/?partner_shortname=${partnerName}&target=partner`,
      );
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  const { data, isLoading } = useQuery(
    ['PartnerPopularCourses', partner],
    () => fetchPartnerPopularCourses(partner),
    {
      enabled: !!partner,
    },
  );
  // const filterPartnerCourses = (data) => {
  //   if (data.length >= 4 && data.length <= 8) {
  //     return data.slice(0, 4);
  //   }
  //   if (data.length > 8) {
  //     return data.slice(0, 8);
  //   }
  //   return data;
  // };

  return {
    // partnerPopularCourses: filterPartnerCourses(data),
    partnerPopularCourses: data,
    loading: isLoading,
  };
};
export default useGetPartnerPopularCourses;
