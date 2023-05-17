import { useMediaQuery } from '@edx/paragon';

import MobileSearch from './search/mobile-search/MobileSearch';
import DesktopSearch from './search/desktop-search/DesktopSearch';

const Search = () => {
  const isMobile = useMediaQuery({ maxWidth: '768px' });
  const SearchComponent = isMobile ? MobileSearch : DesktopSearch;
  return <SearchComponent />;
};

export default Search;
