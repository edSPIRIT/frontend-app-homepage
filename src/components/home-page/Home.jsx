import ExplorerCourses from './explorer-courses/ExplorerCourses';
import Partners from './partners/Partners';
import PopularSubjects from './popular-subjects/PopularSubjects';
import TopPrograms from './top-programs/TopPrograms';
import Banner from './banner/Banner';

const Home = () => (
  <main>
    <Banner />
    <PopularSubjects />
    <ExplorerCourses />
    <TopPrograms />
    <Partners />
  </main>
);
export default Home;
