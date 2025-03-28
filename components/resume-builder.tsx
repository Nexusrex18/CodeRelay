"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"
import { Loader2, Download, ArrowRight, ArrowLeft } from "lucide-react"
import { PersonalInfoForm } from "@/components/forms/personal-info-form"
import { ExperienceForm } from "@/components/forms/experience-form"
import { EducationForm } from "@/components/forms/education-form"
import { SkillsForm } from "@/components/forms/skills-form"
import { TemplateSelector } from "@/components/template-selector"
import { ResumePreview } from "@/components/resume-preview"
import { CoverLetterPreview } from "@/components/cover-letter-preview"
import { ThemeToggle } from "@/components/theme-toggle"
import { generateResume } from "@/lib/generate-resume"
import { generateCoverLetter } from "@/lib/generate-cover-letter"
import type { ResumeData } from "@/types/resume"

const steps = [
  { id: "personal", label: "Personal Info" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Skills" },
  { id: "template", label: "Template" },
  { id: "preview", label: "Preview" },
]

export default function ResumeBuilder() {
  const { toast } = useToast()
  const [currentStep, setCurrentStep] = useState(0)
  const [isGenerating, setIsGenerating] = useState(false)
  const [activeTab, setActiveTab] = useState<"resume" | "cover-letter">("resume")
  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: {
      name: "",
      email: "",
      phone: "",
      location: "",
      website: "",
      summary: "",
    },
    experience: [],
    education: [],
    skills: [],
    selectedTemplate: "modern",
  })
  const [generatedResume, setGeneratedResume] = useState<string | null>(null)
  const [generatedCoverLetter, setGeneratedCoverLetter] = useState<string | null>(null)

  const progress = ((currentStep + 1) / steps.length) * 100

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleGenerate = async () => {
    try {
      setIsGenerating(true)

      // Generate resume content
      const resumeContent = await generateResume(resumeData)
      setGeneratedResume(resumeContent)

      // Generate cover letter content
      const coverLetterContent = await generateCoverLetter(resumeData)
      setGeneratedCoverLetter(coverLetterContent)

      toast({
        title: "Generation complete!",
        description: "Your resume and cover letter have been generated successfully.",
      })
    } catch (error) {
      toast({
        title: "Generation failed",
        description: "There was an error generating your documents. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const handleDownload = (type: "pdf" | "docx") => {
    toast({
      title: `Downloading as ${type.toUpperCase()}`,
      description: `Your ${activeTab === "resume" ? "resume" : "cover letter"} is being downloaded.`,
    })
    // In a real implementation, this would trigger the actual download
  }

  const updateResumeData = (section: keyof ResumeData, data: any) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: data,
    }))
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">{steps[currentStep].label}</h2>
          <p className="text-sm text-muted-foreground">
            Step {currentStep + 1} of {steps.length}
          </p>
        </div>
        <ThemeToggle />
      </div>

      <Progress value={progress} className="h-2" />

      <Card className="p-6">
        {currentStep === 0 && (
          <PersonalInfoForm
            data={resumeData.personalInfo}
            updateData={(data) => updateResumeData("personalInfo", data)}
          />
        )}
        {currentStep === 1 && (
          <ExperienceForm data={resumeData.experience} updateData={(data) => updateResumeData("experience", data)} />
        )}
        {currentStep === 2 && (
          <EducationForm data={resumeData.education} updateData={(data) => updateResumeData("education", data)} />
        )}
        {currentStep === 3 && (
          <SkillsForm data={resumeData.skills} updateData={(data) => updateResumeData("skills", data)} />
        )}
        {currentStep === 4 && (
          <TemplateSelector
            selectedTemplate={resumeData.selectedTemplate}
            onSelectTemplate={(template) => updateResumeData("selectedTemplate", template)}
          />
        )}
        {currentStep === 5 && (
          <div className="space-y-6">
            {!generatedResume && !generatedCoverLetter ? (
              <div className="flex flex-col items-center justify-center py-12 space-y-4">
                <Button onClick={handleGenerate} disabled={isGenerating} size="lg">
                  {isGenerating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>Generate Resume & Cover Letter</>
                  )}
                </Button>
                <p className="text-sm text-muted-foreground">
                  Our AI will create professional documents based on your information
                </p>
              </div>
            ) : (
              <Tabs
                defaultValue="resume"
                className="w-full"
                onValueChange={(value) => setActiveTab(value as "resume" | "cover-letter")}
              >
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="resume">Resume</TabsTrigger>
                  <TabsTrigger value="cover-letter">Cover Letter</TabsTrigger>
                </TabsList>
                <TabsContent value="resume" className="mt-4">
                  <ResumePreview resumeData={resumeData} generatedContent={generatedResume} />
                </TabsContent>
                <TabsContent value="cover-letter" className="mt-4">
                  <CoverLetterPreview resumeData={resumeData} generatedContent={generatedCoverLetter} />
                </TabsContent>
              </Tabs>
            )}

            {(generatedResume || generatedCoverLetter) && (
              <div className="flex justify-center gap-4 mt-6">
                <Button variant="outline" onClick={() => handleDownload("pdf")}>
                  <Download className="mr-2 h-4 w-4" />
                  Download PDF
                </Button>
                <Button variant="outline" onClick={() => handleDownload("docx")}>
                  <Download className="mr-2 h-4 w-4" />
                  Download DOCX
                </Button>
              </div>
            )}
          </div>
        )}

        <div className="flex justify-between mt-8">
          <Button variant="outline" onClick={handleBack} disabled={currentStep === 0}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          {currentStep < steps.length - 1 ? (
            <Button onClick={handleNext}>
              Next <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : null}
        </div>
      </Card>
    </div>
  )
}

