/* eslint-disable react/prop-types */
import { Card } from '@edx/paragon';
import { getConfig } from '@edx/frontend-platform';
import { Link } from 'react-router-dom';
import logoPlaceholder from '../../../assets/place-holders/org-place-holder.svg';
import coverPlaceholder from '../../../assets/place-holders/cover-course-place-holder.svg';
import { determineDirection } from '../../../utils/determineDirection';
import CardMiddleSection from './CourseCard/CardMiddleSection';

const CourseCard = ({ course }) => (
  <Link to={`/course/${course?.course_slug}`}>
    <Card className="cards-wrapper d-flex">
      <Card.ImageCap
        src={
          `${getConfig().LMS_BASE_URL}${
            course?.additional_metadata?.course_image_url
          }` ?? coverPlaceholder
        }
        logoSrc={course?.partner?.organization?.logo ?? logoPlaceholder}
        variant="top"
        srcAlt="course-header"
        logoAlt="partner-logo"
        fallbackSrc={coverPlaceholder}
        fallbackLogoSrc={logoPlaceholder}
        // imageLoadingType="lazy"
      />
      <div className="mt-4.5 px-4">
        <h4
          style={{
            direction:
              determineDirection(course?.additional_metadata?.display_name)
              === 'rtl'
                ? 'rtl'
                : 'ltr',
          }}
          className="mb-1 course-title "
        >
          {course?.additional_metadata?.display_name}
        </h4>
        <Link
          to={`/partners/${course?.partner?.organization?.short_name}`}
          className="institution-title font-sm"
        >
          <p className="institution-title font-sm">
            {/* Todo: Here we have to show the org_display_name from additional_metadata in course */}
            {/* But due to a bug in backend, we'll show the original partner name */}
            {course?.partner?.organization?.name}
          </p>
        </Link>
      </div>
      <CardMiddleSection course={course} />
    </Card>
  </Link>
);

export default CourseCard;
