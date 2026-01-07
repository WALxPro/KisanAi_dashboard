import { Box, Stack, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { background, logoGreen } from "../../assets";
import Input from "../../components/common/InputField";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import PrimaryButton from "../../components/common/PrimaryButton";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import IconBtn from "../../components/common/IconBtn";

const Signin: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { signUpWithProvider, signUpWithEmail, loading, error } = useAuth();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
      }}
    >
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={4}
        sx={{
          height: { xs: "auto", md: "90vh" },
          width: { xs: "100%", md: "80vw" },
          overflow: "hidden",
          boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.15)",
          borderRadius: 3,
        }}
      >
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            mx: 14,
            alignItems: "center",
            justifyContent: "center",
            width: { xs: "100%", md: "50%" },
          }}
        >
          <Box
            sx={{
              width: "70%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            {/* Logo */}
            <Box>
              <img
                src={logoGreen}
                alt="Logo"
                style={{ width: 230, height: "auto" }}
              />
            </Box>

            <Typography variant="h1" mb={2} sx={{ color: "text.primary" }}>
              Login to your account
            </Typography>
            <Typography variant="body1" mb={6} sx={{ color: "text.secondary" }}>
              Enter your email address and password to login.
            </Typography>

            <Input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              icon={<EmailIcon />}
            />

            <Input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              icon={<LockIcon />}
            />

            <Typography
              variant="body1"
              sx={{
                textAlign: "right",
                color: "text.secondary",
                width: "100%",
                mt: 1,
              }}
            >
              <Link
                to="#"
                style={{
                  color: "#0a4b0cff",
                  textTransform: "none",
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                Forgot Password?
              </Link>
            </Typography>

            <PrimaryButton name="Login" onClick={() => signUpWithEmail(email, password)} />

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                my: 1,
                width: "100%",
              }}
            >
              <Box
                sx={{ flex: 1, height: "1px", backgroundColor: "grey.400" }}
              />
              <Typography
                variant="body2"
                sx={{ mx: 2, color: "text.secondary", whiteSpace: "nowrap" }}
              >
                or
              </Typography>
              <Box
                sx={{ flex: 1, height: "1px", backgroundColor: "grey.400" }}
              />
            </Box>

            {/* Social Login Buttons */}
            <Stack
              flexDirection="row"
              justifyContent="space-evenly"
              my={3}
              width="100%"
            >
              <IconBtn
                icon={<FacebookIcon />}
                text="Facebook"
                width="30%"
                onClick={() => signUpWithProvider("facebook")}
              />
              <IconBtn
                icon={<GoogleIcon />}
                text="Google"
                width="30%"
                onClick={() => signUpWithProvider("google")}
              />
              <IconBtn
                icon={<GitHubIcon />}
                text="Github"
                width="30%"
                onClick={() => signUpWithProvider("github")}
              />
            </Stack>

            {/* Show error / success messages
            {error && (
              <Typography color="error" mt={1}>
                {error}
              </Typography>
            )}
            {success && (
              <Typography color="success.main" mt={1}>
                Signed in successfully!
              </Typography>
            )} */}

            <Typography
              variant="body1"
              sx={{ textAlign: "center", color: "text.secondary" }}
            >
              Don't have an account?{" "}
              <Link
                to="/register"
                style={{
                  color: "#0a4b0cff",
                  textDecoration: "none",
                  fontWeight: 800,
                }}
              >
                Sign up
              </Link>
            </Typography>
          </Box>
        </Box>


        <Box
          flex={1}
          sx={{
            width: { xs: "100%", md: "50%" },
            height: { xs: 200, md: "100%" },
            overflow: "hidden",
            position: "relative",
          }}
        >
          <img
            src={background}
            alt="Illustration"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2))",
            }}
          />
        </Box>
      </Stack>
    </Box>
  );
};

export default Signin;
