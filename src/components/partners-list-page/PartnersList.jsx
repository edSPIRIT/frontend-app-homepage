/* eslint-disable max-len */
import {
  SearchField,
  Icon,
  Breadcrumb,
  Pagination,
  useMediaQuery,
} from '@edx/paragon';
import {
  ArrowBack, BookOpen, DrawShapes, Groups,
} from '@edx/paragon/icons';
import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {
  FormattedMessage,
  injectIntl,
  intlShape,
} from '@edx/frontend-platform/i18n';
import useGetPartners from '../../hooks/useGetPartners';
import PartnersCardGrid from './partners-list/PartnersCardGrid';
import PartnersCardList from './partners-list/PartnersCardList';
import TotalPartnersWrapper from './partners-list/TotalPartnersWrapper';
import messages from '../../messages';

const PartnersList = ({ intl }) => {
  const [view, setView] = useState('grid');
  const [page, setPage] = useState(1);
  const {
    count,
    partnersData,
    partnersMetaData,
    loading,
    numPages,
    isFetching,
  } = useGetPartners(page);
  const history = useHistory();
  const isMobile = useMediaQuery({ maxWidth: '768px' });

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
              defaultMessage="edSPIRIT offers the highest quality online courses from institutions
            who share our commitment to excellence in teaching and learning."
            />
          </p>
          <SearchField
            className="partners-search my-4"
            submitButtonLocation="external"
            onSubmit={(value) => console.log(`search submitted: ${value}`)}
            placeholder={intl.formatMessage(
              messages['partners.search.placeholder'],
            )}
            buttonText={intl.formatMessage(messages['search.button.text'])}
          />
          {/* temporary remove from ui */}
          {/* <Link className="banner-link pb-5" to="/">
            <span className="mr-2">How to become a partner</span>
            <Icon src={ArrowForward} />
          </Link> */}
          <div className="banner-icons-wrapper">
            <div className="icon-wrapper">
              <Icon clas src={BookOpen} style={{ width: '36px' }} />
              <span>{partnersMetaData?.total_courses}</span>
              <p>
                <FormattedMessage
                  id="partners.snapShut.courses.text"
                  defaultMessage="courses in subjects such as humanities, math, computer science"
                />
              </p>
            </div>
            <div className="icon-wrapper">
              <Icon src={DrawShapes} />
              <span>{partnersMetaData?.total_instructors}</span>
              <p>
                <FormattedMessage
                  id="partners.snapShut.instructors.text"
                  defaultMessage="Instructors ..."
                />
              </p>
            </div>
            <div className="icon-wrapper">
              <Icon src={Groups} />
              <span>{partnersMetaData?.total_learners}</span>
              <p>
                <FormattedMessage
                  id="partners.snapShut.learners.text"
                  defaultMessage="learners across edspirit courses"
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
