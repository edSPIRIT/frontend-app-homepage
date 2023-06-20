import { Icon } from '@edx/paragon';
import { FormattedMessage } from '@edx/frontend-platform/i18n';
import edLogo from '../../../assets/edspirit-logo.png';
import mobileFooterLogo from '../../../assets/mobile-footer-logo.svg';
import mobileEdxLogo from '../../../assets/mobile-edx-logo.svg';
import edxLogo from '../../../assets/Edx.svg';
import { ReactComponent as Linkedin } from '../../../assets/linkedin.svg';
import { ReactComponent as Facebook } from '../../../assets/facebook.svg';
import { ReactComponent as Twitter } from '../../../assets/twitter.svg';
import { ReactComponent as Reddit } from '../../../assets/reddit.svg';
import useGetFooters from '../../../hooks/useGetFooters';
import ChooseLanguage from './footer-section/ChooseLanguage';

const FooterSection = () => {
  const { footerData } = useGetFooters();

  return (
    <footer>
      <div className="custom-container mb-4 pt-5">
        <div className=" footer-wrapper">
          <div className=" footer-desc-wrapper">
            <div className="d-flex flex-column">
              <div className="logo-container mb-4">
                <img
                  className="footer-logo h-100"
                  src={footerData?.logo}
                  alt="footer-logo"
                />
              </div>
              <p>{footerData?.description}</p>
            </div>
          </div>

          <div className=" footer-col1-wrapper">
            <h5 className="mb-2.5">
              {footerData?.links?.sections[0]?.section_title}
            </h5>
            <ul className="list-unstyled">
              {footerData?.links?.sections[0]?.section_links?.map((nav) => (
                <li className="mb-2" key={nav.title}>
                  <a className="custom-link" href={nav.link}>
                    {nav.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className=" footer-col2-wrapper ">
            <h5 className="mb-2.5">
              {footerData?.links?.sections[1]?.section_title}
            </h5>
            <ul className="list-unstyled">
              {footerData?.links?.sections[1]?.section_links?.map((nav) => (
                <li className="mb-2" key={nav.title}>
                  <a className="custom-link" href={nav.link}>
                    {nav.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className=" footer-col3-wrapper ">
            <ChooseLanguage />
            <div className="social-container">
              {footerData?.links?.socials.linkedin && (
                <a
                  href={footerData?.links?.socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Icon className="social-icon-footer" src={Linkedin} />
                </a>
              )}
              {footerData?.links?.socials.facebook && (
                <a
                  href={footerData?.links?.socials.facebook}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Icon className="social-icon-footer" src={Facebook} />
                </a>
              )}
              {footerData?.links?.socials.twitter && (
                <a
                  href={footerData?.links?.socials.twitter}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Icon className="social-icon-footer" src={Twitter} />
                </a>
              )}
              {footerData?.links?.socials.instagram && (
                <a
                  href={footerData?.links?.socials.instagram}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Icon className="social-icon-footer" src={Reddit} />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="footer-copy-right-container ">
        <div className="footer-copy-right custom-container d-flex justify-content-between align-items-center ">
          <div className="d-flex align-items-center">
            <div className="logo-container mr-2">
              <img
                className="footer-logo  h-100"
                src={edLogo}
                alt="footer-logo"
              />
              <img
                className="mobile-footer-logo  h-100"
                src={mobileFooterLogo}
                alt="footer-logo"
              />
            </div>
            <p className="footer-desc">
              <FormattedMessage
                id="footer.powerdBy.text"
                defaultMessage="Powered by "
              />
              <a className="footer-desc" href="https://edspirit.com/">
                edSPIRIT
              </a>
            </p>
          </div>
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
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
