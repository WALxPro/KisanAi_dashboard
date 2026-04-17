import { useEffect, useState } from "react";

import useFarmer from "../../hooks/useFarmer";
import { ContentLoader, EmptyState, DashboardText, Searchbar, ConfirmModal } from "../../components";
import FarmerTable from "../../components/UI/table/FarmerTable";
import FarmerModal from "../../components/UI/modal/FarmerModal";

const Farmers = () => {
  const [farmers, setFarmers] = useState([]);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedFarmer, setSelectedFarmer] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
const [selectedFarmerForBlock, setSelectedFarmerForBlock] = useState(null);
  const filteredFarmer = farmers.filter((farmer) =>
    farmer.fullname.toLowerCase().includes(search.toLowerCase()),
  );
  const { getFarmers, updateFarmer, loading, error } = useFarmer();
  const handleRowClick = (farmer) => {
    setSelectedFarmer(farmer);
    setModalOpen(true);
  };
  const handleBlockClick = (farmer) => {
  setSelectedFarmerForBlock(farmer);
  setConfirmOpen(true);
};
const confirmBlockToggle = async () => {
  if (!selectedFarmerForBlock) return;

  const farmer = selectedFarmerForBlock;

  try {
    await updateFarmer(farmer.email, {
      isBlocked: !farmer.isBlocked,
    });

    setFarmers((prev) =>
      prev.map((f) =>
        f.email === farmer.email
          ? { ...f, isBlocked: !f.isBlocked }
          : f
      )
    );

  } catch (err) {
    console.error(err);
  } finally {
    setConfirmOpen(false);
    setSelectedFarmerForBlock(null);
  }
};
  const fetchFarmers = async () => {
    try {
      const data = await getFarmers();
      setFarmers(data);
    } catch (err) {
      console.error("Failed to fetch farmers:", err);
    }
  };

  useEffect(() => {
    fetchFarmers();
  }, []);

  console.log(farmers);

  return (
    <div className="space-y-6">
      <DashboardText
        text="Farmers"
        para="Manage farmers registered from the mobile app."
      />
      <Searchbar
        searchValue={search}
        onSearchChange={setSearch}
        ads={farmers}

      />

      {loading ? (
        <ContentLoader variant="table" count={6} columns={4} />
      ) : filteredFarmer.length === 0 ? (
        <EmptyState
          title="No Farmers Found"
          description="No farmers registered yet."
        />
      ) : (
        <FarmerTable
  farmers={filteredFarmer}
  onRowClick={handleRowClick}
  confirmBlockToggle={handleBlockClick}
/>
      )}
      <FarmerModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}

        farmer={selectedFarmer}
      />

      <ConfirmModal
  open={confirmOpen}
  onClose={() => {
    setConfirmOpen(false);
    setSelectedFarmerForBlock(null);
  }}
  onConfirm={confirmBlockToggle}
  title={
    selectedFarmerForBlock?.isBlocked
      ? "Unblock Farmer"
      : "Block Farmer"
  }
  message={
    selectedFarmerForBlock?.isBlocked
      ? "Are you sure you want to unblock this farmer?"
      : "Are you sure you want to block this farmer?"
  }
  confirmText="Yes, Continue"
  cancelText="Cancel"
  variant="danger"
/>
    </div>
  );
};

export default Farmers;

const FarmerQuerry = () => {
  return(
      <>
          <div className="fixed inset-0 z-50 bg-foreground/40 backdrop-blur-sm" onClick={() => setQueryFarmer(null)} />
          <div className="fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 animate-scale-in overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
            <div className="flex items-center justify-between border-b border-border p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-xs font-bold text-primary-foreground shadow-sm">{queryFarmer.avatar}</div>
                <div>
                  <h2 className="text-lg font-bold text-foreground">{queryFarmer.name}'s Queries</h2>
                  <p className="text-xs text-muted-foreground">{queryFarmer.queries.length} total queries</p>
                </div>
              </div>
              <button onClick={() => setQueryFarmer(null)} className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-secondary transition-colors"><X className="h-4 w-4" /></button>
            </div>
            <div className="max-h-[400px] overflow-y-auto p-5 space-y-3">
              {queryFarmer.queries.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <MessageSquareText className="h-12 w-12 text-muted-foreground/20 mb-3" />
                  <p className="text-sm font-medium text-muted-foreground">No queries yet</p>
                  <p className="text-xs text-muted-foreground/60">This farmer hasn't submitted any queries.</p>
                </div>
              ) : (
                queryFarmer.queries.map((q) => (
                  <div key={q.id} className="rounded-xl border border-border/50 bg-secondary/30 p-4 space-y-2 transition-colors hover:bg-secondary/50">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-sm font-semibold text-foreground">{q.subject}</h3>
                      <span className={`shrink-0 inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${q.status === "Pending" ? "bg-warning/10 text-warning" : "bg-success/10 text-success"}`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${q.status === "Pending" ? "bg-warning" : "bg-success"}`} />{q.status}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{q.message}</p>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground/60">
                      <Clock className="h-3 w-3" /> {q.date}
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="border-t border-border p-4 flex justify-end">
              <button onClick={() => setQueryFarmer(null)} className="rounded-lg border border-border bg-secondary/50 px-5 py-2 text-sm font-medium text-foreground hover:bg-secondary transition-colors">Close</button>
            </div>
          </div>
        </>
  )
}