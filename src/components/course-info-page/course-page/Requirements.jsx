import {
  Button, Card, Icon, Skeleton,
} from '@edx/paragon';
import { Link } from 'react-router-dom';
import PropTypes, { string } from 'prop-types';
import { ReactComponent as Warning } from '../../../assets/warning.svg';

const Requirements = ({ PrerequisiteCourses }) => {
  const loading = false;

  return (
    <div className="requirements-wrapper pt-5" id="requirement">
      <h2 className="mb-3">Requirements</h2>
      {loading ? (
        <div className="mb-4.5">
          <Skeleton count={2} height={24} />
        </div>
      ) : (
        <ul className="pl-3.5 mb-4.5">
          <li>
            <p>
              Only basic arithmetic skills are needed, we&apos;ll teach you the
              rest
            </p>
          </li>
          <li>
            <p>Professional Certificate in Blockchain Essentials</p>
          </li>
        </ul>
      )}

      {PrerequisiteCourses.length > 0 && (
        <div>
          <h3 className="mb-3">Prerequisite Courses</h3>
          <div className="attention-wrapper mb-4">
            <div className="d-flex align-items-center mb-2">
              <Icon className="mr-1" src={Warning} />
              <h4>Attention!</h4>
            </div>
            {loading ? (
              <Skeleton height={24} />
            ) : (
              <p className="font-sm">
                Lorem Ipsum er ganske enkelt fyldtekst fra print- og
                typografiindustrien. Lorem Ipsum har været standard fyldtekst
                siden 1500-tallet.
              </p>
            )}
          </div>
          <div className="prerequisite-courses-wrapper">
            {loading
              ? Array(3)
                .fill(1)
                .map((item, i) => (
                  <div
                    className="d-flex flex-column skeleton-wrapper"
                      // eslint-disable-next-line react/no-array-index-key
                    key={i}
                  >
                    <Skeleton className="mb-2" height={92} />
                    <div className="skeleton-logo" />
                    <div className="p-4">
                      <Skeleton className="mb-1" width="60%" height={24} />
                      <Skeleton width="60%" height={24} />
                      <Skeleton
                        className="mt-4.5"
                        borderRadius={4}
                        height={44}
                      />
                    </div>
                  </div>
                ))
              : PrerequisiteCourses?.map((course) => (
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
                      <a
                        className="institution-title font-sm"
                        href="#institution"
                      >
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
      )}
    </div>
  );
};
Requirements.propTypes = {
  PrerequisiteCourses: PropTypes.arrayOf(
    PropTypes.shape({
      id: string,
      title: string,
      institution: string,
      cover: string,
      logo: string,
    }),
  ),
};
Requirements.defaultProps = {
  PrerequisiteCourses: [],
};
export default Requirements;
