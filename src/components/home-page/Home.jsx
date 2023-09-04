import { useEffect } from 'react';
import { getConfig } from '@edx/frontend-platform';
import HomePagePartners from './home/HomePagePartners';
import PopularSubjectsWrapper from './home/PopularSubjectsWrapper';
import HomePageBanner from './home/HomePageBanner';
import ExplorerCourses from './home/ExplorerCourses';

const Home = () => {
  useEffect(() => {
    document.title = `Homepage | ${getConfig().SITE_NAME}`;
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
