import { analyzeReport } from "@/utils/gemini";

export async function POST(req) {
  const { description } = await req.json();
  const aiResponse = await analyzeReport(description);
  return Response.json({ category: aiResponse });
}
