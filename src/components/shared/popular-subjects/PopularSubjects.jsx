import { ArrowForwardIos } from '@edx/paragon/icons';
import { Icon } from '@edx/paragon';
import useGetSubjects from '../../../hooks/useGetSubjects';

const PopularSubjects = () => {
  const { popularSubjects } = useGetSubjects();
  return (
    <div className="d-flex  justify-content-center flex-wrap">
      {popularSubjects?.map((subject) => (
        <div className="subject-container" key={subject.slug}>
          <img className="subject-img" src={subject.image} alt="" />
          <h4 className="subject-title mr-2">{subject.title}</h4>
          <Icon className="subject-icon" src={ArrowForwardIos} />
        </div>
      ))}
    </div>

  );
};

export default PopularSubjects;
