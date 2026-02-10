"use client";

import React, { useState } from "react";
import Image from "next/image";
import Input from "@/components/common/Input";
import Typography from "@/components/common/Typography";
import adminActionsDirectory from "@/utils/functions/admin/adminActionsDirectory";
import { company } from "@/utils/companyData";

export const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const res = await adminActionsDirectory("login", { email, password });
    if (res.success) {
      window.location.reload();
      return;
    }

    setError(res.error);
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left: statement panel */}
      <div className="hidden md:flex md:w-[42%] flex-col justify-between bg-black p-10 lg:p-14">
        <div>
          <Image src="/api/img/logo-light" alt={company.tradeName} width={140} height={40} className="h-10 w-auto object-contain" unoptimized />
          <span className="mt-6 block text-xs font-semibold uppercase tracking-[0.2em] text-[#737373]">Admin</span>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-white lg:text-4xl">Secure access</h1>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-[#a3a3a3]">Authorized personnel only. All access is logged and monitored.</p>
        </div>
        <p className="text-xs text-[#525252]">Korean Wheels · Admin</p>
      </div>

      {/* Right: form */}
      <div className="flex w-full flex-col justify-center bg-[#fafafa] px-6 py-12 md:w-[58%] md:px-14 lg:px-20">
        <div className="mx-auto w-full max-w-sm">
          <Image src="/api/img/logo" alt={company.tradeName} width={120} height={32} className="h-8 w-auto object-contain md:hidden" unoptimized />
          <span className="mt-4 block text-xs font-semibold uppercase tracking-[0.2em] text-[#737373] md:mt-0">Admin</span>
          <Typography type="heading2" value="Sign in" className="mt-2 block text-[#171717] md:mt-0" />
          <p className="mt-2 text-sm text-[#737373]">Enter your credentials to continue.</p>

          <form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-5">
            <Input
              type="email"
              label="Email"
              required
              autoFocus
              value={email}
              onChange={(e) => setEmail((e?.target as HTMLInputElement)?.value ?? "")}
              placeholder="you@example.com"
              //   className="w-full"
              disabled={loading}
              internalClassName="w-full bg-white border-[#e5e5e5] focus:border-black focus:ring-1 focus:ring-black"
            />
            <Input
              type="password"
              label="Password"
              required
              value={password}
              onChange={(e) => setPassword((e?.target as HTMLInputElement)?.value ?? "")}
              placeholder="••••••••"
              //   className="w-full"
              disabled={loading}
              internalClassName="w-full bg-white border-[#e5e5e5] focus:border-black focus:ring-1 focus:ring-black"
            />
            {error && (
              <p className="text-sm font-medium text-red-600" role="alert">
                {error}
              </p>
            )}
            <Input type="submit" value={loading ? "Signing in…" : "Sign in"} disabled={loading} />
          </form>

          <p className="mt-10 text-xs text-[#a3a3a3]">By signing in you agree to use this system in accordance with your organization’s policies.</p>
        </div>
      </div>
    </div>
  );
};
