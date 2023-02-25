import { getConfig } from '@edx/frontend-platform';
import { useQuery } from 'react-query';

interface IBanner {
  title: string;
  highlight_word: string;
  description: string;
  image: string;
}
const useGetBanner = () => {
  const fetchBanner = async () => {
    const apiRes = await fetch(
      `${getConfig().LMS_BASE_URL}/admin-console/api/welcome-section/`
    );

    if (!apiRes.ok) {
      throw new Error('fetch not ok');
    }

    return apiRes.json();
  };
  const { data, isLoading } = useQuery<IBanner>('banner', fetchBanner);
  return {
    title: data?.title,
    highlightedWord: data?.highlight_word,
    description: data?.description,
    image: data?.image,
    isLoading,
  };
};
export default useGetBanner;
