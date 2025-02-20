"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@apollo/client";
import { loginstudent, loginteaher } from "@/graphql/queries/login";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const router = useRouter();
  const [loginStudent] = useMutation(loginstudent);
  const [loginTeacher] = useMutation(loginteaher);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      router.push("/");
    }
  }, [router]);

  const handleLogin = async () => {
    try {
      const mutation = role === "student" ? loginStudent : loginTeacher;
      const { data } = await mutation({
        variables: { email, password },
      });

      const token = data?.loginStudent?.token || data?.loginTeacher?.token;
      if (token) {
        Cookies.set("token", token, { expires: 7, secure: true });
        toast.success("Login successful!");
        router.push("/");
      } else {
        toast.error("Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Login Error:", error);
      toast.error("Login failed. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 text-white">
      <div className="w-full max-w-sm p-6 bg-gray-800 rounded-lg shadow-md">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-semibold text-blue-400">proxima</h1>
          <p className="text-sm text-gray-400 mt-2">Login with your email</p>
        </div>

        <div>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full rounded-md border border-gray-600 bg-gray-700 px-4 py-2 text-white outline-none focus:border-blue-500"
          >
            <option value="student">Login as Student</option>
            <option value="teacher">Login as Teacher</option>
          </select>
          <input
            type="text"
            placeholder="Email address"
            className="w-full p-3 mt-4 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 mt-4 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            onClick={handleLogin}
            className="w-full mt-4 p-3 bg-gray-500 rounded text-white font-semibold hover:bg-blue-600"
          >
            Log in
          </button>
        </div>
        <div className="flex justify-between mt-3">
          <Link href="/forget_password" className="text-sm text-gray-400 hover:underline">
            Forgot password?
          </Link>
          <Link href="/sign_up" className="text-sm text-blue-400 hover:underline">
            Sign up
          </Link>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
