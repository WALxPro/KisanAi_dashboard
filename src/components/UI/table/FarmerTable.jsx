import {
  Pencil,
  Trash2,
  MessageSquareText,
  User,
  Eye,
  Ban,
} from "lucide-react";
import { useEffect, useState } from "react";
import { get } from "../../../api/apiClient";

const FarmerTable = ({
  farmers,
  onRowClick,
  confirmBlockToggle,
  onComplaintClick,
}) => {
  const [complaintCounts, setComplaintCounts] = useState({});
  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const data = await get("complain/admin/counts");
        setComplaintCounts(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCounts();
  }, []);
  return (
    <>
      <div className="overflow-hidden rounded-2xl border border-border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-secondary/30">
                <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Farmer
                </th>
                <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Location
                </th>
                <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Status
                </th>
                <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Crop
                </th>
                <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Joined
                </th>

                <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {farmers.map((farmer) => (
                <tr
                  key={farmer._id}
                  className="border-b border-border/50 last:border-0 hover:bg-secondary/30 transition-colors"
                >
                  <td className="px-5 py-3.5 text-sm font-semibold text-foreground flex items-center gap-3  ">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl gradient-primary shadow-sm overflow-hidden">
                      {farmer.profilePicture ? (
                        <img
                          src={farmer.profilePicture}
                          alt="Profile"
                          className="h-full w-full object-cover rounded-xl"
                        />
                      ) : (
                        <User className="h-4 w-4 text-primary-foreground" />
                      )}
                    </div>{" "}
                    <p>{farmer.fullname}</p>
                  </td>
                  <td className="px-5 py-3.5 text-sm font-semibold text-foreground">
                    {/* {farmer.cropDetail.city} */}karachi
                  </td>
                  <td className="px-5 py-3.5">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                        farmer.isBlocked
                          ? "bg-destructive/10 text-destructive"
                          : "bg-success/10 text-success"
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          farmer.isBlocked ? "bg-destructive" : "bg-success"
                        }`}
                      />

                      {farmer.isBlocked ? "Blocked" : "Active"}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-sm text-muted-foreground">
                    {/* {farmer.cropDetail.cropName} */} wheat
                  </td>
                  <td className="px-5 py-3.5 text-sm text-muted-foreground">
                    {new Date(farmer.createdAt).toLocaleDateString()}
                  </td>

                  <td className="px-5 py-3.5">
                    <div className="flex gap-1">
                      <button
                        onClick={() => onRowClick(farmer)}
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-info/10 hover:text-info transition-colors cursor-pointer"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => onComplaintClick(farmer)}
                        className="relative flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-success/10 hover:text-success transition-colors cursor-pointer"
                      >
                        <MessageSquareText className="h-4 w-4" />

                        {(complaintCounts[farmer._id] || 0) > 0 && (
                          <span className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
                            {complaintCounts[farmer._id]}
                          </span>
                        )}
                      </button>
                      <button
                        onClick={() => confirmBlockToggle(farmer)}
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors cursor-pointer"
                      >
                        <Ban className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
export default FarmerTable;
