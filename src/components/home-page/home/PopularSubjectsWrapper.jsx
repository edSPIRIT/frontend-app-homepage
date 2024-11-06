import { FormattedMessage } from '@edx/frontend-platform/i18n';
import { Button, Skeleton } from '@edx/paragon';
import { ArrowForward } from '@edx/paragon/icons';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import useGetPopularSubjects from '../../../hooks/useGetPopularSubjects';
import PopularSubjects from './PopularSubjectsWrapper/PopularSubjects';
import { resetSearchFilters } from '../../../redux/slice/searchQuerySlice';

const PopularSubjectsWrapper = () => {
  const { popularSubjects, loading } = useGetPopularSubjects();
  const history = useHistory();
  const dispatch = useDispatch();

  if (loading) {
    return (
      <section className="popular-subject-container custom-container">
        <div className="d-flex popular-title-wrapper mb-5">
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
        <div className="popular-title-wrapper d-flex">
          <h2 className="d-flex popular-title">
            <span>
              <FormattedMessage
                id="popularSubjects.firstPartTitle.text"
                defaultMessage="Popular"
              />
            </span>
            <span className="highlighted">
              <FormattedMessage
                id="popularSubjects.secondPartTitle.text"
                defaultMessage="Subjects"
              />
            </span>
          </h2>
        </div>

        <PopularSubjects popularSubjects={popularSubjects} />
        <div className="d-flex justify-content-center">
          <Button
            className="view-all-courses-btn mt-5"
            iconAfter={ArrowForward}
            onClick={() => {
              dispatch(resetSearchFilters());
              history.push('/discover');
            }}
          >
            <FormattedMessage
              id="popularSubjects.viewAllSubjects.button"
              defaultMessage="View All Subjects"
            />
          </Button>
        </div>
      </div>
    </section>
  ) : null;
};

export default PopularSubjectsWrapper;
