"use client";

import { useState, useCallback } from "react";
import { Github, FileText } from "lucide-react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type === "application/json" && selectedFile.size <= 500 * 1024 * 1024) {
        setFile(selectedFile);
        setMessage("");
      } else {
        setFile(null);
        setMessage("Please upload a .json file smaller than 500MB.");
      }
    }
  };

  const onDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === "application/json" && droppedFile.size <= 500 * 1024 * 1024) {
      setFile(droppedFile);
      setMessage("");
    } else {
      setFile(null);
      setMessage("Please upload a .json file smaller than 500MB.");
    }
  }, []);

  const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !file) {
      setMessage("Email and file are required.");
      return;
    }

    const formData = new FormData();
    formData.append("email", email);
    formData.append("file", file);

    try {
      const response = await fetch("/api/evaluate", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setMessage("Submission successful!");
        setEmail("");
        setFile(null);
      } else {
        const errorData = await response.json();
        setMessage(`Submission failed: ${errorData.error}`);
      }
    } catch (error) {
      setMessage("An error occurred during submission.");
    }
  };

  return (
    <div className="bg-white min-h-screen font-sans text-slate-800">
      <nav className="sticky top-0 bg-white/80 backdrop-blur-md z-10">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <span className="text-xl font-bold text-slate-900">PhotoBench</span>
            <div className="flex items-center space-x-6">
              <a href="/leaderboard" className="text-navy-blue hover:underline">
                Leaderboard
              </a>
              <a href="#" className="text-navy-blue hover:underline">
                Paper
              </a>
              <a href="https://github.com/LaVieEnRose365/PhotoBench/" className="text-navy-blue hover:underline flex items-center">
                <Github className="w-5 h-5 mr-1" />
                Github
              </a>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            PhotoBench: Beyond Visual Matching Towards Personalized Intent-Driven Photo Retrieval
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto"> 
            This is the official website for PhotoBench.
            Submit your evaluation file to see how your agent or model performs.
          </p>
        </div>

        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-navy-blue focus:border-navy-blue"
                placeholder="you@example.com"
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Evaluation File
              </label>
              <div
                onDrop={onDrop}
                onDragOver={onDragOver}
                className="flex justify-center items-center w-full h-32 px-6 py-4 border-2 border-dashed border-slate-300 rounded-md cursor-pointer hover:border-navy-blue"
                onClick={() => document.getElementById('file-upload')?.click()}
              >
                <div className="text-center">
                  {file ? (
                    <div className="flex items-center">
                      <FileText className="w-6 h-6 text-navy-blue mr-2" />
                      <span>{file.name}</span>
                    </div>
                  ) : (
                    <p className="text-sm text-slate-600">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                  )}
                  <p className="text-xs text-slate-500 mt-1">JSON only, max 500MB</p>
                </div>
                <input
                  type="file"
                  id="file-upload"
                  className="hidden"
                  accept=".json"
                  onChange={handleFileChange}
                />
              </div>
            </div>
            <a href="https://github.com/LaVieEnRose365/PhotoBench/" className="text-xs text-slate-500 mt-1">
              Here for sample file format
            </a>

            <button
              type="submit"
              className="w-full bg-navy-blue text-white font-bold py-2 px-4 rounded-md hover:bg-opacity-90 transition-colors"
            >
              Submit
            </button>
          </form>

          {message && (
            <div className="mt-6 p-4 bg-slate-100 text-slate-600 rounded-md text-center">
              {message}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
