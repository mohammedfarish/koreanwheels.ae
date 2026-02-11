"use client";

import React, { useMemo } from "react";
import { twMerge } from "tailwind-merge";

export type TableHeader = {
  key: string;
  label: string;
  className?: string;
};

export type TableProps<T extends Record<string, unknown>> = {
  headerList: TableHeader[];
  results: T[];
  format?: (value: unknown, row: T, columnKey: string) => React.ReactNode;
  getRowKey: (row: T) => string;
  minWidth?: string | number;
  tableClassName?: string;
  wrapperClassName?: string;
  theadClassName?: string;
  thClassName?: string;
  tbodyClassName?: string;
  trClassName?: string;
  tdClassName?: string;
};

const defaultThClass = "px-4 py-3 text-start text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-neutral-400";
const defaultTdClass = "px-4 py-3 text-sm text-gray-800 dark:text-neutral-200";

function Table<T extends Record<string, unknown>>({
  headerList,
  results,
  format,
  getRowKey,
  minWidth = "600px",
  tableClassName,
  wrapperClassName,
  theadClassName,
  thClassName,
  tbodyClassName,
  trClassName,
  tdClassName,
}: TableProps<T>) {
  const minWidthStyle = useMemo(() => (typeof minWidth === "number" ? `${minWidth}px` : minWidth), [minWidth]);

  const getCellContent = useMemo(() => {
    return (value: unknown, row: T, columnKey: string): React.ReactNode => {
      if (format) return format(value, row, columnKey);
      return value as React.ReactNode;
    };
  }, [format]);

  return (
    <div className={twMerge("overflow-x-auto", wrapperClassName)}>
      <table
        className={twMerge("min-w-full w-full divide-y divide-gray-200 dark:divide-neutral-700", tableClassName)}
        style={{ minWidth: minWidthStyle }}
        role="table"
      >
        <thead className={twMerge("bg-gray-50 dark:bg-neutral-800", theadClassName)}>
          <tr>
            {headerList.map((h) => (
              <th key={h.key} className={twMerge(defaultThClass, h.className, thClassName)}>
                {h.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={twMerge("divide-y divide-gray-200 dark:divide-neutral-700", tbodyClassName)}>
          {results.map((row) => (
            <tr key={getRowKey(row)} className={twMerge("bg-white hover:bg-gray-50 dark:bg-neutral-900 dark:hover:bg-neutral-800", trClassName)}>
              {headerList.map((h) => {
                const value = row[h.key];
                const content = getCellContent(value, row, h.key);
                return (
                  <td key={h.key} className={twMerge(defaultTdClass, h.className, tdClassName)}>
                    {content}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
