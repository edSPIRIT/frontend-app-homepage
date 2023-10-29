/* eslint-disable no-nested-ternary */
import { FormattedMessage } from '@edx/frontend-platform/i18n';
import { Button } from '@edx/paragon';
import { ArrowForward } from '@edx/paragon/icons';
import { Link, useHistory } from 'react-router-dom';
import logoPlaceholder from '../../../assets/place-holders/org-place-holder.svg';
import useGetPopularPartners from '../../../hooks/useGetPopularPartners';
import LoadingSkeleton from './HomePagePartners/LoadingSkeleton';

const HomePagePartners = () => {
  const { PopularPartners, loading } = useGetPopularPartners();
  const history = useHistory();
  if (loading) {
    return <LoadingSkeleton />;
  }
  if (PopularPartners?.length === 0) {
    return null;
  }
  return (
    <section id="partners" className="partners-container custom-container">
      <h2 className="d-flex explorer-title mb-3.5">
        <FormattedMessage
          id="homePage.partners.title"
          defaultMessage="Partners"
        />
      </h2>
      <span className="d-flex justify-content-center mb-5 text-gray-500">
        <FormattedMessage
          id="partners.ourPartnersDes.text"
          defaultMessage="Our partners and collaborators help us provide excellent learning materials and high-quality online courses."
        />
      </span>
      <div className="d-flex justify-content-center partners-logo-wrapper">
        {PopularPartners?.map((partner) => (
          <Link
            to={`/partners/${partner?.organization.short_name}`}
            className="partners-img-wrapper"
            key={partner?.organization.id}
          >
            <img
              src={partner?.organization.logo ?? logoPlaceholder}
              alt="partner-logo"
              loading="lazy"
            />
          </Link>
        ))}
      </div>
      <div className="d-flex justify-content-center">
        <Button
          className="view-all-courses-btn mt-5"
          iconAfter={ArrowForward}
          onClick={() => history.push('/partners')}
        >
          <FormattedMessage
            id="homePage.viewOurPartners.button"
            defaultMessage="View Our Partners"
          />
        </Button>
      </div>
    </section>
  );
};

export default HomePagePartners;
