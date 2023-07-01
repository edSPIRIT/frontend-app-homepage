import { getConfig } from '@edx/frontend-platform';
import { useQuery } from 'react-query';
import { useContext } from 'react';
import { AppContext } from '@edx/frontend-platform/react';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';

const useGetUserProfile = () => {
  const { authenticatedUser } = useContext(AppContext);

  const fetchUserProfile = async () => {
    const { data, status } = await getAuthenticatedHttpClient().get(
      `${getConfig().LMS_BASE_URL}/api/user/v1/accounts/${
        authenticatedUser?.username
      }`,
    );
    if (status !== 200) {
      throw new Error('user fetch not ok');
    }
    return data;
  };

  const { isLoading, data } = useQuery('fetchUserProfile', fetchUserProfile, {
    enabled: !!authenticatedUser,
  });
  return {
    userProfile: data,
    loading: isLoading,
  };
};
export default useGetUserProfile;
