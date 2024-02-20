import { FormattedMessage } from '@edx/frontend-platform/i18n';
import edLogo from '../../../../assets/edspirit-logo.png';
import mobileFooterLogo from '../../../../assets/mobile-footer-logo.svg';
import mobileEdxLogo from '../../../../assets/mobile-edx-logo.svg';
import edxLogo from '../../../../assets/Edx.svg';

import useGetDynamicFeatures from '../../../../hooks/useGetDynamicFeatures';

const FooterCopyRight = () => {
  let removeEdxFooter: boolean = false;
  let replaceFooterBranding: boolean = false;
  let logoUrl: string = '';

  const { isLoading, isError, data } = useGetDynamicFeatures();

  if (!isLoading && !isError) {
    ({
      remove_edx_footer: removeEdxFooter,
      replace_footer_branding: replaceFooterBranding,
      logo_url: logoUrl,
    } = data);
  }
  return (
    <div className="footer-copy-right-container ">
      <div className="footer-copy-right custom-container d-flex justify-content-between align-items-center ">
        <div className="d-flex align-items-center">
          <div className="logo-container mr-2">
            <img className="footer-logo" src={replaceFooterBranding ? logoUrl : edLogo} alt="footer-logo" />
            <img
              className="mobile-footer-logo h-100"
              src={replaceFooterBranding ? logoUrl : mobileFooterLogo}
              alt="footer-logo"
            />
          </div>
          {!replaceFooterBranding && (
          <p className="footer-desc">
            <FormattedMessage
              id="footer.powerdBy.text"
              defaultMessage="Powered by "
            />
            <a className="footer-desc" href="https://edspirit.com/">
              edSPIRIT
            </a>
          </p>
          )}
        </div>
        {!removeEdxFooter && (
        <div className="d-flex edx-wrapper">
          <div className="logo-container mr-2">
            <img
              className="mobile-footer-logo  h-100"
              src={mobileEdxLogo}
              alt="footer-logo-edx"
            />
          </div>
          <p className="footer-desc d-flex align-items-center">
            <FormattedMessage
              id="footer.copyRight.text"
              defaultMessage="edX and Open edX are trademarks of edX LLC. All Rights Reserved"
            />
            <img className="ml-2 desktop-view-edx" src={edxLogo} alt="edx" />
          </p>
        </div>
        )}
      </div>
    </div>
  );
};

export default FooterCopyRight;
