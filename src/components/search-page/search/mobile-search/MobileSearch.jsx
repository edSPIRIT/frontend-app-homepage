/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import {
  Breadcrumb,
  Icon,
  ModalLayer,
  Skeleton,
  useToggle,
} from '@edx/paragon';
import {
  ArrowBack, Check, Close, FilterList, Sort,
} from '@edx/paragon/icons';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import {
  FormattedMessage,
  injectIntl,
  intlShape,
} from '@edx/frontend-platform/i18n';
import { useDispatch, useSelector } from 'react-redux';
import useGetAllCourses from '../../../../hooks/useGetAllCourses';
import messages from '../../../../messages';
import SearchResults from '../desktop-search/SearchResults';
import { setCourseSortValue } from '../../../../redux/slice/allCoursesSlice';

const MobileSearch = ({ intl }) => {
  const history = useHistory();
  const { allCoursesData, isLoading } = useGetAllCourses();
  const sortState = useSelector((state) => state.sortAllCourses.value);
  const dispatch = useDispatch();
  const [isOpen, open, close] = useToggle(false);
  const handleItemClick = (sortType) => {
    dispatch(setCourseSortValue(sortType));
  };
  return (
    <>
      <ModalLayer isOpen={isOpen} onClose={close}>
        <div aria-label="My dialog" className="  bg-white more-modal-items ">
          <div className="d-flex close-wrapper justify-content-between align-items-center py-2 px-4">
            <span className="font-sm" />
            <Icon src={Close} className=" share-icon" onClick={close} />
          </div>
          <ul className="px-4 font-xl transform-rtl">
            <li
              onClick={() => {
                handleItemClick('recent');
                close();
              }}
              className="d-flex justify-content-between my-2.5"
            >
              <FormattedMessage id="recent" defaultMessage="Recent" />
              {intl.formatMessage(messages[sortState])
                === intl.formatMessage(messages.recent) && (
                <Icon className="check-icon" src={Check} />
              )}
            </li>
            <li
              onClick={() => {
                handleItemClick('ascending');
                close();
              }}
              className="d-flex justify-content-between mb-2.5"
            >
              <FormattedMessage id="ascending" defaultMessage="Title A to Z" />
              {intl.formatMessage(messages[sortState])
                === intl.formatMessage(messages.ascending) && (
                <Icon className="check-icon" src={Check} />
              )}
            </li>
            <li
              onClick={() => {
                handleItemClick('descending');
                close();
              }}
              className="d-flex justify-content-between"
            >
              <FormattedMessage id="descending" defaultMessage="Title Z to A" />
              {intl.formatMessage(messages[sortState])
                === intl.formatMessage(messages.descending) && (
                <Icon className="check-icon" src={Check} />
              )}
            </li>
          </ul>
        </div>
      </ModalLayer>
      <div className="mobile-search-container">
        <div className="d-flex px-4.5 py-3 align-items-center back-btn-wrapper">
          <Icon src={ArrowBack} onClick={history.goBack} className="mr-1.5" />
          <p className="d-flex align-items-center d-flex justify-content-center w-100">
            <h4 className="mr-1">
              <FormattedMessage id="courses.text" defaultMessage="Courses" />
            </h4>
            <span>{`(${allCoursesData?.count})`}</span>
          </p>
        </div>
        <div className="font-sm mobile-filter-sort-wrapper">
          <div className="d-flex align-items-center justify-content-center py-2 my-2">
            <Icon className="text-light-500" src={FilterList} />
            <FormattedMessage id="filters.text" defaultMessage="Filters" />
            <span className="text-brand-500">(1)</span>
          </div>
          <div
            className="d-flex align-items-center justify-content-center py-2 my-2"
            onClick={open}
          >
            <Icon className="text-light-500" src={Sort} />
            <FormattedMessage id="sortBy.text" defaultMessage="Sort by:" />
            <span className="text-primary-500 font-weight-bold ml-1">
              {intl.formatMessage(messages[sortState])}
            </span>
          </div>
        </div>
        <div />
        <div className="custom-container pt-4.5">
          <div className="d-flex justify-content-between mb-4.5">
            <Breadcrumb
              ariaLabel="Breadcrumb basic"
              links={[
                {
                  label: `${intl.formatMessage(messages['breadcrumb.home'])}`,
                  to: '/',
                },
                {
                  label: `${intl.formatMessage(
                    messages['breadcrumb.discover'],
                  )}`,
                  to: '/Discover',
                },
              ]}
              linkAs={Link}
              activeLabel={intl.formatMessage(messages['search.button.text'])}
            />
            <p className="font-sm">
              <span className="text-gray-500">
                <FormattedMessage id="total.text" defaultMessage="Total:" />
              </span>
              {isLoading ? (
                <Skeleton className="ml-1" width={28} height={20} />
              ) : (
                <span className="font-weight-bold">
                  {' '}
                  {allCoursesData?.count}
                </span>
              )}
            </p>
          </div>
          <SearchResults />
        </div>
      </div>
    </>
  );
};

MobileSearch.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(MobileSearch);
