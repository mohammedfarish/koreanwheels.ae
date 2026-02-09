"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import actionsDirectory from "@/utils/functions/actionsDirectory";

const SiteLock = () => {
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    startTransition(async () => {
      const result = await actionsDirectory("site-lock-auth", passcode);

      if (result.success) {
        router.refresh();
      } else {
        setError(result.error || "Invalid passcode. Please try again.");
        setPasscode("");
      }
    });
  };

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-black text-white">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-[#0a0a0a] opacity-100" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900/20 via-black to-black" />

      <div className="relative z-10 mx-auto flex min-h-screen items-center justify-center px-6 py-20 sm:px-8 lg:px-12">
        <div className="w-full max-w-md">
          <div className="mb-6 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-gray-800 bg-gray-900/50 px-4 py-1.5 text-sm text-gray-300">
              <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
              Site Under Development
            </div>
          </div>

          <div className="mb-8 text-center">
            <h1 className="mb-6 bg-gradient-to-b from-white via-gray-100 to-gray-400 bg-clip-text text-4xl font-semibold leading-tight text-transparent sm:text-5xl md:text-6xl">
              Authorized Access Only
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-400 sm:text-xl">
              This site is currently under development. Authorized personnel can access with a passcode.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-800 bg-gradient-to-b from-gray-900/50 to-gray-900/30 p-8 transition-all duration-300">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="passcode" className="mb-2 block text-sm font-medium text-gray-300">
                  Passcode
                </label>
                <input
                  id="passcode"
                  type="password"
                  value={passcode}
                  onChange={(e) => {
                    setPasscode(e.target.value);
                    setError("");
                  }}
                  placeholder="Enter passcode"
                  disabled={isPending}
                  className="w-full rounded-lg border border-gray-800 bg-black px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:border-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-700 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
                  autoFocus
                />
              </div>

              {error && <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">{error}</div>}

              <button
                type="submit"
                disabled={isPending || !passcode.trim()}
                className="w-full rounded-lg bg-white px-4 py-3 text-sm font-medium text-black transition-all hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white/20 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-white"
              >
                {isPending ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Verifying...
                  </span>
                ) : (
                  "Continue"
                )}
              </button>
            </form>
          </div>

          <p className="mt-8 text-center text-xs text-gray-500">Need access? Contact the development team.</p>

          <div className="mt-12 border-t border-gray-800 pt-8">
            <p className="text-center text-xs text-gray-500">
              Designed and developed by{" "}
              <a href="https://www.amnuz.com?utm_source=website-boilerplate" className="font-medium text-gray-400 transition-colors hover:text-white">
                Amnuz Technologies
              </a>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SiteLock;
