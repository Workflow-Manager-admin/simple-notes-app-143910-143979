import React from "react";
import type { Note } from "../app/api";

interface NoteCardProps {
  note: Note;
  selected?: boolean;
  onClick: () => void;
}

// PUBLIC_INTERFACE
export default function NoteCard({ note, selected, onClick }: NoteCardProps) {
  return (
    <div
      className={`rounded border p-3 shadow-sm mb-2 bg-white cursor-pointer transition-all ${
        selected
          ? "border-[#1a73e8] bg-[#e8eaed] opacity-100"
          : "border-[#e8eaed] hover:bg-[#f6fafd] opacity-95"
      }`}
      onClick={onClick}
      data-testid="notecard"
    >
      <div className="font-semibold text-[#1a73e8] truncate">{note.title || 'Untitled'}</div>
      <div className="text-xs text-gray-500 mt-1 truncate">{note.content}</div>
      <div className="text-[10px] text-gray-400 mt-1">{note.updated_at?.slice(0,16)}</div>
    </div>
  );
}
