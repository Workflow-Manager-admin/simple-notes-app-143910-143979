'use client';

const BASE_URL = process.env.NEXT_PUBLIC_NOTES_API_URL ?? '';

export type Note = {
  id: string;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
};

// PUBLIC_INTERFACE
export async function fetchNotes(): Promise<Note[]> {
  /** Fetch all notes from API */
  const resp = await fetch(`${BASE_URL}/notes`);
  if (!resp.ok) throw new Error('Failed to fetch notes');
  return resp.json();
}

// PUBLIC_INTERFACE
export async function fetchNote(id: string): Promise<Note> {
  /** Fetch a single note by id */
  const resp = await fetch(`${BASE_URL}/notes/${id}`);
  if (!resp.ok) throw new Error('Failed to fetch note');
  return resp.json();
}

// PUBLIC_INTERFACE
export async function createNote(note: { title: string, content: string }): Promise<Note> {
  /** Create a note */
  const resp = await fetch(`${BASE_URL}/notes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(note),
  });
  if (!resp.ok) throw new Error('Failed to create note');
  return resp.json();
}

// PUBLIC_INTERFACE
export async function updateNote(id: string, note: { title: string, content: string }): Promise<Note> {
  /** Update a note */
  const resp = await fetch(`${BASE_URL}/notes/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(note),
  });
  if (!resp.ok) throw new Error('Failed to update note');
  return resp.json();
}

// PUBLIC_INTERFACE
export async function deleteNote(id: string): Promise<void> {
  /** Delete a note */
  const resp = await fetch(`${BASE_URL}/notes/${id}`, {
    method: 'DELETE',
  });
  if (!resp.ok) throw new Error('Failed to delete note');
}
