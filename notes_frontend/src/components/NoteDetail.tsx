import React from "react";
import type { Note } from "../app/api";

type NoteDetailProps = {
  note: Note;
  onEdit: () => void;
  onDelete: () => void;
};

// PUBLIC_INTERFACE
export default function NoteDetail({ note, onEdit, onDelete }: NoteDetailProps) {
  return (
    <div className="space-y-4 p-1 max-w-lg">
      <h2 className="text-2xl font-bold text-[#1a73e8]">{note.title || "Untitled"}</h2>
      <div className="text-sm text-gray-700 whitespace-pre-line">{note.content}</div>
      <div className="flex gap-4 pt-1">
        <button
          className="bg-[#34a853] hover:bg-[#19813c] text-white px-4 py-1.5 rounded shadow font-medium"
          onClick={onEdit}
        >
          Edit
        </button>
        <button
          className="bg-red-50 text-[#d93025] border border-[#d93025] hover:bg-red-100 px-4 py-1.5 rounded font-medium"
          onClick={onDelete}
        >
          Delete
        </button>
      </div>
      <div className="text-xs text-gray-400">
        Created: {note.created_at?.slice(0, 16)}<br />
        Updated: {note.updated_at?.slice(0, 16)}
      </div>
    </div>
  );
}
