"use client";

import React, { useCallback, useEffect, useState } from "react";
import Table from "@/components/common/Table";
import type { TableHeader } from "@/components/common/Table";
import adminActionsDirectory from "@/utils/functions/admin/adminActionsDirectory";
import { useGlobalState } from "@/utils/globalState";
import { AddUserForm, type ListUser } from "./AddUserModal";
import { UserPlus } from "lucide-react";

const ROLE_LABELS: Record<number, string> = {
  10: "Admin",
  90: "Super Admin",
};

const formatDate = (d: string | Date) =>
  new Date(d).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

const USER_HEADERS: TableHeader[] = [
  { key: "name", label: "Name", className: "font-medium text-gray-800 dark:text-neutral-200" },
  { key: "email", label: "Email" },
  { key: "role", label: "Role" },
  { key: "active", label: "Status" },
  { key: "createdAt", label: "Created", className: "text-gray-500 dark:text-neutral-400" },
];

function formatUserCell(value: unknown, row: ListUser, columnKey: string): React.ReactNode {
  switch (columnKey) {
    case "role":
      return ROLE_LABELS[row.role] ?? row.role;
    case "active":
      return (
        <span
          className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
            row.active ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
          }`}
        >
          {row.active ? "Active" : "Inactive"}
        </span>
      );
    case "createdAt":
      return formatDate(row.createdAt);
    default:
      return value as React.ReactNode;
  }
}

const UserPage = () => {
  const { openModal } = useGlobalState();
  const [users, setUsers] = useState<ListUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    const res = await adminActionsDirectory("list-users");
    setLoading(false);
    if (res.success) {
      setUsers(res.data);
    } else {
      setError(res.error);
    }
  }, []);

  const openAddUserModal = useCallback(() => {
    openModal({
      title: "Add user",
      description: "Create a new admin user. They will be able to sign in with the credentials you set.",
      content: <AddUserForm onSuccess={fetchUsers} />,
    });
  }, [openModal, fetchUsers]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <div>
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-black uppercase text-gray-800 dark:text-neutral-200">Users</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-neutral-400">Manage admin users who can access this dashboard.</p>
        </div>
        <button
          type="button"
          onClick={openAddUserModal}
          className="inline-flex items-center gap-2 rounded-lg border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <UserPlus className="h-4 w-4" />
          Add user
        </button>
      </div>

      <div className="mt-8 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-neutral-700 dark:bg-neutral-900">
        {loading ? (
          <div className="flex items-center justify-center py-16 text-sm text-gray-500 dark:text-neutral-400">Loading users…</div>
        ) : error ? (
          <div className="py-8 text-center">
            <p className="text-sm font-medium text-red-600 dark:text-red-400">{error}</p>
            <button type="button" onClick={fetchUsers} className="mt-3 text-sm font-medium text-gray-800 underline hover:no-underline dark:text-neutral-200">
              Try again
            </button>
          </div>
        ) : users.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-sm text-gray-500 dark:text-neutral-400">No users yet.</p>
            <button
              type="button"
              onClick={openAddUserModal}
              className="mt-3 text-sm font-medium text-gray-800 underline hover:no-underline dark:text-neutral-200"
            >
              Add the first user
            </button>
          </div>
        ) : (
          <Table<ListUser> headerList={USER_HEADERS} results={users} format={formatUserCell} getRowKey={(row) => row.id} />
        )}
      </div>
    </div>
  );
};

export default UserPage;
