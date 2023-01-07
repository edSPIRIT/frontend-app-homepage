import { Dropdown } from '@edx/paragon';
import React, { useState } from 'react';
import edLogo from '../../../assets/edspirit-logo.png';
import linkedin from '../../../assets/linkedin.svg';
import facebook from '../../../assets/facebook.svg';
import reddit from '../../../assets/reddit.svg';
import { KNOW_US_FOOTER, USEFUL_LINKS_FOOTER } from '../../../constants';
import moodyLogo from '../../../assets/Moody-logo.svg';
import { ReactComponent as Globe } from '../../../assets/globe-icon.svg';
import { ReactComponent as KeyboardArrowUp } from '../../../assets/KeyboardArrowUp.svg';
import { ReactComponent as KeyboardArrowDown } from '../../../assets/KeyboardArrowDown.svg';

const Footer = () => {
  const [isOpenDropDown, setIsOpenDropDown] = useState(false);
  const [value, setValue] = useState('English');
  return (
    <footer>
      <div className="custom-container mb-4 pt-5">
        <div className="row">
          <div className="col col-6">
            <div className="d-flex flex-column">
              <div className="logo-container mb-4">
                <img className="footer-logo h-100" src={moodyLogo} alt="" />
              </div>
              <p>
                EDspirit is a hosted Open edX learning management system which can
                be acquired and lunched within minutes.
              </p>
            </div>
          </div>

          <div className="col">
            <h5 className="mb-2.5">Know Us</h5>
            <ul className="list-unstyled">
              {KNOW_US_FOOTER.map((nav) => (
                <li className="mb-2" key={nav.title}>
                  <a className="custom-link" href={nav.link}>
                    {nav.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="col">
            <h5 className="mb-2.5">Useful Links</h5>
            <ul className="list-unstyled">
              {USEFUL_LINKS_FOOTER.map((nav) => (
                <li className="mb-2" key={nav.title}>
                  <a className="custom-link" href={nav.link}>
                    {nav.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="col">
            <h5 className="mb-2.5">Choose Language</h5>
            <div className="language-btn-container mb-5.5">
              <Dropdown
                onToggle={(isOpen) => setIsOpenDropDown(isOpen)}
                className="dropdown-wrapper"
                onSelect={(e) => setValue(e)}
              >
                <Dropdown.Toggle id="dropdown-basic-4">
                  <>
                    <Globe className="color-light-500" />
                    <span className="text-primary-500 px-2 dropdown-title">
                      {value}
                    </span>
                    {isOpenDropDown ? (
                      <KeyboardArrowUp />
                    ) : (
                      <KeyboardArrowDown className="color-primary-500" />
                    )}
                  </>
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
            </div>
            <div className="social-container">
              <img className="social-icon-footer" src={linkedin} alt="" />
              <img className="social-icon-footer" src={facebook} alt="" />
              <img className="social-icon-footer" src={reddit} alt="" />
            </div>
          </div>
        </div>
      </div>
      <div className="footer-copy-right ">
        <div className="custom-container d-flex justify-content-between align-items-center ">
          <div className="d-flex align-items-center">
            <div className="logo-container">
              <img className="footer-logo  mr-2 h-100" src={edLogo} alt="" />
            </div>
            <p className="footer-desc">© Copyright Notion Wave, 2022.</p>
          </div>
          <p className="footer-desc">
            edX and Open edX are trademarks of edX LLC. All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
