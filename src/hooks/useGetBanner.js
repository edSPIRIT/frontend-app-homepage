import { getConfig } from '@edx/frontend-platform';
import { useEffect, useState } from 'react';

const useGetBanner = () => {
  const [BannerData, setBannerData] = useState();
  const getBannerData = async () => {
    try {
      const Res = await fetch(`${getConfig().LMS_BASE_URL}/admin-console/api/welcome-section/`);
      const Data = await Res.json();
      setBannerData(Data);
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    getBannerData();
  }, []);
  return {
    title: BannerData?.title,
    highlightedWord: BannerData?.highlight_word,
    description: BannerData?.description,
    image: BannerData?.image,
  };
};
export default useGetBanner;
