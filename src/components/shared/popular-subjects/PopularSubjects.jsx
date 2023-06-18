/* eslint-disable react/prop-types */
import { ArrowForwardIos } from '@edx/paragon/icons';
import { Icon } from '@edx/paragon';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import {
  resetSearchFilters,
  setSearchSubject,
} from '../../../redux/slice/searchQuerySlice';

const PopularSubjects = ({ popularSubjects = [] }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleSubjectClick = (subject) => {
    dispatch(resetSearchFilters());
    dispatch(setSearchSubject([subject.title]));
    history.push('/search');
  };

  return (
    <div className="subject-container">
      {popularSubjects?.map((subject) => (
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
        <div
          className="subject-wrapper d-flex"
          key={subject.slug}
          onClick={() => handleSubjectClick(subject)}
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
