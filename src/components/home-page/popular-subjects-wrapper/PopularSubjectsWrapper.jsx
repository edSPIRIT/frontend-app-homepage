import { Button } from '@edx/paragon';
import { ArrowForward } from '@edx/paragon/icons';
import { useHistory } from 'react-router';
import PopularSubjects from '../../shared/popular-subjects/PopularSubjects';

const PopularSubjectsWrapper = () => {
  const history = useHistory();

  return (
    <section className="popular-subject-container">
      <div className="custom-container">
        <h2 className="d-flex popular-title">
          Popular<span className="highlighted ml-2">Subjects</span>
        </h2>
        <PopularSubjects />
        <div className="d-flex justify-content-center">
          <Button
            className="view-all-courses-btn mt-5"
            iconAfter={ArrowForward}
            onClick={() => history.push('/discover')}
          >
            View all subjects
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PopularSubjectsWrapper;
