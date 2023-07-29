/* eslint-disable max-len */
import {
  SearchField,
  Icon,
  Breadcrumb,
  Pagination,
  useMediaQuery,
} from '@edx/paragon';
import {
  ArrowBack, ArrowForward, BookOpen, Groups,
} from '@edx/paragon/icons';
import { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {
  FormattedMessage,
  FormattedNumber,
  injectIntl,
  intlShape,
} from '@edx/frontend-platform/i18n';
import PartnersCardGrid from './partners-list/PartnersCardGrid';
import PartnersCardList from './partners-list/PartnersCardList';
import TotalPartnersWrapper from './partners-list/TotalPartnersWrapper';
import messages from '../../messages';
import useGetPartners from '../../hooks/useGetPartners';
import useGetPartnersSuggestions from '../../hooks/useGetPartnersSuggestions';
import { ReactComponent as Instructors } from '../../assets/instructors.svg';

const PartnersList = ({ intl }) => {
  const [view, setView] = useState('grid');
  const [page, setPage] = useState(1);
  const [searchString, setSearchString] = useState('');
  const [suggestionQuery, setSuggestionQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    document.title = `Partners | ${process.env.SITE_NAME}`;
  }, []);

  const {
    count,
    partnersData,
    partnersMetaData,
    loading,
    numPages,
    isFetching,
  } = useGetPartners(page, searchString);
  const { partnersSuggestionsResults } = useGetPartnersSuggestions(suggestionQuery);
  const history = useHistory();
  const isMobile = useMediaQuery({ maxWidth: '768px' });
  const handleSubmitSearch = () => {
    setSearchString(suggestionQuery);
  };
  return (
    <section>
      <div className="d-flex px-4.5 py-3 align-items-center back-btn-wrapper">
        <Icon src={ArrowBack} onClick={history.goBack} className="mr-1.5" />
        <h4 className="ml-3.5">Partners</h4>
      </div>
      <div className="partners-header pt-5.5 pb-4.5">
        <div className="custom-container">
          <h1 className="pb-4">
            <FormattedMessage
              id="partners.ourPartners.text"
              defaultMessage="Our Partners"
            />
          </h1>
          <p className="banner-desc">
            <FormattedMessage
              id="partners.ourPartnersDes.text"
              defaultMessage="Our partners and collaborators help us provide excellent learning materials and high-quality online courses."
            />
          </p>
          <SearchField
            className="partners-search mt-4"
            submitButtonLocation="external"
            onChange={(value) => setSuggestionQuery(value)}
            onSubmit={(value) => {
              setPage(1);
              setSearchString(value);
            }}
            placeholder={intl.formatMessage(
              messages['partners.search.placeholder'],
            )}
            buttonText={intl.formatMessage(messages['search.button.text'])}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          {partnersSuggestionsResults?.length > 0
            && isFocused
            && suggestionQuery && (
              <div className="search-suggestion-wrapper ">
                <div className="search-result-wrapper">
                  {partnersSuggestionsResults.map((result) => (
                    <Link
                      key={result?.data?.id}
                      to={`/partners/${result?.organization?.short_name}`}
                      onMouseDown={() => {
                        history.push(
                          `/partners/${result?.organization?.short_name}`,
                        );
                      }}
                    >
                      <span
                        key={result?.organization?.id}
                        className="text-gray-500"
                      >
                        {result?.organization?.name}
                      </span>
                    </Link>
                  ))}
                </div>
                <Link
                  className="d-flex align-items-center bg-light-300 btn-wrapper"
                  to="/search"
                  onMouseDown={handleSubmitSearch}
                >
                  <span className="mr-2">
                    <FormattedMessage
                      id="discover.viewAllResult.text"
                      defaultMessage="View all result"
                    />
                  </span>
                  <Icon
                    src={ArrowForward}
                    style={{ height: '12px', width: '12px' }}
                  />
                </Link>
              </div>
          )}
          <div className="banner-icons-wrapper mt-4">
            <div className="icon-wrapper">
              <Icon src={BookOpen} style={{ width: '40px' }} />
              <FormattedNumber value={partnersMetaData?.total_courses} />
              <p>
                <FormattedMessage
                  id="partners.snapShut.courses.text"
                  defaultMessage="{courseCount, plural, one {Course} other {Courses}}"
                  values={{
                    courseCount: partnersMetaData?.total_courses,
                  }}
                />
              </p>
            </div>
            <div className="icon-wrapper">
              <Icon src={Groups} style={{ width: '40px' }} />
              <FormattedNumber value={partnersMetaData?.total_learners} />
              <p>
                <FormattedMessage
                  id="partners.snapShut.learners.text"
                  defaultMessage="{learnerCount, plural, one {Learner} other {Learners}}"
                  values={{
                    learnerCount: partnersMetaData?.total_learners,
                  }}
                />
              </p>
            </div>
            <div className="icon-wrapper">
              <Icon src={Instructors} style={{ width: '40px' }} />
              <FormattedNumber value={partnersMetaData?.total_instructors} />
              <p>
                <FormattedMessage
                  id="partners.snapShut.instructors.text"
                  defaultMessage="{instructorCount, plural, one {Instructor} other {Instructors}}"
                  values={{
                    instructorCount: partnersMetaData?.total_instructors,
                  }}
                />
              </p>
            </div>
          </div>
        </div>
      </div>
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
