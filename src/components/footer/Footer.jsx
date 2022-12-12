import { Dropdown, DropdownButton } from '@edx/paragon';
import React from 'react';
import edLogo from '../../assets/edspirit-logo.png';
import linkedin from '../../assets/linkedin.svg';
import facebook from '../../assets/facebook.svg';
import reddit from '../../assets/reddit.svg';
import { KNOW_US_FOOTER, USEFUL_LINKS_FOOTER } from '../../constants';

const Footer = () => (
  <footer>
    <div className="custom-container mb-4 pt-5">
      <div className="row">
        <div className="col col-6">
          <div className="d-flex flex-column">
            <img
              className="mb-4 footer-logo"
              src="https://edx-orgs-test.s3.eu-central-1.amazonaws.com/moody-toy/admin_console/images/logo.png/download.png?57"
              alt="edspirit-logo"
              width="112px"
              height="32px"
            />

            <span>
              EDspirit is a hosted Open edX learning managment system wich can
              be acquired and lunched within minutes.
            </span>
          </div>
        </div>

        <div className="col">
          <h5 className="mb-2.5">Know Us</h5>
          <ul className="list-unstyled">
            {KNOW_US_FOOTER.map((nav) => (
              <li className="mb-2 ">
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
              <li className="mb-2 ">
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
            <DropdownButton
              id="dropdown-basic-button"
              variant="outline-primary"
              title="English"
            >
              <Dropdown.Item href="#/action-1">English</Dropdown.Item>
              <Dropdown.Item href="#/action-2">فارسی</Dropdown.Item>
              <Dropdown.Item href="#/action-3">العربية</Dropdown.Item>
            </DropdownButton>
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
          <img
            className="footer-logo  mr-2"
            src={edLogo}
            alt=""
            width="112px"
            height="32px"
          />
          <span className="footer-desc">© Copyright Notion Wave, 2022.</span>
        </div>
        <span className="footer-desc">
          edX and Open edX are trademarks of edX LLC. All Rights Reserved
        </span>
      </div>
    </div>
  </footer>
);

export default Footer;
