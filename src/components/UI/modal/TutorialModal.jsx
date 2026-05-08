import { Upload, X, AlertCircle, Loader2, CheckCircle } from "lucide-react";
import InputField from "../InputFeild";
import { useEffect, useRef, useState, useCallback } from "react";
import { uploadToCloudinary } from "../../../services/Cloudnairy/uploadImage";

const categories = ["Farming Tips", "Modern Agriculture", "App Tutorial"];

// ─── Constants ────────────────────────────────────────────────────────────────
const MAX_IMAGE_SIZE = 10 * 1024 * 1024;   // 10 MB
const MAX_VIDEO_SIZE = 100 * 1024 * 1024;  // 100 MB

const extractYoutubeId = (url) => {
  if (!url || typeof url !== "string") return null;
  try {
    const patterns = [
      /youtu\.be\/([^?&#]+)/,
      /youtube\.com\/watch\?(?:.*&)?v=([^&#]+)/,
      /youtube\.com\/shorts\/([^?&#]+)/,
      /youtube\.com\/embed\/([^?&#]+)/,
      /youtube\.com\/v\/([^?&#]+)/,
    ];
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match?.[1]) return match[1];
    }
  } catch {
  }
  return null;
};

const getYoutubeThumbnail = (url) => {
  const id = extractYoutubeId(url);
  return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : null;
};

const isYoutubeUrl = (url) => {
  if (!url) return false;
  return /(?:youtu\.be|youtube\.com)/i.test(url);
};

const extractVideoFrameBlob = (file) =>
  new Promise((resolve, reject) => {
    const video = document.createElement("video");
    video.preload = "metadata";
    video.muted = true;
    const objUrl = URL.createObjectURL(file);
    video.src = objUrl;

    const cleanup = () => URL.revokeObjectURL(objUrl);

    video.addEventListener("error", () => {
      cleanup();
      reject(new Error("Failed to load video for thumbnail extraction."));
    });

    video.addEventListener("loadeddata", () => {
      video.currentTime = 1;
    });

    video.addEventListener("seeked", () => {
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth || 1280;
      canvas.height = video.videoHeight || 720;
      canvas.getContext("2d").drawImage(video, 0, 0);
      canvas.toBlob(
        (blob) => {
          cleanup();
          if (blob) resolve(blob);
          else reject(new Error("Canvas blob extraction failed."));
        },
        "image/jpeg",
        0.85
      );
    });
  });

// ─── Upload Status Banner ─────────────────────────────────────────────────────
const StatusBanner = ({ status, message }) => {
  if (!status) return null;
  const config = {
    uploading: {
      bg: "bg-blue-500/10 border-blue-500/30",
      text: "text-blue-400",
      icon: <Loader2 className="h-4 w-4 animate-spin" />,
    },
    error: {
      bg: "bg-red-500/10 border-red-500/30",
      text: "text-red-400",
      icon: <AlertCircle className="h-4 w-4" />,
    },
    success: {
      bg: "bg-green-500/10 border-green-500/30",
      text: "text-green-400",
      icon: <CheckCircle className="h-4 w-4" />,
    },
  };
  const c = config[status];
  return (
    <div
      className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm ${c.bg} ${c.text}`}
    >
      {c.icon}
      <span>{message}</span>
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
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

  // preview: always a URL string (cloud URL, youtube thumbnail, or local blob for images)
  const [preview, setPreview] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(null); // null | 'uploading' | 'error' | 'success'
  const [uploadMessage, setUploadMessage] = useState("");
  const [fileError, setFileError] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  // ── Seed preview when editing ──
  useEffect(() => {
    if (editingTutorial?.image) {
      setPreview(editingTutorial.image);
    }
  }, [editingTutorial]);

  // ── Respond to YouTube URL changes ──
  useEffect(() => {
    if (!videoUrl) return;

    if (isYoutubeUrl(videoUrl)) {
      const thumb = getYoutubeThumbnail(videoUrl);
      if (thumb) {
        setPreview(thumb);
        setValue("image", thumb);
        setFileError("");
      } else if (videoUrl.length > 10) {
        // URL looks like a YouTube URL but ID couldn't be parsed
        setFileError("Invalid YouTube URL. Please check the link and try again.");
      }
    }
    // Non-YouTube URLs (e.g. Cloudinary video URL after upload) → leave preview as-is
  }, [videoUrl, setValue]);

  // ── File validation ──
  const validateFile = (file) => {
    if (file.type.startsWith("image/")) {
      if (file.size > MAX_IMAGE_SIZE) {
        return `Image exceeds 10 MB limit (${(file.size / 1024 / 1024).toFixed(1)} MB).`;
      }
    } else if (file.type.startsWith("video/")) {
      if (file.size > MAX_VIDEO_SIZE) {
        return `Video exceeds 100 MB limit (${(file.size / 1024 / 1024).toFixed(1)} MB).`;
      }
    } else {
      return "Unsupported file type. Please upload an image or video.";
    }
    return null;
  };

  // ── File upload handler ──
  const handleFileChange = useCallback(
    async (e) => {
      const file = e.target.files?.[0];
      if (!file) return;

      // Reset state
      setFileError("");
      setUploadStatus(null);

      // Validate
      const validationError = validateFile(file);
      if (validationError) {
        setFileError(validationError);
        // Reset file input so same file can be re-selected after fixing
        if (fileInputRef.current) fileInputRef.current.value = "";
        return;
      }

      if (file.type.startsWith("video/")) {
        setIsUploading(true);
        setUploadStatus("uploading");
        setUploadMessage("Uploading video to cloud…");

        try {
          // 1. Upload video
          const cloudVideoUrl = await uploadToCloudinary(file, "video");
          setValue("video", cloudVideoUrl);

          // 2. Extract thumbnail frame → upload to Cloudinary for persistence
          setUploadMessage("Generating thumbnail…");
          const frameBlob = await extractVideoFrameBlob(file);
          const thumbFile = new File([frameBlob], "thumbnail.jpg", {
            type: "image/jpeg",
          });
          const cloudThumbUrl = await uploadToCloudinary(thumbFile, "image");

          setPreview(cloudThumbUrl);
          setValue("image", cloudThumbUrl);

          setUploadStatus("success");
          setUploadMessage("Video uploaded successfully.");
        } catch (err) {
          console.error("Video upload failed:", err);
          setUploadStatus("error");
          setUploadMessage(
            err?.message || "Video upload failed. Please try again."
          );
          // Clear partial state so form isn't submitted with broken data
          setValue("video", editingTutorial?.video ?? "");
          setValue("image", editingTutorial?.image ?? null);
          setPreview(editingTutorial?.image ?? null);
        } finally {
          setIsUploading(false);
          if (fileInputRef.current) fileInputRef.current.value = "";
        }
      } else {
        // Image upload
        setIsUploading(true);
        setUploadStatus("uploading");
        setUploadMessage("Uploading image…");

        try {
          const cloudImageUrl = await uploadToCloudinary(file, "image");
          setPreview(cloudImageUrl);
          setValue("image", cloudImageUrl);
          setUploadStatus("success");
          setUploadMessage("Image uploaded successfully.");
        } catch (err) {
          console.error("Image upload failed:", err);
          setUploadStatus("error");
          setUploadMessage(
            err?.message || "Image upload failed. Please try again."
          );
          setPreview(editingTutorial?.image ?? null);
          setValue("image", editingTutorial?.image ?? null);
        } finally {
          setIsUploading(false);
          if (fileInputRef.current) fileInputRef.current.value = "";
        }
      }
    },
    [editingTutorial, setValue]
  );

  const toggleStatus = () => {
    setValue("status", status === "Published" ? "Draft" : "Published");
  };

  const clearPreview = (e) => {
    e.stopPropagation();
    setPreview(null);
    setValue("image", null);
    setUploadStatus(null);
    setFileError("");
    if (!isYoutubeUrl(videoUrl)) {
      setValue("video", "");
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
        onClick={() => !isUploading && setFormOpen(false)}
      />

      {/* Modal */}
      <div className="fixed left-1/2 top-1/2 z-50 w-full max-w-4xl -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-sidebar border border-white/10 p-6 shadow-2xl">
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

            {/* Category */}
            <div>
              <label className="block text-sm text-input/80 pb-2">Category</label>
              <select
                {...register("category")}
                className="border-input/20 text-input bg-input/10 w-full rounded-lg border px-4 py-3"
              >
                <option className="text-foreground" value="Select">
                  Select category
                </option>
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

            {/* Description */}
            <div>
              <label className="block text-sm text-input/80 pb-2">
                Description
              </label>
              <textarea
                {...register("description")}
                placeholder="Write tutorial..."
                rows={3}
                className="border-input/20 text-input bg-input/10 w-full rounded-lg border px-4 py-3"
              />
              {errors.description && (
                <p className="text-xs text-red-400 mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Video URL */}
            <div>
              <InputField
                label="Video URL (YouTube)"
                type="text"
                placeholder="https://youtube.com/watch?v=..."
                register={register("video")}
                error={errors.video?.message}
              />
              {fileError && !errors.video?.message && (
                <p className="text-xs text-red-400 mt-1">{fileError}</p>
              )}
            </div>

            {/* Hidden status field */}
            <input type="hidden" {...register("status")} />

            {/* Publish toggle */}
            <div className="flex items-center justify-between rounded-lg border border-input/20 bg-input/10 px-4 py-3">
              <p className="text-sm font-medium text-input">Publish tutorial</p>
              <button
                type="button"
                onClick={toggleStatus}
                className={`relative h-6 w-11 rounded-full transition-colors ${
                  status === "Published" ? "bg-accent" : "bg-white/20"
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 h-5 w-5 bg-white rounded-full transition-transform ${
                    status === "Published" ? "translate-x-5" : ""
                  }`}
                />
              </button>
            </div>
          </div>

          {/* ── Right Column: Banner Upload ── */}
          <div>
            <label className="block text-sm text-input/80 pb-2">
              Tutorial Banner Image
            </label>

            <div className="border-input/20 text-input bg-input/10 w-full rounded-lg border px-4 py-3 h-[calc(100%-28px)] flex flex-col gap-3">
              {/* Hidden file input */}
              <input
                type="file"
                accept="image/*,video/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                disabled={isUploading}
              />

              {/* Drop zone */}
              <div
                onClick={() =>
                  !isUploading && fileInputRef.current?.click()
                }
                className={`relative flex-1 rounded-lg overflow-hidden flex flex-col items-center justify-center min-h-[200px] ${
                  isUploading
                    ? "cursor-not-allowed opacity-70"
                    : "cursor-pointer"
                }`}
              >
                {preview ? (
                  <>
                    <img
                      src={preview}
                      alt="Preview"
                      className="absolute inset-0 w-full h-full object-cover object-top"
                    />
                    {/* Clear button */}
                    {!isUploading && (
                      <button
                        type="button"
                        onClick={clearPreview}
                        className="absolute top-2 right-2 z-10 rounded-full bg-black/60 p-1 text-white hover:bg-black/80 transition-colors"
                        title="Remove image"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                    {/* Loading overlay */}
                    {isUploading && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 gap-2">
                        <Loader2 className="h-8 w-8 text-white animate-spin" />
                        <p className="text-xs text-white/80">{uploadMessage}</p>
                      </div>
                    )}
                  </>
                ) : isUploading ? (
                  <div className="flex flex-col items-center gap-2">
                    <Loader2 className="h-8 w-8 text-white/60 animate-spin" />
                    <p className="text-sm text-white/50">{uploadMessage}</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <Upload className="h-8 w-8 text-white/30" />
                    <p className="text-sm text-white/50">Click to Upload</p>
                    <p className="text-xs text-white/30">
                      Image ≤ 10 MB · Video ≤ 100 MB
                    </p>
                  </div>
                )}
              </div>

              {/* Upload status banner */}
              <StatusBanner status={uploadStatus} message={uploadMessage} />

              {/* File validation error */}
              {fileError && (
                <p className="text-xs text-red-400">{fileError}</p>
              )}

              {errors.image && (
                <p className="text-xs text-red-400">{errors.image.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Backend error */}
        {backendError && (
          <div className="mt-4 flex items-center gap-2 text-red-400 text-sm">
            <AlertCircle className="h-4 w-4 flex-shrink-0" />
            {backendError}
          </div>
        )}

        {/* Footer actions */}
        <div className="mt-6 flex justify-between border-t border-white/10 pt-5">
          <button
            type="button"
            onClick={() => !isUploading && setFormOpen(false)}
            disabled={isUploading}
            className="border px-5 py-2 text-white/70 rounded-lg disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit(handleSave)}
            disabled={loading || isUploading}
            className="bg-accent px-5 py-2 text-white rounded-lg disabled:opacity-60 flex items-center gap-2"
          >
            {(loading || isUploading) && (
              <Loader2 className="h-4 w-4 animate-spin" />
            )}
            {isUploading
              ? "Uploading…"
              : loading
              ? "Saving…"
              : editingTutorial
              ? "Update Tutorial"
              : "Create Tutorial"}
          </button>
        </div>
      </div>
    </>
  );
};

export default TutorialModal;