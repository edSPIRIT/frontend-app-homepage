import Banner from '../banner/Banner';
import ExplorerCourses from '../explorer-courses/ExplorerCourses';
import Partners from '../partners/Partners';
import PopularSubjects from '../popular-subjects/PopularSubjects';
import TopPrograms from '../top-programs/TopPrograms';

const HomePage = () => (
  <main>
    <Banner />
    <PopularSubjects />
    <ExplorerCourses />
    <TopPrograms />
    <Partners />
  </main>
);
export default HomePage;
