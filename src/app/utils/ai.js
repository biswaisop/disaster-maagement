const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI("AIzaSyD4wnuBWGu-T-LCSsI-ir2R2aZQvPdWf7I");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function classifyDisaster(description) {
  try {
    const prompt = `Classify the following disaster report and assign a severity level:
      Report: "${description}"
      Respond with JSON: { "type": "", "severity": "" }`;

    console.log("🧠 Sending prompt to AI:", prompt);

    const result = await model.generateContent(prompt);
    const textResponse = await result.response.text();

    console.log("🤖 AI Raw Response:", textResponse);

    return JSON.parse(textResponse);
  } catch (error) {
    console.error("❌ AI Classification Error:", error);
    return { type: "Unknown", severity: "moderate" }; // Default values if AI fails
  }
}
