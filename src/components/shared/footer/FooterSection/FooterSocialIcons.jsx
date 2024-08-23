/* eslint-disable react/prop-types */
import { Icon } from '@edx/paragon';
import React from 'react';
import { ReactComponent as Linkedin } from '../../../../assets/linkedin.svg';
import { ReactComponent as Facebook } from '../../../../assets/facebook.svg';
import { ReactComponent as Twitter } from '../../../../assets/twitter.svg';
import { ReactComponent as Instagram } from '../../../../assets/instagram.svg';

const FooterSocialIcons = ({ footerSocialData }) => (
  <div className="social-container">
    {footerSocialData?.linkedin && (
      <a
        href={footerSocialData.linkedin}
        target="_blank"
        rel="noreferrer"
      >
        <Icon className="social-icon-footer" src={Linkedin} />
      </a>
    )}
    {footerSocialData?.facebook && (
      <a
        href={footerSocialData.facebook}
        target="_blank"
        rel="noreferrer"
      >
        <Icon className="social-icon-footer" src={Facebook} />
      </a>
    )}
    {footerSocialData?.x && (
      <a
        href={footerSocialData.x}
        target="_blank"
        rel="noreferrer"
      >
        <Icon className="social-icon-footer" src={Twitter} />
      </a>
    )}
    {footerSocialData?.instagram && (
      <a
        href={footerSocialData.instagram}
        target="_blank"
        rel="noreferrer"
      >
        <Icon className="social-icon-footer" src={Instagram} />
      </a>
    )}
  </div>
);

export default FooterSocialIcons;
