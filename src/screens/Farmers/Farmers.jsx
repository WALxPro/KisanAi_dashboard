import { useEffect, useState } from "react";

import useFarmer from "../../hooks/useFarmer";
import {
  ContentLoader,
  EmptyState,
  DashboardText,
  Searchbar,
  ConfirmModal,
} from "../../components";
import FarmerTable from "../../components/UI/table/FarmerTable";
import FarmerModal from "../../components/UI/modal/FarmerModal";
import ComplaintModal from "../../components/UI/modal/ComplaintModal";

const Farmers = () => {
  const [farmers, setFarmers] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedFarmer, setSelectedFarmer] = useState(null);
  const [farmerModalOpen, setFarmerModalOpen] = useState(false);
  const [complaintModalOpen, setComplaintModalOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedFarmerForBlock, setSelectedFarmerForBlock] = useState(null);

  const filteredFarmer = farmers.filter((farmer) =>
    farmer.fullname.toLowerCase().includes(search.toLowerCase()),
  );
  const { getFarmers, blockFarmer, unblockFarmer, loading, error } = useFarmer();
  const handleRowClick = (farmer) => {
    setSelectedFarmer(farmer);
    setFarmerModalOpen(true);
  };
  const handleComplaintClick = (farmer) => {
    setSelectedFarmer(farmer);
    setComplaintModalOpen(true);
  };
  const handleBlockClick = (farmer) => {
    setSelectedFarmerForBlock(farmer);
    setConfirmOpen(true);
  };
  const confirmBlockToggle = async () => {
    if (!selectedFarmerForBlock) return;

    const farmer = selectedFarmerForBlock;

    try {
      if (farmer.isBlocked) {
        // Unblock the farmer
        await unblockFarmer(farmer.email);
      } else {
        // Block the farmer
        await blockFarmer(farmer.email);
      }

      setFarmers((prev) =>
        prev.map((f) =>
          f.email === farmer.email ? { ...f, isBlocked: !f.isBlocked } : f,
        ),
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
          onComplaintClick={handleComplaintClick}
          confirmBlockToggle={handleBlockClick}
        />
      )}
      <FarmerModal
        open={farmerModalOpen}
        onClose={() => setFarmerModalOpen(false)}
        farmer={selectedFarmer}
      />
      <ComplaintModal
        open={complaintModalOpen}
        onClose={() => setComplaintModalOpen(false)}
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
          selectedFarmerForBlock?.isBlocked ? "Unblock Farmer" : "Block Farmer"
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
