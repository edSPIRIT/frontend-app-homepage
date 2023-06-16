import { Breadcrumb } from '@edx/paragon';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import { Link } from 'react-router-dom';
import DiscoverBanner from '../../shared/discover-banner/DiscoverBanner';
import SearchFacets from './desktop-search/SearchFacets';
import messages from '../../../messages';
import SearchFilteredResults from './share/SearchFilteredResults';

const DesktopSearch = ({ intl }) => (
  <main>
    <DiscoverBanner />
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
  </main>
);
DesktopSearch.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(DesktopSearch);
