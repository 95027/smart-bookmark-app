"use client";

import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "../context/AuthProvider";
import { Bookmark } from "../types/bookmark";
import AddBookmarkForm from "../components/AddBookmarkForm";
import BookmarksTable from "../components/Bookmarks";
import Pagination from "../components/Pagination";

export default function Dashboard() {
  const { user, session, loading: authLoading } = useAuth();

  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [editBookmark, setEditBookmark] = useState<Bookmark | null>(null);

  const pageSize = 5;

  const fetchBookmarks = async () => {
    if (!user?.id) return;

    setLoading(true);

    const { data, error } = await supabase
      .from("bookmarks")
      .select("*")
      .eq("user_id", user.id)
      .order("id", { ascending: false });

    if (error) {
      console.error("Fetch error:", error.message);
    } else if (data) {
      setBookmarks(data);
    }

    setLoading(false);
  };

  const createUserBookmarkChannel = (userId: string, callback: () => void) => {
    const topic = `bookmarks-${userId}`;

    supabase.getChannels().forEach((ch) => {
      if (ch.topic === topic) supabase.removeChannel(ch);
    });

    return supabase
      .channel(topic)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "bookmarks",
          filter: `user_id=eq.${userId}`,
        },
        callback,
      )
      .subscribe();
  };

  useEffect(() => {
    if (authLoading) return;
    if (!user?.id) return;
    if (!session?.access_token) return;

    let channel: ReturnType<typeof supabase.channel> | null = null;

    const init = async () => {
      supabase.realtime.setAuth(session.access_token);

      await fetchBookmarks();

      channel = createUserBookmarkChannel(user.id, fetchBookmarks);
    };

    init();

    return () => {
      if (channel) supabase.removeChannel(channel);
    };
  }, [user?.id, authLoading, session?.access_token]);

  const handleAddOrUpdate = async (b: Bookmark) => {
    if (!user?.id) return;

    try {
      if (editBookmark) {
        await supabase
          .from("bookmarks")
          .update({ title: b.title, url: b.url })
          .eq("id", editBookmark.id)
          .eq("user_id", user.id);

        setEditBookmark(null);
      } else {
        const { error } = await supabase.from("bookmarks").insert([
          {
            title: b.title,
            url: b.url,
            user_id: user.id,
          },
        ]);

        if (error) console.error("Insert error:", error.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (b: Bookmark) => setEditBookmark(b);

  const handleDelete = async (id: string) => {
    if (!user?.id) return;
    if (!confirm("Delete this bookmark?")) return;

    const { error } = await supabase
      .from("bookmarks")
      .delete()
      .eq("id", id)
      .eq("user_id", user.id);

    if (error) console.error("Delete error:", error.message);
  };

  const totalPages = Math.ceil(bookmarks.length / pageSize);
  const paginatedBookmarks = bookmarks.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center">
      <div className="max-w-5xl w-full bg-white shadow-lg rounded-xl p-6">
        <h1 className="text-2xl font-bold mb-4">My Bookmarks</h1>

        <AddBookmarkForm
          onAdd={handleAddOrUpdate}
          initialData={editBookmark || undefined}
        />

        {loading ? (
          <p className="text-center py-10 text-gray-500">
            Loading bookmarks...
          </p>
        ) : (
          <>
            <BookmarksTable
              bookmarks={paginatedBookmarks}
              onEdit={handleEdit}
              onDelete={handleDelete}
              page={currentPage}
              pageSize={pageSize}
            />

            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
