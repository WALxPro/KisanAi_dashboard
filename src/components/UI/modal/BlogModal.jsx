import { Upload } from "lucide-react";
import InputField from "../InputFeild";
import { useState } from "react";

const categories = [
  "Farming Tips",
  "Crop Diseases",
  "Weather Updates",
  "Market Prices",
  "Modern Agriculture",
];

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
  const status = watch("status");
  const image = watch("image");
  const preview =
    image instanceof File
      ? URL.createObjectURL(image)
      : typeof image === "string"
        ? image
        : null;

  const toggleStatus = () => {
    const newStatus = status === "Published" ? "Draft" : "Published";
    setValue("status", newStatus);
  };



  return (
    <>
      <div
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
        onClick={() => setFormOpen(false)}
      />

      <div className="fixed left-1/2 top-1/2 z-50 w-full max-w-4xl -translate-x-1/2 -translate-y-1/2 animate-scale-in rounded-2xl bg-sidebar border border-white/10 p-6 shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <InputField
              label="Title"
              type="text"
              placeholder="Title..."
              register={register("title")}
              error={errors.title?.message}
            />
            <div className="flex items-center justify-betwwen gap-2">
              <InputField
                label="Author Name"
                type="text"
                placeholder="Author name..."
                register={register("author")}
                error={errors.author?.message}
              />
              <div>
                <label className="block text-sm text-input/80 pb-2">
                  Category
                </label>

                <select
                  {...register("category")}
                  className="border-input/20 text-input bg-input/10 
    w-full rounded-lg border px-4 py-3 text-base transition-colors
    focus:outline-none focus:ring-2 focus:ring-accent/50
    disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <option className="text-foreground" value="Select">Select category</option>

                  {categories.map((cat, index) => (
                    <option className="text-foreground" key={index} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>

                {errors.category && (
                  <p className="text-xs text-red-400 mt-1">
                    {errors.category.message}
                  </p>
                )}
              </div>
            </div>
            <div>
              <label className="block text-sm text-input/80 pb-2">
                Description
              </label>
              <textarea
                {...register("description")}
                placeholder="Ad description..."
                rows={3}
                className="border-input/20  text-input  bg-input/10 
            text-input w-full rounded-lg border px-4 py-3 text-base transition-colors
                  focus:outline-none focus:ring-2 focus:ring-accent/50
                  disabled:opacity-50 disabled:cursor-not-allowed "
              />
              {errors.description && (
                <p className="text-xs text-red-400 mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>


            <input type="hidden" {...register("status")} />
            <div
              className="flex items-center justify-between rounded-lg border border-input/20 focus:outline-none focus:ring-2 focus:ring-accent/50
                  disabled:opacity-50 cursor-pointer bg-input/10 px-4 py-3"
            >
              <div>
                <p className="text-sm font-medium text-input">Publish blog</p>
                <p className="text-xs text-input/40">
                  Make this visible to the public
                </p>
              </div>
              <button
                type="button"
                onClick={toggleStatus}
                className={`relative h-6 w-11 rounded-full transition-colors cursor-pointer ${status === "Published" ? "bg-accent" : "bg-white/20"
                  }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${status === "Published" ? "translate-x-5" : ""
                    }`}
                />
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm text-input/80 pb-2">
              Blog Banner Image
            </label>
            <div
              className="border-input/20  text-input  bg-input/10 
             w-full rounded-lg border px-4 py-3 text-base
                  focus:outline-none focus:ring-2 focus:ring-accent/50
                  disabled:opacity-50 disabled:cursor-not-allowed h-[calc(100%-28px)] "
            >
              <input
                type="file"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (!file) return;

                  setPreviewLoading(true); // 🔥 start loader
                  setValue("image", file);
                }}
                className="hidden"
                id="bannerUpload"
              />

              <label
                htmlFor="bannerUpload"
                className="cursor-pointer h-full flex items-center justify-center overflow-hidden rounded-lg relative"
              >
                {preview ? (
                  <>
                    {previewLoading && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                        <div className="h-8 w-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      </div>
                    )}

                    <img
                      src={preview}
                      alt="Preview"
                      onLoad={() => setPreviewLoading(false)}
                      className="h-full w-full object-cover"
                    />
                  </>
                ) : (
                  <div className="flex flex-col items-center ">
                    <Upload className="h-8 w-8 mb-2 text-white/30" />
                    <p className="text-sm text-white/50 font-medium">
                      Drag & Drop or Click to Upload
                    </p>
                    <p className="text-xs text-white/30 mt-1">
                      16:9 ratio recommended
                    </p>
                  </div>
                )}
              </label>
              {errors.image && (
                <p className="text-xs text-red-400 mt-2">
                  {errors.image.message}
                </p>
              )}
            </div>
          </div>
        </div>
        {backendError && (
          <div className="mb-4 rounded-lg border border-red-400/30 bg-red-500/10 px-4 py-2 text-sm text-red-400">
            {backendError}
          </div>
        )}
        <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5">
          <button
            onClick={() => setFormOpen(false)}
            className="cursor-pointer rounded-lg border border-white/15 bg-transparent px-5 py-2.5 text-sm font-medium text-white/70 hover:bg-white/5 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit(handleSave)}
            disabled={loading}
            className={`text-white rounded-lg px-5 py-2.5 text-sm font-semibold shadow-lg transition-all
  ${loading
                ? "bg-accent/60 cursor-not-allowed"
                : "bg-accent hover:bg-accent/90 cursor-pointer shadow-accent/25"
              }`}
          >
            {loading
              ? editingBlog
                ? "Updating..."
                : "Creating..."
              : editingBlog
                ? "Update Blog"
                : "Create Blog"}
          </button>
        </div>
      </div>
    </>
  );
};

export default BlogModal;
