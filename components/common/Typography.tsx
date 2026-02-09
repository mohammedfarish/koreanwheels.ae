import React from "react";
import { twMerge } from "tailwind-merge";

function Typography({
  type,
  value,
  className,
}: {
  type: "label" | "heading" | "heading2";
  value: string;
  className?: string;
}) {
  if (type === "heading") {
    return (
      <h1
        className={twMerge(
          "text-2xl font-black uppercase xs:text-xl",
          className
        )}
      >
        {value}
      </h1>
    );
  }

  return (
    <span
      className={twMerge(
        "text-sm font-medium",
        type === "label" && "text-sm font-bold",
        type === "heading2" && "text-xl font-black uppercase",
        className
      )}
    >
      {value}
    </span>
  );
}

export default Typography;
