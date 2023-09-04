import { Breadcrumb, Icon, useMediaQuery } from '@edx/paragon';
import { Link, useHistory, useParams } from 'react-router-dom';
import { ArrowBack } from '@edx/paragon/icons';
import React, { useEffect } from 'react';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import { getConfig } from '@edx/frontend-platform';
import useGetPartner from '../../hooks/useGetPartner';
import PartnerCourses from './partner-info/PartnerCourses';
import PartnerHeader from './partner-info/PartnerHeader';
import DeskTopInstructors from './partner-info/DeskTopInstructors';
import messages from '../../messages';
import usePartnerInstructorsInfinite from '../../hooks/usePartnerInstructorsInfinite';

const MobileInstructors = React.lazy(() => import('./partner-info/MobileInstructors'));

const PartnerInfo = ({ intl }) => {
  const { slug } = useParams();
  const { partnerData, loading } = useGetPartner(slug);
  const history = useHistory();
  const isMobile = useMediaQuery({ maxWidth: '769px' });
  const {
    partnerInstructors,
    loading: partnerInstructorsLoading,
    isFetching,
  } = usePartnerInstructorsInfinite(slug);

  useEffect(() => {
    if (partnerData?.organization?.name) {
      document.title = `${partnerData.organization.name} | ${getConfig().SITE_NAME}`;
    }
  }, [partnerData]);

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
              {
                label: `${intl.formatMessage(messages['breadcrumb.home'])}`,
                to: '/',
              },
              {
                label: `${intl.formatMessage(
                  messages['partners.breadcrumb.ourPartners'],
                )}`,
                to: '/partners',
              },
            ]}
            linkAs={Link}
            activeLabel={slug}
          />
        </div>
      </div>
      <PartnerHeader partnerData={partnerData} loading={loading} />
      <PartnerCourses />
      {/* <PartnerPrograms/> */}
      {isMobile ? (
        <MobileInstructors
          partnerInstructors={partnerInstructors}
          loading={partnerInstructorsLoading}
          isFetching={isFetching}
        />
      ) : (
        <DeskTopInstructors
          partnerInstructors={partnerInstructors}
          loading={partnerInstructorsLoading}
          isFetching={isFetching}
        />
      )}
    </section>
  );
};
PartnerInfo.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(PartnerInfo);
