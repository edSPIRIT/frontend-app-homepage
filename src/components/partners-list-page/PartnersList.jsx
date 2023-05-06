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
import useGetPartners from '../../hooks/useGetPartners';
import PartnersCardGrid from './partners-list/PartnersCardGrid';
import PartnersCardList from './partners-list/PartnersCardList';
import TotalPartnersWrapper from './partners-list/TotalPartnersWrapper';

const PartnersList = () => {
  const [view, setView] = useState('grid');
  const [page, setPage] = useState(1);
  const {
    count, partnersData, loading, numPages, isFetching,
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
          <h1 className="pb-4">Our Partners</h1>
          <p className="banner-desc">
            edSPIRIT offers the highest quality online courses from institutions
            who share our commitment to excellence in teaching and learning.
          </p>
          <SearchField
            className="partners-search my-4"
            submitButtonLocation="external"
            onSubmit={(value) => console.log(`search submitted: ${value}`)}
            placeholder="Who are you looking for?"
          />
          {/* temporary remove from ui */}
          {/* <Link className="banner-link pb-5" to="/">
            <span className="mr-2">How to become a partner</span>
            <Icon src={ArrowForward} />
          </Link> */}
          <div className="banner-icons-wrapper">
            <div className="icon-wrapper">
              <Icon clas src={BookOpen} style={{ width: '36px' }} />
              <span>2800+</span>
              <p>
                courses in subjects such as humanities, math, computer science
              </p>
            </div>
            <div className="icon-wrapper">
              <Icon src={DrawShapes} />
              <span>1 Milion</span>
              <p>learners worldwide, representing every country</p>
            </div>
            <div className="icon-wrapper">
              <Icon src={Groups} />
              <span>1 Milion</span>
              <p>enrollments across edX courses</p>
            </div>
          </div>
        </div>
      </div>
      <div className="custom-container">
        <div className="partner-breadcrumb pt-4.5">
          <Breadcrumb
            ariaLabel="Breadcrumb basic"
            links={[{ label: 'Home', to: '/' }]}
            linkAs={Link}
            activeLabel="Our-Partners"
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
              className="d-flex justify-content-center"
              paginationLabel="pagination navigation"
              pageCount={numPages}
              onPageSelect={(e) => setPage(e)}
              currentPage={page}
              variant={isMobile ? 'reduced' : 'default'}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default PartnersList;
