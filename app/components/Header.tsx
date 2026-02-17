"use client";

import { useState, useRef, useEffect } from "react";
import { useAuth } from "../context/AuthProvider";
import Image from "next/image";
import LogoutModal from "../modals/logut";

export default function Header() {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (e: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target as Node)
    ) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <header className="flex items-center justify-between px-6 py-3 bg-gray-900 text-white shadow-md">
        <h1 className="font-semibold text-lg tracking-wide">Dashboard</h1>

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-3 cursor-pointer focus:outline-none focus:ring-2 focus:ring-gray-600 rounded-full p-1 transition"
          >
            {user?.avatar ? (
              <Image
                src={user.avatar}
                alt="avatar"
                width={36}
                height={36}
                className="rounded-full border border-gray-700 object-cover"
              />
            ) : (
              <div className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-700 text-sm font-semibold">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
            )}
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-56 bg-white text-black rounded-xl shadow-xl border border-gray-200 overflow-hidden animate-in fade-in zoom-in-95 duration-100">
              <div className="px-4 py-3 border-b bg-gray-50">
                <p className="font-semibold text-sm">{user?.name}</p>
                <p className="text-xs text-gray-500 truncate">{user?.email}</p>
              </div>

              <button
                onClick={() => {
                  setOpen(false);
                  setConfirm(true);
                }}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition cursor-pointer"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </header>

      {confirm && <LogoutModal setConfirm={setConfirm} />}
    </>
  );
}
