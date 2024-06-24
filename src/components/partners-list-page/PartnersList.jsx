import {
  Icon, Breadcrumb, Pagination, useMediaQuery,
} from '@edx/paragon';
import { ArrowBack } from '@edx/paragon/icons';
import { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {
  FormattedMessage,
  injectIntl,
  intlShape,
} from '@edx/frontend-platform/i18n';
import PartnersCardGrid from './PartnersList/PartnersCardGrid';
import PartnersCardList from './PartnersList/PartnersCardList';
import TotalPartnersWrapper from './PartnersList/TotalPartnersWrapper';
import messages from '../../messages';
import useGetPartners from '../../hooks/useGetPartners';
import useGetPartnersSuggestions from '../../hooks/useGetPartnersSuggestions';
import PartnersHeader from './PartnersList/PartnersHeader';
import useGetConfig from '../../hooks/useGetConfig';

const PartnersList = ({ intl }) => {
  const { platformName } = useGetConfig();
  const [view, setView] = useState('grid');
  const [page, setPage] = useState(1);
  const [searchString, setSearchString] = useState('');
  const [suggestionQuery, setSuggestionQuery] = useState('');
  const { partnersSuggestionsResults } = useGetPartnersSuggestions(suggestionQuery);

  useEffect(() => {
    document.title = `${intl.formatMessage(messages['partners.breadcrumb.ourPartners'])} | ${platformName}`;
  }, [intl, platformName]);

  const {
    count,
    partnersData,
    partnersMetaData,
    loading,
    numPages,
    isFetching,
  } = useGetPartners(page, searchString);
  const history = useHistory();
  const isMobile = useMediaQuery({ maxWidth: '768px' });

  return (
    <section>
      <div className="d-flex px-4.5 py-3 align-items-center back-btn-wrapper">
        <Icon src={ArrowBack} onClick={history.goBack} className="mr-1.5" />
        <h4 className="ml-3.5">
          <FormattedMessage
            id="homePage.partners.title"
            defaultMessage="Partners"
          />
        </h4>
      </div>
      <PartnersHeader
        setSuggestionQuery={setSuggestionQuery}
        setSearchString={setSearchString}
        setPage={setPage}
        suggestionQuery={suggestionQuery}
        partnersSuggestionsResults={partnersSuggestionsResults}
        partnersMetaData={partnersMetaData}
      />

      <div className="custom-container">
        <div className="partner-breadcrumb pt-4.5">
          <Breadcrumb
            ariaLabel="Breadcrumb basic"
            links={[
              {
                label: `${intl.formatMessage(messages['breadcrumb.home'])}`,
                to: '/',
              },
            ]}
            linkAs={Link}
            activeLabel={intl.formatMessage(
              messages['partners.breadcrumb.ourPartners'],
            )}
          />
        </div>
        <TotalPartnersWrapper
          view={view}
          setView={setView}
          count={count}
          loading={loading}
        />
        {view === 'grid' ? (
          <PartnersCardGrid
            partnersData={partnersData}
            loading={loading && isFetching}
          />
        ) : (
          <PartnersCardList
            partnersData={partnersData}
            loading={loading && isFetching}
          />
        )}
        <div className="pb-5.5 pt-4.5">
          {numPages > 1 && (
            <Pagination
              className="d-flex justify-content-center transform-rtl"
              paginationLabel="pagination navigation"
              pageCount={numPages}
              onPageSelect={(e) => setPage(e)}
              currentPage={page}
              variant={isMobile ? 'reduced' : 'default'}
              buttonLabels={{
                previous: `${intl.formatMessage(
                  messages['pagination.previous.button'],
                )}`,
                next: `${intl.formatMessage(
                  messages['pagination.next.button'],
                )}`,
                page: `${intl.formatMessage(messages['pagination.page.text'])}`,
                currentPage: `${intl.formatMessage(
                  messages['pagination.currentPage.text'],
                )}`,
                pageOfCount: `${intl.formatMessage(
                  messages['pagination.of.text'],
                )}`,
              }}
            />
          )}
        </div>
      </div>
    </section>
  );
};

PartnersList.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(PartnersList);
