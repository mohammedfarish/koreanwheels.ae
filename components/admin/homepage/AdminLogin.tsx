"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import adminActionsDirectory from "@/utils/functions/admin/adminActionsDirectory";
import { company } from "@/utils/companyData";

const PASSWORD_INPUT_ID = "admin-login-password";

export const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window.HSStaticMethods?.autoInit) {
      window.HSStaticMethods.autoInit();
    }
  }, [error, email, password]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const res = await adminActionsDirectory("login", { email, password });
    if (res.success) {
      window.location.reload();
      return;
    }
    setError(res.error ?? "Login failed");
    setLoading(false);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-50 p-0 sm:px-4 sm:py-12 dark:bg-neutral-900 duration-200">
      <div className="w-full max-w-none min-h-screen sm:min-h-0 sm:max-w-sm flex flex-col sm:block">
        {/* Card - full screen background on mobile */}
        <div className="rounded-none sm:rounded-xl border-0 sm:border border-gray-200 bg-white p-6 shadow-none sm:shadow-sm dark:border-neutral-700 dark:bg-neutral-800 sm:p-8 min-h-screen sm:min-h-0 flex flex-col justify-center">
          <div className="flex justify-center">
            <Image src="/api/img/logo" alt={company.tradeName} width={140} height={40} className="h-10 w-auto object-contain dark:hidden" unoptimized />
            <Image
              src="/api/img/logo-light"
              alt={company.tradeName}
              width={140}
              height={40}
              className="hidden h-10 w-auto object-contain dark:block"
              unoptimized
            />
          </div>

          <div className="mt-8 text-center">
            <h1 className="text-xl font-semibold text-gray-800 dark:text-neutral-200">Sign in</h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-neutral-400">Enter your credentials to access the admin area.</p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
            {/* Email - Preline input */}
            <div>
              <label htmlFor="admin-login-email" className="mb-2 block text-sm font-medium text-gray-800 dark:text-neutral-200">
                Email address
              </label>
              <input
                id="admin-login-email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                disabled={loading}
                className="block w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-600 dark:bg-neutral-700 dark:text-neutral-200 dark:placeholder:text-neutral-500 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              />
            </div>

            {/* Password - Preline input with toggle */}
            <div>
              <label htmlFor={PASSWORD_INPUT_ID} className="mb-2 block text-sm font-medium text-gray-800 dark:text-neutral-200">
                Password
              </label>
              <div className="relative flex">
                <input
                  id={PASSWORD_INPUT_ID}
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  disabled={loading}
                  className="block w-full rounded-lg border border-gray-200 bg-white py-3 pl-4 pr-12 text-sm text-gray-800 placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-600 dark:bg-neutral-700 dark:text-neutral-200 dark:placeholder:text-neutral-500 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                />
                <button
                  type="button"
                  data-hs-toggle-password={JSON.stringify({ target: `#${PASSWORD_INPUT_ID}` })}
                  className="absolute end-0 top-0 inline-flex h-full items-center justify-center rounded-e-lg border border-transparent px-3 text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:pointer-events-none dark:hover:bg-neutral-600 dark:focus:ring-blue-500"
                  aria-label="Toggle password visibility"
                >
                  <svg className="h-4 w-4 shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Error - Preline alert style */}
            {error && (
              <div
                className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800 dark:border-red-800 dark:bg-red-950/30 dark:text-red-200"
                role="alert"
              >
                {error}
              </div>
            )}

            {/* Submit - Preline primary button */}
            <button
              type="submit"
              disabled={loading}
              className="inline-flex w-full items-center justify-center gap-x-2 rounded-lg border border-transparent bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:focus:ring-offset-neutral-800"
            >
              {loading ? (
                <>
                  <span className="inline-block size-4 animate-spin rounded-full border-2 border-current border-t-transparent" aria-hidden />
                  Signing in…
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-xs text-gray-500 dark:text-neutral-400">
          Authorized personnel only. By signing in you agree to use this system in accordance with your organization’s policies.
        </p>
      </div>
    </div>
  );
};
