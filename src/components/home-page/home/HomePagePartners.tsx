import { FormattedMessage } from '@edx/frontend-platform/i18n';
import { Button, Skeleton } from '@edx/paragon';
import { ArrowForward } from '@edx/paragon/icons';
import { Link, useHistory } from 'react-router-dom';
import logoPlaceholder from '../../../assets/place-holders/org-logo-place-holder.svg';
import useGetPopularPartners from '../../../hooks/useGetPopularPartners';

const HomePagePartners = () => {
  const { PopularPartners, loading } = useGetPopularPartners();
  const history = useHistory();
  return (
    <section id="partners" className="partners-container">
      <div className="custom-container ">
        <h2 className="d-flex justify-content-center mb-4">
          <FormattedMessage
            id="homePage.partners.title"
            defaultMessage="Partners"
          />
        </h2>
        <span className="d-flex justify-content-center mb-5 text-gray-500">
          <FormattedMessage
            id="homePage.partnersDescription.text"
            defaultMessage="Founded by Harvard and MIT, edX is home to more than 20 million
          learners, the majority of top-ranked universities in the world and
          industry-leading companies."
          />
        </span>
        <div className="d-flex justify-content-center ">
          {loading
            ? Array(5)
              .fill(1)
              .map((item, i) => (
                // eslint-disable-next-line react/no-array-index-key
                <Skeleton className="mr-4" width={208} height={112} key={i} />
              ))
            : PopularPartners?.map((partner) => (
              <Link
                to={`/partners/${partner?.organization.short_name}`}
                className="mr-4 partners-img-wrapper"
                key={partner?.organization.id}
              >
                <img
                  src={partner?.organization.logo ?? logoPlaceholder}
                  alt="partner-logo"
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
      </div>
    </section>
  );
};

export default HomePagePartners;
