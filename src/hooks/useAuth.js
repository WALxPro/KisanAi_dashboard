import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";
import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, updatePassword, reauthenticateWithCredential, EmailAuthProvider, signOut } from "firebase/auth";
import { get, post, put } from "../api/apiClient";
import { useDispatch } from "react-redux";
import { setUser } from "../store/slices/authSlice";


const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch()
  const navigate = useNavigate();
  
  const sendOtpAPI = async (data) => {
    console.log(data, "sendotp")
        const backendData = {
      name : data.name,
      email : data.email,
    };
  setError(null);
  setLoading(true);
  try {
    const response = await post("admin/send-signup-otp", backendData);
    return response;
  } catch (err) {
    const message =
      err?.response?.data?.detail?.email || 
      err?.response?.data?.detail?.general ||
      err.message ||
      "Failed to send OTP";
    setError(message);
    throw err;
  } finally {
    setLoading(false);
  }
};

const VerifyOtp = async ({ email, otp }) => {
  setError(null);
  try {
    setLoading(true);
    const response = await post("admin/verify-otp", {
      email,
      otp,
    });
    setLoading(false);
    return response;
  } catch (err) {
    const message =
      err.response?.data?.detail || "Failed to verify OTP";
    setError(message);
    setLoading(false);
    throw message;
  }
};
const signup = async (data) => {
  const {email,password} = data
  
  setError(null);
  setLoading(true);
  try {

    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    try {
        const backendData = {
      name : data.name,
      email : data.email,
      profile_picture : data.profileUrl
    };

      const response = await post("admin/signup", backendData);
      
      navigate("/");  
      console.log(response, "Signup success");
    } catch (err) {
      await userCredential.user.delete();
      throw new Error(err.response?.data?.detail || "Database save failed");
    }
    return userCredential.user;
  } catch (error) {
    if (error.code) {
      switch (error.code) {
        case "auth/email-already-in-use":
          setError("Email already registered");
          break;
        case "auth/invalid-email":
          setError("Invalid email address");
          break;
        case "auth/weak-password":
          setError("Password is too weak (min 6 characters)");
          break;
        default:
          setError(error.message || "Signup failed");
      }
    } else {
      setError(error.message || "Signup failed");
    }
    throw error;
  } finally {
    setLoading(false);
  }
};


const signin = async ({ email, password }) => {
  setError(null);
  setLoading(true);

  try {
    // 1️⃣ Firebase login
    const firebaseUser = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    // 2️⃣ Backend login (validate user)
    const response = await get(`admin/login/${email}`);

    if (!response?.user) {
      throw new Error("Backend user not found");
    }

    dispatch(setUser(response.user));

    // 3️⃣ Notification (ONLY if login fully successful)
    const payload = {
      title: "Login Alert",
      message: `${response.user.name} logged in successfully`,
      type: "login",
      user_id: response.user._id,
      target_role:"admin"
    };

    await post(`notifications/create`, payload);

    // 4️⃣ Navigate last step
    navigate("/dashboard");

  } catch (error) {
    if (error.code) {
      switch (error.code) {
        case "auth/user-not-found":
          setError("User not found");
          break;
        case "auth/wrong-password":
          setError("Incorrect password");
          break;
        case "auth/invalid-email":
          setError("Invalid email");
          break;
        default:
          setError("Firebase login failed");
      }
    } else {
      setError(error.message || "Login failed");
    }
  } finally {
    setLoading(false);
  }
};
const handleSendResetEmail = async ({ email }) => {  // <- receive email from component
  setError(null);
  setLoading(true);

  try {
    await sendPasswordResetEmail(auth, email);
    console.log("Password reset email sent:", email);
  } catch (err) {
    console.error("Error sending reset email:", err);
    if (err.code === "auth/user-not-found") {
      setError("This email is not registered.");
    } else if (err.code === "auth/invalid-email") {
      setError("Invalid email address.");
    } else {
      setError("Failed to send reset email. Try again later.");
    }
    throw err; // optionally throw for component-level handling
  } finally {
    setLoading(false);
  }
};

const updateProfile = async (email, data) => {
  setError(null);
  setLoading(true);
  try {
    const response = await put(`admin/update/${encodeURIComponent(email)}`, data);
    dispatch(setUser({ ...response.admin }));
    return response;
  } catch (err) {
    const message = err?.response?.data?.detail || err.message || "Failed to update profile";
    setError(message);
    throw err;
  } finally {
    setLoading(false);
  }
};

const updatePasswordFirebase = async ({ currentPassword, newPassword }) => {
  setError(null);
  setLoading(true);
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("No user logged in");

    const credential = EmailAuthProvider.credential(user.email, currentPassword);
    await reauthenticateWithCredential(user, credential);
    await updatePassword(user, newPassword);
    
    return { message: "Password updated successfully" };
  } catch (err) {
    let message = "Failed to update password";
    if (err.code === "auth/wrong-password") {
      message = "Current password is incorrect";
    } else if (err.code === "auth/weak-password") {
      message = "New password is too weak";
    } else {
      message = err.message || message;
    }
    setError(message);
    throw err;
  } finally {
    setLoading(false);
  }
};

 const logoutUser = async () => {
  try {
    await signOut(auth);
    console.log("User logged out successfully");
  } catch (error) {
    console.error("Logout failed:", error.message);
    throw error;
  }
};

  return {
    loading,
    error,
    signup,
    sendOtpAPI,
    VerifyOtp,
    signin,
    handleSendResetEmail,
    updateProfile,
    updatePasswordFirebase,
    logoutUser
  };
};

export default useAuth;
