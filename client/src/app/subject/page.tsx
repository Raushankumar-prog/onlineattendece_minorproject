"use client";

import { useMutation } from "@apollo/client";
import { CREATE_SUBJECT } from "@/graphql/queries/createsubject";
import { useState } from "react";

export default function SubjectPage() {
  const [name, setName] = useState("");
  const [subjectCode, setSubjectCode] = useState("");
  const [createSubject, { data, loading, error }] = useMutation(CREATE_SUBJECT);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !subjectCode) return;

    try {
      await createSubject({ variables: { name, subjectcode: subjectCode } });
      setName("");
      setSubjectCode("");
    } catch (err) {
      console.error("Error creating subject", err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black p-6">
      <form 
        onSubmit={handleSubmit} 
        className="bg-gray-900 shadow-2xl rounded-2xl p-8 w-full max-w-md space-y-6 transform transition-all duration-500 hover:scale-105 hover:shadow-blue-500/50">
        <h2 className="text-2xl font-semibold text-center text-white">Create a Subject</h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Subject Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border border-gray-700 bg-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-white placeholder-gray-400"
            required
          />
          <input
            type="text"
            placeholder="Subject Code"
            value={subjectCode}
            onChange={(e) => setSubjectCode(e.target.value)}
            className="w-full p-3 border border-gray-700 bg-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-white placeholder-gray-400"
            required
          />
          <input 
            type="submit" 
            value={loading ? "Creating..." : "Create Subject"} 
            className="w-full p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/50"
          />
        </div>
        {error && <p className="text-red-500 text-center mt-2">Error: {error.message}</p>}
        {data && <p className="text-green-500 text-center mt-2">Subject created: {data.createSubject.name}</p>}
      </form>
    </div>
  );
}