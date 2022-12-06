import { Tab, Tabs } from '@edx/paragon';
import { useState } from 'react';
import { COURSES_INFO, COURSES_INFO_TOP } from '../../constants';
import CourseCard from '../courseCard/CourseCard';

const ExplorerCourses = () => {
  const [key, setKey] = useState('home');
  return (
    <div className="mb-6">
      <h2 className="d-flex justify-content-center mb-4">
        Explore<span className="highlight-title ml-2">Courses</span>
      </h2>
      <Tabs
        className="mb-5 justify-content-center"
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
      >
        <Tab eventKey="home" title="Top Courses">
          <div className="container">
            <div className="row">
              {COURSES_INFO.map((course) => (
                <div className="col-xl-3 col-lg-4 col-md-4 col-sm-6 col-12">
                  <CourseCard info={course} />
                </div>
              ))}
            </div>
          </div>
        </Tab>
        <Tab eventKey="profile" title="Recently Added">
          <div className="container">
            <div className="row">
              {COURSES_INFO_TOP.map((course) => (
                <div className="col-xl-3 col-lg-4 col-md-4 col-sm-6 col-12">
                  <CourseCard info={course} />
                </div>
              ))}
            </div>
          </div>
        </Tab>
      </Tabs>
    </div>
  );
};

ExplorerCourses.defaultProps = {};

ExplorerCourses.propTypes = {};

export default ExplorerCourses;
