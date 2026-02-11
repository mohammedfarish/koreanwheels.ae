"use client";

import React, { useCallback, useEffect, useState } from "react";
import Typography from "@/components/common/Typography";
import Table from "@/components/common/Table";
import type { TableHeader } from "@/components/common/Table";
import adminActionsDirectory from "@/utils/functions/admin/adminActionsDirectory";
import { useGlobalState } from "@/utils/globalState";
import { AddCustomerForm, type ListCustomer } from "./AddCustomerModal";
import { UserPlus } from "lucide-react";

const formatDate = (d: string | Date) =>
  new Date(d).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

const CUSTOMER_HEADERS: TableHeader[] = [
  { key: "name", label: "Name", className: "font-medium text-gray-800 dark:text-neutral-200" },
  { key: "email", label: "Email" },
  { key: "phone", label: "Phone" },
  { key: "user", label: "Linked account" },
  { key: "createdAt", label: "Created", className: "text-gray-500 dark:text-neutral-400" },
];

function formatCustomerCell(value: unknown, row: ListCustomer, columnKey: string): React.ReactNode {
  switch (columnKey) {
    case "user":
      return row.user ? row.user.name : "—";
    case "createdAt":
      return formatDate(row.createdAt);
    default:
      return value as React.ReactNode;
  }
}

const CustomerPage = () => {
  const { openModal } = useGlobalState();
  const [customers, setCustomers] = useState<ListCustomer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCustomers = useCallback(async () => {
    setLoading(true);
    setError(null);
    const res = await adminActionsDirectory("list-customers");
    setLoading(false);
    if (res.success) {
      setCustomers(res.data);
    } else {
      setError(res.error);
    }
  }, []);

  const openAddCustomerModal = useCallback(() => {
    openModal({
      title: "Add customer",
      description: "Create a new customer. You can link them to a site account later if needed.",
      content: <AddCustomerForm onSuccess={fetchCustomers} />,
    });
  }, [openModal, fetchCustomers]);

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  return (
    <div>
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Typography type="heading2" value="Customers" className="text-gray-800 dark:text-neutral-200" />
          <p className="mt-1 text-sm text-gray-500 dark:text-neutral-400">Manage customers and their contact details.</p>
        </div>
        <button
          type="button"
          onClick={openAddCustomerModal}
          className="inline-flex items-center gap-2 rounded-lg border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <UserPlus className="h-4 w-4" />
          Add customer
        </button>
      </div>

      <div className="mt-8 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-neutral-700 dark:bg-neutral-900">
        {loading ? (
          <div className="flex items-center justify-center py-16 text-sm text-gray-500 dark:text-neutral-400">Loading customers…</div>
        ) : error ? (
          <div className="py-8 text-center">
            <p className="text-sm font-medium text-red-600 dark:text-red-400">{error}</p>
            <button
              type="button"
              onClick={fetchCustomers}
              className="mt-3 text-sm font-medium text-gray-800 underline hover:no-underline dark:text-neutral-200"
            >
              Try again
            </button>
          </div>
        ) : customers.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-sm text-gray-500 dark:text-neutral-400">No customers yet.</p>
            <button
              type="button"
              onClick={openAddCustomerModal}
              className="mt-3 text-sm font-medium text-gray-800 underline hover:no-underline dark:text-neutral-200"
            >
              Add the first customer
            </button>
          </div>
        ) : (
          <Table<ListCustomer> headerList={CUSTOMER_HEADERS} results={customers} format={formatCustomerCell} getRowKey={(row) => row.id} />
        )}
      </div>
    </div>
  );
};

export default CustomerPage;
