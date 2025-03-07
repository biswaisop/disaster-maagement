const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI("AIzaSyD4wnuBWGu-T-LCSsI-ir2R2aZQvPdWf7I");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function classifyDisaster(description) {
  try {
    const prompt = `Analyze the following disaster report and classify it:
    Report: "${description}"

    - Identify the disaster type (e.g., flood, fire, earthquake, landslide, hurricane, tornado).
    - Assign a severity level from: "low", "moderate", "high", or "severe".
    
    Respond **only** with JSON in this exact format:
    { "type": "disaster_type", "severity": "severity_level" }`;

    console.log("🧠 Sending prompt to AI:", prompt);

    const result = await model.generateContent({ contents: [{ parts: [{ text: prompt }] }] });
    let textResponse = result.response.text();

    console.log("🤖 AI Raw Response:", textResponse);

    // ✅ Fix: Remove unwanted formatting (`json` tags, backticks, and newlines)
    textResponse = textResponse.replace(/```json|```/g, "").trim();

    // ✅ Fix: Extract only the JSON part
    const jsonStart = textResponse.indexOf("{");
    const jsonEnd = textResponse.lastIndexOf("}");
    if (jsonStart !== -1 && jsonEnd !== -1) {
      textResponse = textResponse.substring(jsonStart, jsonEnd + 1);
    }

    const parsedData = JSON.parse(textResponse);

    // ✅ Ensure severity is valid
    const validSeverities = ["low", "moderate", "high", "severe"];
    if (!validSeverities.includes(parsedData.severity.toLowerCase())) {
      parsedData.severity = "moderate"; // Default to moderate if AI fails
    }

    return parsedData;
  } catch (error) {
    console.error("❌ AI Classification Error:", error);
    return { type: "Unknown", severity: "moderate" }; // Default fallback
  }
}
