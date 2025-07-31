"use client";
import React, { useCallback, useEffect, useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Modal from "@/components/Modal";
import NoteEditor from "@/components/NoteEditor";
import NoteCard from "@/components/NoteCard";
import NoteDetail from "@/components/NoteDetail";
import {
  fetchNotes,
  fetchNote,
  createNote,
  updateNote,
  deleteNote,
  type Note,
} from "./api";

type ViewMode = "DETAIL" | "CREATE" | "EDIT" | null;

export default function NotesHome() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [modalMode, setModalMode] = useState<ViewMode>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all notes on mount, and after create/edit/delete
  const refreshNotes = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const ns = await fetchNotes();
      setNotes(ns);
      // If a note is selected, refresh its detail
      if (selectedNoteId) {
        const matched = ns.find((n) => n.id === selectedNoteId);
        setSelectedNote(matched ?? null);
      }
    } catch (e: unknown) {
      setError(
        typeof e === "object" && e !== null && "message" in e
          ? String((e as { message?: unknown }).message)
          : "Failed to load notes"
      );
    }
    setLoading(false);
  }, [selectedNoteId]);

  useEffect(() => {
    refreshNotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Select a note and show details
  const handleSelectNote = async (id: string) => {
    setSelectedNoteId(id);
    setModalMode("DETAIL");
    setLoading(true);
    setError(null);
    try {
      const note = await fetchNote(id);
      setSelectedNote(note);
    } catch (e: unknown) {
      setError(
        typeof e === "object" && e !== null && "message" in e
          ? String((e as { message?: unknown }).message)
          : "Failed to load note"
      );
    }
    setLoading(false);
  };

  const handleCreate = () => {
    setModalMode("CREATE");
    setSelectedNoteId(null);
    setSelectedNote(null);
  };

  const handleCreateNote = async (title: string, content: string) => {
    setLoading(true);
    setError(null);
    try {
      await createNote({ title, content });
      setModalMode(null);
      await refreshNotes();
    } catch (e: unknown) {
      setError(
        typeof e === "object" && e !== null && "message" in e
          ? String((e as { message?: unknown }).message)
          : "Failed to create note"
      );
    }
    setLoading(false);
  };

  const handleEditNote = async (title: string, content: string) => {
    if (!selectedNoteId) return;
    setLoading(true);
    setError(null);
    try {
      await updateNote(selectedNoteId, { title, content });
      setModalMode(null);
      await refreshNotes();
    } catch (e: unknown) {
      setError(
        typeof e === "object" && e !== null && "message" in e
          ? String((e as { message?: unknown }).message)
          : "Failed to update note"
      );
    }
    setLoading(false);
  };

  const handleDeleteNote = async () => {
    if (!selectedNoteId) return;
    setLoading(true);
    setError(null);
    try {
      await deleteNote(selectedNoteId);
      setModalMode(null);
      setSelectedNoteId(null);
      setSelectedNote(null);
      await refreshNotes();
    } catch (e: unknown) {
      setError(
        typeof e === "object" && e !== null && "message" in e
          ? String((e as { message?: unknown }).message)
          : "Failed to delete note"
      );
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-white text-[#171717]">
      <Header />
      <div className="flex min-h-[96vh]">
        <Sidebar onNew={handleCreate} />
        <main className="w-full px-0 sm:px-8 py-8 flex flex-col items-start bg-white">
          <div className="w-full max-w-3xl mx-auto">
            <h1 className="sr-only">Your Notes</h1>
            {error && (
              <div className="bg-red-50 border border-[#d93025] text-[#d93025] rounded px-4 py-2 mb-3 font-mono">
                {error}
              </div>
            )}
            <div className="flex items-center justify-between mb-3">
              <span className="text-[#1a73e8] text-2xl font-bold">
                Notes
              </span>
              <button
                onClick={handleCreate}
                className="bg-[#34a853] text-white rounded px-4 py-1 font-semibold shadow hover:bg-[#2a7844]"
              >
                New Note
              </button>
            </div>
            {loading && <div className="pt-6 text-gray-500">Loading...</div>}
            {!loading && notes.length === 0 && (
              <div className="pt-6 text-gray-400">No notes yet. Create one!</div>
            )}
            <div className="mt-2 mb-4">
              {notes.map((note) => (
                <NoteCard
                  key={note.id}
                  note={note}
                  selected={note.id === selectedNoteId}
                  onClick={() => handleSelectNote(note.id)}
                />
              ))}
            </div>
          </div>
        </main>
      </div>

      {/* Create modal */}
      <Modal
        open={modalMode === "CREATE"}
        onClose={() => setModalMode(null)}
        title="Create a note"
      >
        <NoteEditor
          action="create"
          onSave={handleCreateNote}
          onCancel={() => setModalMode(null)}
          loading={loading}
        />
      </Modal>

      {/* Detail & edit */}
      <Modal
        open={modalMode === "DETAIL" && !!selectedNote}
        onClose={() => setModalMode(null)}
        title={selectedNote?.title ?? ""}
        width="max-w-lg"
      >
        {selectedNote && (
          <NoteDetail
            note={selectedNote}
            onEdit={() => setModalMode("EDIT")}
            onDelete={handleDeleteNote}
          />
        )}
      </Modal>
      {/* Edit modal */}
      <Modal
        open={modalMode === "EDIT" && !!selectedNote}
        onClose={() => setModalMode("DETAIL")}
        title="Edit note"
        width="max-w-lg"
      >
        {selectedNote && (
          <NoteEditor
            initialTitle={selectedNote.title}
            initialContent={selectedNote.content}
            action="edit"
            onSave={handleEditNote}
            onCancel={() => setModalMode("DETAIL")}
            loading={loading}
          />
        )}
      </Modal>
    </div>
  );
}
