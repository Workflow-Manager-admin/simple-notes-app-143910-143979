import React from "react";

// PUBLIC_INTERFACE
export default function Header() {
  return (
    <header className="bg-[#1a73e8] text-white px-6 py-3 shadow font-semibold flex flex-row items-center gap-4 w-full">
      <div className="text-lg font-extrabold tracking-tight">Simple Notes</div>
      <span className="ml-3 text-xs font-normal opacity-80">by Kavia</span>
    </header>
  );
}
