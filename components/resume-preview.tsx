// "use client"

// import { Card } from "@/components/ui/card"
// import type { ResumeData } from "@/types/resume"

// interface ResumePreviewProps {
//   resumeData: ResumeData
//   generatedContent: string | null
// }

// export function ResumePreview({ resumeData, generatedContent }: ResumePreviewProps) {
//   if (!generatedContent) {
//     return (
//       <div className="flex items-center justify-center h-[600px] border rounded-md">
//         <p className="text-muted-foreground">Generate your resume to see a preview</p>
//       </div>
//     )
//   }

//   // In a real implementation, this would render the actual resume with proper styling
//   // based on the selected template
//   return (
//     <Card className="p-6 min-h-[600px] overflow-auto">
//       <div className={`resume-preview template-${resumeData.selectedTemplate}`}>
//         <div className="space-y-6">
//           <div className="text-center space-y-2">
//             <h1 className="text-2xl font-bold">{resumeData.personalInfo.name || "Your Name"}</h1>
//             <div className="flex flex-wrap justify-center gap-x-4 text-sm text-muted-foreground">
//               {resumeData.personalInfo.email && <span>{resumeData.personalInfo.email}</span>}
//               {resumeData.personalInfo.phone && <span>{resumeData.personalInfo.phone}</span>}
//               {resumeData.personalInfo.location && <span>{resumeData.personalInfo.location}</span>}
//               {resumeData.personalInfo.website && <span>{resumeData.personalInfo.website}</span>}
//             </div>
//           </div>

//           <div className="prose max-w-none">
//             <div dangerouslySetInnerHTML={{ __html: generatedContent.replace(/\n/g, "<br />") }} />
//           </div>
//         </div>
//       </div>
//     </Card>
//   )
// }

// "use client"

// import React, { useRef } from 'react'
// import { PDFDownloadLink, Document, Page, Text, View, StyleSheet, pdf } from '@react-pdf/renderer'
// import { Card } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import type { ResumeData } from "@/types/resume"

// // Create styles for PDF
// const styles = StyleSheet.create({
//   page: {
//     padding: 30,
//     fontFamily: 'Helvetica',
//   },
//   header: {
//     textAlign: 'center',
//     marginBottom: 20,
//   },
//   name: {
//     fontSize: 24,
//     fontWeight: 'bold',
//   },
//   contactInfo: {
//     fontSize: 10,
//     color: '#666',
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   section: {
//     marginBottom: 15,
//   },
//   sectionTitle: {
//     fontSize: 14,
//     fontWeight: 'bold',
//     borderBottom: '1 solid #000',
//     paddingBottom: 5,
//     marginBottom: 10,
//   },
//   sectionContent: {
//     fontSize: 10,
//   },
//   jobEntry: {
//     marginBottom: 10,
//   },
//   jobTitle: {
//     fontSize: 12,
//     fontWeight: 'bold',
//   },
//   jobDetails: {
//     fontSize: 10,
//     color: '#666',
//   }
// })

// // PDF Resume Component
// const ResumePDF = ({ resumeData, generatedContent }: ResumePreviewProps) => {
//   // Parse the generated content into structured sections
//   const parseContent = (content: string) => {
//     const sections = {
//       summary: '',
//       experience: [],
//       education: [],
//       skills: [],
//     }

//     const sectionTitles = ['Professional Summary', 'Work Experience', 'Education', 'Skills']
//     const contentLines = content.split('\n')
//     let currentSection = ''

//     contentLines.forEach(line => {
//       const matchedSection = sectionTitles.find(title => 
//         line.trim().toLowerCase().includes(title.toLowerCase())
//       )

//       if (matchedSection) {
//         currentSection = matchedSection
//         return
//       }

//       switch(currentSection) {
//         case 'Professional Summary':
//           sections.summary += line + '\n'
//           break
//         case 'Work Experience':
//           if (line.trim()) sections.experience.push(line)
//           break
//         case 'Education':
//           if (line.trim()) sections.education.push(line)
//           break
//         case 'Skills':
//           if (line.trim()) sections.skills.push(line)
//           break
//       }
//     })

//     return sections
//   }

//   const parsedContent = parseContent(generatedContent || '')

//   return (
//     <Document>
//       <Page size="A4" style={styles.page}>
//         {/* Header */}
//         <View style={styles.header}>
//           <Text style={styles.name}>{resumeData.personalInfo.name || "Your Name"}</Text>
//           <Text style={styles.contactInfo}>
//             {[
//               resumeData.personalInfo.email,
//               resumeData.personalInfo.phone,
//               resumeData.personalInfo.location,
//               resumeData.personalInfo.website
//             ].filter(Boolean).join(' | ')}
//           </Text>
//         </View>

//         {/* Professional Summary */}
//         {parsedContent.summary && (
//           <View style={styles.section}>
//             <Text style={styles.sectionTitle}>Professional Summary</Text>
//             <Text style={styles.sectionContent}>{parsedContent.summary.trim()}</Text>
//           </View>
//         )}

//         {/* Work Experience */}
//         {parsedContent.experience.length > 0 && (
//           <View style={styles.section}>
//             <Text style={styles.sectionTitle}>Work Experience</Text>
//             {parsedContent.experience.map((exp, index) => (
//               <View key={index} style={styles.jobEntry}>
//                 <Text style={styles.jobTitle}>{exp}</Text>
//               </View>
//             ))}
//           </View>
//         )}

//         {/* Education */}
//         {parsedContent.education.length > 0 && (
//           <View style={styles.section}>
//             <Text style={styles.sectionTitle}>Education</Text>
//             {parsedContent.education.map((edu, index) => (
//               <View key={index} style={styles.jobEntry}>
//                 <Text style={styles.jobTitle}>{edu}</Text>
//               </View>
//             ))}
//           </View>
//         )}

//         {/* Skills */}
//         {parsedContent.skills.length > 0 && (
//           <View style={styles.section}>
//             <Text style={styles.sectionTitle}>Skills</Text>
//             <Text style={styles.sectionContent}>
//               {parsedContent.skills.join(' • ')}
//             </Text>
//           </View>
//         )}
//       </Page>
//     </Document>
//   )
// }

// export function ResumePreview({ resumeData, generatedContent }: ResumePreviewProps) {
//   const handleDirectDownload = async () => {
//     const blob = await pdf(<ResumePDF resumeData={resumeData} generatedContent={generatedContent} />).toBlob()
//     const url = URL.createObjectURL(blob)
//     const link = document.createElement('a')
//     link.href = url
//     link.download = `${resumeData.personalInfo.name || 'resume'}_resume.pdf`
//     document.body.appendChild(link)
//     link.click()
//     document.body.removeChild(link)
//   }

//   if (!generatedContent) {
//     return (
//       <div className="flex items-center justify-center h-[600px] border rounded-md">
//         <p className="text-muted-foreground">Generate your resume to see a preview</p>
//       </div>
//     )
//   }

//   return (
//     <Card className="p-6 min-h-[600px] overflow-auto space-y-4">
//       <div className={`resume-preview template-${resumeData.selectedTemplate}`}>
//         <div className="space-y-6">
//           <div className="text-center space-y-2">
//             <h1 className="text-2xl font-bold">{resumeData.personalInfo.name || "Your Name"}</h1>
//             <div className="flex flex-wrap justify-center gap-x-4 text-sm text-muted-foreground">
//               {resumeData.personalInfo.email && <span>{resumeData.personalInfo.email}</span>}
//               {resumeData.personalInfo.phone && <span>{resumeData.personalInfo.phone}</span>}
//               {resumeData.personalInfo.location && <span>{resumeData.personalInfo.location}</span>}
//               {resumeData.personalInfo.website && <span>{resumeData.personalInfo.website}</span>}
//             </div>
//           </div>

//           <div className="prose max-w-none">
//             <div dangerouslySetInnerHTML={{ __html: generatedContent.replace(/\n/g, "<br />") }} />
//           </div>
//         </div>
//       </div>

//       <div className="flex justify-center">
//         <Button onClick={handleDirectDownload}>
//           Download PDF
//         </Button>
//       </div>
//     </Card>
//   )
// }




"use client"

import React from 'react'
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet, pdf } from '@react-pdf/renderer'
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { ResumeData } from "@/types/resume"

// Create styles for PDF
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
  },
  header: {
    textAlign: 'center',
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  contactInfo: {
    fontSize: 10,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    borderBottom: '1 solid #000',
    paddingBottom: 5,
    marginBottom: 10,
  },
  sectionContent: {
    fontSize: 10,
  },
  jobEntry: {
    marginBottom: 10,
  },
  jobTitle: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  jobDetails: {
    fontSize: 10,
    color: '#666',
  }
})

// PDF Resume Component
const ResumePDF = ({ resumeData }: { resumeData: ResumeData }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{resumeData.personalInfo.name || "Your Name"}</Text>
          <Text style={styles.contactInfo}>
            {[
              resumeData.personalInfo.email,
              resumeData.personalInfo.phone,
              resumeData.personalInfo.location,
              resumeData.personalInfo.website
            ].filter(Boolean).join(' | ')}
          </Text>
          {resumeData.personalInfo.summary && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Professional Summary</Text>
              <Text style={styles.sectionContent}>{resumeData.personalInfo.summary}</Text>
            </View>
          )}
        </View>

        {/* Work Experience */}
        {resumeData.experience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Work Experience</Text>
            {resumeData.experience.map((exp, index) => (
              <View key={index} style={styles.jobEntry}>
                <Text style={styles.jobTitle}>{exp.jobTitle} - {exp.company}</Text>
                <Text style={styles.jobDetails}>
                  {exp.startDate} - {exp.endDate || 'Present'} | {exp.location}
                </Text>
                {exp.responsibilities && (
                  <Text style={styles.sectionContent}>
                    {exp.responsibilities}
                  </Text>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Education */}
        {resumeData.education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {resumeData.education.map((edu, index) => (
              <View key={index} style={styles.jobEntry}>
                <Text style={styles.jobTitle}>{edu.degree} - {edu.institution}</Text>
                <Text style={styles.jobDetails}>
                  {edu.graduationDate}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* Skills */}
        {resumeData.skills.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills</Text>
            <Text style={styles.sectionContent}>
              {resumeData.skills.join(' • ')}
            </Text>
          </View>
        )}
      </Page>
    </Document>
  )
}

export function ResumePreview({ resumeData, generatedContent, onEnhanceWithAI }: { 
  resumeData: ResumeData, 
  generatedContent?: string | null,
  onEnhanceWithAI?: () => void
}) {
  const handleDirectDownload = async () => {
    const blob = await pdf(<ResumePDF resumeData={resumeData} />).toBlob()
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${resumeData.personalInfo.name || 'resume'}_preview.pdf`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Check if basic resume data is available
  const isResumeDataComplete = 
    resumeData.personalInfo.name ||
    resumeData.experience.length > 0 ||
    resumeData.education.length > 0 ||
    resumeData.skills.length > 0

  if (!isResumeDataComplete) {
    return (
      <div className="flex items-center justify-center h-[600px] border rounded-md">
        <p className="text-muted-foreground">Please complete your resume information</p>
      </div>
    )
  }

  return (
    <Card className="p-6 min-h-[600px] overflow-auto space-y-4">
      <div className={`resume-preview template-${resumeData.selectedTemplate}`}>
        <div className="space-y-6">
          {/* Personal Info Section */}
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold">{resumeData.personalInfo.name || "Your Name"}</h1>
            <div className="flex flex-wrap justify-center gap-x-4 text-sm text-muted-foreground">
              {resumeData.personalInfo.email && <span>{resumeData.personalInfo.email}</span>}
              {resumeData.personalInfo.phone && <span>{resumeData.personalInfo.phone}</span>}
              {resumeData.personalInfo.location && <span>{resumeData.personalInfo.location}</span>}
              {resumeData.personalInfo.website && <span>{resumeData.personalInfo.website}</span>}
            </div>
          </div>

          {/* Professional Summary */}
          {resumeData.personalInfo.summary && (
            <div className="text-center text-sm text-muted-foreground">
              {resumeData.personalInfo.summary}
            </div>
          )}

          {/* Experience Section */}
          {resumeData.experience.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold border-b mb-4">Work Experience</h2>
              {resumeData.experience.map((exp, index) => (
                <div key={index} className="mb-4">
                  <div className="flex justify-between">
                    <h3 className="font-medium">{exp.jobTitle} - {exp.company}</h3>
                    <span className="text-sm text-muted-foreground">
                      {exp.startDate} - {exp.endDate || 'Present'} | {exp.location}
                    </span>
                  </div>
                  {exp.responsibilities && (
                    <p className="text-sm text-muted-foreground">{exp.responsibilities}</p>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Education Section */}
          {resumeData.education.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold border-b mb-4">Education</h2>
              {resumeData.education.map((edu, index) => (
                <div key={index} className="mb-4">
                  <div className="flex justify-between">
                    <h3 className="font-medium">{edu.degree} - {edu.institution}</h3>
                    <span className="text-sm text-muted-foreground">{edu.graduationDate}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Skills Section */}
          {resumeData.skills.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold border-b mb-4">Skills</h2>
              <p className="text-sm text-muted-foreground">
                {resumeData.skills.join(' • ')}
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-center gap-4 mt-6">
        <Button onClick={handleDirectDownload}>
          Download Basic PDF
        </Button>
        {onEnhanceWithAI && (
          <Button variant="secondary" onClick={onEnhanceWithAI}>
            Enhance with AI
          </Button>
        )}
      </div>
    </Card>
  )
}