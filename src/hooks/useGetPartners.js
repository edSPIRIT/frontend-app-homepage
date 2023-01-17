import { getConfig } from '@edx/frontend-platform';
import { useEffect, useState } from 'react';

const useGetPartners = () => {
  const initialPartners = {
    count: null,
    current_page: null,
    next: null,
    num_pages: null,
    previous: null,
    results: [],
    start: null,
    total_courses: null,
    total_enrollments: null,
  };
  const [partnersData, setPartnersData] = useState(initialPartners);
  const getPartnersData = async () => {
    try {
      const Res = await fetch(
        `${getConfig().LMS_BASE_URL}/admin-console/api/partner-list/`,
      );
      const Data = await Res.json();
      setPartnersData(Data);
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    getPartnersData();
  }, []);
  return {
    count: partnersData.count,
    partnersData: partnersData.results,
    num_pages: partnersData.num_pages,
  };
};
export default useGetPartners;
