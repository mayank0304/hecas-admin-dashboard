"use client";

import { useState } from "react";
import { Shield, Eye, EyeOff } from "lucide-react";

interface AdminAuthProps {
  onAuthenticated: () => void;
}

export default function AdminAuth({ onAuthenticated }: AdminAuthProps) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      const result = await response.json();

      if (result.success) {
        onAuthenticated();
      } else {
        setError("Incorrect password. Please try again.");
        setPassword("");
      }
    } catch (error) {
      setError("Authentication failed. Please try again.");
      setPassword("");
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-[--bg] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[--primary]/20 rounded-2xl mb-4">
            <Shield size={32} color="#22C55E" />
          </div>
          <h1 className="text-3xl font-bold text-[--text] mb-2">Admin Panel</h1>
          <p className="text-[--text-muted] text-lg">
            Enter password to access dashboard
          </p>
        </div>

        {/* Auth Form */}
        <div className="bg-[--card] border border-[--border] rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-[--text] mb-2"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-[--bg] border border-[--border] rounded-lg text-[--text] placeholder-[--text-muted] focus:outline-none focus:ring-2 focus:ring-[--primary] focus:border-transparent transition-all"
                  placeholder="Enter admin password"
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[--text-muted] hover:text-[--text] transition-colors"
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                <p className="text-red-400 text-sm font-medium">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading || !password.trim()}
              className="w-full bg-[--primary] text-white font-semibold py-3 px-4 rounded-lg hover:bg-[--primary]/90 disabled:bg-[--text-muted] disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                  Authenticating...
                </>
              ) : (
                "Access Dashboard"
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 pt-6 border-t border-[--border] text-center">
            <p className="text-[--text-muted] text-sm">
              HECAS Device Monitoring System
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
