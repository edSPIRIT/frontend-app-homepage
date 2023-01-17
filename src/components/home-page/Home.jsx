import ExplorerCourses from './explorer-courses/ExplorerCourses';
import Partners from './partners/Partners';
import TopPrograms from './top-programs/TopPrograms';
import Banner from './banner/Banner';
import PopularSubjectsWrapper from './popular-subjects-wrapper/PopularSubjectsWrapper';

const Home = () => (
  <main>
    <Banner />
    <PopularSubjectsWrapper />
    <ExplorerCourses />
    <TopPrograms />
    <Partners />
  </main>
);
export default Home;
