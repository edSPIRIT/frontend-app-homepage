import PopularSubjects from '../../shared/popular-subjects/PopularSubjects';

const PopularSubjectsWrapper = () => (
  <section className="py-6">
    <div className="custom-container">
      <h2 className="d-flex justify-content-center mb-5">
        Popular<span className="highlighted ml-2">Subjects</span>
      </h2>
      <PopularSubjects />
    </div>
  </section>
);

export default PopularSubjectsWrapper;
