"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleReset() {
    const res = await fetch("/api/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, newPassword }),
    });

    const data = await res.json();
    setMessage(data.message);
    if (data.code === 0) {
      // Optional: redirect to login after a few seconds
      setTimeout(() => router.push("/login"), 3000);
    }
  }

  return (
    <div className="p-4 max-w-md mx-auto mt-10 border rounded">
      <h1 className="text-xl font-bold mb-4">Reset Password</h1>
      <input
        type="password"
        placeholder="New Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        className="w-full p-2 mb-4 border"
      />
      <button onClick={handleReset} className="w-full bg-blue-500 text-white p-2">
        Reset Password
      </button>
      {message && <p className="mt-4 text-sm">{message}</p>}
    </div>
  );
}
