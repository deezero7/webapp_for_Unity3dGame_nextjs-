"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignup = async () => {
    try {
      const res = await axios.post(
        "https://nodejs-server-for-unity3dgame-login-5vxc.onrender.com/u3d/createacc",
        {
          username,
          password,
        }
      );
      if (res.data.code === 0) {
        alert("Account created successfully! Please log in.");
        router.push("/login");
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      alert("Signup failed. Server error.");
    }
  };

  return (
    <div className="p-8 max-w-sm mx-auto">
      <h2 className="text-xl font-bold mb-4">Sign Up</h2>
      <input
        className="border p-2 w-full mb-2"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className="border p-2 w-full mb-4"
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={handleSignup}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Sign Up
      </button>
      <p className="mt-4 text-sm">
        Already have an account?{" "}
        <a href="/login" className="text-blue-500 underline">
          Log in
        </a>
      </p>
    </div>
  );
}
