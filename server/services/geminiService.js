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
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    console.log("Gemini Response:", response);
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

module.exports = { analyzeResume };
