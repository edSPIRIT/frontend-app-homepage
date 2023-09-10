/* eslint-disable react/prop-types */
import { Icon } from '@edx/paragon';
import React from 'react';
import { ReactComponent as Linkedin } from '../../../../assets/linkedin.svg';
import { ReactComponent as Facebook } from '../../../../assets/facebook.svg';
import { ReactComponent as Twitter } from '../../../../assets/twitter.svg';
import { ReactComponent as Instagram } from '../../../../assets/instagram.svg';

const FooterSocialIcons = ({ footerData }) => (
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
        <Icon className="social-icon-footer" src={Instagram} />
      </a>
    )}
  </div>
);

export default FooterSocialIcons;
