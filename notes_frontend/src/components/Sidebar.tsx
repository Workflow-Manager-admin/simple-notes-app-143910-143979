import React from "react";

type SidebarProps = {
  onNew: () => void;
};

// PUBLIC_INTERFACE
export default function Sidebar({ onNew }: SidebarProps) {
  return (
    <aside
      className="bg-[#e8eaed] w-[220px] min-h-full flex flex-col p-6 gap-4 shadow-md"
      style={{ minWidth: 170 }}
    >
      <span className="mb-3 font-extrabold text-xl text-[#1a73e8] tracking-wide">
        Notes
      </span>
      <button
        className="rounded bg-[#34a853] hover:bg-[#2a7844] text-white font-semibold px-3 py-2 w-full mb-4 shadow"
        onClick={onNew}
        data-testid="new-note"
      >
        + New Note
      </button>
      {/* Quick actions or categories could go here */}
      <div className="mt-auto pt-10 text-xs text-gray-500">
        <div>Light &amp; minimal</div>
      </div>
    </aside>
  );
}
