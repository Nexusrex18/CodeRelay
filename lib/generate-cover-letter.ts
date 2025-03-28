import type { ResumeData } from "@/types/resume"
import { GoogleGenerativeAI } from "@google/generative-ai"

export async function generateCoverLetter(resumeData: ResumeData): Promise<string> {
  try {
    // Retrieve the API key from environment variables
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY

    if (!apiKey) {
      throw new Error("Google Gemini API key is not configured")
    }

    // Initialize the Google Generative AI client
    const genAI = new GoogleGenerativeAI(apiKey)

    // Select the Gemini model (you can choose between different models)
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.0-flash" 
    })

    // Create the prompt
    const prompt = createCoverLetterPrompt(resumeData)

    // Generate the cover letter
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
    console.error("Error generating cover letter:", error)
    return "Failed to generate cover letter. Please try again."
  }
}

function createCoverLetterPrompt(resumeData: ResumeData): string {
  const { personalInfo, experience, education, skills } = resumeData

  return `
    Create a professional cover letter for ${personalInfo.name || "the applicant"}.
    
    Personal Information:
    - Name: ${personalInfo.name || "Not provided"}
    - Email: ${personalInfo.email || "Not provided"}
    - Phone: ${personalInfo.phone || "Not provided"}
    - Location: ${personalInfo.location || "Not provided"}
    
    Professional Summary:
    ${personalInfo.summary || "Not provided"}
    
    Work Experience:
    ${experience
      .map(
        (job) => `
      - Company: ${job.company || "Not provided"}
      - Position: ${job.position || "Not provided"}
      - Duration: ${job.startDate || "Not provided"} to ${job.endDate || "Not provided"}
      - Description: ${job.description || "Not provided"}
    `,
      )
      .join("\n")}
    
    Education:
    ${education
      .map(
        (edu) => `
      - Institution: ${edu.institution || "Not provided"}
      - Degree: ${edu.degree || "Not provided"} in ${edu.field || "Not provided"}
    `,
      )
      .join("\n")}
    
    Skills:
    ${skills.join(", ") || "Not provided"}
    
    Write a compelling cover letter that highlights the applicant's experience, skills, and qualifications. 
    The tone should be professional but personable, and the letter should be well-structured with an introduction, 
    body paragraphs highlighting relevant experience, and a strong closing paragraph.
    
    Format the cover letter in a professional manner suitable for the ${resumeData.selectedTemplate} template style.
    instead of your default spaces to fill by own ,provide me with the proper cover letter adusting all the details provided in ${resumeData}.
  `
}