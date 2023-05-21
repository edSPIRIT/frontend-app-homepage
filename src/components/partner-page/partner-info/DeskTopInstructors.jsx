import { Icon, IconButton, Skeleton } from '@edx/paragon';
import { ArrowForward, BookOpen, People } from '@edx/paragon/icons';
import { FormattedMessage } from '@edx/frontend-platform/i18n';
import { useParams } from 'react-router';
import userAvatar from '../../../assets/place-holders/user-placeholder.svg';
import useGetPartner from '../../../hooks/useGetPartner';

const DeskTopInstructors = () => {
  const { slug } = useParams();
  const { partnerData, loading } = useGetPartner(slug);

  return (
    <div className="custom-container mb-5.5" id="instructors">
      <h2 className="text-center pb-4.5">
        <FormattedMessage id="instructors.text" defaultMessage="Instructors" />
      </h2>
      <div className="instructors-wrapper">
        {/* todo: must use Insreuctor component like course info */}
        {loading
          ? Array(4)
            .fill(1)
            .map((item, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <div className="instructor-wrapper d-flex " key={i}>
                <Skeleton className="mr-4" width={88} height={88} />
                <div className="d-flex flex-column w-100 ">
                  <Skeleton height={24} width="40%" />
                  <Skeleton height={24} width="60%" className="mb-1" />
                  <Skeleton count={2} height={24} />
                  <div className="skeleton-icon-wrapper mt-2">
                    <Skeleton height={24} />
                    <Skeleton height={24} />
                  </div>
                </div>
              </div>
            ))
          : partnerData?.instructors?.instructors_list?.map((instructor) => (
            <div className="instructor-wrapper d-flex" key={instructor.name}>
              <div className="instructor-img-wrapper mr-4">
                <img
                  src={instructor.image ?? userAvatar}
                  alt="instructor-avatar"
                />
              </div>
              <div className="d-flex flex-column w-100">
                <div className="instructor-name-wrapper">
                  <span className="instructor-title mr-5">
                    {instructor.name}
                  </span>
                  <IconButton
                    className="arrow-forward-btn"
                    src={ArrowForward}
                    iconAs={Icon}
                    alt="ArrowForward"
                    variant="light"
                  />
                </div>
                <span className="instructor-short-bio mb-2">
                  {instructor.short_bio}
                </span>
                <p className="instructor-bio mb-3">{instructor.bio}</p>
                <div className="d-flex icons-bottom-wrapper mt-auto">
                  <div className="d-flex mr-4.5 align-items-center">
                    <Icon src={People} className="mr-2" />
                    <p>
                      <span>{instructor.students_count}</span>
                      <span className="ml-1">
                        <FormattedMessage
                          id="instructor.students.text"
                          defaultMessage="Students"
                        />
                      </span>
                    </p>
                  </div>
                  <div className="d-flex align-items-center">
                    <Icon src={BookOpen} className="mr-2" />
                    <p>
                      <span>{instructor.courses_count}</span>
                      <span className="ml-1">
                        <FormattedMessage
                          id="instructor.courses.text"
                          defaultMessage="Courses"
                        />
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default DeskTopInstructors;
