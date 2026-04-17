import { Upload } from "lucide-react";
import InputField from "../InputFeild";
import { useEffect, useRef, useState } from "react";
import { uploadToCloudinary } from "../../../services/Cloudnairy/uploadImage";

const categories = ["Farming Tips", "Modern Agriculture", "App Tutorial"];

const TutorialModal = ({
  errors,
  setFormOpen,
  handleSave,
  editingTutorial,
  handleSubmit,
  setValue,
  register,
  watch,
  loading,
  backendError,
}) => {
  const status = watch("status");
  const videoUrl = watch("video");
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(null);

  const getYoutubeThumbnail = (url) => {
    try {
      if (!url) return null;
      if (url.includes("youtu.be")) {
        const id = url.split("youtu.be/")[1]?.split("?")[0];
        return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : null;
      }
      const match = url.match(/v=([^&]+)/);
      return match?.[1]
        ? `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg`
        : null;
    } catch {
      return null;
    }
  };

  useEffect(() => {
    if (editingTutorial?.image) {
      setPreview(editingTutorial.image);
    }
  }, [editingTutorial]);

  useEffect(() => {
    const thumb = getYoutubeThumbnail(videoUrl);
    if (thumb) {
      setPreview(thumb);
      setValue("image", thumb);
    } else if (!videoUrl) {
      if (!editingTutorial?.image) {
        setPreview(null);
        setValue("image", null);
      }
    }
  }, [videoUrl]);

  const extractVideoFrame = (file) => {
    const video = document.createElement("video");
    video.preload = "metadata";
    video.muted = true;
    const objUrl = URL.createObjectURL(file);
    video.src = objUrl;
    video.addEventListener("loadeddata", () => {
      video.currentTime = 1;
    });
    video.addEventListener("seeked", () => {
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext("2d").drawImage(video, 0, 0);
      canvas.toBlob(
        (blob) => {
          const blobUrl = URL.createObjectURL(blob);
          setPreview(blobUrl);
          setValue("image", blob);
        },
        "image/jpeg",
        0.85
      );
      URL.revokeObjectURL(objUrl);
    });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type.startsWith("video/")) {
      // 👉 video upload karo
      const videoUrl = await uploadToCloudinary(file, "video");;

      setValue("video", videoUrl);

      // optional thumbnail bhi bana lo
      extractVideoFrame(file);
    } else {
      const blobUrl = URL.createObjectURL(file);
      setPreview(blobUrl);
      setValue("image", file);
    }
  };

  const toggleStatus = () => {
    setValue("status", status === "Published" ? "Draft" : "Published");
  };

  return (
    <>
      <div
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
        onClick={() => setFormOpen(false)}
      />

      <div className="fixed left-1/2 top-1/2 z-50 w-full max-w-4xl -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-sidebar border border-white/10 p-6 shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div className="space-y-4">
            <InputField
              label="Title"
              type="text"
              placeholder="Title..."
              register={register("title")}
              error={errors.title?.message}
            />

            <div>
              <label className="block text-sm text-input/80 pb-2">Category</label>
              <select
                {...register("category")}
                className="border-input/20 text-input bg-input/10 w-full rounded-lg border px-4 py-3"
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

            <div>
              <label className="block text-sm text-input/80 pb-2">Description</label>
              <textarea
                {...register("description")}
                placeholder="Write tutorial..."
                rows={3}
                className="border-input/20 text-input bg-input/10 w-full rounded-lg border px-4 py-3"
              />
              {errors.description && (
                <p className="text-xs text-red-400 mt-1">{errors.description.message}</p>
              )}
            </div>

            <InputField
              label="Video URL"
              type="text"
              placeholder="https://youtube.com/..."
              register={register("video")}
              error={errors.video?.message}
            />

            <input type="hidden" {...register("status")} />

            <div className="flex items-center justify-between rounded-lg border border-input/20 bg-input/10 px-4 py-3">
              <p className="text-sm font-medium text-input">Publish tutorial</p>
              <button
                type="button"
                onClick={toggleStatus}
                className={`relative h-6 w-11 rounded-full ${status === "Published" ? "bg-accent" : "bg-white/20"
                  }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 h-5 w-5 bg-white rounded-full transition-transform ${status === "Published" ? "translate-x-5" : ""
                    }`}
                />
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm text-input/80 pb-2">
              Tutorial Banner Image
            </label>

            <div className="border-input/20 text-input bg-input/10 w-full rounded-lg border px-4 py-3 h-[calc(100%-28px)]">
              <input
                type="file"
                accept="image/*,video/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
              />

              <div
                onClick={() => fileInputRef.current?.click()}
                className="cursor-pointer h-full w-full relative overflow-hidden rounded-lg"
              >
                {preview ? (
                  <img
                    src={preview}
                    alt="Preview"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <>
                    <Upload className="h-8 w-8 mb-2 text-white/30" />
                    <p className="text-sm text-white/50">Click to Upload</p>
                  </>
                )}
              </div>

              {errors.image && (
                <p className="text-xs text-red-400 mt-2">{errors.image.message}</p>
              )}
            </div>
          </div>
        </div>

        {backendError && (
          <div className="mt-4 text-red-400">{backendError}</div>
        )}

        <div className="mt-6 flex justify-between border-t border-white/10 pt-5">
          <button
            onClick={() => setFormOpen(false)}
            className="border px-5 py-2 text-white/70 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit(handleSave)}
            disabled={loading}
            className="bg-accent px-5 py-2 text-white rounded-lg"
          >
            {loading ? "Saving..." : editingTutorial ? "Update Tutorial" : "Create Tutorial"}
          </button>
        </div>
      </div>
    </>
  );
};

export default TutorialModal;