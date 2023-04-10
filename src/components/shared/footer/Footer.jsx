import { Dropdown, Icon } from '@edx/paragon';
import React, { useState } from 'react';
import { Language, KeyboardArrowDown } from '@edx/paragon/icons';
import edLogo from '../../../assets/edspirit-logo.png';
import mobileFooterLogo from '../../../assets/mobile-footer-logo.svg';
import mobileEdxLogo from '../../../assets/mobile-edx-logo.svg';
import edxLogo from '../../../assets/Edx.svg';
import { ReactComponent as Linkedin } from '../../../assets/linkedin.svg';
import { ReactComponent as Facebook } from '../../../assets/facebook.svg';
import { ReactComponent as Twitter } from '../../../assets/twitter.svg';
import { ReactComponent as Reddit } from '../../../assets/reddit.svg';
import useGetFooters from '../../../hooks/useGetFooters';

const Footer = () => {
  const [value, setValue] = useState('English');
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
            <h5 className="mb-2.5">Choose Language</h5>
            <Dropdown
              className="dropdown-wrapper d-flex mb-5.5"
              onSelect={(e) => setValue(e)}
            >
              <Dropdown.Toggle
                id="dropdown-basic-4"
                iconAfter={KeyboardArrowDown}
                iconBefore={Language}
              >
                <span className="text-primary-500 dropdown-title">
                  {value}
                </span>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item
                  key="English"
                  active={value === 'English'}
                  href="#/action-1"
                  eventKey="English"
                >
                  English
                </Dropdown.Item>
                <Dropdown.Item
                  key="فارسی"
                  active={value === 'فارسی'}
                  href="#/action-1"
                  eventKey="فارسی"
                >
                  فارسی
                </Dropdown.Item>
                <Dropdown.Item
                  key="العربیه"
                  active={value === 'العربیه'}
                  href="#/action-1"
                  eventKey="العربیه"
                >
                  العربیه
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <div className="social-container">
              {footerData?.links?.socials.linkedin && (
                <Icon className="social-icon-footer" src={Linkedin} />
              )}
              {footerData?.links?.socials.facebook && (
                <Icon className="social-icon-footer" src={Facebook} />
              )}
              {footerData?.links?.socials.twitter && (
                <Icon className="social-icon-footer" src={Twitter} />
              )}
              {footerData?.links?.socials.instagram && (
                <Icon className="social-icon-footer" src={Reddit} />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="footer-copy-right-container ">
        <div className="footer-copy-right custom-container d-flex justify-content-between align-items-center ">
          <div className="d-flex align-items-center">
            <div className="logo-container mr-2">
              <img className="footer-logo  h-100" src={edLogo} alt="footer-logo" />
              <img className="mobile-footer-logo  h-100" src={mobileFooterLogo} alt="footer-logo" />
            </div>
            <p className="footer-desc">
              Powered by <u>edSPIRIT</u>
            </p>
          </div>
          <div className="d-flex edx-wrapper">
            <div className="logo-container mr-2">
              <img className="mobile-footer-logo  h-100" src={mobileEdxLogo} alt="footer-logo-edx" />
            </div>
            <p className="footer-desc d-flex align-items-center">
              edX and Open edX are trademarks of edX LLC. All Rights Reserved
              <img className="ml-2 desktop-view-edx" src={edxLogo} alt="edx" />
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
