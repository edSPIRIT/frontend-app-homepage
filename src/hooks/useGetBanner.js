import { getConfig } from '@edx/frontend-platform';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

const useGetBanner = () => {
  // const [bannerData, setBannerData] = useState();
  // const [loading, setLoading] = useState(false);

  const fetchBanner = async () => {
    const apiRes = await fetch(`${getConfig().LMS_BASE_URL}/admin-console/api/welcome-section/`);

    if (!apiRes.ok) {
      throw new Error('fetch not ok');
    }

    return apiRes.json();
  };
  const { data, isLoading } = useQuery('banner', fetchBanner);
  // console.log('results', results);
  // const getBannerData = async () => {
  //   try {
  //     setLoading(true);
  //     const Res = await fetch(
  //       `${getConfig().LMS_BASE_URL}/admin-console/api/welcome-section/`,
  //     );
  //     const Data = await Res.json();
  //     setBannerData(Data);
  //     setLoading(false);
  //   } catch (e) {
  //     setLoading(false);
  //     console.error(e);
  //   }
  // };
  // useEffect(() => {
  //   getBannerData();
  // }, []);
  return {
    title: data?.title,
    highlightedWord: data?.highlight_word,
    description: data?.description,
    image: data?.image,
    isLoading,
  };
};
export default useGetBanner;
