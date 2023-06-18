import { Breadcrumb } from '@edx/paragon';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import { Link } from 'react-router-dom';
import SearchFacets from './desktop-search/SearchFacets';
import messages from '../../../messages';
import SearchFilteredResults from './share/SearchFilteredResults';
import SearchHeader from '../../shared/search-header/SearchHeader';

const DesktopSearch = ({ intl }) => (
  <>
    <SearchHeader />
    <SearchFacets />
    <div className="custom-container pt-4.5">
      <Breadcrumb
        ariaLabel="Breadcrumb basic"
        links={[
          { label: 'Home', to: '/' },
          {
            label: `${intl.formatMessage(messages['breadcrumb.discover'])}`,
            to: '/Discover',
          },
        ]}
        linkAs={Link}
        activeLabel={intl.formatMessage(messages['search.button.text'])}
      />
      <SearchFilteredResults />
    </div>
  </>
);
DesktopSearch.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(DesktopSearch);
