import { Breadcrumb, Button } from '@edx/paragon';
import { ArrowForward } from '@edx/paragon/icons';
import { Link, useHistory } from 'react-router-dom';
import PopularSubjects from '../shared/popular-subjects/PopularSubjects';
import CourseCard from '../shared/course-card/CourseCard';
import DiscoverBanner from '../shared/discover-banner/DiscoverBanner';
import { COURSES_INFO_TOP } from '../../utils/constants';

const Discover = () => {
  const history = useHistory();
  return (
    <main>
      <DiscoverBanner />
      <div className="custom-container pt-5">
        <Breadcrumb
          ariaLabel="Breadcrumb basic"
          links={[{ label: 'Home', to: '/' }]}
          linkAs={Link}
          activeLabel="Discover"
        />
        <section className="pb-6 pt-4.5">
          <h2 className="d-flex  mb-5">Filter by popular subjects</h2>
          <PopularSubjects />
        </section>
        <section className="d-flex flex-column pb-6">
          <div className="d-flex align-items-center justify-content-between mb-2">
            <h2>Explore Courses</h2>
            <Button
              variant="outline-primary"
              iconAfter={ArrowForward}
              className="view-all-btn"
              onClick={() => history.push('/search')}
            >
              View All
            </Button>
          </div>
          <h4 className="text-gray-500 font-weight-normal mb-4">
            Most popular course
          </h4>
          <div className="course-container">
            {COURSES_INFO_TOP.map((course) => (
              <CourseCard info={course} key={course.title} />
            ))}
          </div>
        </section>
        {/* <section className="d-flex flex-column pb-6">
          <div className="d-flex align-items-center justify-content-between mb-2">
            <h2>Explore Programs</h2>
            <Button
              variant="outline-primary"
              iconAfter={ArrowForward}
              className="view-all-btn"
            >
              View All
            </Button>
          </div>
          <h4 className="text-gray-500 font-weight-normal mb-4">Most popular program</h4>
          <div className="programs-container">
            {TOP_PROGRAM.map((course) => (
              <ProgramCard info={course} key={course.title} />
            ))}
          </div>
        </section> */}
      </div>
    </main>
  );
};

export default Discover;
