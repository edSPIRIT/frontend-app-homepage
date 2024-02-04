export interface IStaticPages {
  about: string | null
  contact: string | null
  tos: string | null
  privacy: string | null
  donate: string | null
  honor: string | null
  blog: string | null
}

export interface IStaticPage {
  name: string
  content: string
}
