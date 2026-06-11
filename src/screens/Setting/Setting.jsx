import { useState } from "react";
import {
  User,
  Mail,
  Save,
  Camera,
  Shield,
  Key,
  Eye,
  EyeOff,
} from "lucide-react";
import Input from "../../components/UI/Input";
import Button from "../../components/UI/Button";
import ConfirmModal from "../../components/UI/ConfirmModal";
import { DashboardText } from "../../components";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  profileSchema,
  passwordSchema,
} from "../../services/validation/profileSchema";
import useAuth from "../../hooks/useAuth";
import { uploadToCloudinary } from "../../services/Cloudnairy/uploadImage";

const Setting = () => {
  const user = useSelector((state) => state.auth.user);
  const { updateProfile, updatePasswordFirebase, loading, error } = useAuth();
  const [saved, setSaved] = useState(false);
  const [saveConfirm, setSaveConfirm] = useState(false);
  const [passwordConfirm, setPasswordConfirm] = useState(false);
  const [profileImage, setProfileImage] = useState(user?.profile_picture || "");
  const [uploadingImage, setUploadingImage] = useState(false);
  const [passwordSaved, setPasswordSaved] = useState(false);

  // Profile Form
  const {
    register: registerProfile,
    handleSubmit: handleProfileSubmit,
    formState: { errors: profileErrors },
  } = useForm({
    resolver: yupResolver(profileSchema),
    defaultValues: {
      fullName: user?.name || "",
    },
  });

  // Password Form
  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    formState: { errors: passwordErrors },
    reset: resetPassword,
  } = useForm({
    resolver: yupResolver(passwordSchema),
  });

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const imageUrl = await uploadToCloudinary(file);
      setProfileImage(imageUrl);
    } catch (err) {
      console.error("Image upload failed:", err);
      alert("Failed to upload image. Please try again.");
    } finally {
      setUploadingImage(false);
    }
  };

  const onProfileSubmit = async (data) => {
    try {
      await updateProfile(user.email, {
        name: data.fullName,
        profile_picture: profileImage,
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
      setSaveConfirm(false);
    } catch (err) {
      console.error("Profile update failed:", err);
    }
  };

  const onPasswordSubmit = async (data) => {
    try {
      await updatePasswordFirebase({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });
      resetPassword();
      setPasswordConfirm(false);
      setPasswordSaved(true);
      setTimeout(() => setPasswordSaved(false), 3000);
    } catch (err) {
      console.error("Password update failed:", err);
    }
  };

  return (
    <div className="space-y-6">
      <DashboardText
        text="Settings"
        para="Manage your admin profile and preferences."
      />

      {/* Global error display */}
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
          {error}
        </div>
      )}

      <div className="mx-auto max-w-3xl space-y-6">
        <ProfileCard
          user={user}
          profileImage={profileImage}
          onImageUpload={handleImageUpload}
          uploadingImage={uploadingImage}
        />

        <ProfileSetting
          register={registerProfile}
          handleSubmit={handleProfileSubmit(onProfileSubmit)}
          errors={profileErrors}
          onSave={() => setSaveConfirm(true)}
          saved={saved}
          loading={loading}
          user={user}
        />

        <PasswordSetting
          register={registerPassword}
          handleSubmit={handlePasswordSubmit(onPasswordSubmit)}
          errors={passwordErrors}
          onSave={() => setPasswordConfirm(true)}
          loading={loading}
          passwordSaved={passwordSaved}
        />
      </div>

      {/* Profile Save Modal */}
      <ConfirmModal
        open={saveConfirm}
        onClose={() => setSaveConfirm(false)}
        onConfirm={handleProfileSubmit(onProfileSubmit)}
        title="Save Changes?"
        message="Are you sure you want to update your profile information?"
        confirmText="Yes, Save"
        variant="info"
      />

      {/* Password Change Modal */}
      <ConfirmModal
        open={passwordConfirm}
        onClose={() => setPasswordConfirm(false)}
        onConfirm={handlePasswordSubmit(onPasswordSubmit)}
        title="Update Password?"
        message="Are you sure you want to change your password?"
        confirmText="Yes, Update"
        variant="warning"
      />
    </div>
  );
};

export default Setting;

// ─── Profile Card ────────────────────────────────────────────────────────────

const ProfileCard = ({ user, profileImage, onImageUpload, uploadingImage }) => {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-border bg-card">
      <div className="h-28 gradient-primary relative">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 70% 30%, white 0%, transparent 60%)",
          }}
        />
      </div>
      <div className="relative px-6 pb-6">
        <div className="-mt-12 flex items-end gap-4">
          <div className="relative">
            <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent text-3xl font-bold text-primary-foreground shadow-lg ring-4 ring-card overflow-hidden">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="h-10 w-10" />
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={onImageUpload}
              className="hidden"
              id="profile-image-upload"
            />
            <label
              htmlFor="profile-image-upload"
              className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-colors cursor-pointer"
            >
              {uploadingImage ? (
                <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
              ) : (
                <Camera className="h-4 w-4" />
              )}
            </label>
          </div>
          <div className="pb-1">
            <h2 className="text-xl font-bold text-foreground">
              {user?.name || "Admin"}
            </h2>
            <p className="text-sm text-muted-foreground">
              {user?.email || "admin@example.com"}
            </p>
            <span className="mt-1 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-0.5 text-xs font-semibold text-primary">
              <Shield className="h-3 w-3" /> Administrator
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Profile Setting ──────────────────────────────────────────────────────────

const ProfileSetting = ({
  register,
  handleSubmit,
  errors,
  onSave,
  saved,
  loading,
  user,
}) => {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 space-y-6">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
          <User className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-foreground">
            Profile Information
          </h2>
          <p className="text-sm text-muted-foreground">
            Update your personal details
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5">
        <div>
          <label className="mb-1.5 flex items-center gap-2 text-sm font-medium text-foreground">
            <User className="h-3.5 w-3.5 text-muted-foreground" /> Full Name
          </label>
          <Input {...register("fullName")} placeholder="Enter full name" />
          {errors.fullName && (
            <p className="mt-1 text-red-500 text-sm">
              {errors.fullName.message}
            </p>
          )}
        </div>

        <div>
          <label className="mb-1.5 flex items-center gap-2 text-sm font-medium text-foreground">
            <Mail className="h-3.5 w-3.5 text-muted-foreground" /> Email
          </label>
          <Input type="email" value={user?.email || ""} disabled />
        </div>
      </form>

      <div className="flex items-center gap-3 pt-2">
        <Button
          type="button"
          onClick={onSave}
          disabled={loading}
          className="flex items-center gap-2 p-4"
          variant="default"
        >
          <Save className="h-4 w-4" />
          {loading ? "Saving..." : "Save Changes"}
        </Button>
        {saved && (
          <span className="flex items-center gap-1.5 text-sm font-medium text-success animate-fade-in">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-success text-success-foreground text-xs">
              ✓
            </span>
            Changes saved!
          </span>
        )}
      </div>
    </div>
  );
};

// ─── Password Setting ─────────────────────────────────────────────────────────

const PasswordSetting = ({
  register,
  handleSubmit,
  errors,
  onSave,
  loading,
  passwordSaved,
}) => {
  const [showCurrent, setShowCurrent] = useState(false);
const [showNew, setShowNew] = useState(false);
const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <div className="flex items-center gap-3 mb-5">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-warning/10">
          <Key className="h-5 w-5 text-warning" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-foreground">Security</h2>
          <p className="text-sm text-muted-foreground">Manage your password</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">
            Current Password
          </label>
          <div className="relative">
            <Input
              type={showCurrent ? "text" : "password"}
              {...register("currentPassword")}
              placeholder="••••••••"
            />

            <button
              type="button"
              onClick={() => setShowCurrent(!showCurrent)}
              className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
            >
              {showCurrent ? <Eye size={18} /> : <EyeOff size={18} />}
            </button>
          </div>
          {errors.currentPassword && (
            <p className="mt-1 text-red-500 text-sm">
              {errors.currentPassword.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              New Password
            </label>
            <div className="relative">
            <Input
              type={showNew ? "text" : "password"}
              {...register("newPassword")}
              placeholder="••••••••"
            />
            <button
              type="button"
               onClick={() => setShowNew(!showNew)}
              className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
            >
              {showNew ? <Eye size={18} /> : <EyeOff size={18} />}
            </button>
            </div>
            {errors.newPassword && (
              <p className="mt-1 text-red-500 text-sm">
                {errors.newPassword.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              Confirm Password
            </label>
            <div className="relative">
            <Input
              type={showConfirm ? "text" : "password"}
              {...register("confirmPassword")}
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
            >
              {showConfirm ? <Eye size={18} /> : <EyeOff size={18} />}
            </button>
            </div>
            {errors.confirmPassword && (
              <p className="mt-1 text-red-500 text-sm">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3 pt-1">
          <Button
            type="button"
            onClick={onSave}
            disabled={loading}
            variant="outline"
            className="flex items-center gap-2 p-4"
          >
            <Key className="h-4 w-4" />
            {loading ? "Updating..." : "Update Password"}
          </Button>
          {passwordSaved && (
            <span className="flex items-center gap-1.5 text-sm font-medium text-success animate-fade-in">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-success text-success-foreground text-xs">
                ✓
              </span>
              Password updated!
            </span>
          )}
        </div>
      </form>
    </div>
  );
};
