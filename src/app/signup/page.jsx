"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

  // Google signup
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

        setSuccess("Google signup successful! Redirecting...");
        setTimeout(() => {
          router.push("/user-dashboard");
        }, 1500);
      } catch (err) {
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

  // Form validation
  const validateForm = () => {
    if (!name.trim()) return "Name is required";
    if (!email.trim()) return "Email is required";
    if (!/\S+@\S+\.\S+/.test(email)) return "Invalid email format";
    if (!password.trim()) return "Password is required";
    if (password.length < 6)
      return "Password must be at least 6 characters long";
    return null;
  };

  // Handle signup
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const validationError = validateForm();
    if (validationError) return setError(validationError);

    setBusy(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, referralCode }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Signup failed.");
        setBusy(false);
        return;
      }

      setSuccess("Signup successful! Redirecting...");
      setTimeout(() => router.push("/user-dashboard"), 1500);
    } catch (err) {
      setError("Network error. Try later.");
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-white overflow-y-auto px-4 py-6">
      <div className="flex flex-col md:flex-row w-full max-w-5xl mx-auto shadow-lg rounded-lg overflow-hidden bg-white">

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
        <div className="w-full md:w-1/2 p-6 sm:p-8">
          {/* Logo */}
          <div className="mb-4 text-center md:text-left">
            <h1 className="text-2xl font-bold flex justify-center md:justify-start items-center gap-2">
              <span className="text-orange-500 text-3xl">T</span>
              <span className="text-blue-500 text-3xl">a</span>
              <span className="text-green-500 text-3xl">s</span>
              <span className="text-pink-500 text-3xl">k</span>
              <span className="text-pink-500 text-3xl">u</span>
              <span className="text-pink-500 text-3xl">b</span>
              <span className="text-pink-500 text-3xl">e</span>
              <span className="text-pink-500 text-3xl">r</span>
              <span className="text-gray-900 ml-2">
                Task <span className="font-bold">uber</span>
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
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
            />

            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
            />

            <div className="relative">
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-gray-500 text-lg"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <input
              value={referralCode}
              onChange={(e) => setReferralCode(e.target.value)}
              type="text"
              placeholder="Referral Code (optional)"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
            />

            <button
              disabled={busy}
              type="submit"
              className={`w-full py-2 rounded-lg font-semibold transition ${
                busy
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-purple-500 to-purple-700 text-white hover:opacity-90"
              }`}
            >
              {busy ? "Signing up..." : "Signup"}
            </button>

            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            {success && (
              <p className="text-green-600 text-sm text-center">{success}</p>
            )}

            <div className="text-center text-sm text-gray-500">or</div>

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
