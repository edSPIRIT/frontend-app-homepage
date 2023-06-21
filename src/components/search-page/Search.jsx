import { useMediaQuery } from '@edx/paragon';

import { useEffect } from 'react';
import MobileSearch from './search/MobileSearch';
import DesktopSearch from './search/DesktopSearch';

const Search = () => {
  useEffect(() => {
    document.title = `Search | ${process.env.SITE_NAME}`;
  }, []);
  const isMobile = useMediaQuery({ maxWidth: '768px' });
  const SearchComponent = isMobile ? MobileSearch : DesktopSearch;
  return <SearchComponent />;
};

export default Search;
