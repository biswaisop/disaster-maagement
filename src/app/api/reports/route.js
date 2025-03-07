import { NextResponse } from "next/server";
import { connectDB } from "@/app/utils/database";
import Report from "@/app/models/Report";
import { classifyDisaster } from "@/app/utils/ai"; // AI Classification

// 🟢 Fetch Reports (GET)
export async function GET() {
  try {
    await connectDB();
    const reports = await Report.find().sort({ createdAt: -1 }); // Latest reports first
    return NextResponse.json(reports, { status: 200 });
  } catch (error) {
    console.error("❌ Error fetching reports:", error);
    return NextResponse.json({ error: "Failed to fetch reports" }, { status: 500 });
  }
}

// 🟢 Submit a New Report (POST with AI & Status Update)
export async function POST(req) {
  try {
    await connectDB();
    const data = await req.json();

    // Validate required fields
    if (!data.description || !data.location) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    console.log("📩 Received Report:", data);

    // 🔥 AI Classifies the Disaster Type & Severity
    const aiResult = await classifyDisaster(data.description);
    console.log("🤖 AI Classification Result:", aiResult);

    if (!aiResult || !aiResult.type || !aiResult.severity) {
      return NextResponse.json({ error: "AI classification failed" }, { status: 500 });
    }

    // ✅ Determine status based on severity
    let status = "pending"; // Default status
    if (aiResult.severity === "severe" || aiResult.severity === "high") {
      status = "urgent";
    } else if (aiResult.severity === "moderate") {
      status = "in-progress";
    } else {
      status = "low-priority";
    }

    console.log(`🚨 Status assigned: ${status}`);

    // 📝 Save Report to Database
    const newReport = new Report({
      type: aiResult.type,
      description: data.description,
      severity: aiResult.severity,
      location: data.location,
      status: status, // ✅ Include status field
    });

    await newReport.save();
    console.log("✅ Report saved successfully!");

    return NextResponse.json({ message: "✅ Report submitted successfully with AI classification & status update!" }, { status: 201 });
  } catch (error) {
    console.error("❌ Error submitting report:", error);
    return NextResponse.json({ error: "Failed to submit report" }, { status: 500 });
  }
}
