"use client"

import { Card } from "@/components/ui/card"
import type { ResumeData } from "@/types/resume"

interface ResumePreviewProps {
  resumeData: ResumeData
  generatedContent: string | null
}

export function ResumePreview({ resumeData, generatedContent }: ResumePreviewProps) {
  if (!generatedContent) {
    return (
      <div className="flex items-center justify-center h-[600px] border rounded-md">
        <p className="text-muted-foreground">Generate your resume to see a preview</p>
      </div>
    )
  }

  // In a real implementation, this would render the actual resume with proper styling
  // based on the selected template
  return (
    <Card className="p-6 min-h-[600px] overflow-auto">
      <div className={`resume-preview template-${resumeData.selectedTemplate}`}>
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold">{resumeData.personalInfo.name || "Your Name"}</h1>
            <div className="flex flex-wrap justify-center gap-x-4 text-sm text-muted-foreground">
              {resumeData.personalInfo.email && <span>{resumeData.personalInfo.email}</span>}
              {resumeData.personalInfo.phone && <span>{resumeData.personalInfo.phone}</span>}
              {resumeData.personalInfo.location && <span>{resumeData.personalInfo.location}</span>}
              {resumeData.personalInfo.website && <span>{resumeData.personalInfo.website}</span>}
            </div>
          </div>

          <div className="prose max-w-none">
            <div dangerouslySetInnerHTML={{ __html: generatedContent.replace(/\n/g, "<br />") }} />
          </div>
        </div>
      </div>
    </Card>
  )
}

