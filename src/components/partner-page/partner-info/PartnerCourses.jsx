import { Button } from '@edx/paragon';
import { ArrowForward } from '@edx/paragon/icons';
import { useHistory, useParams } from 'react-router';
import { FormattedMessage } from '@edx/frontend-platform/i18n';
import { useDispatch } from 'react-redux';
import CourseCard from '../../shared/course-card/CourseCard';
import { COURSES_INFO } from '../../../utils/constants';
import {
  resetSearchFilters,
  setSearchPartners,
} from '../../../redux/slice/searchQuerySlice';
import useGetPartner from '../../../hooks/useGetPartner';
import useGetPartnerPopularCourses from '../../../hooks/useGetPartnerPopularCourses';
import CourseCardNew from '../../shared/course-card/CourseCardNew';
import CourseCardSkeleton from '../../shared/skeleton/CourseCardSkeleton';

const PartnerCourses = () => {
  const history = useHistory();
  const { slug } = useParams();
  const { partnerData } = useGetPartner(slug);
  const dispatch = useDispatch();
  const { partnerPopularCourses, loading } = useGetPartnerPopularCourses(slug);

  return (
    <div className="custom-container d-flex flex-column pb-5" id="courses">
      <h2 className="d-flex popular-courses-wrapper">
        <span className="ml-2">
          <FormattedMessage
            id="popularCourses.firstPartTitle.text"
            defaultMessage="Popular"
          />
        </span>
        <span className="highlighted ml-2">
          <FormattedMessage
            id="popularCourses.secondPartTitle.text"
            defaultMessage="Courses"
          />
        </span>
      </h2>
      <div className="course-container mb-4">
        {loading
          ? Array(4)
            .fill(1)
            .map((item, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <CourseCardSkeleton key={i} />
            ))
          : partnerPopularCourses?.map((course) => (
            <CourseCardNew course={course} key={course.slug} />
          ))}
      </div>
      <div className="d-flex justify-content-center">
        <Button
          className="view-all-courses-btn"
          iconAfter={ArrowForward}
          onClick={() => {
            dispatch(resetSearchFilters());
            dispatch(setSearchPartners([partnerData?.organization.name]));
            history.push('/search');
          }}
        >
          <FormattedMessage
            id="viewAllCourses.button"
            defaultMessage="View All Courses"
          />
        </Button>
      </div>
    </div>
  );
};

export default PartnerCourses;
