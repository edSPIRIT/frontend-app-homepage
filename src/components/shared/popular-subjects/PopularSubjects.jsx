import { ArrowForwardIos } from '@edx/paragon/icons';
import { Icon, Skeleton } from '@edx/paragon';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import useGetSubjects from '../../../hooks/useGetSubjects';
import {
  resetSearchFilters,
  setSearchSubject,
} from '../../../redux/slice/searchQuerySlice';

const PopularSubjects = () => {
  const { popularSubjects, loading } = useGetSubjects();
  const history = useHistory();
  const dispatch = useDispatch();

  return (
    <div className="subject-container">
      {/* TO DO: Do not use Array index in keys */}
      {loading
        ? Array(10)
          .fill(1)
          .map((item, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <div className="subject-wrapper" key={i}>
              <Skeleton className="mr-1" width={66} height={66} />
              <Skeleton width={175} height={20} />
            </div>
          ))
        : popularSubjects?.map((subject) => (
          // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
          <div
            className="subject-wrapper d-flex"
            key={subject.slug}
            onClick={() => {
              dispatch(resetSearchFilters());
              dispatch(setSearchSubject([subject.title]));
              history.push('/search');
            }}
          >
            <img className="subject-img" src={subject.image} alt="subject" />
            <h4 className="subject-title mr-2">{subject.title}</h4>
            <Icon className="subject-icon" src={ArrowForwardIos} />
          </div>
        ))}
    </div>
  );
};

export default PopularSubjects;
