/* eslint-disable consistent-return */
import { getConfig } from '@edx/frontend-platform';
// import axios from 'axios';
import { useQuery } from 'react-query';
import { useHistory } from 'react-router';
export interface Root {
  instructors: Instructor[]
  created: string
  total_weeks_of_effort: number
  hours_effort_per_week_min: number
  hours_effort_per_week_max: number
  about: string
  what_you_will_learn: string[]
  requirements: string[]
  additional_metadata: AdditionalMetadata
  course_id: string
  transcript_langs: string[]
  course_slug: string
  paid_course: PaidCourse
  partner: Partner
  subject: any
}

export interface Instructor {
  name: string
  slug: string
  short_bio: string
  image: any
  courses_count: number
  students_count: number
}

export interface AdditionalMetadata {
  self_paced: boolean
  total_enrollments: number
  last_modification_date: string
  course_created_at: string
  enrollment_start: any
  enrollment_end: any
  course_image_url: string
  language: string
  certificate_enabled: boolean
  short_description: string
  org: string
  display_name: string
  effort: any
  sections_count: number
  units_count: number
  pre_req_courses: any[]
}

export interface PaidCourse {
  price: number
  currency: string
  course_id: string
  active: boolean
  price_human: string
}

export interface Partner {
  organization: Organization
  header: string
  featured: boolean
  courses_count: number
  created: string
}

export interface Organization {
  id: number
  created: string
  modified: string
  name: string
  short_name: string
  description: string
  logo: string
  active: boolean
}
const useGetCourseMetaData = (courseId) => {
  const history = useHistory();

  const fetchCourseMetaData = async ({ queryKey }) => {
    const id = queryKey[1];
    const apiRes = await fetch(
      `${getConfig().LMS_BASE_URL}/admin-console/api/course-metadata/${id}/`,
      // {
      //   method: 'GET',
      //   cache: 'no-store',
      // },
    );
    if (apiRes.status === 404) {
      history.push('/404');
    }
    if (!apiRes.ok) {
      throw new Error('fetch not ok');
    }

    return apiRes.json();
  };
  // const fetchCourseMetaData = async ({ queryKey }) => {
  //   const id = queryKey[1];
  //   try {
  //     const apiRes = await axios.get(
  //       `${getConfig().LMS_BASE_URL}/admin-console/api/course-metadata/${id}/`,
  //       // {
  //       //   headers: {
  //       //     'Cache-Control': 'no-cache',
  //       //     Pragma: 'no-cache',
  //       //     Expires: '0',
  //       //   },
  //       // },
  //     );
  //     return apiRes.data;
  //   } catch (err) {
  //     console.error(err);
  //     if (err.response.status === 404) {
  //       history.push('/404');
  //     }
  //   }
  // };
  const { data, isLoading } = useQuery<Root>(
    ['CourseMetaData', courseId],
    fetchCourseMetaData,
    {
      enabled: !!courseId,
      staleTime: 2 * (60 * 1000),
    },
  );

  return {
    courseMetaData: data,
    loading: isLoading,
  };
};
export default useGetCourseMetaData;
