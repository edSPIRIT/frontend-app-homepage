import { getConfig } from '@edx/frontend-platform';
import { getLocale } from '@edx/frontend-platform/i18n';
import { useEffect, useState } from 'react';
import useGetActiveLangs from '../useGetActiveLangs';

const useManageLocale = () => {
  const { activeLangs, error } = useGetActiveLangs();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (error) {
      setIsLoading(false);
      return;
    }

    if (activeLangs) {
      const currentLocale = getLocale();
      const newLocale = activeLangs[0]?.code;
      const url = new URL(getConfig().LMS_BASE_URL).hostname;

      if (
        !document.cookie.includes('openedx-language-preference')
        && currentLocale !== newLocale
      ) {
        try {
          document.cookie = `openedx-language-preference=${newLocale}; path=/; domain=.${url}`;
          window.location.reload();
        } catch (err) {
          console.error(err);
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    }
  }, [activeLangs, error]);

  return isLoading;
};

export default useManageLocale;
