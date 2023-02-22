import { Skeleton } from '@edx/paragon';
import { Link } from 'react-router-dom';
import useGetPartners from '../../../hooks/useGetPartners';

const Partners = () => {
  const { topPartners, loading } = useGetPartners();
  return (
    <section id="partners" className="pt-6 partners">
      <div className="custom-container">
        <h2 className="d-flex justify-content-center mb-4">Partners</h2>
        <span className="d-flex justify-content-center mb-5 text-gray-500">
          Founded by Harvard and MIT, edX is home to more than 20 million
          learners, the majority of top-ranked universities in the world and
          industry-leading companies
        </span>
        <div className="d-flex justify-content-center ">
          {loading ? (
            Array(5)
              .fill(1)
              .map((item, i) => (
                // eslint-disable-next-line react/no-array-index-key
                <Skeleton className="mr-4" width={208} height={112} key={i} />
              ))
          ) : (
            topPartners.map((partner) => (
              <Link
                to={`/partners/${partner.organization.short_name}`}
                className="mr-4 partners-img-wrapper"
                key={partner.organization.id}
              >
                <img src={partner.organization.logo} alt="" />
              </Link>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Partners;
