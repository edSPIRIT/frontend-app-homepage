import PopularSubjects from '../../shared/popular-subjects/PopularSubjects';

const PopularSubjectsWrapper = () => (
  <section className="popular-subject-container">
    <div className="custom-container">
      <h2 className="d-flex popular-title">
        Popular<span className="highlighted ml-2">Subjects</span>
      </h2>
      <PopularSubjects />
    </div>
  </section>
);

export default PopularSubjectsWrapper;
