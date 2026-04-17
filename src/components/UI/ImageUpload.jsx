import { useRef, useState } from "react";
import { Camera, Video } from "lucide-react";

const MediaUpload = ({
  label = "Upload",
  file,
  setFile,
  type = "image", // "image" | "video"
  placeholderText = "Upload file",
  changeText = "Change file",
}) => {
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);

    // Preview logic
    if (type === "image") {
      setPreview(URL.createObjectURL(selectedFile));
    } else if (type === "video") {
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-sm text-input/80">{label}</label>

      <div
        className="w-full h-14 flex items-center gap-3 cursor-pointer rounded-lg px-4 border-input/20 text-input bg-input/10"
        onClick={() => fileInputRef.current?.click()}
      >
        <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center bg-black/20">
          {preview ? (
            type === "image" ? (
              <img src={preview} className="w-full h-full object-cover" />
            ) : (
              <Video size={18} />
            )
          ) : type === "image" ? (
            <Camera size={16} />
          ) : (
            <Video size={16} />
          )}
        </div>

        <span>{preview ? changeText : placeholderText}</span>
      </div>

      {/* Hidden input */}
      <input
        type="file"
        accept={type === "image" ? "image/*" : "video/*"}
        hidden
        ref={fileInputRef}
        onChange={handleFileChange}
      />

      {/* 🎥 Video Preview */}
      {type === "video" && preview && (
        <video
          src={preview}
          controls
          className="w-full mt-2 rounded-lg"
        />
      )}
    </div>
  );
};

export default MediaUpload;