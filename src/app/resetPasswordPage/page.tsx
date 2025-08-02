"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const PASSWORD_REGEX = new RegExp(
  "^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{6,25}$"
);

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [token, setToken] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [passwordValid, setPasswordValid] = useState(true);

  useEffect(() => {
    const t = searchParams.get("token");
    const e = searchParams.get("email");

    if (t && e) {
      setToken(t);
      setEmail(e);
    } else {
      setError("Missing token or email in URL");
    }
  }, [searchParams]);

  useEffect(() => {
    // live validate as user types
    if (newPassword) {
      setPasswordValid(PASSWORD_REGEX.test(newPassword));
    }
  }, [newPassword]);

  const handleReset = async () => {
    setError("");
    setMessage("");

    if (!token || !email || !newPassword || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (!PASSWORD_REGEX.test(newPassword)) {
      setError("Password doesn't meet strength requirements.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await fetch(
        "https://nodejs-server-for-unity3dgame-login-5vxc.onrender.com/u3d/resetPassword",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token, email, newPassword }),
        }
      );

      const data = await res.json();
      if (data.code === 0) {
        setMessage("Password reset successful! Redirecting...");
        setTimeout(() => router.push("/login"), 2000);
      } else {
        setError(data.message || "Reset failed.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto mt-20 border rounded shadow">
      <h1 className="text-2xl font-semibold mb-4">Reset Password</h1>

      {error && <p className="text-red-600 mb-2">{error}</p>}
      {message && <p className="text-green-600 mb-2">{message}</p>}

      <input
        type="password"
        placeholder="New Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        className="w-full p-3 mb-2 border rounded"
      />
      {!passwordValid && newPassword && (
        <p className="text-sm text-red-500 mb-2">
          Password must be 6–25 chars and include 1 uppercase, 1 lowercase, 1
          number, and 1 special character (@$!%*?&).
        </p>
      )}

      <input
        type="password"
        placeholder="Repeat New Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="w-full p-3 mb-4 border rounded"
      />

      <button
        onClick={handleReset}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Reset Password
      </button>
    </div>
  );
}
