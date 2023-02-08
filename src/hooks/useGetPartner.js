/* eslint-disable react-hooks/exhaustive-deps */
import { getConfig } from '@edx/frontend-platform';
import { useEffect, useState } from 'react';

const useGetPartner = (partner) => {
  const initialPartner = {
    organization: {
      id: 0,
      created: '',
      modified: '',
      name: '',
      short_name: '',
      description: '',
      logo: '',
      active: false,
    },
    header: '',
    featured: false,
    courses_count: 0,
    created: '',
  };
  const [partnerData, setPartnerData] = useState(initialPartner);
  const [loading, setLoading] = useState(false);
  const getPartnerData = async () => {
    try {
      setLoading(true);
      const Res = await fetch(
        `${getConfig().LMS_BASE_URL}/admin-console/api/partner/${partner}/`,
      );
      const Data = await Res.json();
      setPartnerData(Data);
      setLoading(false);
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  };
  useEffect(() => {
    getPartnerData();
  }, [partner]);
  return {
    partnerData,
    loading,
  };
};
export default useGetPartner;
