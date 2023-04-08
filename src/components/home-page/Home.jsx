import ExplorerCourses from './top-recent-courses/ExplorerCourses';
import Partners from './partners/Partners';
import Banner from './banner/Banner';
import PopularSubjectsWrapper from './popular-subjects-wrapper/PopularSubjectsWrapper';

const Home = () => (
  <main>
    <Banner />
    <PopularSubjectsWrapper />
    <ExplorerCourses />
    {/* <TopPrograms /> */}
    <Partners />
  </main>
);
export default Home;
