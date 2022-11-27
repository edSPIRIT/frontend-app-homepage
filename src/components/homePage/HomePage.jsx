import { FormattedMessage, injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import {
  Badge, Col, Dropdown,
} from '@edx/paragon';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SearchHeader from '../SearchHeader';
import CatalogSelectionDeck from '../catalogSelectionDeck/CatalogSelectionDeck';
import Subheader from '../catalogSelectionDeck/subheader/subheader';
import {
  NO_OPTIONS_FOUND,
  REFINEMENT,
  SEARCH_FACET_FILTERS,
} from '../../constants';
import Hero from '../hero/Hero';
import messages from '../hero/Hero.messages';
import DataTableComponent from '../testDataTable/DataTableComponent';

const HomePage = ({ intl }) => (
  <main>
    <Hero
      text={intl.formatMessage(messages['catalogPage.hero.text'])}
      highlight={intl.formatMessage(messages['catalogPage.hero.highlight'])}
    />
    <Subheader>
      <span>
        <FormattedMessage
          id="catalogPage.subtitle.text"
          defaultMessage="edX makes it easy to find the subjects, skills, programs, and courses to meet your learning needs. Work with our content experts to create a customized catalog for your organization from any of our 3,000+ courses. Or, choose our subscription catalog for ease, flexibility, and scalability at a single, per-learner price. "
          description="Description of the catalog contents and navigation to other edX pages."
        />
      </span>
    </Subheader>
    <CatalogSelectionDeck
      title={intl.formatMessage(
        messages['catalogPage.catalogSelectionDeck.title'],
      )}
    />
    <div className="mt-3 mb-5 page-width container-fluid">
      <FormattedMessage
        id="catalogs.enterpriseCatalogs.header"
        defaultMessage="Search courses and programs"
        description="Search dialogue."
        tagName="h2"
      />
      <SearchHeader />
      <Col className="fe__searchbox-col--default" xs={12}>
        <div className="d-flex">

          {SEARCH_FACET_FILTERS.map((facet) => (
            <div className="facet-list">
              <Dropdown autoClose="outside" className="mb-0 mr-md-3">
                <Dropdown.Toggle
                  id="{title}-{variant}"
                  variant="outline-primary"
                  className="font-weight-bold"
                >
                  {facet.title}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <span className="p-2 d-block">{NO_OPTIONS_FOUND}</span>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          ))}
        </div>
        <ul className="list-unstyled d-flex flex-wrap align-items-center mb-1 mt-3">
          {REFINEMENT.map((item) => (
            <li className="mr-2" key={item.title}>
              <Badge
                className="fe__refinement-badge py-2 mb-2 font-weight-light"
                variant="light"
                // onClick={() => handleRefinementBadgeClick(item)}
              >
                <span className="mr-2"> {item.title}</span>
                <FontAwesomeIcon icon={faTimes} />
                <span className="sr-only">Remove the filter {item.label}</span>
              </Badge>
            </li>
          ))}
        </ul>
      </Col>
      <p className="h2 mt-4">Courses</p>

      <DataTableComponent />
    </div>
  </main>
);
HomePage.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(HomePage);
