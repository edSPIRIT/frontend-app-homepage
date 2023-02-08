import { getConfig } from '@edx/frontend-platform';
import { useEffect, useState } from 'react';

const useGetBanner = () => {
  const [bannerData, setBannerData] = useState();
  const [loading, setLoading] = useState(false);
  const getBannerData = async () => {
    try {
      setLoading(true);
      const Res = await fetch(
        `${getConfig().LMS_BASE_URL}/admin-console/api/welcome-section/`,
      );
      const Data = await Res.json();
      setBannerData(Data);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.error(e);
    }
  };
  useEffect(() => {
    getBannerData();
  }, []);
  return {
    title: bannerData?.title,
    highlightedWord: bannerData?.highlight_word,
    description: bannerData?.description,
    image: bannerData?.image,
    loading,
  };
};
export default useGetBanner;
