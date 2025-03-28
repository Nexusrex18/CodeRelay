"use client"

import { Card } from "@/components/ui/card"
import type { ResumeData } from "@/types/resume"

interface CoverLetterPreviewProps {
  resumeData: ResumeData
  generatedContent: string | null
}

export function CoverLetterPreview({ resumeData, generatedContent }: CoverLetterPreviewProps) {
  if (!generatedContent) {
    return (
      <div className="flex items-center justify-center h-[600px] border rounded-md">
        <p className="text-muted-foreground">Generate your cover letter to see a preview</p>
      </div>
    )
  }

  // In a real implementation, this would render the actual cover letter with proper styling
  // based on the selected template
  return (
    <Card className="p-6 min-h-[600px] overflow-auto">
      <div className={`cover-letter-preview template-${resumeData.selectedTemplate}`}>
        <div className="space-y-6">
          <div className="text-right">
            <p>{new Date().toLocaleDateString()}</p>
          </div>

          <div className="space-y-4">
            <p>Dear Hiring Manager,</p>

            <div className="prose max-w-none">
              <div dangerouslySetInnerHTML={{ __html: generatedContent.replace(/\n/g, "<br />") }} />
            </div>

            <p>Sincerely,</p>
            <p>{resumeData.personalInfo.name || "Your Name"}</p>
          </div>
        </div>
      </div>
    </Card>
  )
}

