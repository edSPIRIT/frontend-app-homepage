import { FormattedMessage } from '@edx/frontend-platform/i18n';
import PopularSubjects from '../../shared/popular-subjects/PopularSubjects';
import useGetPopularSubjects from '../../../hooks/useGetPopularSubjects';

const PopularSubjectsWrapper = () => {
  const { popularSubjects, loading } = useGetPopularSubjects();

  return popularSubjects?.length > 0 ? (
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
        <PopularSubjects popularSubjects={popularSubjects} loading={loading} />
      </div>
    </section>
  ) : null;
};

export default PopularSubjectsWrapper;
