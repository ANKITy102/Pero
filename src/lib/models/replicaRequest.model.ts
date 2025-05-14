import mongoose from "mongoose";

const replicaRequestSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    requestedName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      enum: ["not_started", "in_progress", "rejected", "completed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const ReplicaRequest = mongoose.models.ReplicaRequest || mongoose.model("ReplicaRequest", replicaRequestSchema);

export default ReplicaRequest;
