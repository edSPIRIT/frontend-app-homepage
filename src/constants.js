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
export const COURSES_INFO = [
  {
    title: 'Robotics',
    institution: 'IBM',
    cover:
      'https://prod-discovery.edx-cdn.org/media/programs/card_images/90f4789c-2549-4670-ade7-12cc8b590f5c-06374e02670f.jpg',
    logo: 'https://prod-discovery.edx-cdn.org/organization/logos/87b07564-d569-4cfd-bee6-8b0a407acb73-dc33e4b5f353.png',
    instructor: 'David Joyner',
    lessons: '11 Lessons',
    time: '6 Hours',
  },
  {
    title: 'Python Programming',
    institution: 'Harvard University',
    cover:
      'https://prod-discovery.edx-cdn.org/media/course/image/2cc794d0-316d-42f7-bbfd-25c34e4cd5df-033e46d516c0.small.png',
    logo: 'https://prod-discovery.edx-cdn.org/organization/logos/44022f13-20df-4666-9111-cede3e5dc5b6-2cc39992c67a.png',
    instructor: 'Rav Ahuja',
    lessons: '10 Lessons',
    time: '7 Hours',
  },
  {
    title: 'Programming for Everybody',
    institution: 'Michigan University',
    cover:
      'https://prod-discovery.edx-cdn.org/media/programs/card_images/0de98c3a-0a5a-4cf2-b0a0-634862d47e11-27353a61855f.jpg',
    logo: 'https://prod-discovery.edx-cdn.org/organization/logos/ebf3ff9d-a40b-4cbe-84a1-ef7fe4f35beb-61ffe82bb9c2.png',
    instructor: 'Upkar Lidder',
    lessons: '13 Lessons',
    time: '10 Hours',
  },
  {
    title: 'introduction to java',
    institution: 'New york University',
    cover:
      'https://prod-discovery.edx-cdn.org/media/programs/card_images/865bbad4-6643-4d59-85d3-936cf3a7acf4-3720dd824793.jpg',
    logo: 'https://prod-discovery.edx-cdn.org/organization/logos/dc6d25de-0dac-43e6-a915-e362bf8b4403-917c4e000b69.png',
    instructor: 'Michel Buffa',
    lessons: '5 Lessons',
    time: '3 Hours',
  },
];
export const COURSES_INFO_TOP = [
  {
    title: 'C++ Programming: Basic',
    institution: 'Codio',
    cover:
      'https://prod-discovery.edx-cdn.org/media/course/image/59dd2022-3076-4677-ae8b-58b521077ca1-c9ad40423ed7.small.png',
    logo: 'https://prod-discovery.edx-cdn.org/organization/logos/dd7e4312-e4df-4d81-a126-5885865ab0d5-8c68a40ac0f3.png',
    instructor: 'David Joyner',
    lessons: '8 Lessons',
    time: '5 Hours',
  },
  {
    title: 'Computing in Python II',
    institution: 'GTx',
    cover:
      'https://prod-discovery.edx-cdn.org/media/course/image/f30fbd27-46af-4ce3-935a-104fe2c6b9c8-1c4459a85331.small.jpg',
    logo: 'https://prod-discovery.edx-cdn.org/organization/logos/8537d31f-01b4-40fd-b652-e17b38eefe41-7956b2a3cd04.png',
    instructor: 'Rav Ahuja',
    lessons: '9 Lessons',
    time: '7 Hours',
  },
  {
    title: 'Advanced Programming',
    institution: 'New york University',
    cover:
      'https://prod-discovery.edx-cdn.org/media/programs/card_images/865bbad4-6643-4d59-85d3-936cf3a7acf4-3720dd824793.jpg',
    logo: 'https://prod-discovery.edx-cdn.org/organization/logos/dc6d25de-0dac-43e6-a915-e362bf8b4403-917c4e000b69.png',
    instructor: 'Michel Buffa',
    lessons: '5 Lessons',
    time: '3 Hours',
  },
  {
    title: 'Statistics and R',
    institution: 'UPValenciaX',
    cover:
      'https://prod-discovery.edx-cdn.org/media/programs/card_images/0de98c3a-0a5a-4cf2-b0a0-634862d47e11-27353a61855f.jpg',
    logo: 'https://prod-discovery.edx-cdn.org/organization/logos/518a47f2-66fb-4529-8902-a4f7ca3002ef-78d294b01e63.png',
    instructor: 'Upkar Lidder',
    lessons: '13 Lessons',
    time: '10 Hours',
  },
];
export const SUBJECTS_ITEMS_NAV = [
  { title: 'Architecture' },
  { title: 'Art & Culture' },
  { title: 'Biology & Life Sciences' },
  { title: 'Business & Management' },
  { title: 'Chemistry' },
  { title: 'Communication' },
  { title: 'Computer Science' },
  { title: 'Data Analysis & Statistics' },
  { title: 'Design' },
  { title: 'Economics & Finance' },
  { title: 'Education & Teacher Training' },
  { title: 'Electronics' },
  { title: 'Energy & Earth Sciences' },
  { title: 'Engineering' },
  { title: 'Environmental Studies' },
  { title: 'Ethics' },
  { title: 'Food & Nutrition' },
  { title: 'Health & Safety' },
  { title: 'History' },
  { title: 'Humanities' },
  { title: 'Language' },
  { title: 'Law' },
  { title: 'Literature' },
  { title: 'Math' },
  { title: 'Medicine' },
  { title: 'Music' },
  { title: 'Philanthropy' },
  { title: 'Philosophy & Ethics' },
  { title: 'Physics' },
  { title: 'Science' },
  { title: 'Social Sciences' },
  { title: 'All Subjects' },
];
export const PROGRAMS_ITEMS_NAV = [
  {
    title: 'Executive EducationNew',
    description: 'Short courses to develop leadership skills',
  },
  {
    title: 'Professional Certificates',
    description:
      'From employers or universities to build todays in-demand skills',
  },
  {
    title: 'Masters DegreesNew',
    description: 'Online degree programs from top universities',
  },
  {
    title: 'MicroMasters® Programs',
    description: 'Begin or complete a degree; fully online',
  },
  // {
  //   title: 'XSeries',
  //   description: 'Short courses to develop leadership skills',
  // },
  // {
  //   title: 'Executive EducationNew',
  //   description: 'Series of courses for a deep understanding of a topic',
  // },
];
export const SUBJECTS_ITEMS = [
  {
    title: 'Architecture',
    cover:
      'https://www.edx.org/static/53f4b92a0dc6d9e7d5d25a9e420d82e2/architecture.jpg',
  },
  {
    title: 'Biology & Life Sciences',
    cover:
      'https://www.edx.org/static/36336bb6683dfa449f23c41ed891f301/biology.jpg',
  },
  {
    title: 'Business & Management',
    cover:
      'https://prod-discovery.edx-cdn.org/media/course/image/6774d438-134f-4d20-95a2-ea763f59ff23-985bdf6b8a01.small.png',
  },
  {
    title: 'Chemistry',
    cover:
      'https://prod-discovery.edx-cdn.org/media/course/image/0f1d712c-db22-4ae5-9d85-72109b0a5e3e-87cc52911021.small.jpg',
  },
  {
    title: 'Communication',
    cover:
      'https://prod-discovery.edx-cdn.org/media/course/image/28053d3b-64cc-4a7f-bcb6-247c4152bd6d-ee421a12f68e.small.jpeg',
  },
  {
    title: 'Computer Science',
    cover:
      'https://prod-discovery.edx-cdn.org/media/course/image/62ed92c9-22b6-43a6-a755-0f296d0f64ce-8b3c8aa8f0af.small.jpeg',
  },
  {
    title: 'Data Analysis & Statistics Courses',
    cover:
      'https://prod-discovery.edx-cdn.org/media/course/image/fa4317f9-e35c-4c7a-b5ef-a14afa1b356d-564b2787e478.small.jpeg',
  },
  {
    title: 'Food & Nutrition',
    cover:
      'https://prod-discovery.edx-cdn.org/media/course/image/01860b7e-23b1-4392-9f4c-91ea623d435a-874e0ca4929e.small.jpg',
  },
  {
    title: 'Health & Safety',
    cover:
      'https://prod-discovery.edx-cdn.org/media/course/image/ffbec579-96a8-46aa-8631-d4f4cefb6d40-ed33d7ddc355.small.png',
  },
  {
    title: 'History',
    cover:
      'https://prod-discovery.edx-cdn.org/media/course/image/fe3bf07f-bc54-49db-b8ff-28eb54692ac6-62ef926a0655.small.jpg',
  },
];
export const PARTNERS_LOGO = [
  {
    title: 'New york University',
    logo: 'https://prod-discovery.edx-cdn.org/organization/logos/dc6d25de-0dac-43e6-a915-e362bf8b4403-917c4e000b69.png',
  },
  {
    title: 'IBM',
    logo: 'https://prod-discovery.edx-cdn.org/organization/logos/87b07564-d569-4cfd-bee6-8b0a407acb73-dc33e4b5f353.png',
  },
  {
    title: 'Michigan University',
    logo: 'https://prod-discovery.edx-cdn.org/organization/logos/ebf3ff9d-a40b-4cbe-84a1-ef7fe4f35beb-61ffe82bb9c2.png',
  },
  {
    title: 'UPValenciaX',
    logo: 'https://prod-discovery.edx-cdn.org/organization/logos/518a47f2-66fb-4529-8902-a4f7ca3002ef-78d294b01e63.png',
  },
  {
    title: 'codio',
    logo: 'https://prod-discovery.edx-cdn.org/organization/logos/dd7e4312-e4df-4d81-a126-5885865ab0d5-8c68a40ac0f3.png',
  },
];
