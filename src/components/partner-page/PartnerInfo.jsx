import { Breadcrumb, Icon, useMediaQuery } from '@edx/paragon';
import { Link, useHistory, useParams } from 'react-router-dom';
import { ArrowBack } from '@edx/paragon/icons';
import React from 'react';
import useGetPartner from '../../hooks/useGetPartner';
import PartnerCourses from './partner-info/PartnerCourses';
import PartnerHeader from './partner-info/PartnerHeader';
import DeskTopInstructors from './partner-info/DeskTopInstructors';

const MobileInstructors = React.lazy(() => import('./partner-info/MobileInstructors'));

const PartnerInfo = () => {
  const { slug } = useParams();
  const { partnerData, loading } = useGetPartner(slug);
  const history = useHistory();
  const isMobile = useMediaQuery({ maxWidth: '769px' });

  return (
    <section>
      <div className="d-flex px-4.5 py-3 align-items-center back-btn-wrapper">
        <Icon src={ArrowBack} onClick={history.goBack} className="mr-1.5" />
        <h4 className="ml-3.5">{partnerData?.organization.name}</h4>
      </div>
      <div className="partner-page-breadcrumb">
        <div className="custom-container">
          <Breadcrumb
            ariaLabel="Breadcrumb basic"
            links={[
              { label: 'Home', to: '/home' },
              { label: 'Our-Partners', to: '/partners' },
            ]}
            linkAs={Link}
            activeLabel={slug}
          />
        </div>
      </div>
      <PartnerHeader partnerData={partnerData} loading={loading} />
      <PartnerCourses />
      {/* <div className="custom-container d-flex flex-column pb-6" id="programs">
        <h2 className="d-flex justify-content-center mb-4">
          <h2 className="d-flex justify-content-center mb-4">
            Popular<span className="highlighted ml-2">Programs</span>
          </h2>
        </h2>
        <div className="programs-container">
          {TOP_PROGRAM.map((course) => (
            <ProgramCard info={course} key={course.title} />
          ))}
        </div>
        <div className="d-flex justify-content-center">
          <Button className="view-all-course-btn" iconAfter={ArrowForwardIos}>
            View all Courses
          </Button>
        </div>
      </div> */}
      {isMobile ? (
        <MobileInstructors />
      ) : (
        <DeskTopInstructors />
      )}
    </section>
  );
};
export default PartnerInfo;
