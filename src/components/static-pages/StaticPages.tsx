import { FormattedMessage } from '@edx/frontend-platform/i18n';
import { useParams } from 'react-router';
import useGetStaticPagesData from '../../hooks/useGetStaticPagesData';

const StaticPages = () => {
  const { page } = useParams();
  const { data: staticPageData, isError, isLoading } = useGetStaticPagesData(page);

  const content = isLoading ? (
    <div className="loading">
      <FormattedMessage
        id="staticpages.loading"
        defaultMessage="Loading..."
      />
    </div>
  ) : (
    <>
      <div className="title">
        <h2>{staticPageData?.name}</h2>
      </div>
      <div className="content" dangerouslySetInnerHTML={{ __html: staticPageData?.content }} />
    </>
  );

  return (
    <section className="static-pages-container">
      {isError ? (
        <div className="error-box">
          <FormattedMessage
            id="staticpages.errorAtFetch"
            defaultMessage="Error occured while fetching data"
          />
        </div>
      ) : content}
    </section>
  );
};

export default StaticPages;
