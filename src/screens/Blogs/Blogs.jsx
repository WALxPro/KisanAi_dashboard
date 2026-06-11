import React, { useEffect, useState } from "react";
import {
  BlogCard,
  BlogsModal,
  BlogTable,
  ConfirmModal,
  ContentLoader,
  DashboardText,
  EmptyState,
  Searchbar,
} from "../../components";
import { yupResolver } from "@hookform/resolvers/yup";
import { blogSchema } from "../../services/validation/blogSchema";
import { useForm } from "react-hook-form";
import useBlogs from "../../hooks/useBlogs";
import { uploadToCloudinary } from "../../services/Cloudnairy/uploadImage";

const Blogs = () => {
  const [search, setSearch] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [formOpen, setFormOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState({ open: false, id: null });
  const [activeTab, setActiveTab] = useState("cards");
  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(search.toLowerCase()),
  );
  const active = blogs.filter((a) => a.status === "Published").length;
  const inactive = blogs.filter((a) => a.status === "Draft").length;
  const action1 = `${active} Published`;
  const action2 = `${inactive} Draft`;
  const { loading, error, CreateBlog, updateBlog, getBlogs, deleteBlog } =
    useBlogs();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(blogSchema),
    defaultValues: {
      title: "",
      description: "",
      author: "",
      category: "",
      image: null,
      status: "Published",
    },
  });

  const openAdd = () => {
    setEditingBlog(null);
    reset({
      title: "",
      description: "",
      author: "",
      category: "",
      image: null,
      status: "Published",
    });
    setFormOpen(true);
  };
  const openEdit = (blog) => {
  setEditingBlog(blog);

  reset({
    title: blog.title,
    author: blog.author,   
    description: blog.description,
    category: blog.category,
    image: blog.image,
    status: blog.status,
  });

  setFormOpen(true);
};
  const handleSave = async (data) => {
    try {
      let imageUrl = data.image;

      if (typeof data.image === "object") {
        imageUrl = await uploadToCloudinary(data.image);
      }

      const payload = { ...data, image: imageUrl };

      if (editingBlog?._id) {
        await updateBlog(editingBlog._id, payload);
      } else {
        await CreateBlog(payload);
      }

      await fetchBlogs();

      reset();
      setFormOpen(false);
    } catch (err) {
      console.error("Failed to save blog:", err);
    }
  };
  const handleDelete = async (id) => {
    try {
      await deleteBlog(id);
      fetchBlogs();
      setDeleteConfirm({ open: false, id: null });
    } catch (error) {
      console.error("Failed to delete blog:", error);
    }
  };
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  const fetchBlogs = async () => {
    try {
      const data = await getBlogs();
      setBlogs(data);
    } catch (err) {
      console.error("Failed to fetch blogs:", err);
    }
  };
  console.log(blogs);
  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="space-y-6">
      <DashboardText
        text="Blogs"
        para="Create and manage blog posts."
        openAdd={openAdd}
      />
      <Searchbar
        searchValue={search}
        onSearchChange={setSearch}
        activeTab={activeTab}
        onTabChange={handleTabChange}

      />
      {activeTab === "cards" ? (
        loading ? (
          <ContentLoader variant="cards" count={6} />
        ) : filteredBlogs.length === 0 ? (
          <EmptyState
            title="No Blogs Found"
            description="Create your first blog post to get started."
          />
        ) : (
          <BlogCard
            openEdit={openEdit}
            handleDelete={handleDelete}
            setDeleteConfirm={setDeleteConfirm}
            blogs={filteredBlogs}
          />
        )
      ) : loading ? (
        <ContentLoader variant="table" count={6} columns={4} />
      ) : filteredBlogs.length === 0 ? (
        <EmptyState
          title="No Blogs Found"
          description="Create your first blog post to get started."
        />
      ) : (
        <BlogTable
          openEdit={openEdit}
          handleDelete={handleDelete}
          setDeleteConfirm={setDeleteConfirm}
          blogs={filteredBlogs}
        />
      )}

      {formOpen && (
        <BlogsModal
          setFormOpen={setFormOpen}
          register={register}
          errors={errors}
          handleSubmit={handleSubmit}
          handleSave={handleSave}
          editingBlog={editingBlog}
          setValue={setValue}
          watch={watch}
          backendError={error}
          loading={loading}
        />
      )}

      <ConfirmModal
        open={deleteConfirm.open}
        onClose={() => setDeleteConfirm({ open: false, id: null })}
        onConfirm={() => handleDelete(deleteConfirm.id)}
        title="Delete Blog?"
        message="Are you sure you want to delete this blog? This action cannot be undone."
        confirmText="Yes, Delete"
        variant="danger"
      />
    </div>
  );
};

export default Blogs;
