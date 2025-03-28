// "use client"

// import { Card } from "@/components/ui/card"
// import type { ResumeData } from "@/types/resume"

// interface CoverLetterPreviewProps {
//   resumeData: ResumeData
//   generatedContent: string | null
// }

// export function CoverLetterPreview({ resumeData, generatedContent }: CoverLetterPreviewProps) {
//   if (!generatedContent) {
//     return (
//       <div className="flex items-center justify-center h-[600px] border rounded-md">
//         <p className="text-muted-foreground">Generate your cover letter to see a preview</p>
//       </div>
//     )
//   }

//   // In a real implementation, this would render the actual cover letter with proper styling
//   // based on the selected template
//   return (
//     <Card className="p-6 min-h-[600px] overflow-auto">
//       <div className={`cover-letter-preview template-${resumeData.selectedTemplate}`}>
//         <div className="space-y-6">
//           <div className="text-right">
//             <p>{new Date().toLocaleDateString()}</p>
//           </div>

//           <div className="space-y-4">
//             <p>Dear Hiring Manager,</p>

//             <div className="prose max-w-none">
//               <div dangerouslySetInnerHTML={{ __html: generatedContent.replace(/\n/g, "<br />") }} />
//             </div>

//             <p>Sincerely,</p>
//             <p>{resumeData.personalInfo.name || "Your Name"}</p>
//           </div>
//         </div>
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
    padding: 50,
    fontFamily: 'Helvetica',
  },
  header: {
    marginBottom: 30,
  },
  contactInfo: {
    fontSize: 10,
    textAlign: 'right',
    marginBottom: 20,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  contact: {
    fontSize: 10,
    textAlign: 'right',
    color: '#666',
  },
  date: {
    fontSize: 10,
    textAlign: 'right',
    marginBottom: 20,
  },
  salutation: {
    fontSize: 12,
    marginBottom: 15,
  },
  body: {
    fontSize: 11,
    lineHeight: 1.5,
    marginBottom: 20,
  },
  closing: {
    fontSize: 12,
    marginTop: 20,
  },
  signature: {
    marginTop: 10,
    fontSize: 12,
    fontWeight: 'bold',
  }
})

// PDF Cover Letter Component
const CoverLetterPDF = ({ resumeData, generatedContent }: CoverLetterPreviewProps) => {
  // Basic content parsing to handle potential AI-generated formatting issues
  const parseContent = (content: string) => {
    // Remove any HTML tags and replace line breaks
    return content.replace(/<[^>]*>/g, '').replace(/\n/g, ' ')
  }

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header with Contact Information */}
        <View style={styles.header}>
          <Text style={styles.name}>{resumeData.personalInfo.name || "Your Name"}</Text>
          <View style={styles.contactInfo}>
            {resumeData.personalInfo.email && <Text>{resumeData.personalInfo.email}</Text>}
            {resumeData.personalInfo.phone && <Text>{resumeData.personalInfo.phone}</Text>}
            {resumeData.personalInfo.location && <Text>{resumeData.personalInfo.location}</Text>}
          </View>
          
          {/* Date */}
          <Text style={styles.date}>
            {new Date().toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </Text>
        </View>

        {/* Salutation */}
        <Text style={styles.salutation}>Dear Hiring Manager,</Text>

        {/* Body */}
        <Text style={styles.body}>
          {generatedContent ? parseContent(generatedContent) : ""}
        </Text>

        {/* Closing */}
        <Text style={styles.closing}>Sincerely,</Text>
        <Text style={styles.signature}>{resumeData.personalInfo.name || "Your Name"}</Text>
      </Page>
    </Document>
  )
}

export function CoverLetterPreview({ resumeData, generatedContent }: CoverLetterPreviewProps) {
  const handleDirectDownload = async () => {
    const blob = await pdf(<CoverLetterPDF resumeData={resumeData} generatedContent={generatedContent} />).toBlob()
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${resumeData.personalInfo.name || 'cover_letter'}_preview.pdf`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  if (!generatedContent) {
    return (
      <div className="flex items-center justify-center h-[600px] border rounded-md">
        <p className="text-muted-foreground">Generate your cover letter to see a preview</p>
      </div>
    )
  }

  return (
    <Card className="p-6 min-h-[600px] overflow-auto space-y-4">
      <div className={`cover-letter-preview template-${resumeData.selectedTemplate}`}>
        <div className="space-y-6">
          {/* Header with Name and Contact Info */}
          <div className="text-right">
            <h2 className="text-xl font-bold">{resumeData.personalInfo.name || "Your Name"}</h2>
            <div className="text-sm text-muted-foreground">
              {resumeData.personalInfo.email && <p>{resumeData.personalInfo.email}</p>}
              {resumeData.personalInfo.phone && <p>{resumeData.personalInfo.phone}</p>}
              {resumeData.personalInfo.location && <p>{resumeData.personalInfo.location}</p>}
            </div>
            
            {/* Date */}
            <p className="text-sm mt-4">
              {new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>

          {/* Salutation */}
          <p className="mt-6">Dear Hiring Manager,</p>

          {/* Cover Letter Body */}
          <div className="prose max-w-none">
            <div dangerouslySetInnerHTML={{ __html: generatedContent.replace(/\n/g, "<br />") }} />
          </div>

          {/* Closing */}
          <div className="mt-6">
            <p>Sincerely,</p>
            <p className="font-semibold">{resumeData.personalInfo.name || "Your Name"}</p>
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-4 mt-6">
        <Button onClick={handleDirectDownload}>
          Download Cover Letter PDF
        </Button>
      </div>
    </Card>
  )
}