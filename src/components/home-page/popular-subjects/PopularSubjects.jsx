import React, { useEffect, useState } from 'react';
import { ArrowForwardIos } from '@edx/paragon/icons';
import { Icon } from '@edx/paragon';
import { getConfig } from '@edx/frontend-platform';

const PopularSubjects = () => {
  const [popularSubjectData, setPopularSubjectData] = useState({});
  const getBannerData = async () => {
    try {
      const Res = await fetch(
        `${
          getConfig().LMS_BASE_URL
        }/admin-console/api/subject-list/?popular=true`,
      );
      const Data = await Res.json();
      setPopularSubjectData(Data);
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    getBannerData();
  }, []);
  return (
    <section className="py-6">
      <div className="custom-container">
        <h2 className="d-flex justify-content-center mb-5">
          Popular<span className="highlight-title ml-2">Subjects</span>
        </h2>
        <div className="d-flex  justify-content-center flex-wrap">
          {popularSubjectData.items
            ?.filter((item) => item.popular)
            .map((item) => (
              <div className="subject-container">
                <img className="subject-img" src={item.image} alt="" />
                <h4 className="subject-title mr-2">{item.title}</h4>
                <Icon className="subject-icon" src={ArrowForwardIos} />
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default PopularSubjects;
