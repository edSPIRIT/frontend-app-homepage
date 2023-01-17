/* eslint-disable max-len */
import {
  SearchField, Icon, Breadcrumb,
} from '@edx/paragon';
import {
  ArrowForward, BookOpen, DrawShapes, Groups,
} from '@edx/paragon/icons';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import useGetPartners from '../../hooks/useGetPartners';
import PartnersCardGrid from './partners-list/PartnersCardGrid';
import PartnersCardList from './partners-list/PartnersCardList';
import TotalPartnersWrapper from './partners-list/TotalPartnersWrapper';

const PartnersList = () => {
  const [view, setView] = useState('grid');
  const { count, partnersData } = useGetPartners();

  return (
    <section>
      <div className="partners-header pt-5.5">
        <div className="custom-container">
          <h2 className="pb-4">Our Partners</h2>
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
          <Link className="banner-link pb-5" to="/">
            <span className="mr-2">How to become a partner</span>
            <Icon src={ArrowForward} />
          </Link>
        </div>
        <div className="d-flex justify-content-center banner-icons-wrapper">
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
      <div className="custom-container pt-4.5">
        <Breadcrumb
          ariaLabel="Breadcrumb basic"
          links={[{ label: 'Home', to: '/home' }]}
          linkAs={Link}
          activeLabel="Our-Partners"
        />
        <TotalPartnersWrapper view={view} setView={setView} count={count} />
        {view === 'grid' ? <PartnersCardGrid partnersData={partnersData} /> : <PartnersCardList partnersData={partnersData} />}
      </div>
    </section>
  );
};

export default PartnersList;
