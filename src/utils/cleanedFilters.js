/* eslint-disable no-restricted-syntax */
/* eslint-disable import/prefer-default-export */
export const removeEmptyFilters = (filters) => {
  const cleanedFilters = {};

  for (const key in filters) {
    if (filters[key] && (Array.isArray(filters[key]) ? filters[key].length > 0 : true)) {
      cleanedFilters[key] = filters[key];
    }
  }

  return cleanedFilters;
};
