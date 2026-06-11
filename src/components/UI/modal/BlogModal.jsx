import { Upload, X, AlertCircle, Loader2 } from "lucide-react";
import InputField from "../InputFeild";
import { useState, useRef } from "react";

const categories = [
  "Farming Tips",
  "Crop Diseases",
  "Weather Updates",
  "Market Prices",
  "Modern Agriculture",
];

const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10 MB

const BlogModal = ({
  errors,
  setFormOpen,
  handleSave,
  editingBlog,
  handleSubmit,
  setValue,
  register,
  watch,
  loading,
  backendError,

}) => {
  const [previewLoading, setPreviewLoading] = useState(false);
  const [fileError, setFileError] = useState("");
  const fileInputRef = useRef(null);

  const status = watch("status");
  const image = watch("image");

  const preview =
    image instanceof File
      ? URL.createObjectURL(image)
      : typeof image === "string"
        ? image
        : null;

  const toggleStatus = () => {
    setValue("status", status === "Published" ? "Draft" : "Published");
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileError("");

    if (!file.type.startsWith("image/")) {
      setFileError("Only image files are allowed.");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    if (file.size > MAX_IMAGE_SIZE) {
      setFileError(`Image exceeds 10 MB limit (${(file.size / 1024 / 1024).toFixed(1)} MB).`);
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    setPreviewLoading(true);
    setValue("image", file);
  };

  const clearPreview = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setValue("image", null);
    setFileError("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed top-0 left-0 z-50 w-full h-screen bg-black/60 backdrop-blur-sm"
        onClick={() => setFormOpen(false)}
      />

      {/* Modal */}
      <div className="fixed left-1/2 top-1/2 z-50 w-full max-w-4xl -translate-x-1/2 -translate-y-1/2 max-h-[90vh] overflow-y-auto rounded-2xl bg-sidebar border border-white/10 p-6 shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* ── Left Column ── */}
          <div className="space-y-4">
            <InputField
              label="Title"
              type="text"
              placeholder="Title..."
              register={register("title")}
              error={errors.title?.message}
            />

            {/* Author + Category row */}
            <div className="flex items-start gap-3">
              <div className="flex-1">
                <InputField
                  label="Author Name"
                  type="text"
                  placeholder="Author name..."
                  register={register("author")}
                  error={errors.author?.message}
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm text-input/80 pb-2">Category</label>
                <select
                  {...register("category")}
                  className="border-input/20 text-input bg-input/10 w-full rounded-lg border px-4 py-3 cursor-pointer"
                >
                  <option className="text-foreground" value="Select">Select category</option>
                  {categories.map((cat, index) => (
                    <option className="text-foreground" key={index} value={cat}>{cat}</option>
                  ))}
                </select>
                {errors.category && (
                  <p className="text-xs text-red-400 mt-1">{errors.category.message}</p>
                )}
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm text-input/80 pb-2">Description</label>
              <textarea
                {...register("description")}
                placeholder="Write blog description..."
                rows={4}
                className="border-input/20 text-input bg-input/10 w-full rounded-lg border px-4 py-3"
              />
              {errors.description && (
                <p className="text-xs text-red-400 mt-1">{errors.description.message}</p>
              )}
            </div>

            {/* Hidden status */}
            <input type="hidden" {...register("status")} />

            {/* Publish toggle */}
            <div className="flex items-center justify-between rounded-lg border border-input/20 bg-input/10 px-4 py-3">
              <div>
                <p className="text-sm font-medium text-input">Publish blog</p>
                <p className="text-xs text-input/40">Make this visible to the public</p>
              </div>
              <button
                type="button"
                onClick={toggleStatus}
                className={`relative h-6 w-11 rounded-full transition-colors cursor-pointer ${
                  status === "Published" ? "bg-accent" : "bg-white/20"
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                    status === "Published" ? "translate-x-5" : ""
                  }`}
                />
              </button>
            </div>
          </div>

          {/* ── Right Column: Banner Upload ── */}
          <div>
            <label className="block text-sm text-input/80 pb-2">
              Blog Banner Image
            </label>

            <div className="border-input/20 text-input bg-input/10 w-full rounded-lg border px-4 py-3 h-[calc(100%-28px)] flex flex-col gap-3">
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                id="bannerUpload"
              />

              <div
                onClick={() => fileInputRef.current?.click()}
                className="cursor-pointer flex-1 relative overflow-hidden rounded-lg flex flex-col items-center justify-center min-h-[220px]"
              >
                {preview ? (
                  <>
                    {previewLoading && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40 z-10">
                        <Loader2 className="h-8 w-8 text-white animate-spin" />
                      </div>
                    )}
                    <img
                      src={preview}
                      alt="Preview"
                      onLoad={() => setPreviewLoading(false)}
                      className="absolute inset-0 w-full h-full object-cover object-top"
                    />
                    {/* Clear button */}
                    <button
                      type="button"
                      onClick={clearPreview}
                      className="absolute top-2 right-2 z-10 rounded-full bg-black/60 p-1 text-white hover:bg-black/80 transition-colors"
                      title="Remove image"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <Upload className="h-8 w-8 text-white/30" />
                    <p className="text-sm text-white/50 font-medium">
                      Drag & Drop or Click to Upload
                    </p>
                    <p className="text-xs text-white/30">
                      16:9 ratio recommended · Max 10 MB
                    </p>
                  </div>
                )}
              </div>

              {/* File error */}
              {fileError && (
                <p className="text-xs text-red-400 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" /> {fileError}
                </p>
              )}
              {errors.image && (
                <p className="text-xs text-red-400">{errors.image.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Backend error */}
        {backendError && (
          <div className="mt-4 flex items-center gap-2 rounded-lg border border-red-400/30 bg-red-500/10 px-4 py-2 text-sm text-red-400">
            <AlertCircle className="h-4 w-4 flex-shrink-0" />
            {backendError}
          </div>
        )}

        {/* Footer */}
        <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5">
          <button
            type="button"
            onClick={() => setFormOpen(false)}
            className="cursor-pointer rounded-lg border border-white/15 bg-transparent px-5 py-2.5 text-sm font-medium text-white/70 hover:bg-white/5 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit(handleSave)}
            disabled={loading}
            className="cursor-pointer bg-accent disabled:opacity-60 flex items-center gap-2 text-white rounded-lg px-5 py-2.5 text-sm font-semibold shadow-lg transition-all hover:bg-accent/90"
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            {loading
              ? editingBlog ? "Updating..." : "Creating..."
              : editingBlog ? "Update Blog" : "Create Blog"}
          </button>
        </div>
      </div>
    </>
  );
};

export default BlogModal;