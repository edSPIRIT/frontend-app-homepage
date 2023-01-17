import { getConfig } from '@edx/frontend-platform';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import { Avatar, Badge } from '@edx/paragon';
import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '@edx/frontend-platform/react';

const AvatarInfo = () => {
  const [userData, setUserData] = useState();
  const { authenticatedUser } = useContext(AppContext);

  async function fetchUserData() {
    try {
      if (authenticatedUser !== null) {
        const { data } = await getAuthenticatedHttpClient().get(
          `${getConfig().LMS_BASE_URL}/api/user/v1/accounts/${
            authenticatedUser?.username
          }`,
        );
        setUserData(data);
      }
    } catch (e) {
      console.error(e);
    }
  }
  useEffect(() => {
    fetchUserData();
  }, []);
  console.log('userData', authenticatedUser, useContext(AppContext), userData);
  const [courses, setCourses] = useState();
  const getCourses = async () => {
    try {
      const client = getAuthenticatedHttpClient();
      const baseUrl = getConfig().LMS_BASE_URL;
      const response = await client.get(`${baseUrl}/api/courses/v1/courses/`);
      setCourses(response.data.results);
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    getCourses();
  }, []);
  console.log('courses', courses);

  return (
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
};
export default AvatarInfo;
