import type { ResumeData } from "@/types/resume"
import { GoogleGenerativeAI } from "@google/generative-ai"

export async function generateResume(resumeData: ResumeData): Promise<string> {
  try {
    // Retrieve the API key from environment variables
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY

    if (!apiKey) {
      throw new Error("Google Gemini API key is not configured")
    }

    // Initialize the Google Generative AI client
    const genAI = new GoogleGenerativeAI(apiKey)

    // Select the Gemini model 
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.0-flash" 
    })

    // Create the prompt
    const prompt = createResumePrompt(resumeData)

    // Generate the resume
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 2048,
      }
    })

    // Extract the text from the response
    const response = result.response
    const text = response.text()

    return text
  } catch (error) {
    console.error("Error generating resume:", error)
    return "Failed to generate resume. Please try again."
  }
}

function createResumePrompt(resumeData: ResumeData): string {
  const { personalInfo, experience, education, skills } = resumeData

  return `
    Create a professional resume for ${personalInfo.name || "the applicant"}.
    
    Personal Information:
    - Name: ${personalInfo.name || "Not provided"}
    - Email: ${personalInfo.email || "Not provided"}
    - Phone: ${personalInfo.phone || "Not provided"}
    - Location: ${personalInfo.location || "Not provided"}
    - Website/LinkedIn: ${personalInfo.website || "Not provided"}
    
    Professional Summary:
    ${personalInfo.summary || "Not provided"}
    
    Work Experience:
    ${experience
      .map(
        (job) => `
      - Company: ${job.company || "Not provided"}
      - Position: ${job.position || "Not provided"}
      - Duration: ${job.startDate || "Not provided"} to ${job.endDate || "Not provided"}
      - Location: ${job.location || "Not provided"}
      - Description: ${job.description || "Not provided"}
    `,
      )
      .join("\n")}
    
    Education:
    ${education
      .map(
        (edu) => `
      - Institution: ${edu.institution || "Not provided"}
      - Degree: ${edu.degree || "Not provided"}
      - Field: ${edu.field || "Not provided"}
      - Duration: ${edu.startDate || "Not provided"} to ${edu.endDate || "Not provided"}
      - Location: ${edu.location || "Not provided"}
    `,
      )
      .join("\n")}
    
    Skills:
    ${skills.join(", ") || "Not provided"}
    
    Format the resume in a professional manner suitable for the ${resumeData.selectedTemplate} template style.
    Ensure the resume is concise, well-structured, and highlights key achievements and skills.
    Use a clear, professional tone that emphasizes the applicant's strengths and potential.highly follow the teplte provided and do not provide in .md text based format.
  `
}