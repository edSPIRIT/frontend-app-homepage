/* eslint-disable react/prop-types */
import { useMediaQuery } from '@edx/paragon';

import { useEffect } from 'react';
import { injectIntl } from '@edx/frontend-platform/i18n';
import MobileSearch from './Search/MobileSearch';
import DesktopSearch from './Search/DesktopSearch';
import useGetConfig from '../../hooks/useGetConfig';
import messages from '../../messages';

const Search = ({ intl }) => {
  const { platformName } = useGetConfig();

  useEffect(() => {
    if (intl && platformName) {
      document.title = `${intl.formatMessage(messages['search.button.text'])} | ${platformName}`;
    }
  }, [intl, platformName]);

  const isMobile = useMediaQuery({ maxWidth: '768px' });
  const SearchComponent = isMobile ? MobileSearch : DesktopSearch;
  return <SearchComponent />;
};

export default injectIntl(Search);
