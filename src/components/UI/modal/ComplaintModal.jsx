import React, { useEffect, useState } from "react";
import {
  X,
  Clock,
  ChevronRight,
  MessageSquareText,
  StickyNote,
  XCircle,
  CheckCircle2,
} from "lucide-react";
import useComplaints from "../../../hooks/useCompalint";
import { put, get } from "../../../api/apiClient";

export const STATUS_CONFIG = {
  Pending: { bg: "#fffbeb", text: "#b45309", dot: "#f59e0b" },
  "In Review": { bg: "#eff6ff", text: "#1d4ed8", dot: "#3b82f6" },
  Resolved: { bg: "#f0fdf4", text: "#15803d", dot: "#22c55e" },
  Rejected: { bg: "#fef2f2", text: "#b91c1c", dot: "#ef4444" },
};

const StatusBadge = ({ status }) => {
  const s = STATUS_CONFIG[status] || STATUS_CONFIG.Pending;
  return (
    <span
      className="shrink-0 inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold"
      style={{ background: s.bg, color: s.text }}
    >
      <span
        className="h-1.5 w-1.5 rounded-full"
        style={{ background: s.dot }}
      />
      {status}
    </span>
  );
};

const ComplaintModal = ({ open, onClose, farmer }) => {
  const farmerId = farmer?._id;

  const [adminNote, setAdminNote] = useState("");
  const [actionConfirm, setActionConfirm] = useState(null);
  const [selectedQuery, setSelectedQuery] = useState(null);
  const [complaints, setComplaints] = useState([]);

  const { getComplaintsByFarmer, loading, error } = useComplaints();

  const fetchComplaints = async () => {
    try {
      const data = await getComplaintsByFarmer(farmerId);
      setComplaints(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleOpenComplaint = async (item) => {
    setSelectedQuery(item); // modal open immediately

    if (item.status === "Pending") {
      try {
        const res = await put(`complain/admin/update/${item._id}`, {
          status: "In Review",
          note: "",
        });

        // UI update in list
        setComplaints((prev) =>
          prev.map((c) =>
            c._id === item._id ? { ...c, status: "In Review" } : c,
          ),
        );

        // IMPORTANT: selectedQuery ko bhi update karo
        setSelectedQuery((prev) =>
          prev?._id === item._id ? { ...prev, status: "In Review" } : prev,
        );
      } catch (err) {
        console.error(err);
      }
    }
  };
  const handleStatusUpdate = async (status) => {
    try {
      await put(`complain/admin/update/${selectedQuery._id}`, {
        status,
        note: adminNote,
      });

      setSelectedQuery((prev) => ({
        ...prev,
        status,
        note: adminNote,
      }));

      setComplaints((prev) =>
        prev.map((c) =>
          c._id === selectedQuery._id ? { ...c, status, note: adminNote } : c,
        ),
      );

      setAdminNote("");
    } catch (err) {
      console.error(err);
    }
  };
  const handleCloseSelected = () => {
    setSelectedQuery(null);
    onClose(); // 👈 THIS closes ComplaintModal too
  };
  useEffect(() => {
    if (open && farmerId) {
      fetchComplaints();
    }
  }, [open, farmerId]);
  console.log(farmerId, "farmerId");
  console.log(complaints, "complaints");
  console.log(selectedQuery, "selectedQuery");
  console.log(adminNote, "adminNote");

  if (!open || !farmer) return null;

  return (
    <>
      <div
        className="fixed top-0 left-0 z-50 w-full h-screen bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
        <div className="flex items-center justify-between border-b border-border p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent text-3xl font-bold text-primary-foreground shadow-lg ring-4 ring-card overflow-hidden">
              {farmer.profilePicture ? (
                <img
                  src={farmer.profilePicture}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="h-10 w-10" />
              )}
            </div>
            <div>
              <h2 className="text-lg font-bold text-foreground">
                {farmer.fullname}'s Queries
              </h2>
              <p className="text-xs text-muted-foreground">
                {complaints.length} total queries
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="cursor-pointer flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-secondary transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Complaints */}
        <div className="max-h-[400px] overflow-y-auto p-5 space-y-3">
          {complaints.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <MessageSquareText className="h-12 w-12 text-muted-foreground/20 mb-3" />

              <p className="text-sm font-medium text-muted-foreground">
                No complaints found
              </p>
            </div>
          ) : (
            complaints.map((item, key) => (
              <button
                key={key}
                className="cursor-pointer w-full text-left rounded-xl border border-border/50 bg-secondary/30 p-4 space-y-2 hover:bg-secondary/60"
                onClick={() => handleOpenComplaint(item)}
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-sm font-semibold text-foreground">
                    {item.title}
                  </h3>

                  <span className="rounded-full bg-yellow-100 px-2 py-1 text-[10px] font-semibold text-yellow-700">
                    {item.status}
                  </span>
                </div>

                <p className="text-sm text-muted-foreground line-clamp-2">
                  {item.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {item.created_at?.split("T")[0]}
                  </div>

                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </div>
              </button>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-border p-4 flex justify-end">
          <button
            onClick={onClose}
            className="cursor-pointer rounded-lg border border-border bg-secondary/50 px-5 py-2 text-sm font-medium"
          >
            Close
          </button>
        </div>
      </div>
      {selectedQuery && (
        <SelectedQuery
          selectedQuery={selectedQuery}
          onClose={handleCloseSelected}
          farmer={farmer}
          adminNote={adminNote}
          setAdminNote={setAdminNote}
          actionConfirm={actionConfirm}
          setActionConfirm={setActionConfirm}
          handleStatusUpdate={handleStatusUpdate}
        />
      )}
    </>
  );
};

export default ComplaintModal;

const SelectedQuery = ({
  selectedQuery,
  onClose,
  farmer,
  adminNote,
  actionConfirm,
  setActionConfirm,
  setAdminNote,
  handleStatusUpdate,
}) => {
  return (
    <>
      <div
        className="fixed top-0 left-0 z-[55] w-full h-screen bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="fixed left-1/2 top-1/2 z-[55] w-full max-w-md -translate-x-1/2 -translate-y-1/2 animate-scale-in overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
        <div className="flex items-start justify-between gap-3 border-b border-border p-5">
          <div className="flex-1">
            <div className="mb-2">
              <StatusBadge status={selectedQuery.status} />
            </div>
            <h2 className="text-base font-bold text-foreground leading-snug">
              {selectedQuery.title}
            </h2>
            <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />  {selectedQuery.created_at?.split("T")[0]}
            </div>
          </div>
          <button
            onClick={onClose}
            className="cursor-pointer flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-secondary transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="p-5 space-y-4 max-h-[60vh] overflow-y-auto">
          <div className="rounded-xl border border-border/50 bg-secondary/30 p-4">
            <p className="text-[11px] uppercase tracking-wider text-muted-foreground mb-1.5">
              Message
            </p>
            <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">
              {selectedQuery.description}
            </p>
          </div>
          <div className="flex items-center gap-3 rounded-xl border border-border/50 bg-secondary/30 p-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent text-3xl font-bold text-primary-foreground shadow-lg ring-4 ring-card overflow-hidden">
              {farmer.profilePicture ? (
                <img
                  src={farmer.profilePicture}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="h-10 w-10" />
              )}
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">
                {farmer?.fullname}
              </p>
              <p className="text-xs text-muted-foreground">{farmer?.email}</p>
            </div>
          </div>

          {(selectedQuery.status === "Resolved" ||
            selectedQuery.status === "Rejected") &&
          selectedQuery.note ? (
            <div className="rounded-xl border border-border/50 bg-primary/5 p-4">
              <p className="text-[11px] uppercase tracking-wider text-muted-foreground mb-1.5 flex items-center gap-1.5">
                <StickyNote className="h-3 w-3" /> Admin Note · sent to farmer
              </p>
              <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">
                {selectedQuery.note}
              </p>
            </div>
          ) : selectedQuery.status === "In Review" ? (
            <div>
              <label className="text-[11px] uppercase tracking-wider text-muted-foreground mb-1.5 flex items-center gap-1.5">
                <StickyNote className="h-3 w-3" /> Note to Farmer{" "}
                <span className="text-destructive">*</span>
              </label>
              <textarea
                value={adminNote}
                onChange={(e) => setAdminNote(e.target.value)}
                rows={3}
                placeholder="Write a short note that will be sent to the farmer..."
                className="w-full rounded-xl border border-border bg-background p-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
          ) : null}
        </div>
        <div className="border-t border-border p-4 flex gap-3">
          <button
            onClick={onClose}
            className="cursor-pointer flex-1 rounded-lg border border-border bg-secondary/50 px-4 py-2.5 text-sm font-medium text-foreground hover:bg-secondary transition-colors"
          >
            Close
          </button>
          {selectedQuery.status === "In Review" && (
            <>
              <button
                disabled={!adminNote.trim()}
                onClick={() => handleStatusUpdate("Rejected")}
                className="cursor-pointer flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-destructive px-4 py-2.5 text-sm font-semibold text-destructive-foreground hover:bg-destructive/90 shadow-lg shadow-destructive/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
              >
                <XCircle className="h-4 w-4" /> Reject
              </button>
              <button
                disabled={!adminNote.trim()}
                onClick={() => handleStatusUpdate("Resolved")}
                className=" cursor-pointer flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-success px-4 py-2.5 text-sm font-semibold text-destructive-foreground hover:bg-success/90 shadow-lg shadow-success/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
              >
                <CheckCircle2 className="h-4 w-4" /> Resolve
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};
