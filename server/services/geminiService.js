console.log("geminiService loaded");
const dotenv = require("dotenv");
dotenv.config();

const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const analyzeResume = async (resumeText) => {
  const prompt = `
You are an experienced HR recruiter and ATS expert.

Analyze the following resume.

Return ONLY valid JSON.

The JSON format should be:

{
  "overallScore": 0,
  "summary": "",
  "strengths": [],
  "weaknesses": [],
  "missingSkills": [],
  "suggestions": []
}

Resume:

${resumeText}
`;
  try {
    console.time("Gemini");
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
    console.timeEnd("Gemini");
    // console.log("Gemini Response:", response);
    const text = response.text || "";
    const cleaned = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();
    const analysis = JSON.parse(cleaned);
    return analysis;
  } catch (error) {
    console.error("Gemini Error:", error);
    throw error;
  }
};

const generateCoverLetter = async ({
  resumeText,
  companyName,
  jobTitle,
  jobDescription,
  hiringManager,
  fullName,
}) => {
  try {
    const prompt = `
You are a senior HR recruiter with over 15 years of experience.

Your task is to write a personalized, ATS-friendly cover letter.

Candidate Name:
${fullName}

Company:
${companyName}

Position:
${jobTitle}

Job Description:
${jobDescription}

Resume:
${resumeText}

Requirements:

• Write as if the candidate wrote it.
• Mention only skills and experience present in the resume.
• Mention projects only if relevant.
• Tailor the letter to the job description.
• Keep it between 250 and 350 words.
• Be confident and professional.
• Use proper business letter formatting.
• If hiring manager name is unavailable, use "Dear Hiring Manager,".
• Finish with:
Sincerely,
${fullName}

IMPORTANT:

Do NOT use placeholders.

Never write:

[Company Name]

[Job Title]

[Candidate Name]

Replace everything with actual values.

Return ONLY the cover letter.
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    throw error;
  }
};

module.exports = { analyzeResume, generateCoverLetter };
