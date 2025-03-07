import mongoose from "mongoose";

const ReportSchema = new mongoose.Schema({
  description: { type: String, required: true },
  location: { type: String, required: true },
  status: { type: String, default: "pending" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Report || mongoose.model("Report", ReportSchema);
