import { Avatar, Badge } from '@edx/paragon';
import React from 'react';

const AvatarInfo = () => (
  <div className="d-flex align-items-center pb-5.5 pt-2.5 avatar-wrapper">
    <Avatar className="mr-3 flex-shrink-0" size="xl" />
    <div className="d-flex flex-column w-100">
      <div className="d-flex justify-content-between mb-2">
        <div className="d-flex">
          <h3 className="mr-2">Hi, Hamidreza Khosravi</h3>
          <Badge>Pro</Badge>
        </div>
        <span>Access expired on 22 Jul 2022</span>
      </div>
      <span className="overview-email-title">hr.khosravi87@gmail.com </span>
    </div>
  </div>
);

export default AvatarInfo;