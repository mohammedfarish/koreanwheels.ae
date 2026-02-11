"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import Input from "@/components/common/Input";
import adminActionsDirectory from "@/utils/functions/admin/adminActionsDirectory";
import { useGlobalState } from "@/utils/globalState";

export type ListCustomer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  user?: { id: string; name: string; role: number; active: boolean; siteType: string };
  createdAt: string | Date;
};

type ListUserOption = {
  id: string;
  name: string;
  email: string;
};

type AddCustomerFormProps = {
  onSuccess: () => void;
};

export const AddCustomerForm = ({ onSuccess }: AddCustomerFormProps) => {
  const { closeModal } = useGlobalState();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [userId, setUserId] = useState("");
  const [users, setUsers] = useState<ListUserOption[]>([]);
  const [usersLoading, setUsersLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const userOptions = useMemo(
    () => [{ label: "No linked account", value: "" }, ...users.map((u) => ({ label: `${u.name} (${u.email})`, value: u.id }))],
    [users]
  );

  const fetchUsers = useCallback(async () => {
    setUsersLoading(true);
    const res = await adminActionsDirectory("list-users");
    setUsersLoading(false);
    if (res.success) {
      setUsers(res.data.map((u: { id: string; name: string; email: string }) => ({ id: u.id, name: u.name, email: u.email })));
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const res = await adminActionsDirectory("create-customer", {
      name,
      email,
      phone,
      userId: userId || undefined,
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
        type="tel"
        label="Phone"
        required
        value={phone}
        onChange={(e) => setPhone((e?.target as HTMLInputElement)?.value ?? "")}
        placeholder="Phone number"
        disabled={loading}
      />
      <Input
        type="select"
        label="Link to user"
        options={userOptions}
        value={usersLoading ? null : userOptions.find((o) => o.value === userId) ?? userOptions[0]}
        onChange={(opt) => setUserId((opt as { value: string } | null)?.value ?? "")}
        disabled={loading || usersLoading}
        placeholder={usersLoading ? "Loading users…" : "Select user"}
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
          value={loading ? "Creating…" : "Create customer"}
          disabled={loading}
          className="inline-flex flex-1 cursor-pointer items-center justify-center gap-x-2 rounded-lg border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
        />
      </div>
    </form>
  );
};

export default AddCustomerForm;
