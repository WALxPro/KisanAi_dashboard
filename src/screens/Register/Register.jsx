import { useState } from "react";
import { Mail, Lock, User, Leaf } from "lucide-react";
import { registerHero } from "../../assets";
import { NavLink } from "react-router-dom";
import { ImageUpload, InputField, LoaderBtn, OTPModal } from "../../components";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../../services/validation/RegisterSchema";
import useAuth from "../../hooks/useAuth";
import { uploadToCloudinary } from "../../services/Cloudnairy/uploadImage";

const Register = () => {
  const [isOTPModalOpen, setIsOTPModalOpen] = useState(false);
  const [emailForOTP, setEmailForOTP] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const { loading, error, signup, sendOtpAPI, VerifyOtp } = useAuth();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
    defaultValues: { name: "", email: "", password: "", terms: false },
  });

  const onSubmit = async (data) => {
    try {
      await sendOtpAPI(data);
      setEmailForOTP(data.email);
      setIsOTPModalOpen(true);
    } catch (err) {
      console.log(err, "OTP failed");
    }
  };

  const handleOTPSubmit = async (otp) => {
    try {
      const formData = getValues();

      await VerifyOtp({
        email: formData.email,
        otp: otp,
      });
      let profileUrl = null;
      if (profilePic) {
        profileUrl = await uploadToCloudinary(profilePic);
      }

      
      await signup({
        ...formData,
        profile_picture: profileUrl,
      });
      setIsOTPModalOpen(false);
    } catch (err) {
      console.log("OTP verification failed", err);
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-[60%] gradient-subtle relative overflow-hidden items-center justify-center p-12">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-20 w-72 h-72 bg-accent/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 text-center max-w-2xl">
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent rounded-3xl" />
            <img
              src={registerHero}
              alt="Farm Management Dashboard"
              className="w-full rounded-3xl shadow-2xl floating-animation-slow"
            />
          </div>

          <h2 className="text-3xl font-bold text-foreground mb-4">
            Start your smart farming journey
          </h2>
          <p className="text-muted-foreground text-lg max-w-md mx-auto">
            Join the AgriGrow community and take control of your agricultural
            business with powerful analytics.
          </p>
        </div>
      </div>

      <div className="w-full lg:w-[40%] bg-login-panel auth-panel flex flex-col justify-center px-8 md:px-16 lg:px-20 py-12">
        <div className="max-w-md mx-auto w-full slide-up">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center">
              <Leaf className="w-7 h-7 text-accent-foreground" />
            </div>
            <span className="text-2xl font-bold text-input">Kisan Ai</span>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-input mb-2">
              Create your account.
            </h1>
            <p className="text-input/70">
              Join thousands of farmers managing their operations smarter.
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            autoComplete="off"
            className="space-y-5"
          >
            <InputField
              label="Full Name"
              type="text"
              placeholder="John Doe"
              Icon={User}
              register={register("name", { required: "Name is required" })}
              error={errors.name?.message}
            />
            <InputField
              label="Email Address"
              type="email"
              placeholder="yourname@example.com"
              Icon={Mail}
              register={register("email", { required: "Email is required" })}
              error={errors.email?.message}
            />
            <InputField
              label="Password"
              placeholder="••••••••"
              Icon={Lock}
              psd
              register={register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              error={errors.password?.message}
            />

            <ImageUpload
              label="Profile Picture"
              image={profilePic}
              setImage={setProfilePic}
              placeholderText="Upload your profile photo"
              changeText="Change photo"
            />

            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="terms"
                className="mt-1 w-4 h-4 rounded border-login-panel-foreground/30 bg-login-panel-foreground/10 text-accent focus:ring-accent focus:ring-offset-0"
                {...register("terms")}
              />
              <label htmlFor="terms" className="text-sm text-input/70">
                I agree to the{" "}
                <a href="#" className="text-accent hover:underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-accent hover:underline">
                  Privacy Policy
                </a>
              </label>
            </div>
            {errors.terms && (
              <p className="text-red-500 text-xs mt-1">
                {errors.terms.message}
              </p>
            )}

            {error && <p className="text-sm text-red-400">{error}</p>}

            <LoaderBtn
              text="Create Account"
              loaderText="Submitting..."
              loading={loading}
            />
          </form>

          <div className="my-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-input/20" />
            <span className="text-sm text-input/50">or</span>
            <div className="h-px flex-1 bg-input/20" />
          </div>

          <p className="mt-8 text-center text-input/70">
            Don't have an account?{" "}
            <NavLink
              href="#"
              className="font-semibold text-accent hover:text-accent/80 transition-colors"
            >
              Sign In
            </NavLink>
          </p>
        </div>
      </div>
      <OTPModal
        isOpen={isOTPModalOpen}
        onClose={() => setIsOTPModalOpen(false)}
        email={emailForOTP}
        onSubmitOTP={handleOTPSubmit}
        error={error}
      />
    </div>
  );
};

export default Register;
