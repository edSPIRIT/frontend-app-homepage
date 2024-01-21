import { getConfig } from '@edx/frontend-platform';
import { useQuery } from 'react-query';
import axios from 'axios';
import { IStaticPage } from './interfaces/staticPages';

const useGetStaticPagesData = (pageTitle: string) => useQuery<IStaticPage>({
  queryKey: ['staticpages', pageTitle],
  queryFn: () => axios.get(`${
    getConfig().LMS_BASE_URL
  }/admin-console/api/custom-pages/${pageTitle}/`, {
  }).then((response) => response.data),
});

export default useGetStaticPagesData;
