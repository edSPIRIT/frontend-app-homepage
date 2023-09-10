import { useMediaQuery } from '@edx/paragon';

import { useEffect } from 'react';
import { getConfig } from '@edx/frontend-platform';
import MobileSearch from './Search/MobileSearch';
import DesktopSearch from './Search/DesktopSearch';

const Search = () => {
  useEffect(() => {
    document.title = `Search | ${getConfig().SITE_NAME}`;
  }, []);
  const isMobile = useMediaQuery({ maxWidth: '768px' });
  const SearchComponent = isMobile ? MobileSearch : DesktopSearch;
  return <SearchComponent />;
};

export default Search;
