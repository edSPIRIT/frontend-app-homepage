import { getConfig } from '@edx/frontend-platform';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import { useState, useEffect, useMemo } from 'react';
import {
  DataTable, CardView,
} from '@edx/paragon';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import CourseCard from '../../courseCard/CourseCard';

const buildLmsUrl = (absoluteUrl) => `${getConfig().LMS_BASE_URL}${absoluteUrl}`;
const buildCourseURL = (courseKey) => buildLmsUrl(`/courses/${courseKey}/about`);

const DataTableComponent = ({ intl }) => {
  const [courses, setCourses] = useState();
  const getCourses = async () => {
    const client = getAuthenticatedHttpClient();
    const baseUrl = getConfig().LMS_BASE_URL;
    const response = await client.get(`${baseUrl}/api/courses/v1/courses/`);
    setCourses(response.data.results);
  };
  useEffect(() => {
    getCourses();
  }, []);
  const tableData = useMemo(
    () => courses || [],
    [courses],
  );

  // memoize data, otherwise the filters will get reset after switching view

  return (

    <div>
      <DataTable
        isSortable
        itemCount={3}
        data={tableData}
        columns={[
          {
            Header: 'Name',
            accessor: 'name',
          },
          {
            Header: 'Org',
            accessor: 'org',
          },

        ]}
      >
        <DataTable.TableControlBar />

        <CardView CardComponent={CourseCard} />

        <DataTable.EmptyTable content="No results found" />
        <DataTable.TableFooter />
      </DataTable>
    </div>
  );
};
DataTableComponent.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(DataTableComponent);
