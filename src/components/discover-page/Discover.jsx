import { useToggle } from '@edx/paragon';
import DiscoverBanner from '../shared/discover-banner/DiscoverBanner';
import ExploreAllSubjects from './discover/ExploreAllSubjects';
import PopularSubjectsOverview from './discover/PopularSubjectsOverview';
import AllSubjectsModal from './discover/AllSubjectsModal';

const Discover = () => {
  const [isOpen, open, close] = useToggle(false);

  return (
    <>
      <AllSubjectsModal isOpen={isOpen} close={close} />
      <main>
        <DiscoverBanner />
        <ExploreAllSubjects openAllSubjects={open} />
        <PopularSubjectsOverview />
      </main>
    </>
  );
};

export default Discover;
