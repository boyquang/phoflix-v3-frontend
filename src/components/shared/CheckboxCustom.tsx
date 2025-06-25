"use client";

import React from "react";

interface CheckboxCustomProps {
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  color?: "blue" | "red" | "green" | "yellow" | "primary";
  size?: "small" | "medium" | "large";
  label?: string;
}

const CheckboxCustom = ({
  checked,
  onChange,
  color = "blue",
  size = "small",
  label = "",
}: CheckboxCustomProps) => {
  const sizeClasses = {
    small: "h-4 w-4",
    medium: "h-5 w-5",
    large: "h-6 w-6",
  };

  const colorClasses = {
    blue: "peer checked:bg-blue-600 checked:border-blue-600",
    red: "peer checked:bg-red-600 checked:border-red-600",
    green: "peer checked:bg-green-600 checked:border-green-600",
    yellow: "peer checked:bg-yellow-500 checked:border-yellow-500",
    primary: "peer checked:bg-[#ffd875] checked:border-[#ffd875]",
  };

  return (
    <label className="inline-flex items-center cursor-pointer gap-2">
      <div className="relative inline-flex items-center">
        <input
          type="checkbox"
          value={label}
          checked={checked}
          onChange={onChange}
          className={`
            peer appearance-none border border-slate-300 rounded cursor-pointer transition-all 
            shadow hover:shadow-md 
            ${sizeClasses[size]} 
            ${colorClasses[color]}
          `}
        />
        <span
          className={`absolute opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none
              ${color === "primary" ? "text-black" : "text-white"}
            `}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3.5 w-3.5"
            viewBox="0 0 20 20"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="1"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </div>
      {label && <span className="select-none text-sm text-white">{label}</span>}
    </label>
  );
};

export default CheckboxCustom;
