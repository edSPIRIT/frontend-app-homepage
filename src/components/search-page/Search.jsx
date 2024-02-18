import { useMediaQuery } from '@edx/paragon';

import { useEffect } from 'react';
import MobileSearch from './Search/MobileSearch';
import DesktopSearch from './Search/DesktopSearch';
import useGetConfig from '../../hooks/useGetConfig';

const Search = () => {
  const { platformName } = useGetConfig();

  useEffect(() => {
    document.title = `Search | ${platformName}`;
  }, [platformName]);
  const isMobile = useMediaQuery({ maxWidth: '768px' });
  const SearchComponent = isMobile ? MobileSearch : DesktopSearch;
  return <SearchComponent />;
};

export default Search;
