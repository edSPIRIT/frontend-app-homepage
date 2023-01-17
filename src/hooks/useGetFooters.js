import { getConfig } from '@edx/frontend-platform';
import { useEffect, useState } from 'react';

const useGetFooters = () => {
  const [footerData, setFooterData] = useState({
    description: '',
    links: { socials: {}, sections: [] },
    logo: '',
  });
  const getFooterData = async () => {
    try {
      const Res = await fetch(
        `${getConfig().LMS_BASE_URL}/admin-console/api/footer-section/`,
      );
      const Data = await Res.json();
      setFooterData(Data);
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    getFooterData();
  }, []);
  return {
    footerData,
  };
};
export default useGetFooters;
