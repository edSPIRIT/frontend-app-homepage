import React from 'react';
import { PARTNERS_LOGO } from '../../constants';

const Partners = () => (
  <section id="partners" className="py-6">
    <div className="custom-container">
      <h2 className="d-flex justify-content-center mb-4">Partners</h2>
      <span className="d-flex justify-content-center mb-5 text-gray-500">
        Founded by Harvard and MIT, edX is home to more than 20 million
        learners, the majority of top-ranked universities in the world and
        industry-leading companies
      </span>
      <div className="d-flex justify-content-center ">
        {PARTNERS_LOGO.map((partner) => <img className="mr-5" src={partner.logo} alt="" />)}
      </div>
    </div>
  </section>
);

export default Partners;
