"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import axios from "axios";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "https://nodejs-server-for-unity3dgame-login-5vxc.onrender.com/u3d/login",
        {
          username,
          password,
        }
      );
      if (res.data.code === 0) {
        Cookies.set("token", res.data.userData.token, { expires: 7 });
        router.push("./dashboard");
      } else {
        alert(res.data.message);
      }
    } catch {
      alert("Login failed. Check server or credentials.");
    }
  };

  return (
    <div className="p-8 max-w-sm mx-auto">
      <h2 className="text-xl font-bold mb-4">Login</h2>
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
        onClick={handleLogin}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Login
      </button>
      <p className="mt-4 text-sm">
        Don&apos;t have an account?{" "}
        <a href="./signup" className="text-blue-500 underline">
          Sign up
        </a>
      </p>
      <p className="mt-4 text-sm">
        Forgot Password ?{" "}
        <a href="./forgotPasswordPage" className="text-blue-500 underline">
          Reset password
        </a>
      </p>
    </div>
  );
}
