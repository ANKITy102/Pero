// "use client"

// import { updateRequestStatus } from "@/lib/actions/updateRequestStatus"
// import { useState } from "react"
// import toast from "react-hot-toast"
// import { Clock, CheckCircle, XCircle, AlertCircle, User, Mail } from "lucide-react"
// import { cn } from "@/lib/utils"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Badge } from "@/components/ui/badge"
// import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

// interface RequestCardProps {
//   _id: string
//   requestedName: string
//   description: string
//   user: {
//     name: string
//     email: string
//   }
//   status: "not_started" | "in_progress" | "rejected" | "completed"
// }

// export default function RequestCard({ _id, requestedName, description, user, status }: RequestCardProps) {
//   const [currentStatus, setCurrentStatus] = useState(status)
//   const [loading, setLoading] = useState(false)

//   const handleStatusChange = async (value: string) => {
//     const newStatus = value as RequestCardProps["status"]
//     setCurrentStatus(newStatus)
//     setLoading(true)
//     try {
//       const res = await updateRequestStatus({ requestId: _id, status: newStatus })
//       if (res.success) toast.success("Status updated successfully!")
//       else toast.error("Failed to update status.")
//     } catch (err) {
//       toast.error("Something went wrong.")
//     } finally {
//       setLoading(false)
//     }
//   }

//   const getStatusDetails = (status: RequestCardProps["status"]) => {
//     switch (status) {
//       case "not_started":
//         return {
//           label: "Not Started",
//           icon: <Clock className="h-4 w-4" />,
//           color: "bg-slate-600 hover:bg-slate-500",
//         }
//       case "in_progress":
//         return {
//           label: "In Progress",
//           icon: <AlertCircle className="h-4 w-4" />,
//           color: "bg-amber-600 hover:bg-amber-500",
//         }
//       case "completed":
//         return {
//           label: "Completed",
//           icon: <CheckCircle className="h-4 w-4" />,
//           color: "bg-green-600 hover:bg-green-500",
//         }
//       case "rejected":
//         return {
//           label: "Rejected",
//           icon: <XCircle className="h-4 w-4" />,
//           color: "bg-red-600 hover:bg-red-500",
//         }
//       default:
//         return {
//           label: "Unknown",
//           icon: <Clock className="h-4 w-4" />,
//           color: "bg-slate-600 hover:bg-slate-500",
//         }
//     }
//   }

//   const statusDetails = getStatusDetails(currentStatus)

//   return (
//     <Card className="border w-full border-gray-800 bg-[#080808] shadow-lg hover:shadow-xl transition-all duration-200">
//       <CardHeader className="pb-2">
//         <div className="flex justify-between items-start">
//           <h3 className="text-xl font-semibold text-white">{requestedName}</h3>
//           <Badge className={cn("flex items-center gap-1 px-2 py-1", statusDetails.color)}>
//             {statusDetails.icon}
//             <span>{statusDetails.label}</span>
//           </Badge>
//         </div>
//       </CardHeader>

//       <CardContent className="pb-4">
//         <p className="text-sm text-gray-400 mb-4 ">{description}</p>

//         <div className="flex flex-col gap-1 bg-gray-900/50 p-3 rounded-md">
//           <div className="flex items-center gap-2 text-sm text-gray-300">
//             <User className="h-4 w-4 text-gray-500" />
//             <span className="font-medium text-gray-200">{user.name}</span>
//           </div>
//           <div className="flex items-center gap-2 text-xs text-gray-500">
//             <Mail className="h-3 w-3 text-gray-600" />
//             <span>{user.email}</span>
//           </div>
//         </div>
//       </CardContent>

//       <CardFooter className="pt-0 border-t text-white border-gray-800/50">
//         <div className="flex items-center justify-between w-full pt-3">
//           <span className="text-sm font-medium text-gray-300">Update Status:</span>
//           <Select disabled={loading} value={currentStatus} onValueChange={handleStatusChange}>
//             <SelectTrigger className="w-[140px] bg-gray-900 border-gray-700 focus:ring-1 focus:ring-green-500 text-sm">
//               <SelectValue placeholder="Select status" />
//             </SelectTrigger>
//             <SelectContent className="bg-gray-900 border-gray-700 text-white">
//               <SelectItem value="not_started" className="focus:bg-gray-800">
//                 Not Started
//               </SelectItem>
//               <SelectItem value="in_progress" className="focus:bg-gray-800">
//                 In Progress
//               </SelectItem>
//               <SelectItem value="completed" className="focus:bg-gray-800">
//                 Completed
//               </SelectItem>
//               <SelectItem value="rejected" className="focus:bg-gray-800">
//                 Rejected
//               </SelectItem>
//             </SelectContent>
//           </Select>
//         </div>
//       </CardFooter>
//     </Card>
//   )
// }

"use client";

import { updateRequestStatus } from "@/lib/actions/updateRequestStatus";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  User,
  Mail,
  UserRoundIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

interface RequestCardProps {
  _id: string;
  requestedName: string;
  description: string;
  user: {
    name: string;
    email: string;
    is_admin: boolean;
  };
  status: "not_started" | "in_progress" | "rejected" | "completed";
}

export default function RequestCard({
  _id,
  requestedName,
  description,
  user,
  status,
}: RequestCardProps) {
  const [currentStatus, setCurrentStatus] = useState(status);
  const [loading, setLoading] = useState(false);

  const handleStatusChange = async (value: string) => {
    const newStatus = value as RequestCardProps["status"];
    setCurrentStatus(newStatus); // optimistic UI
    setLoading(true);

    const promise = updateRequestStatus({
      requestId: _id,
      status: newStatus,
    });

    toast.promise(promise, {
      loading: "Updating status...",
      success: "Status updated successfully!",
      error: (err) => {
        // Rollback UI state on failure
        setCurrentStatus(status);
        return err?.message || "Failed to update status.";
      },
    });

    try {
      const res = await promise;

      if (!res.success) {
        setCurrentStatus(status);
      }
    } catch (err) {
      setCurrentStatus(status); // rollback
    } finally {
      setLoading(false);
    }
  };

  const getStatusDetails = (status: RequestCardProps["status"]) => {
    switch (status) {
      case "not_started":
        return {
          label: "Not Started",
          icon: <Clock className="h-4 w-4" />,
          color: "bg-slate-600 hover:bg-slate-500",
        };
      case "in_progress":
        return {
          label: "In Progress",
          icon: <AlertCircle className="h-4 w-4" />,
          color: "bg-amber-600 hover:bg-amber-500",
        };
      case "completed":
        return {
          label: "Completed",
          icon: <CheckCircle className="h-4 w-4" />,
          color: "bg-green-600 hover:bg-green-500",
        };
      case "rejected":
        return {
          label: "Rejected",
          icon: <XCircle className="h-4 w-4" />,
          color: "bg-red-600 hover:bg-red-500",
        };
      default:
        return {
          label: "Unknown",
          icon: <Clock className="h-4 w-4" />,
          color: "bg-slate-600 hover:bg-slate-500",
        };
    }
  };

  const statusDetails = getStatusDetails(currentStatus);

  return (
    <Card className="border w-full border-gray-800 bg-[#080808] shadow-lg hover:shadow-xl transition-all duration-200 flex flex-col h-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-semibold text-white">{requestedName}</h3>
          <Badge
            className={cn(
              "flex items-center gap-1 px-2 py-1",
              statusDetails.color
            )}
          >
            {statusDetails.icon}
            <span>{statusDetails.label}</span>
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="pb-4 flex-grow">
        <p className="text-sm text-gray-400 mb-4">{description}</p>

        <div className="flex flex-col gap-1 bg-gray-900/50 p-3 rounded-md">
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <User className="h-4 w-4 text-gray-500" />
            <span className="font-medium text-gray-200">{user.name}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Mail className="h-3 w-3 text-gray-600" />
            <span>{user.email}</span>
          </div>
        </div>
      </CardContent>

      {user.is_admin && (
        <CardFooter className="pt-0 border-t text-white border-gray-800/50 mt-auto">
          <div className="flex items-center justify-between w-full">
            <span className="text-sm font-medium text-gray-300">
              Update Status:
            </span>
            <Select
              disabled={loading}
              value={currentStatus}
              onValueChange={handleStatusChange}
            >
              <SelectTrigger className="w-[140px] bg-gray-900 border-gray-700 focus:ring-1 focus:ring-green-500 text-sm">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-gray-700 text-white">
                <SelectItem value="not_started"  className="focus:bg-gray-800">
                  Not Started
                </SelectItem>
                <SelectItem value="in_progress" className="focus:bg-gray-800">
                  In Progress
                </SelectItem>
                <SelectItem value="completed" className="focus:bg-gray-800">
                  Completed
                </SelectItem>
                <SelectItem value="rejected" className="focus:bg-gray-800">
                  Rejected
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardFooter>
      )}
    </Card>
  );
}
