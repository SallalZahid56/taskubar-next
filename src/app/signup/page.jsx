"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

  // ✅ Google signup setup
  useEffect(() => {
    const handleGoogleResponse = async (response) => {
      try {
        const res = await fetch("/api/auth/google-signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token: response.credential }),
        });

        const data = await res.json();

        if (!res.ok) {
          setError(data.error || "Google signup failed");
          return;
        }

        console.log("✅ Google signup success:", data);
        setSuccess("Google signup successful! Redirecting...");
        setTimeout(() => {
          router.push("/user-dashboard");
        }, 1500);
      } catch (err) {
        console.error("Google signup error:", err);
        setError("Network error. Please try again.");
      }
    };

    if (window.google && googleClientId) {
      window.google.accounts.id.initialize({
        client_id: googleClientId,
        callback: handleGoogleResponse,
      });

      window.google.accounts.id.renderButton(
        document.getElementById("googleSignUpBtn"),
        {
          theme: "outline",
          size: "large",
          width: "100%",
          text: "signup_with",
          shape: "rectangular",
        }
      );
    }
  }, [googleClientId]);

  // ✅ Validate input fields before sending
  const validateForm = () => {
    if (!name.trim()) return "Name is required";
    if (!email.trim()) return "Email is required";
    if (!/\S+@\S+\.\S+/.test(email)) return "Invalid email format";
    if (!password.trim()) return "Password is required";
    if (password.length < 6)
      return "Password must be at least 6 characters long";
    return null;
  };

  // ✅ Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Frontend validation
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setBusy(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        // Handle backend errors
        setError(data.error || "Signup failed. Please try again.");
        setBusy(false);
        return;
      }

      // Success 🎉
      setSuccess("Signup successful! Redirecting...");
      setTimeout(() => {
        router.push("/dashboard");
      }, 1500);
    } catch (err) {
      console.error("Signup error:", err);
      setError("Network error. Please try again later.");
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4 py-6">
      <div className="flex flex-col md:flex-row w-full max-w-5xl h-auto md:h-[85vh] shadow-lg rounded-lg overflow-hidden">
        {/* Left Image */}
        <div className="w-full md:w-1/2 hidden md:block">
          <Image
            src="/assets/login-signup.jpg"
            alt="Signup"
            width={600}
            height={600}
            className="w-full h-full object-cover"
            priority
          />
        </div>

        {/* Right Form */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-center">
          {/* Logo */}
          <div className="mb-4 text-center md:text-left">
            <h1 className="text-2xl font-bold flex justify-center md:justify-start items-center gap-2">
              <span className="text-orange-500 text-3xl">g</span>
              <span className="text-blue-500 text-3xl">i</span>
              <span className="text-green-500 text-3xl">f</span>
              <span className="text-pink-500 text-3xl">t</span>
              <span className="text-gray-900 ml-2">
                GIFT <span className="font-bold">CARD</span>
              </span>
            </h1>
            <div className="mt-2 h-1 w-24 mx-auto md:mx-0 bg-gradient-to-r from-purple-400 to-purple-700"></div>
          </div>

          <h2 className="text-xl font-semibold mb-1 text-center md:text-left">
            Create an Account
          </h2>
          <p className="text-sm text-gray-500 mb-4 text-center md:text-left">
            Please fill in the details to sign up
          </p>

          <form className="space-y-3" onSubmit={handleSubmit}>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Full Name"
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <div className="relative">
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-gray-500 text-lg"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <button
              disabled={busy}
              type="submit"
              className={`w-full py-2 rounded-lg font-semibold transition ${busy
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-purple-500 to-purple-700 text-white hover:opacity-90"
                }`}
            >
              {busy ? "Signing up..." : "Signup"}
            </button>

            {/* ✅ Error or success messages */}
            {error && (
              <div className="text-red-500 text-sm text-center">{error}</div>
            )}
            {success && (
              <div className="text-green-600 text-sm text-center">
                {success}
              </div>
            )}

            <div className="text-center text-sm text-gray-500">or</div>

            {/* Google signup */}
            <div id="googleSignUpBtn" className="flex justify-center mt-2"></div>

            <p className="text-center text-sm text-gray-500 mt-2">
              Already have an account?{" "}
              <Link href="/login" className="text-purple-600 hover:underline">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
