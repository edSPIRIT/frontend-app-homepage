import { FormattedMessage } from '@edx/frontend-platform/i18n';
import PopularSubjects from '../../shared/popular-subjects/PopularSubjects';

const PopularSubjectsWrapper = () => (
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
      <PopularSubjects />
    </div>
  </section>
);

export default PopularSubjectsWrapper;
