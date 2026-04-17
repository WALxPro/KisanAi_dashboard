import { Leaf, Lock, Mail } from "lucide-react";
import { dashboardPreview } from "../../assets";
import { NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../services/validation/LoginSchema";
import { InputField, LoaderBtn, SocailButton } from "../../components";
import useAuth from "../../hooks/useAuth";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

const Login = () => {
  const { signin, loading, error } = useAuth();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = () => {
    try {
      const formData = getValues();

     signin({
        email: formData.email,
        password: formData.password,
      });

      
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="flex w-full flex-col justify-center bg-login-panel px-8 py-12 lg:w-[40%] lg:px-16 xl:px-24">
        <div className="mx-auto w-full max-w-md">
          <div className="mb-12 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent">
              <Leaf className="h-6 w-6 text-accent-foreground" />
            </div>
            <span className="text-3xl font-semibold text-input">Kisan Ai</span>
          </div>

          <div className="mb-8">
            <h1 className="mb-2 text-3xl font-bold text-input">
              Log in to your account.
            </h1>
            <p className="text-input/70">
              Enter your email address and password to log in.
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            autoComplete="off"
            className="space-y-5"
          >
            <InputField
              label="Email Address"
              type="email"
              placeholder="yourname@example.com"
              Icon={Mail}
              register={register("email")}
              error={errors.email?.message}
            />

            <InputField
              label="Password"
              placeholder="••••••••"
              Icon={Lock}
              psd
              fsd
              register={register("password")}
              error={errors.password?.message}
            />
            {error && <p className="text-sm text-red-400">{error}</p>}

            <LoaderBtn text="Login" loaderText="Login..." loading={loading} />
          </form>

          <div className="my-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-input/20" />
            <span className="text-sm text-input/50">or</span>
            <div className="h-px flex-1 bg-input/20" />
          </div>

          <p className="mt-8 text-center text-input/70">
            Don't have an account?{" "}
            <NavLink
              to="/register"
              className="font-semibold text-accent hover:text-accent/80 transition-colors"
            >
              Sign Up
            </NavLink>
          </p>
        </div>
      </div>

      <div className="relative hidden overflow-hidden bg-gradient-to-br from-secondary via-background to-accent/10 lg:flex lg:w-[60%] lg:flex-col lg:items-center lg:justify-center lg:p-12">
        <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />

        <div className="relative z-10 w-full max-w-2xl transform transition-transform duration-500 hover:scale-[1.02]">
          <div className="relative rounded-2xl shadow-2xl shadow-primary/20 overflow-hidden">
            <img
              src={dashboardPreview}
              alt="KisanAi Dashboard Preview"
              className="w-full h-auto"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
