"use client";
import { updateRequestStatus } from "@/lib/actions/updateRequestStatus";
import { useState } from "react";
import toast from "react-hot-toast";

interface RequestCardProps {
  _id: string;
  requestedName: string;
  description: string;
  user: {
    name: string;
    email: string;
  };
  status: "not_started" | "in_progress" | "rejected" | "completed";
}

export default function RequestedCard({
  _id,
  requestedName,
  description,
  user,
  status,
}: RequestCardProps) {
  const [currentStatus, setCurrentStatus] = useState(status);
  const [loading, setLoading] = useState(false);

  const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value as RequestCardProps["status"];
    setCurrentStatus(newStatus);
    setLoading(true);
    try {
      const res = await updateRequestStatus({ requestId: _id, status: newStatus });
      if (res.success) toast.success("Status updated successfully!");
      else toast.error("Failed to update status.");
    } catch (err) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-md text-white w-full">
      <h3 className="text-xl font-semibold mb-2">{requestedName}</h3>
      <p className="text-sm text-gray-400 mb-4">{description}</p>

      <div className="text-sm text-gray-300 mb-4">
        <div><span className="font-medium text-white">Requested by:</span> {user.name}</div>
        <div className="text-xs text-gray-500">{user.email}</div>
      </div>

      <div className="flex items-center justify-between">
        <label className="text-sm font-medium mr-2">Status:</label>
        <select
          value={currentStatus}
          onChange={handleStatusChange}
          disabled={loading}
          className="bg-gray-800 border border-gray-700 px-3 py-1 rounded-md text-sm text-white focus:outline-none focus:ring-2 focus:ring-green-400"
        >
          <option value="not_started">Not Started</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>
    </div>
  );
}
