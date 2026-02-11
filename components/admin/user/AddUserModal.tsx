"use client";

import React, { useState } from "react";
import Input from "@/components/common/Input";
import adminActionsDirectory from "@/utils/functions/admin/adminActionsDirectory";
import { useGlobalState } from "@/utils/globalState";

export type ListUser = {
  id: string;
  name: string;
  email: string;
  role: number;
  active: boolean;
  siteType: string;
  createdAt: string | Date;
  updatedAt: string | Date;
};

const ROLE_OPTIONS = [
  { value: 10, label: "Admin" },
  { value: 90, label: "Super Admin" },
];

type AddUserFormProps = {
  onSuccess: () => void;
};

export const AddUserForm = ({ onSuccess }: AddUserFormProps) => {
  const { closeModal } = useGlobalState();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<number>(10);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const res = await adminActionsDirectory("create-user", {
      name,
      email,
      password,
      role,
      siteType: "admin",
    });
    setLoading(false);
    if (res.success) {
      onSuccess();
      closeModal();
      return;
    }
    setError(res.error);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input
        type="text"
        label="Name"
        required
        value={name}
        onChange={(e) => setName((e?.target as HTMLInputElement)?.value ?? "")}
        placeholder="Full name"
        disabled={loading}
      />
      <Input
        type="email"
        label="Email"
        required
        value={email}
        onChange={(e) => setEmail((e?.target as HTMLInputElement)?.value ?? "")}
        placeholder="you@example.com"
        disabled={loading}
      />
      <Input
        type="password"
        label="Password"
        required
        value={password}
        onChange={(e) => setPassword((e?.target as HTMLInputElement)?.value ?? "")}
        placeholder="Min. 8 characters"
        disabled={loading}
      />
      <Input
        type="select"
        label="Role"
        options={ROLE_OPTIONS}
        value={ROLE_OPTIONS.find((o) => o.value === role) ?? null}
        onChange={(opt) => setRole((opt as { value: number } | null)?.value ?? 10)}
        disabled={loading}
        placeholder="Select role"
      />
      {error && (
        <p className="text-sm font-medium text-red-600 dark:text-red-400" role="alert">
          {error}
        </p>
      )}
      <div className="mt-2 flex gap-3">
        <button
          type="button"
          onClick={closeModal}
          className="inline-flex flex-1 items-center justify-center gap-x-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-800 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700"
        >
          Cancel
        </button>
        <input
          type="submit"
          value={loading ? "Creating…" : "Create user"}
          disabled={loading}
          className="inline-flex flex-1 cursor-pointer items-center justify-center gap-x-2 rounded-lg border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
        />
      </div>
    </form>
  );
};

export default AddUserForm;
