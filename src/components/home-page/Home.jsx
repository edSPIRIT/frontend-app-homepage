import { useEffect } from 'react';
import HomePagePartners from './home/HomePagePartners';
import PopularSubjectsWrapper from './home/PopularSubjectsWrapper';
import HomePageBanner from './home/HomePageBanner';
import ExplorerCourses from './home/ExplorerCourses';

const Home = () => {
  useEffect(() => {
    document.title = `Homepage | ${process.env.SITE_NAME}`;
  }, []);
  return (
    <>
      <HomePageBanner />
      <PopularSubjectsWrapper />
      <ExplorerCourses />
      {/* <TopPrograms /> */}
      <HomePagePartners />
    </>
  );
};
export default Home;
