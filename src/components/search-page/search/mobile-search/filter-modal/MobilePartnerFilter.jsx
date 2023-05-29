/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import {
  Button,
  Form,
  FullscreenModal,
  Icon,
  Menu,
  MenuItem,
  SearchField,
  useCheckboxSetValues,
  useToggle,
} from '@edx/paragon';
import { ArrowBack, ArrowForwardIos } from '@edx/paragon/icons';
import { useDispatch, useSelector } from 'react-redux';
import { FormattedMessage } from '@edx/frontend-platform/i18n';
import { useEffect, useState } from 'react';
import { setSearchPartner } from '../../../../../redux/slice/searchQuerySlice';
import useGetPartnersFacet from '../../../../../hooks/useGetPartnersFacet';

const MobilePartnerFilter = () => {
  const [isOpen, open, close] = useToggle(false);
  const partner = useSelector((state) => state.searchFilters.partner);
  const dispatch = useDispatch();
  const [partnerValues, {
    add, remove, clear, set,
  }] = useCheckboxSetValues([]);

  const [searchString, setSearchString] = useState('');
  const { partnersData, loading } = useGetPartnersFacet(searchString);

  const handleChange = (e) => {
    if (e.target.checked) {
      add(e.target.value);
    } else {
      remove(e.target.value);
    }
  };

  useEffect(() => {
    clear();
    if (partner.length > 0) {
      set(partner);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [partner, isOpen]);

  return (
    <>
      <FullscreenModal
        className="filter-modal"
        isOpen={isOpen}
        onClose={() => close()}
      >
        <div className="d-flex align-items-center justify-content-between p-3 modal-header-wrapper">
          <Icon
            src={ArrowBack}
            loadPages
            onClick={() => {
              close();
            }}
            className="mx-2 "
          />
          <h4>
            <FormattedMessage
              id="search.facets.partner"
              defaultMessage="Partner"
            />
          </h4>
          <Button
            variant="tertiary"
            size="sm"
            className="reset-btn"
            onClick={() => {}}
          >
            <FormattedMessage id="reset.text" defaultMessage="Reset" />
          </Button>
        </div>
        <div className="facet-menu mobile-facet-menu h-100 d-flex flex-column">
          <SearchField
            onChange={(value) => setSearchString(value)}
            onSubmit={(value) => setSearchString(value)}
            placeholder="Find a ..."
          />
          <div className="d-flex flex-column justify-content-between h-100">
            <Form.Group>
              <Form.CheckboxSet
                name="color-two"
                onChange={(e) => handleChange(e)}
                value={partnerValues}
              >
                <Menu>
                  {partnersData?.map((item) => (
                    <div
                      className="d-flex justify-content-between align-items-center item-wrapper"
                      key={item.organization.id}
                    >
                      <MenuItem as={Form.Checkbox} value={item.organization.name}>
                        {item.organization.name}
                      </MenuItem>
                      <span className="pr-4">{item.courses_count}</span>
                    </div>
                  ))}
                </Menu>
              </Form.CheckboxSet>
            </Form.Group>
            <div className="p-4">
              <Button
                variant="brand"
                className="w-100"
                onClick={() => {
                  // dispatch(resetSearchFilters());
                  dispatch(setSearchPartner(partnerValues));
                  close();
                }}
              >
                <FormattedMessage
                  id="search.Apply.button"
                  defaultMessage="Apply"
                />
              </Button>
            </div>
          </div>
        </div>
      </FullscreenModal>
      <div
        className="d-flex justify-content-between align-items-center"
        onClick={() => open()}
      >
        <p className="font-sm d-flex justify-content-center align-items-center py-2">
          <FormattedMessage
            id="search.facets.partner"
            defaultMessage="Partner"
          />
          {partner.length > 0 && (
            <span className="font-weight-bold ml-1 text-brand-500">{`(${partner.length})`}</span>
          )}
        </p>
        <Icon src={ArrowForwardIos} />
      </div>
    </>
  );
};

export default MobilePartnerFilter;
