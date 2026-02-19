"use client";

import { Bookmark } from "../types/bookmark";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";

type Props = {
  bookmarks: Bookmark[];
  onEdit: (b: Bookmark) => void;
  onDelete: (id: string) => void;
  page: number;
  pageSize: number;
};

export default function BookmarksTable({
  bookmarks,
  onEdit,
  onDelete,
  page,
  pageSize,
}: Props) {
  return (
    <table className="min-w-full border border-gray-200 rounded-md overflow-hidden mb-4">
      <thead className="bg-gray-100">
        <tr>
          <th className="py-2 px-4 text-left text-sm font-medium text-gray-700">
            #
          </th>
          <th className="py-2 px-4 text-left text-sm font-medium text-gray-700">
            Title
          </th>
          <th className="py-2 px-4 text-left text-sm font-medium text-gray-700">
            URL
          </th>
          <th className="py-2 px-4 text-center text-sm font-medium text-gray-700">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        {bookmarks.length === 0 ? (
          <tr>
            <td colSpan={4} className="text-center py-4 text-gray-500">
              No bookmarks yet
            </td>
          </tr>
        ) : (
          bookmarks.map((b, i) => (
            <tr
              key={b.id}
              className="border-b border-gray-200 hover:bg-gray-50"
            >
              <td className="py-2 px-4">{(page - 1) * pageSize + i + 1}</td>
              <td className="py-2 px-4">{b.title}</td>
              <td className="py-2 px-4">
                <a
                  href={b.url}
                  target="_blank"
                  className="text-blue-600 hover:underline"
                >
                  {b.url}
                </a>
              </td>
              <td className="py-2 px-4 text-center flex justify-center gap-2">
                <button
                  onClick={() => onEdit(b)}
                  className="text-yellow-500 hover:text-yellow-600 cursor-pointer"
                  title="Edit"
                >
                  <PencilSquareIcon className="w-5 h-5" />
                </button>
                <button
                  onClick={() => onDelete(b.id!)}
                  className="text-red-500 hover:text-red-600 cursor-pointer"
                  title="Delete"
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}
