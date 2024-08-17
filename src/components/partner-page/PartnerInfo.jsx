import { Breadcrumb, Icon, useMediaQuery } from '@edx/paragon';
import { Link, useHistory, useParams } from 'react-router-dom';
import { ArrowBack } from '@edx/paragon/icons';
import React, { useEffect } from 'react';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import useGetPartner from '../../hooks/useGetPartner';
import PartnerCourses from './PartnerInfo/PartnerCourses';
import PartnerHeader from './PartnerInfo/PartnerHeader';
import DesktopInstructors from './PartnerInfo/DesktopInstructors';
import messages from '../../messages';
import usePartnerInstructorsInfinite from '../../hooks/usePartnerInstructorsInfinite';
import useGetConfig from '../../hooks/useGetConfig';

const MobileInstructors = React.lazy(() => import('./PartnerInfo/MobileInstructors'));

const PartnerInfo = ({ intl }) => {
  const { platformName } = useGetConfig();
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
      document.title = `${partnerData.organization.name} | ${platformName}`;
    }
  }, [partnerData, platformName]);

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
            activeLabel={partnerData?.organization?.name}
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
        <DesktopInstructors
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
