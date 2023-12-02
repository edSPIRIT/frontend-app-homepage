/* eslint-disable consistent-return */
import { getConfig } from "@edx/frontend-platform";
import { useQuery } from "react-query";
import { useHistory } from "react-router";
import { ICourseMetaData } from "./interfaces/APIResponsesInterfaces";

const useGetCourseMetaData = (courseId) => {
  const history = useHistory();

  const fetchCourseMetaData = async ({ queryKey }) => {
    const id = queryKey[1];
    const apiRes = await fetch(
      `${getConfig().LMS_BASE_URL}/admin-console/api/course-metadata/${id}/`
    );
    if (apiRes.status === 404) {
      history.push("/404");
    }
    if (!apiRes.ok) {
      throw new Error("fetch not ok");
    }

    return apiRes.json();
  };
  const { data, isLoading } = useQuery<ICourseMetaData>(
    ["CourseMetaData", courseId],
    fetchCourseMetaData,
    {
      enabled: !!courseId,
      staleTime: 2 * (60 * 1000),
    }
  );

  return {
    courseMetaData: data,
    loading: isLoading,
  };
};
export default useGetCourseMetaData;
