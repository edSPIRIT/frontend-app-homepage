export const SHOW_ALL_NAME = 'showAll';

export const SEARCH_FACET_FILTERS = [
  {
    attribute: 'skill_names',
    title: 'Skills',
    typeaheadOptions: {
      placeholder: 'Find a skill...',
      ariaLabel: 'Type to find a skill',
      minLength: 3,
    },
  },
  {
    attribute: 'subjects',
    title: 'Subject',
    typeaheadOptions: {
      placeholder: 'Find a subject...',
      ariaLabel: 'Type to find a subject',
      minLength: 3,
    },
  },
  {
    attribute: 'partners.name',
    title: 'Partner',
    isSortedAlphabetical: true,
    typeaheadOptions: {
      placeholder: 'Find a partner...',
      ariaLabel: 'Type to find a partner',
      minLength: 3,
    },
  },
  {
    attribute: 'programs',
    title: 'Program',
    isSortedAlphabetical: true,
    typeaheadOptions: {
      placeholder: 'Find a program...',
      ariaLabel: 'Type to find a program',
      minLength: 3,
    },
  },
  {
    attribute: 'level_type',
    title: 'Level',
  },
  {
    attribute: 'availability',
    title: 'Availability',
  },
];
export const NO_OPTIONS_FOUND = 'No options found.';
export const REFINEMENT = [
  {
    title: 'Machine Learning',
  },
  {
    title: 'Art & Culture',
  },
  {
    title: 'MicroMasters',
  },
  {
    title: 'Advanced',
  },
  {
    title: 'course',
  },
];
export const QUERY_TITLE_REFINEMENT = 'enterprise_catalog_query_titles';
