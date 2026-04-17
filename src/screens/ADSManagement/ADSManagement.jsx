import { useEffect, useState } from "react";
import { adSchema } from "../../services/validation/adSchema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useAds from "../../hooks/useAds";
import { uploadToCloudinary } from "../../services/Cloudnairy/uploadImage";
import {
  AdCard,
  AdsModal,
  AdTable,
  ConfirmModal,
  ContentLoader,
  DashboardText,
  EmptyState,
  Searchbar,
} from "../../components";


const AdsManagement = () => {
  const [search, setSearch] = useState("");
  const [ads, setAds] = useState([]);
  const [formOpen, setFormOpen] = useState(false);
  const [editingAd, setEditingAd] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState({ open: false, id: null });
  const [activeTab, setActiveTab] = useState("cards");
  const filteredAds = ads.filter((ad) =>
    ad.title.toLowerCase().includes(search.toLowerCase()),
  );
  const { loading, error, CreateAds, getAds, updateAd, deleteAd } = useAds();
  const active = ads.filter((a) => a.status === "Active").length;
  const inactive = ads.filter((a) => a.status === "Inactive").length;
  const action1 = `${active} Active`;
  const action2 = `${inactive} Inactive`;
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(adSchema),
    defaultValues: {
      title: "",
      description: "",
      image: null,
      status: "Active",
    },
  });
  const openAdd = () => {
    setEditingAd(null);
    reset({
      title: "",
      description: "",
      image: null,
      status: "Active",
    });
    setFormOpen(true);
  };
  const openEdit = (ad) => {
    setEditingAd(ad);

    reset({
      title: ad.title,
      description: ad.description,
      image: ad.image,
      status: ad.status,
    });

    setFormOpen(true);
  };
  const handleSave = async (data) => {
    try {
      const imageUrl =
        typeof data.image === "object"
          ? await uploadToCloudinary(data.image)
          : data.image;

      if (editingAd?._id) {
        await updateAd(editingAd._id, { ...data, image: imageUrl });
      } else {
        await CreateAds({ ...data, image: imageUrl });
      }

      // Refetch fresh ads from backend
      fetchAdsData();

      reset();
      setFormOpen(false);
    } catch (error) {
      console.error("Failed to save ad:", error);
    }
  };
  const handleDelete = async (id) => {
    try {
      await deleteAd(id);
      fetchAdsData();
      setDeleteConfirm({ open: false, id: null });
    } catch (error) {
      console.error("Failed to delete ad:", error);
    }
  };
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  const fetchAdsData = async () => {
    try {
      const data = await getAds();
      setAds(data);
    } catch (err) {
      console.error("Failed to fetch ads:", err);
    }
  };
  useEffect(() => {
    fetchAdsData();
  },[]);
  return (
    <div className="space-y-6">
      <DashboardText
        text="ADS Management"
        para="Create and manage advertisements."
        openAdd={openAdd}
      />
      <Searchbar
        searchValue={search}
        onSearchChange={setSearch}
        activeTab={activeTab}
        onTabChange={handleTabChange}
        ads={ads}
        action1={action1}
        action2={action2}
      />
      {activeTab === "cards" ? (
        loading ? (
          <ContentLoader variant="cards" count={6} />
        ) : filteredAds.length === 0 ? (
          <EmptyState
            title="No Ads Found"
            description="Create your first advertisement to get started."
          />
        ) : (
          <AdCard
            openEdit={openEdit}
            handleDelete={handleDelete}
            setDeleteConfirm={setDeleteConfirm}
            ads={filteredAds}
          />
        )
      ) : loading ? (
        <ContentLoader variant="table" count={6} columns={4} />
      ) : filteredAds.length === 0 ? (
        <EmptyState
          title="No Ads Found"
          description="Create your first advertisement to get started."
        />
      ) : (
        <AdTable
          openEdit={openEdit}
          handleDelete={handleDelete}
          setDeleteConfirm={setDeleteConfirm}
          ads={filteredAds}
        />
      )}

      {formOpen && (
        <AdsModal
          setFormOpen={setFormOpen}
          register={register}
          errors={errors}
          handleSubmit={handleSubmit}
          handleSave={handleSave}
          editingAd={editingAd}
          setValue={setValue}
          watch={watch}
          backendError={error}
        />
      )}
      <ConfirmModal
        open={deleteConfirm.open}
        onClose={() => setDeleteConfirm({ open: false, id: null })}
        onConfirm={() => handleDelete(deleteConfirm.id)}
        title="Delete Ad?"
        message="Are you sure you want to delete this advertisement? This action cannot be undone."
        confirmText="Yes, Delete"
        variant="danger"
      />
    </div>
  );
};

export default AdsManagement;
