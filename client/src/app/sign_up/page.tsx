"use client";

import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import { CREATE_STUDENT, CREATE_TEACHER } from "@/graphql/queries/create_student";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

export default function SignUpPage() {
  const [role, setRole] = useState("student"); // Default role
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [scholarNumber, setScholarNumber] = useState(""); // Only for students
  const [branch, setBranch] = useState("");
  const [semester, setSemester] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const router = useRouter();

  const [createStudent, { loading: studentLoading }] = useMutation(CREATE_STUDENT);
  const [createTeacher, { loading: teacherLoading }] = useMutation(CREATE_TEACHER);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      router.push("/");
    }
  }, [router]);

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      let data;
      if (role === "student") {
        data = await createStudent({
          variables: { name, email, scholarnumber: scholarNumber, branch, semester, password },
        });
      } else {
        data = await createTeacher({ variables: { name, email, password } });
      }

      toast.success("Sign-up successful!");
      Cookies.set("token", data?.createStudent?.id || data?.createTeacher?.id, { expires: 7 });
      router.push("/");
    } catch (err) {
      toast.error(`Sign-up failed: ${err.message}`);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 p-4">
      <div className="w-full max-w-md rounded-lg bg-gray-800 p-6 shadow-lg">
        <h2 className="text-center text-3xl font-semibold text-blue-500">Proxima</h2>
        <p className="mb-4 text-center text-gray-300">One Proxima account is all you need.</p>

        <form onSubmit={handleSignUp} className="space-y-4">
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full rounded-md border border-gray-600 bg-gray-700 px-4 py-2 text-white outline-none focus:border-blue-500"
          >
            <option value="student">Sign up as Student</option>
            <option value="teacher">Sign up as Teacher</option>
          </select>

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-md border border-gray-600 bg-gray-700 px-4 py-2 text-white outline-none focus:border-blue-500"
            required
          />

          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border border-gray-600 bg-gray-700 px-4 py-2 text-white outline-none focus:border-blue-500"
            required
          />

          {role === "student" && (
            <>
              <input
                type="text"
                placeholder="Scholar Number"
                value={scholarNumber}
                onChange={(e) => setScholarNumber(e.target.value)}
                className="w-full rounded-md border border-gray-600 bg-gray-700 px-4 py-2 text-white outline-none focus:border-blue-500"
                required
              />

              <input
                type="text"
                placeholder="Branch"
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                className="w-full rounded-md border border-gray-600 bg-gray-700 px-4 py-2 text-white outline-none focus:border-blue-500"
                required
              />

              <input
                type="text"
                placeholder="Semester"
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
                className="w-full rounded-md border border-gray-600 bg-gray-700 px-4 py-2 text-white outline-none focus:border-blue-500"
                required
              />
            </>
          )}

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-md border border-gray-600 bg-gray-700 px-4 py-2 text-white outline-none focus:border-blue-500"
            required
          />

          <input
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full rounded-md border border-gray-600 bg-gray-700 px-4 py-2 text-white outline-none focus:border-blue-500"
            required
          />

          <label className="flex items-center space-x-2 text-gray-300">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={() => setIsChecked(!isChecked)}
              className="h-4 w-4"
            />
            <span>I confirm the Terms of Use & Privacy Policy</span>
          </label>

          <button
            type="submit"
            className={`w-full rounded-md px-4 py-2 font-semibold text-white transition ${
              isChecked ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-500 cursor-not-allowed"
            }`}
            disabled={!isChecked || studentLoading || teacherLoading}
          >
            {studentLoading || teacherLoading ? "Signing up..." : "Sign up"}
          </button>
        </form>

        <div className="text-right mt-4">
          <Link href="/sign_in" className="text-blue-500 hover:underline text-sm">
            Log in
          </Link>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
