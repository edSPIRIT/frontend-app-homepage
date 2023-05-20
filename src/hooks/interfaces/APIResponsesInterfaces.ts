// partners
export interface IOrganization {
  id: number;
  created: string;
  modified: string;
  name: string;
  short_name: string;
  description: string;
  logo: string;
  active: boolean;
}
export interface IPartnersResult {
  organization: IOrganization;
  header: string;
  featured: boolean;
  courses_count: number;
  created: string;
}
export interface IAllPartners {
  next: any;
  previous: any;
  count: number;
  num_pages: number;
  current_page: number;
  start: number;
  results: IPartnersResult[];
  total_courses: number;
  total_enrollments: number;
}
// course meta data

export interface IInstructor {
  name: string;
  slug: string;
  short_bio: string;
  image?: any;
  courses_count?: number;
  students_count?: number;
}

export interface IAdditionalMetadata {
  self_paced: boolean;
  total_enrollments: number;
  last_modification_date: string;
  course_created_at: string;
  enrollment_start: any;
  enrollment_end: any;
  course_image_url: string;
  language: string;
  certificate_enabled: boolean;
  short_description: string;
  org: string;
  display_name: string;
  effort: any;
  sections_count: number;
  units_count: number;
  pre_req_courses?: any[];
}

export interface IPaidCourse {
  price: number;
  currency: string;
  course_id: string;
  active: boolean;
  price_human: string;
}
export interface IPartner {
  organization: IOrganization;
  header: string;
  featured: boolean;
  courses_count: number;
  created: string;
}
export interface ICourseMetaData {
  instructors: IInstructor[];
  created: string;
  total_weeks_of_effort: number;
  hours_effort_per_week_min: number;
  hours_effort_per_week_max: number;
  about: string;
  what_you_will_learn: string[];
  requirements: string[];
  additional_metadata: IAdditionalMetadata;
  course_id: string;
  transcript_langs: string[];
  course_slug: string;
  paid_course: IPaidCourse;
  partner: IPartner;
  subject: any;
}
// all courses

export interface ICourses {
  instructors: IInstructor[]
  total_weeks_of_effort?: number
  hours_effort_per_week_min?: number
  hours_effort_per_week_max?: number
  additional_metadata: IAdditionalMetadata
  course_slug?: string
  paid_course: IPaidCourse
  partner?: IPartner
}
export interface IAllCoursesPagination {
  count: number
  next: string
  previous: any
  results: ICourses[]
}
