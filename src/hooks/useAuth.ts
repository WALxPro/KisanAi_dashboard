import { useState } from "react";
import { auth, db } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  FacebookAuthProvider,
  User,
} from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

type ProviderType = "google" | "github" | "facebook";

interface UseAuthReturn {
  signUpWithProvider: (provider: ProviderType) => Promise<void>;
  signUpWithEmail: (email: string, password: string) => Promise<void>;
  loading: boolean;
  error: string | null;
}

const useAuth = (): UseAuthReturn => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Firestore save helper
  const saveUserProfile = async (user: User, provider: string) => {
    const userRef = doc(db, "users", user.uid);
    const snap = await getDoc(userRef);

    if (!snap.exists()) {
      await setDoc(userRef, {
        fullName: user.displayName || "",
        email: user.email,
        photoURL: user.photoURL || "",
        provider,
        role: "admin",
        createdAt: serverTimestamp(),
      });
    }
  };

  // OAuth signup
  const signUpWithProvider = async (providerType: ProviderType) => {
    setLoading(true);
    setError(null);

    try {
      let providerInstance;
      switch (providerType) {
        case "google":
          providerInstance = new GoogleAuthProvider();
          break;
        case "github":
          providerInstance = new GithubAuthProvider();
          break;
        case "facebook":
          providerInstance = new FacebookAuthProvider();
          break;
        default:
          throw new Error("Unsupported provider");
      }

      const result = await signInWithPopup(auth, providerInstance);
      await saveUserProfile(result.user, providerType);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Email/Password signup
  const signUpWithEmail = async (email: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save user profile
      await saveUserProfile(user, "email");

      // Send email verification
      await sendEmailVerification(user);

      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { signUpWithProvider, signUpWithEmail, loading, error };
};

export default useAuth;
