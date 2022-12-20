import ExplorerCourses from './explorer-courses/ExplorerCourses';
import Partners from './partners/Partners';
import PopularSubjects from './popular-subjects/PopularSubjects';
import TopPrograms from './top-programs/TopPrograms';
import Banner from './banner/Banner';
import HeaderED from '../shared/header-home/HeaderED';

const Home = () => (
  <main>
    <HeaderED />
    <Banner />
    <PopularSubjects />
    <ExplorerCourses />
    <TopPrograms />
    <Partners />
  </main>
);
export default Home;
