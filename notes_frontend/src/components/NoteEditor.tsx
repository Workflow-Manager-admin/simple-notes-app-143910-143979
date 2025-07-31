import React, { useState } from "react";

type NoteEditorProps = {
  initialTitle?: string;
  initialContent?: string;
  onSave: (title: string, content: string) => void;
  onCancel: () => void;
  loading?: boolean;
  action: "create" | "edit";
};

// PUBLIC_INTERFACE
export default function NoteEditor({
  initialTitle = "",
  initialContent = "",
  onSave,
  onCancel,
  loading = false,
  action,
}: NoteEditorProps) {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);

  return (
    <form
      className="space-y-6"
      onSubmit={e => {
        e.preventDefault();
        onSave(title.trim(), content.trim());
      }}
    >
      <div>
        <label className="block text-sm mb-1" htmlFor="note-title">
          Title
        </label>
        <input
          id="note-title"
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1a73e8]"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
          maxLength={120}
          autoFocus={action === "create"}
          disabled={loading}
          placeholder="Enter note title"
        />
      </div>
      <div>
        <label className="block text-sm mb-1" htmlFor="note-content">
          Content
        </label>
        <textarea
          id="note-content"
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#34a853] min-h-[120px]"
          value={content}
          onChange={e => setContent(e.target.value)}
          required
          maxLength={2048}
          placeholder="Your note..."
          disabled={loading}
        />
      </div>
      <div className="flex flex-row-reverse gap-2 pt-2">
        <button
          type="submit"
          className="bg-[#1a73e8] hover:bg-[#1765c1] text-white px-5 py-2 rounded font-medium shadow-sm disabled:bg-[#b4d1f6]"
          disabled={loading}
        >
          {action === "create" ? "Create" : "Save"}
        </button>
        <button
          type="button"
          className="bg-[#e8eaed] hover:bg-[#c7cccd] text-black px-5 py-2 rounded font-medium shadow-sm border"
          onClick={onCancel}
          disabled={loading}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
