import { Button, Card, Icon } from '@edx/paragon';
import { WarningAmber } from '@edx/paragon/icons';
import { Link } from 'react-router-dom';
import { PREREQUISITE_COURSES } from '../../../constants';

const Requirements = ({ Ref }) => (
  <div className="requirements-wrapper" id="requirement" ref={Ref}>
    <h2 className="mb-3">Requirements</h2>
    <ul className="pl-3.5 mb-4.5">
      <li>
        <p>
          Only basic arithmetic skills are needed, we&apos;ll teach you the rest
        </p>
      </li>
      <li>
        <p>Professional Certificate in Blockchain Essentials</p>
      </li>
    </ul>
    <h3 className="mb-3">Prerequisite Courses</h3>
    <div className="attention-wrapper mb-4">
      <div className="d-flex align-items-center mb-2">
        <Icon className="mr-1" src={WarningAmber} />
        <h4>Attention!</h4>
      </div>
      <p className="font-sm">
        Lorem Ipsum er ganske enkelt fyldtekst fra print- og
        typografiindustrien. Lorem Ipsum har været standard fyldtekst siden
        1500-tallet.
      </p>
    </div>
    <div className="prerequisite-courses-wrapper">
      {PREREQUISITE_COURSES.map((course) => (
        <Link to="/course/" key={course.id}>
          <Card className="cards-wrapper">
            <Card.ImageCap
              src={course.cover}
              logoSrc={course.logo}
              variant="top"
              alt=""
            />
            <div className="my-4.5 px-4">
              <h4 className="mb-1 course-title">{course.title}</h4>
              <a className="institution-title font-sm" href="#institution">
                {course.institution}
              </a>
            </div>
            <Card.Footer>
              <Button variant="primary" href="#course">
                Learn more
              </Button>
            </Card.Footer>
          </Card>
        </Link>
      ))}
    </div>
  </div>
);

export default Requirements;
