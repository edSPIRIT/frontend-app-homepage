import { FormattedMessage } from '@edx/frontend-platform/i18n';
import { Skeleton } from '@edx/paragon';
import useGetPopularSubjects from '../../../hooks/useGetPopularSubjects';
import PopularSubjects from './PopularSubjectsWrapper/PopularSubjects';

const PopularSubjectsWrapper = () => {
  const { popularSubjects, loading } = useGetPopularSubjects();

  if (loading) {
    return (
      <section className="popular-subject-container custom-container">
        <div className="d-flex d-flex popular-title">
          <Skeleton width={250} height={40} />
        </div>
        <div className="subject-container  mb-6">
          {Array.from({ length: 10 }).map((_, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <div className="subject-wrapper" key={index}>
              <Skeleton className="mr-1" width={66} height={66} />
              <Skeleton width={175} height={20} />
            </div>
          ))}
        </div>
      </section>
    );
  }

  const hasPopularSubjects = popularSubjects?.length > 0;

  return hasPopularSubjects ? (
    <section className="popular-subject-container">
      <div className="custom-container">
        <h2 className="d-flex popular-title">
          <span className="ml-2">
            <FormattedMessage
              id="popularSubjects.firstPartTitle.text"
              defaultMessage="Popular"
            />
          </span>
          <span className="highlighted ml-2">
            <FormattedMessage
              id="popularSubjects.secondPartTitle.text"
              defaultMessage="Subjects"
            />
          </span>
        </h2>
        <PopularSubjects popularSubjects={popularSubjects} />
      </div>
    </section>
  ) : null;
};

export default PopularSubjectsWrapper;
