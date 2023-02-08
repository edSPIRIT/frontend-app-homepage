import { ArrowForwardIos } from '@edx/paragon/icons';
import { Icon, Skeleton } from '@edx/paragon';
import useGetSubjects from '../../../hooks/useGetSubjects';

const PopularSubjects = () => {
  const { popularSubjects, loading } = useGetSubjects();
  return (
    <div className="d-flex  justify-content-center flex-wrap">
      {/* TO DO: Do not use Array index in keys */}
      {loading
        ? Array(10)
          .fill(1)
          .map((item, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <div className="subject-container" key={i}>
              <Skeleton className="mr-1" width={66} height={66} />
              <Skeleton width={175} height={20} />
            </div>
          ))
        : popularSubjects?.map((subject) => (
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
