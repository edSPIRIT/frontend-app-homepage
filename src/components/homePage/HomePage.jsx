import Banner from '../banner/Banner';
import ExplorerCourses from '../explorer-courses/ExplorerCourses';
import Partners from '../partners/Partners';
import PopularSubjects from '../popular-subjects/PopularSubjects';

const HomePage = () => (
  <main>
    <Banner />
    <PopularSubjects />
    <ExplorerCourses />
    <Partners />
  </main>
);
export default HomePage;
