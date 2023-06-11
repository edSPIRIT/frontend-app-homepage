import { Dropdown } from '@edx/paragon';
import { ArrowDropDown, KeyboardArrowDown } from '@edx/paragon/icons';
import { Link } from 'react-router-dom';
import { FormattedMessage } from '@edx/frontend-platform/i18n';
import DiscoverBanner from '../shared/discover-banner/DiscoverBanner';
import ExploreAllSubjects from './discover/ExploreAllSubjects';
import PopularSubjectsOverview from './discover/PopularSubjectsOverview';

const Discover = () => (
  <>
    {/* <AllSubjectsModal isOpen={isOpen} close={close} /> */}
    <main>
      <DiscoverBanner />
      <ExploreAllSubjects />
      <PopularSubjectsOverview />
      <div className="facets-wrapper">
        <Dropdown autoClose="outside" className="facet-btn mr-3" key="subject">
          <Dropdown.Toggle
            id="{title}-{variant}"
            variant="outline-primary"
            className="font-weight-bold"
            iconAfter={ArrowDropDown}
          />
          <Dropdown.Menu className="facet-menu">
            <div className="d-flex flex-column">
              <Link to="course-content" smooth offset={-160}>
                <FormattedMessage
                  id="courseInfo.tab.courseContent.text"
                  defaultMessage="Course content"
                />
              </Link>
              <Link to="instructors" smooth offset={-160}>
                <FormattedMessage
                  id="courseInfo.tab.instructors.text"
                  defaultMessage="Instructors"
                />
              </Link>
            </div>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </main>
  </>
);

export default Discover;
