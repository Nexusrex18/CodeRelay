import { Suspense } from "react"
import ResumeBuilder from "@/components/resume-builder"
import { Loader2 } from "lucide-react"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <div className="container py-8 md:py-12">
        <div className="mx-auto max-w-5xl space-y-8">
          <div className="text-center space-y-3">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">AI Resume & Cover Letter Generator</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Create professional resumes and cover letters in minutes with our AI-powered generator.
            </p>
          </div>

          <Suspense
            fallback={
              <div className="flex justify-center items-center h-[600px]">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            }
          >
            <ResumeBuilder />
          </Suspense>
        </div>
      </div>
    </main>
  )
}

