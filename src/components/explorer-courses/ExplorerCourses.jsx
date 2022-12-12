import { Tab, Tabs } from '@edx/paragon';
import { useState } from 'react';
import { COURSES_INFO, COURSES_INFO_TOP } from '../../constants';
import CourseCard from './courseCard/CourseCard';

const ExplorerCourses = () => {
  const [key, setKey] = useState('home');
  return (
    <section id="explore-courses" className="explore-courses-container">
      <div className="custom-container d-flex flex-column">
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
            <div className="course-container">
              {COURSES_INFO.map((course) => (
                <CourseCard info={course} />
              ))}
            </div>
          </Tab>
          <Tab eventKey="profile" title="Recently Added">
            <div className="course-container">
              {COURSES_INFO_TOP.map((course) => (
                <CourseCard info={course} />
              ))}
            </div>
          </Tab>
        </Tabs>
      </div>
    </section>
  );
};

export default ExplorerCourses;
