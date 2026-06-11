import React, { useEffect, useState } from "react";
import {
  TutorialCard,
  TutorialModal,
  ConfirmModal,
  ContentLoader,
  DashboardText,
  EmptyState,
  Searchbar,
  BlogTable,
  TutorialTable,
} from "../../components";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { uploadToCloudinary } from "../../services/Cloudnairy/uploadImage";
import { TutorialSchema } from "../../services/validation/tutuorialSchema";
import useTutorial from "../../hooks/useTutorial";

const Tutorial = () => {
  const [search, setSearch] = useState("");
  const [tutorials, setTutorials] = useState([]);
  const [formOpen, setFormOpen] = useState(false);
  const [editingTutorial, setEditingTutorial] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState({
    open: false,
    id: null,
  });
  const [activeTab, setActiveTab] = useState("cards");

  const {
    loading,
    error,
    createTutorial,
    updateTutorial,
    getTutorials,
    deleteTutorial,
  } = useTutorial();

  // ---------------- FORM ----------------
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(TutorialSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      image: null,
      video: "",
      status: "Published",
    },
  });

  const videoUrl = watch("video");

  // ---------------- YOUTUBE THUMBNAIL ----------------
  const getYoutubeThumbnail = (url) => {
    try {
      if (!url) return null;

      // youtu.be format
      if (url.includes("youtu.be")) {
        const id = url.split("youtu.be/")[1]?.split("?")[0];
        return id ? `https://img.youtube.com/vi/${id}/0.jpg` : null;
      }

      // youtube.com format
      const match = url.match(/v=([^&]+)/);
      const id = match?.[1];

      return id ? `https://img.youtube.com/vi/${id}/0.jpg` : null;
    } catch {
      return null;
    }
  };

  // ---------------- FETCH ----------------
  const fetchTutorials = async () => {
    try {
      const data = await getTutorials();
      setTutorials(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTutorials();
  }, []);

  // ---------------- ADD ----------------
  const openAdd = () => {
    setEditingTutorial(null);
    reset({
      title: "",
      description: "",
      category: "",
      image: null,
      video: "",
      status: "Published",
    });
    setFormOpen(true);
  };

  // ---------------- EDIT ----------------
  const openEdit = (tutorial) => {
    setEditingTutorial(tutorial);

    reset({
      title: tutorial.title,
      description: tutorial.description,
      category: tutorial.category,
      image: tutorial.image,
      video: tutorial.video || "",
      status: tutorial.status,
    });

    setFormOpen(true);
  };

  // ---------------- SAVE ----------------
  const handleSave = async (data) => {
    try {
      let imageUrl = data.image;

      // upload manual image
      if (typeof data.image === "object") {
        imageUrl = await uploadToCloudinary(data.image);
      }

      // auto thumbnail
      if (!imageUrl) {
        imageUrl = getYoutubeThumbnail(data.video);
      }

      const payload = {
  ...data,
  image: imageUrl,
  video: data.video, // 👈 ensure video save ho
};

      if (editingTutorial?._id) {
        await updateTutorial(editingTutorial._id, payload);
      } else {
        await createTutorial(payload);
      }

      await fetchTutorials();
      reset();
      setFormOpen(false);
    } catch (err) {
      console.error("Save error:", err);
    }
  };

  // ---------------- DELETE ----------------
  const handleDelete = async (id) => {
    try {
      await deleteTutorial(id);
      fetchTutorials();
      setDeleteConfirm({ open: false, id: null });
    } catch (err) {
      console.error(err);
    }
  };

  // ---------------- FILTER ----------------
  const filteredTutorials = tutorials.filter((t) =>
    t.title.toLowerCase().includes(search.toLowerCase())
  );

  // ---------------- UI ----------------
  return (
    <div className="space-y-6">
      <DashboardText
        text="Tutorials"
        para="Manage your tutorials"
        openAdd={openAdd}
      />

      <Searchbar
        searchValue={search}
        onSearchChange={setSearch}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {loading ? (
        <ContentLoader variant="cards" count={6} />
      ) : filteredTutorials.length === 0 ? (
        <EmptyState title="No Tutorials" description="Create your first one" />
      ) : activeTab === "cards" ? (
        <TutorialCard
          blogs={filteredTutorials}
          openEdit={openEdit}
          handleDelete={handleDelete}
          setDeleteConfirm={setDeleteConfirm}
        />
      ) : (
        <TutorialTable
          blogs={filteredTutorials}
          openEdit={openEdit}
          handleDelete={handleDelete}
          setDeleteConfirm={setDeleteConfirm}
        />
      )}

      {/* MODAL */}
      {formOpen && (
        <TutorialModal
          setFormOpen={setFormOpen}
          register={register}
          errors={errors}
          handleSubmit={handleSubmit}
          handleSave={handleSave}
          editingTutorial={editingTutorial}
          setValue={setValue}
          watch={watch}
          backendError={error}
        />
      )}

      {/* DELETE CONFIRM */}
      <ConfirmModal
        open={deleteConfirm.open}
        onClose={() => setDeleteConfirm({ open: false, id: null })}
        onConfirm={() => handleDelete(deleteConfirm.id)}
        title="Delete Tutorial?"
        message="Are you sure you want to delete this Tutorial? This action cannot be undone."
        confirmText="Yes, Delete"
        variant="danger"
      />
    </div>
  );
};

export default Tutorial;