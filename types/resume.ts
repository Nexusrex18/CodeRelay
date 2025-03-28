export interface PersonalInfo {
  name: string
  email: string
  phone: string
  location: string
  website: string
  summary: string
}

export interface Experience {
  company: string
  position: string
  startDate: string
  endDate: string
  location: string
  description: string
}

export interface Education {
  institution: string
  degree: string
  field: string
  startDate: string
  endDate: string
  location: string
}

export interface ResumeData {
  personalInfo: PersonalInfo
  experience: Experience[]
  education: Education[]
  skills: string[]
  selectedTemplate: string
}

