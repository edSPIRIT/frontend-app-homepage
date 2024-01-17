import { getConfig } from '@edx/frontend-platform';
import { useQuery } from 'react-query';
import axios from 'axios';
import { IDynamicFeatures } from './interfaces/dynamicFeatures';

const useGetDynamicFeatures = () => useQuery<IDynamicFeatures>({
  queryKey: ['dynamicfeatures'],
  queryFn: () => axios.get(`${
    getConfig().LMS_BASE_URL
  }/admin-console/api/dynamic-features/`, {
  }).then((response) => response.data),
});

export default useGetDynamicFeatures;
