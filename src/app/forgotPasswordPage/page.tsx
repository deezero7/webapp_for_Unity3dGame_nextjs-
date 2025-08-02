"use client";

import React, { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendResetEmail = async () => {
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(
        "https://nodejs-server-for-unity3dgame-login-5vxc.onrender.com/u3d/forgotPassword",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await res.json();
      setMessage(data.message || "Email sent successfully!");
    } catch (err) {
      setMessage("Something went wrong. Please try again later.");
    }

    setLoading(false);
  };

  return (
    <div className="p-8 max-w-sm mx-auto">
      <h2 className="text-xl font-bold mb-4">Forgot Password</h2>
      <p className="mb-4">Enter your email to receive a reset link.</p>

      <input
        type="email"
        placeholder="Your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
      />

      <button
        onClick={handleSendResetEmail}
        className="w-full bg-blue-600 text-white p-2 rounded"
        disabled={loading}
      >
        {loading ? "Sending..." : "Send Reset Email"}
      </button>

      {message && <p className="mt-4 text-sm text-center">{message}</p>}

      <p className="text-sm mt-4 text-center">
        <a href="/login" className="text-blue-500 underline">
          Back to Login
        </a>
      </p>
    </div>
  );
}
