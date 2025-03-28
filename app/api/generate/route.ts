import { NextResponse } from 'next/server';
import { generateResume } from '@/lib/generate-resume';
import { generateCoverLetter } from '@/lib/generate-cover-letter';
import type { ResumeData } from '@/types/resume';

export async function POST(request: Request) {
  try {
    const resumeData: ResumeData = await request.json();
    const resumeContent = await generateResume(resumeData);
    const coverLetterContent = await generateCoverLetter(resumeData);
    return NextResponse.json({ resume: resumeContent, coverLetter: coverLetterContent });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}