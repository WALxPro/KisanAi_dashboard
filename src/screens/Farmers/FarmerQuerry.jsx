import { useState } from "react";
import { Search, Eye, Ban, CheckCircle, X, Users, Mail, Phone, MapPin, Calendar, Shield, ShieldOff, MessageSquareText, Clock, CheckCircle2, ChevronRight, XCircle, StickyNote } from "lucide-react";
import Button from "@/components/Button";
import Input from "@/components/Input";
import ConfirmModal from "@/components/ConfirmModal";
import DataPagination from "@/components/DataPagination";

export const STATUS_CONFIG = {
  Pending:     { bg: "#fffbeb", text: "#b45309", dot: "#f59e0b" },
  "In Review": { bg: "#eff6ff", text: "#1d4ed8", dot: "#3b82f6" },
  Resolved:    { bg: "#f0fdf4", text: "#15803d", dot: "#22c55e" },
  Rejected:    { bg: "#fef2f2", text: "#b91c1c", dot: "#ef4444" },
};

const StatusBadge = ({ status }) => {
  const s = STATUS_CONFIG[status] || STATUS_CONFIG.Pending;
  return (
    <span className="shrink-0 inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold" style={{ background: s.bg, color: s.text }}>
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: s.dot }} />{status}
    </span>
  );
};

const farmersData = [
  { id: 1, name: "Ahmad Khan", email: "ahmad@email.com", phone: "+92 300 1234567", location: "Lahore", status: "Active", crops: "Wheat, Rice", joined: "Jan 15, 2024", avatar: "AK", totalOrders: 24, totalSpent: "$3,200", queries: [
    { id: 101, subject: "Fertilizer Delivery Late", message: "Maine 5 din pehle fertilizer order kiya tha lekin abhi tak delivery nahi aayi. Please check karein.", date: "Feb 10, 2024", status: "Pending" },
    { id: 102, subject: "Payment Issue", message: "Mera payment deduct ho gaya lekin order confirm nahi hua. Transaction ID: TXN8834.", date: "Jan 28, 2024", status: "Resolved" },
  ]},
  { id: 2, name: "Sara Ali", email: "sara@email.com", phone: "+92 301 2345678", location: "Faisalabad", status: "Active", crops: "Cotton, Sugarcane", joined: "Feb 20, 2024", avatar: "SA", totalOrders: 18, totalSpent: "$2,450", queries: [
    { id: 201, subject: "Wrong Product Received", message: "Maine cotton seeds order kiye the lekin mujhe wheat seeds mil gaye. Please replace karein.", date: "Mar 5, 2024", status: "Pending" },
  ]},
  { id: 3, name: "Bilal Ahmed", email: "bilal@email.com", phone: "+92 302 3456789", location: "Multan", status: "Blocked", crops: "Mango, Citrus", joined: "Mar 10, 2024", avatar: "BA", totalOrders: 7, totalSpent: "$980", queries: [] },
  { id: 4, name: "Fatima Noor", email: "fatima@email.com", phone: "+92 303 4567890", location: "Karachi", status: "Active", crops: "Vegetables", joined: "Apr 5, 2024", avatar: "FN", totalOrders: 32, totalSpent: "$4,100", queries: [
    { id: 401, subject: "App Crash on Checkout", message: "Jab bhi main checkout pe jaati hoon app crash ho jata hai. Phone: Samsung A52, Android 13.", date: "Apr 18, 2024", status: "Resolved" },
    { id: 402, subject: "Discount Code Not Working", message: "WELCOME20 code apply nahi ho raha. Error aa raha hai 'Invalid Code'.", date: "May 2, 2024", status: "Pending" },
    { id: 403, subject: "Need Bulk Order Option", message: "Kya aap bulk order ka option add kar sakte hain? Mujhe 500kg+ vegetables order karna hai monthly.", date: "May 10, 2024", status: "Pending" },
  ]},
  { id: 5, name: "Usman Tariq", email: "usman@email.com", phone: "+92 304 5678901", location: "Islamabad", status: "Active", crops: "Wheat, Corn", joined: "May 12, 2024", avatar: "UT", totalOrders: 15, totalSpent: "$1,800", queries: [
    { id: 501, subject: "Delivery Area Issue", message: "Mera area delivery zone mein nahi aa raha. Location: Tarlai, Islamabad. Please add karein.", date: "Jun 1, 2024", status: "Resolved" },
  ]},
  { id: 6, name: "Ayesha Malik", email: "ayesha@email.com", phone: "+92 305 6789012", location: "Rawalpindi", status: "Active", crops: "Rice, Lentils", joined: "Jun 18, 2024", avatar: "AM", totalOrders: 21, totalSpent: "$2,750", queries: [] },
];

const ITEMS_PER_PAGE = 5;

const Farmers = () => {
  const [search, setSearch] = useState("");
  const [farmers, setFarmers] = useState(farmersData);
  const [selectedFarmer, setSelectedFarmer] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmTarget, setConfirmTarget] = useState(null);
  const [page, setPage] = useState(1);
  const [queryFarmer, setQueryFarmer] = useState(null); // "Resolved" | "Rejected" | null

  const filtered = farmers.filter(
    (f) => f.name.toLowerCase().includes(search.toLowerCase()) || f.email.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const toggleBlock = (id) => {
    setFarmers((prev) => prev.map((f) => f.id === id ? { ...f, status: f.status === "Active" ? "Blocked" : "Active" } : f));
    if (selectedFarmer && selectedFarmer.id === id) {
      setSelectedFarmer({ ...selectedFarmer, status: selectedFarmer.status === "Active" ? "Blocked" : "Active" });
    }
  };

  const askConfirmBlock = (farmer) => { setConfirmTarget(farmer); setConfirmOpen(true); };

  const patchQuery = (patch) => {
    if (!selectedQuery || !queryFarmer) return;
    setFarmers((prev) => prev.map((f) => f.id === queryFarmer.id ? {
      ...f,
      queries: f.queries.map((q) => q.id === selectedQuery.id ? { ...q, ...patch } : q),
    } : f));
    setQueryFarmer((prev) => prev ? {
      ...prev,
      queries: prev.queries.map((q) => q.id === selectedQuery.id ? { ...q, ...patch } : q),
    } : prev);
    setSelectedQuery((prev) => prev ? { ...prev, ...patch } : prev);
  };

  // Auto-advance Pending → In Review when admin opens a query
  const openQuery = (q) => {
    setAdminNote(q.adminNote || "");
    setSelectedQuery(q);
    if (q.status === "Pending") {
      setTimeout(() => {
        setFarmers((prev) => prev.map((f) => f.id === queryFarmer.id ? {
          ...f,
          queries: f.queries.map((qq) => qq.id === q.id ? { ...qq, status: "In Review" } : qq),
        } : f));
        setQueryFarmer((prev) => prev ? {
          ...prev,
          queries: prev.queries.map((qq) => qq.id === q.id ? { ...qq, status: "In Review" } : qq),
        } : prev);
        setSelectedQuery((prev) => prev && prev.id === q.id ? { ...prev, status: "In Review" } : prev);
      }, 0);
    }
  };

  const finalizeQuery = (newStatus) => {
    const note = adminNote.trim();
    patchQuery({ status: newStatus, adminNote: note, resolvedAt: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) });
    setActionConfirm(null);
  };


  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Farmers</h1>
        <p className="text-muted-foreground">Manage farmers registered from the mobile app.</p>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative max-w-sm flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search farmers..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} className="pl-10" />
        </div>
        <div className="flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5">
          <Users className="h-4 w-4 text-primary" />
          <span className="text-sm font-semibold text-foreground">{farmers.length}</span>
          <span className="text-xs text-muted-foreground">Total</span>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-secondary/30">
                <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Farmer</th>
                <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Location</th>
                <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Status</th>
                <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Joined</th>
                <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((farmer) => (
                <tr key={farmer.id} className="border-b border-border/50 last:border-0 hover:bg-secondary/30 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-xs font-bold text-primary-foreground shadow-sm">{farmer.avatar}</div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">{farmer.name}</p>
                        <p className="text-xs text-muted-foreground">{farmer.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground"><MapPin className="h-3.5 w-3.5" /> {farmer.location}</div>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${farmer.status === "Active" ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"}`}>
                      <span className={`h-1.5 w-1.5 rounded-full ${farmer.status === "Active" ? "bg-success" : "bg-destructive"}`} />{farmer.status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-sm text-muted-foreground">{farmer.joined}</td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1">
                      <button onClick={() => { setSelectedFarmer(farmer); setModalOpen(true); }} className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-info/10 hover:text-info transition-colors" title="View"><Eye className="h-4 w-4" /></button>
                      <button onClick={() => setQueryFarmer(farmer)} className="relative flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-warning/10 hover:text-warning transition-colors" title="Queries">
                        <MessageSquareText className="h-4 w-4" />
                        {farmer.queries.length > 0 && (
                          <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-warning text-[10px] font-bold text-warning-foreground">{farmer.queries.length}</span>
                        )}
                      </button>
                      <button onClick={() => askConfirmBlock(farmer)} className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors ${farmer.status === "Active" ? "text-muted-foreground hover:bg-destructive/10 hover:text-destructive" : "text-muted-foreground hover:bg-success/10 hover:text-success"}`} title={farmer.status === "Active" ? "Block" : "Unblock"}>
                        {farmer.status === "Active" ? <Ban className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <DataPagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />

      {modalOpen && selectedFarmer && (
        <>
          <div className="fixed inset-0 z-50 bg-foreground/40 backdrop-blur-sm" onClick={() => setModalOpen(false)} />
          <div className="fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 animate-scale-in overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
            <div className="relative h-32 gradient-primary">
              <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 30% 50%, white 0%, transparent 60%)" }} />
              <button onClick={() => setModalOpen(false)} className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/30 transition-colors backdrop-blur-sm"><X className="h-4 w-4" /></button>
              <div className="absolute left-6 top-4">
                <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold backdrop-blur-sm ${selectedFarmer.status === "Active" ? "bg-success/20 text-success-foreground" : "bg-destructive/20 text-destructive-foreground"}`}>
                  <span className={`h-1.5 w-1.5 rounded-full ${selectedFarmer.status === "Active" ? "bg-success-foreground" : "bg-destructive-foreground"}`} />{selectedFarmer.status}
                </span>
              </div>
            </div>
            <div className="relative px-6 pb-6">
              <div className="-mt-14 mb-4 flex items-end gap-4">
                <div className="flex h-[88px] w-[88px] items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent text-2xl font-bold text-primary-foreground shadow-lg ring-4 ring-card">{selectedFarmer.avatar}</div>
                <div className="pb-1">
                  <h2 className="text-xl font-bold text-foreground">{selectedFarmer.name}</h2>
                  <p className="text-sm text-muted-foreground">{selectedFarmer.crops}</p>
                </div>
              </div>
              <div className="mb-5 grid grid-cols-3 gap-3">
                <div className="rounded-xl bg-secondary/60 p-3 text-center">
                  <p className="text-lg font-bold text-foreground">{selectedFarmer.totalOrders}</p>
                  <p className="text-xs text-muted-foreground">Orders</p>
                </div>
                <div className="rounded-xl bg-secondary/60 p-3 text-center">
                  <p className="text-lg font-bold text-foreground">{selectedFarmer.totalSpent}</p>
                  <p className="text-xs text-muted-foreground">Total Spent</p>
                </div>
                <div className="rounded-xl bg-secondary/60 p-3 text-center">
                  <p className="text-lg font-bold text-foreground">{selectedFarmer.crops.split(",").length}</p>
                  <p className="text-xs text-muted-foreground">Crops</p>
                </div>
              </div>
              <div className="space-y-2.5">
                <div className="flex items-center gap-3 rounded-xl border border-border/50 bg-secondary/30 p-3.5 transition-colors hover:bg-secondary/50">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-info/10"><Mail className="h-4 w-4 text-info" /></div>
                  <div><p className="text-[11px] uppercase tracking-wider text-muted-foreground">Email</p><p className="text-sm font-medium text-foreground">{selectedFarmer.email}</p></div>
                </div>
                <div className="flex items-center gap-3 rounded-xl border border-border/50 bg-secondary/30 p-3.5 transition-colors hover:bg-secondary/50">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-success/10"><Phone className="h-4 w-4 text-success" /></div>
                  <div><p className="text-[11px] uppercase tracking-wider text-muted-foreground">Phone</p><p className="text-sm font-medium text-foreground">{selectedFarmer.phone}</p></div>
                </div>
                <div className="flex items-center gap-3 rounded-xl border border-border/50 bg-secondary/30 p-3.5 transition-colors hover:bg-secondary/50">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-warning/10"><MapPin className="h-4 w-4 text-warning" /></div>
                  <div><p className="text-[11px] uppercase tracking-wider text-muted-foreground">Location</p><p className="text-sm font-medium text-foreground">{selectedFarmer.location}</p></div>
                </div>
                <div className="flex items-center gap-3 rounded-xl border border-border/50 bg-secondary/30 p-3.5 transition-colors hover:bg-secondary/50">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10"><Calendar className="h-4 w-4 text-primary" /></div>
                  <div><p className="text-[11px] uppercase tracking-wider text-muted-foreground">Joined</p><p className="text-sm font-medium text-foreground">{selectedFarmer.joined}</p></div>
                </div>
              </div>
              <div className="mt-6 flex gap-3">
                <button onClick={() => askConfirmBlock(selectedFarmer)} className={`flex flex-1 items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold transition-all ${selectedFarmer.status === "Active" ? "bg-destructive/10 text-destructive hover:bg-destructive hover:text-destructive-foreground" : "bg-success/10 text-success hover:bg-success hover:text-success-foreground"}`}>
                  {selectedFarmer.status === "Active" ? <><ShieldOff className="h-4 w-4" /> Block Farmer</> : <><Shield className="h-4 w-4" /> Unblock Farmer</>}
                </button>
                <Button variant="outline" onClick={() => setModalOpen(false)} className="flex-1">Close</Button>
              </div>
            </div>
          </div>
        </>
      )}

      {queryFarmer && (
        <>
          
        </>
      )}

      {selectedQuery && (
        <>
          <div className="fixed inset-0 z-[55] bg-foreground/50 backdrop-blur-sm" onClick={() => setSelectedQuery(null)} />
          <div className="fixed left-1/2 top-1/2 z-[55] w-full max-w-md -translate-x-1/2 -translate-y-1/2 animate-scale-in overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
            <div className="flex items-start justify-between gap-3 border-b border-border p-5">
              <div className="flex-1">
                <div className="mb-2"><StatusBadge status={selectedQuery.status} /></div>
                <h2 className="text-base font-bold text-foreground leading-snug">{selectedQuery.subject}</h2>
                <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground"><Clock className="h-3 w-3" /> {selectedQuery.date}</div>
              </div>
              <button onClick={() => setSelectedQuery(null)} className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-secondary transition-colors"><X className="h-4 w-4" /></button>
            </div>
            <div className="p-5 space-y-4 max-h-[60vh] overflow-y-auto">
              <div className="rounded-xl border border-border/50 bg-secondary/30 p-4">
                <p className="text-[11px] uppercase tracking-wider text-muted-foreground mb-1.5">Message</p>
                <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">{selectedQuery.message}</p>
              </div>
              <div className="flex items-center gap-3 rounded-xl border border-border/50 bg-secondary/30 p-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-[11px] font-bold text-primary-foreground">{queryFarmer?.avatar}</div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{queryFarmer?.name}</p>
                  <p className="text-xs text-muted-foreground">{queryFarmer?.email}</p>
                </div>
              </div>

              {(selectedQuery.status === "Resolved" || selectedQuery.status === "Rejected") && selectedQuery.adminNote ? (
                <div className="rounded-xl border border-border/50 bg-primary/5 p-4">
                  <p className="text-[11px] uppercase tracking-wider text-muted-foreground mb-1.5 flex items-center gap-1.5"><StickyNote className="h-3 w-3" /> Admin Note · sent to farmer</p>
                  <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">{selectedQuery.adminNote}</p>
                </div>
              ) : selectedQuery.status === "In Review" ? (
                <div>
                  <label className="text-[11px] uppercase tracking-wider text-muted-foreground mb-1.5 flex items-center gap-1.5"><StickyNote className="h-3 w-3" /> Note to Farmer <span className="text-destructive">*</span></label>
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
              <button onClick={() => setSelectedQuery(null)} className="flex-1 rounded-lg border border-border bg-secondary/50 px-4 py-2.5 text-sm font-medium text-foreground hover:bg-secondary transition-colors">Close</button>
              {selectedQuery.status === "In Review" && (
                <>
                  <button
                    disabled={!adminNote.trim()}
                    onClick={() => setActionConfirm("Rejected")}
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-destructive px-4 py-2.5 text-sm font-semibold text-destructive-foreground hover:bg-destructive/90 shadow-lg shadow-destructive/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
                  >
                    <XCircle className="h-4 w-4" /> Reject
                  </button>
                  <button
                    disabled={!adminNote.trim()}
                    onClick={() => setActionConfirm("Resolved")}
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-success px-4 py-2.5 text-sm font-semibold text-success-foreground hover:bg-success/90 shadow-lg shadow-success/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
                  >
                    <CheckCircle2 className="h-4 w-4" /> Resolve
                  </button>
                </>
              )}
            </div>
          </div>
        </>
      )}

      <ConfirmModal
        open={!!actionConfirm}
        onClose={() => setActionConfirm(null)}
        onConfirm={() => finalizeQuery(actionConfirm)}
        title={actionConfirm === "Resolved" ? "Mark Query as Resolved?" : "Reject this Query?"}
        message={actionConfirm === "Resolved"
          ? `The farmer will be notified that "${selectedQuery?.subject}" is resolved along with your note.`
          : `The farmer will be notified that "${selectedQuery?.subject}" was rejected along with your note.`}
        confirmText={actionConfirm === "Resolved" ? "Yes, Resolve" : "Yes, Reject"}
        cancelText="Cancel"
        variant={actionConfirm === "Resolved" ? "info" : "danger"}
      />


      <ConfirmModal open={confirmOpen} onClose={() => setConfirmOpen(false)} onConfirm={() => { if (confirmTarget) toggleBlock(confirmTarget.id); }} title={confirmTarget?.status === "Active" ? "Block Farmer?" : "Unblock Farmer?"} message={confirmTarget?.status === "Active" ? `Are you sure you want to block ${confirmTarget?.name}? They won't be able to access the app.` : `Are you sure you want to unblock ${confirmTarget?.name}? They will regain full access.`} confirmText={confirmTarget?.status === "Active" ? "Yes, Block" : "Yes, Unblock"} variant={confirmTarget?.status === "Active" ? "danger" : "info"} />
    </div>
  );
};

export default Farmers;

