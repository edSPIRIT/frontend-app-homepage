import ExplorerCourses from './top-recent-courses/ExplorerCourses';
import Partners from './partners/Partners';
import Banner from './banner/Banner';
import PopularSubjectsWrapper from './popular-subjects-wrapper/PopularSubjectsWrapper';

const Home = () => (
  <>
    <Banner />
    <PopularSubjectsWrapper />
    <ExplorerCourses />
    {/* <TopPrograms /> */}
    <Partners />
  </>
);
export default Home;
