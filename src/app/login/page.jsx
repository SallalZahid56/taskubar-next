"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { jwtDecode } from "jwt-decode";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const router = useRouter();
  const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

  // Google login
  useEffect(() => {
    const handleGoogleLogin = async (response) => {
      try {
        const res = await fetch("/api/auth/google-signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token: response.credential }),
        });

        const data = await res.json();

        if (!res.ok) {
          setError(data.error || "Google login failed");
          return;
        }

        setSuccess("Login successful! Redirecting...");
        setTimeout(() => {
          if (data.user.role === "ADMIN") {
            router.push("/admin-dashboard");
          } else {
            router.push("/user-dashboard");
          }
        }, 1500);
      } catch (err) {
        console.error("Google login error:", err);
        setError("Network error. Please try again.");
      }
    };

    if (window.google && googleClientId) {
      window.google.accounts.id.initialize({
        client_id: googleClientId,
        callback: handleGoogleLogin,
      });

      window.google.accounts.id.renderButton(
        document.getElementById("googleLoginBtn"),
        {
          theme: "outline",
          size: "large",
          width: "100%",
          text: "signin_with",
          shape: "rectangular",
        }
      );
    }
  }, [googleClientId, router]);

  // Email login
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setBusy(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Invalid credentials");
        setBusy(false);
        return;
      }

      setSuccess("Login successful! Redirecting...");
      setTimeout(() => {
        if (data.user.role === "ADMIN") {
          router.push("/admin-dashboard");
        } else {
          router.push("/user-dashboard");
        }
      }, 1500);
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
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
            alt="Login illustration"
            width={800}
            height={600}
            className="w-full h-full object-cover"
            priority
          />
        </div>

        {/* Right Form */}
        <div className="w-full md:w-1/2 p-6 sm:p-8">
          <div className="mb-4 text-center md:text-left">
            <h1 className="text-2xl font-bold flex justify-center md:justify-start items-center gap-2">
              <span className="text-orange-500 text-3xl">T</span>
              <span className="text-blue-500 text-3xl">a</span>
              <span className="text-green-500 text-3xl">s</span>
              <span className="text-pink-500 text-3xl">k</span>
              <span className="text-gray-900 ml-2">
                Task<span className="font-bold">Uber</span>
              </span>
            </h1>
            <div className="mt-2 h-1 w-24 mx-auto md:mx-0 bg-gradient-to-r from-purple-400 to-purple-700"></div>
          </div>

          <h2 className="text-xl font-semibold mb-1 text-center md:text-left">
            Login to your Account
          </h2>
          <p className="text-sm text-gray-500 mb-4 text-center md:text-left">
            Welcome back! Please enter your details.
          </p>

          <form className="space-y-3" onSubmit={handleSubmit}>
            
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-gray-500 text-lg"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" /> Remember me
              </label>
              <Link href="/forgot-password" className="text-purple-600 hover:underline">
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={busy}
              className={`w-full py-2 rounded-lg font-semibold transition ${
                busy
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-purple-500 to-purple-700 text-white hover:opacity-90"
              }`}
            >
              {busy ? "Logging in..." : "Login"}
            </button>

            {error && (
              <div className="text-red-500 text-sm text-center">{error}</div>
            )}
            {success && (
              <div className="text-green-600 text-sm text-center">{success}</div>
            )}

            <div className="text-center text-sm text-gray-500">or</div>

            <div id="googleLoginBtn" className="w-full flex justify-center mt-2"></div>

            <p className="text-center text-sm text-gray-500 mt-2">
              Don’t have an account?{" "}
              <Link href="/signup" className="text-purple-600 hover:underline">
                Signup
              </Link>
            </p>

          </form>
        </div>
      </div>
    </div>
  );
}
