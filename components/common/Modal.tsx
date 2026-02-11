"use client";

import React, { useCallback, useEffect } from "react";
import { useGlobalState } from "@/utils/globalState";

const Modal = () => {
  const { modal, closeModal } = useGlobalState();

  const handleOverlayClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) closeModal();
    },
    [closeModal]
  );

  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    },
    [closeModal]
  );

  useEffect(() => {
    if (!modal.open) return;
    document.body.classList.add("hs-overlay-body-open");
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.body.classList.remove("hs-overlay-body-open");
      document.removeEventListener("keydown", handleEscape);
    };
  }, [modal.open, handleEscape]);

  if (!modal.open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex w-full items-center justify-center overflow-x-hidden overflow-y-auto bg-gray-900/50 p-4 transition duration hs-overlay-backdrop-open:bg-gray-900/50 dark:bg-black/60"
      role="dialog"
      aria-modal="true"
      aria-labelledby={modal.title ? "modal-title" : undefined}
      onClick={handleOverlayClick}
    >
      <div
        className="hs-overlay-animation-target relative w-full max-w-md flex-shrink-0 overflow-visible rounded-xl border border-gray-200 bg-white shadow-sm transition-all dark:border-neutral-700 dark:bg-neutral-800 sm:max-w-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-gray-200 p-4 dark:border-neutral-700">
          <div>
            {modal.title ? (
              <h3 id="modal-title" className="block text-xl font-black uppercase text-gray-800 dark:text-neutral-200">
                {modal.title}
              </h3>
            ) : (
              <span />
            )}
            {modal.description && <p className="mt-1 text-sm text-gray-500 dark:text-neutral-400">{modal.description}</p>}
          </div>
          <button
            type="button"
            onClick={closeModal}
            className="size-8 inline-flex justify-center items-center gap-x-2 rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700 dark:focus:ring-offset-neutral-800"
            aria-label="Close"
          >
            <svg
              className="size-4 shrink-0"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>
        <div className="overflow-visible p-4">{modal.content}</div>
      </div>
    </div>
  );
};

export default Modal;
