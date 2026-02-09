"use client";

const Homepage = ({ majorVersion, nextjsVersion }: { majorVersion: string; nextjsVersion: string }) => {
  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-black text-white">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-[#0a0a0a] opacity-100" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900/20 via-black to-black" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12">
        <section className="mb-32 mt-20 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gray-800 bg-gray-900/50 px-4 py-1.5 text-sm text-gray-300">
            <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
            Next.js Boilerplate
          </div>

          <h1 className="mb-6 bg-gradient-to-b from-white via-gray-100 to-gray-400 bg-clip-text text-5xl font-semibold leading-tight text-transparent sm:text-6xl md:text-7xl lg:text-8xl">
            Build Faster,
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Ship Better</span>
          </h1>

          <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-400 sm:text-xl">
            A powerful Next.js boilerplate designed for the <span className="font-medium text-white">Amnuz Technologies</span> team,
            <br />
            featuring custom <span className="font-medium text-white">actionsDirectory</span> modules for seamless API integration.
          </p>
        </section>

        <section className="mb-32">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-semibold sm:text-4xl">Built for Developers</h2>
            <p className="text-gray-400">Everything you need to start building modern web applications</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="group relative rounded-2xl border border-gray-800 bg-gradient-to-b from-gray-900/50 to-gray-900/30 p-8 transition-all duration-300 hover:border-gray-700 hover:shadow-[0_0_30px_rgba(168,85,247,0.1)]">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-500/10">
                <svg className="h-6 w-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold">Next.js {majorVersion}</h3>
              <p className="text-gray-400">
                Built on the latest Next.js framework (v{nextjsVersion}) with App Router, Server Components, and optimal performance out of the box.
              </p>
            </div>

            <div className="group relative rounded-2xl border border-gray-800 bg-gradient-to-b from-gray-900/50 to-gray-900/30 p-8 transition-all duration-300 hover:border-gray-700 hover:shadow-[0_0_30px_rgba(236,72,153,0.1)]">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-pink-500/10">
                <svg className="h-6 w-6 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold">Production Ready</h3>
              <p className="text-gray-400">Pre-configured with TypeScript, Tailwind CSS, and best practices for scalable, maintainable code.</p>
            </div>

            <div className="group relative rounded-2xl border border-gray-800 bg-gradient-to-b from-gray-900/50 to-gray-900/30 p-8 transition-all duration-300 hover:border-gray-700 hover:shadow-[0_0_30px_rgba(34,197,94,0.1)]">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-500/10">
                <svg className="h-6 w-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold">Site Lock Protection</h3>
              <p className="text-gray-400">
                Built-in development site lock with passcode authentication. Protect your work-in-progress sites with a beautiful, modern lock page.
              </p>
            </div>

            <div className="group relative rounded-2xl border border-gray-800 bg-gradient-to-b from-gray-900/50 to-gray-900/30 p-8 transition-all duration-300 hover:border-gray-700 hover:shadow-[0_0_30px_rgba(59,130,246,0.1)]">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/10">
                <svg className="h-6 w-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold">Actions Directory</h3>
              <p className="text-gray-400">Type-safe API actions with automatic routing. Import and use server functions seamlessly across your application.</p>
            </div>

            <div className="group relative rounded-2xl border border-gray-800 bg-gradient-to-b from-gray-900/50 to-gray-900/30 p-8 transition-all duration-300 hover:border-gray-700 hover:shadow-[0_0_30px_rgba(59,130,246,0.1)]">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/10">
                <svg className="h-6 w-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 002 2h2.945M3.055 11H5m0 0V9a2 2 0 012-2h2M5 11v2m0 0h2m-2 0H3.055M9 11h2m0 0v2m0-2V9a2 2 0 012-2h2m0 0v2m0 2h-2m2 0h2.945M15 11h2.945M15 11V9a2 2 0 012-2h2m0 0v2m0 2h-2.945M21 11v2a2 2 0 01-2 2h-2.945"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold">Domain & IP Detection</h3>
              <p className="text-gray-400">
                Smart domain and IP extraction utilities with support for Cloudflare, proxies, and development environments. Get accurate client information
                from request headers.
              </p>
            </div>

            <div className="group relative rounded-2xl border border-gray-800 bg-gradient-to-b from-gray-900/50 to-gray-900/30 p-8 transition-all duration-300 hover:border-gray-700 hover:shadow-[0_0_30px_rgba(168,85,247,0.1)]">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-500/10">
                <svg className="h-6 w-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold">Smart Git Push</h3>
              <p className="text-gray-400">
                Custom npm push script that stages changes, prompts for commit message, validates input, and pushes to remote—all in one command. Never commit
                empty messages again.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-32 rounded-3xl border border-gray-800 bg-gradient-to-br from-gray-900/80 to-black p-12 sm:p-16">
          <div className="mb-8">
            <div className="mb-4 inline-block rounded-full bg-blue-500/10 px-4 py-1 text-sm font-medium text-blue-400">Featured Feature</div>
            <h2 className="mb-4 text-3xl font-semibold sm:text-4xl md:text-5xl">actionsDirectory Module</h2>
            <p className="text-lg text-gray-400 text-justify">
              A powerful module system that enables type-safe, server-side actions with automatic API routing. Simply define your functions and use them
              anywhere in your application.
            </p>
          </div>

          <div className="overflow-hidden rounded-xl border border-gray-800 bg-black">
            <div className="border-b border-gray-800 bg-gray-900/50 px-4 py-3">
              <div className="flex gap-2">
                <div className="h-3 w-3 rounded-full bg-red-500" />
                <div className="h-3 w-3 rounded-full bg-yellow-500" />
                <div className="h-3 w-3 rounded-full bg-green-500" />
              </div>
            </div>
            <div className="p-6 font-mono text-sm">
              <div className="mb-2 text-gray-500">// Example usage</div>
              <div className="mb-1">
                <span className="text-purple-400">import</span> <span className="text-blue-400">actionsDirectory</span>{" "}
                <span className="text-purple-400">from</span> <span className="text-green-400">"@/utils/functions/actionsDirectory"</span>
                <span className="text-white">;</span>
              </div>
              <div className="mt-4">
                <span className="text-purple-400">const</span> <span className="text-blue-400">result</span> <span className="text-purple-400">=</span>{" "}
                <span className="text-purple-400">await</span> <span className="text-blue-400">actionsDirectory</span>
                <span className="text-white">(</span>
                <span className="text-green-400">"your-action-name"</span>
                <span className="text-white">, ...args);</span>
              </div>
            </div>
          </div>
        </section>

        <footer className="border-t border-gray-800 pt-12 pb-8">
          <div className="mb-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div>
              <h3 className="mb-2 text-lg font-semibold">Amnuz Technologies</h3>
              <p className="text-sm text-gray-400">Next.js Boilerplate for Team Members</p>
            </div>
            <div className="flex gap-6 text-sm text-gray-400">
              <a href="https://github.com/amnuztechnologies/nextjs-boilerplate#key-features" className="transition-colors hover:text-white">
                Documentation
              </a>
              <a href="https://github.com/amnuztechnologies/nextjs-boilerplate" className="transition-colors hover:text-white">
                GitHub
              </a>
            </div>
          </div>
          <div className="text-center text-xs text-gray-500">© {new Date().getFullYear()} Amnuz Technologies. All rights reserved.</div>
        </footer>
      </div>
    </main>
  );
};

export default Homepage;
