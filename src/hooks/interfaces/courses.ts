export interface Result {
  instructors: Instructor[]
  total_weeks_of_effort?: number
  hours_effort_per_week_min?: number
  hours_effort_per_week_max?: number
  additional_metadata: AdditionalMetadata
  course_slug?: string
  paid_course: PaidCourse
  partner?: Partner
}

export interface Instructor {
  name: string
  slug: string
  short_bio: string
  image?: string
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
  short_description?: string
  org: string
  display_name: string
  effort?: string
  sections_count: number
  units_count: number
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

export interface Root {
  count: number
  next: string
  previous: any
  results: Result[]
}
