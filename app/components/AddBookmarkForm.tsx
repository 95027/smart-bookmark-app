"use client";

import { useState, useEffect } from "react";
import { Bookmark } from "../types/bookmark";

type Props = {
  onAdd: (bookmark: Bookmark) => Promise<void> | void;
  initialData?: Partial<Bookmark>;
};

export default function AddBookmarkForm({ onAdd, initialData }: Props) {
  const [form, setForm] = useState({ title: "", url: "" });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setForm({
        title: initialData.title || "",
        url: initialData.url || "",
      });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (submitting) return;
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.url.trim()) return;

    try {
      setSubmitting(true);
      await onAdd({ ...form } as Bookmark);
      setForm({ title: "", url: "" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full flex flex-col md:flex-row gap-2 mb-6 items-center"
    >
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
        disabled={submitting}
        className="p-3 border rounded-md flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60"
        required
      />
      <input
        type="url"
        name="url"
        placeholder="https://example.com"
        value={form.url}
        onChange={handleChange}
        disabled={submitting}
        className="p-3 border rounded-md flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60"
        required
      />
      <button
        type="submit"
        disabled={submitting}
        className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition disabled:bg-blue-400 disabled:cursor-not-allowed"
      >
        {submitting
          ? initialData
            ? "Updating..."
            : "Adding..."
          : initialData
            ? "Update"
            : "Add"}
      </button>
    </form>
  );
}
