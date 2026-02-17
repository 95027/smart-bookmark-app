"use client";

import { supabase } from "@/app/lib/supabaseClient";

export default function LoginPage() {
  const loginHandler = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/dashboard`,
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">
            Welcome Back 👋
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            Sign in to continue to your dashboard
          </p>
        </div>

        {/* Google Login Button */}
        <button
          onClick={loginHandler}
          className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-lg py-3 font-medium text-gray-700 hover:bg-gray-100 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            className="w-5 h-5"
          >
            <path
              fill="#FFC107"
              d="M43.6 20.5H42V20H24v8h11.3C33.6 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.7 1.1 7.8 3l5.7-5.7C33.7 6.1 29.1 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-3.5z"
            />
            <path
              fill="#FF3D00"
              d="M6.3 14.7l6.6 4.8C14.5 16.1 18.9 13 24 13c3 0 5.7 1.1 7.8 3l5.7-5.7C33.7 6.1 29.1 4 24 4c-7.7 0-14.3 4.3-17.7 10.7z"
            />
            <path
              fill="#4CAF50"
              d="M24 44c5.1 0 9.7-2 13.1-5.3l-6.1-5c-2 1.4-4.5 2.3-7 2.3-5.2 0-9.6-3.3-11.2-7.9l-6.6 5.1C9.6 39.7 16.3 44 24 44z"
            />
            <path
              fill="#1976D2"
              d="M43.6 20.5H42V20H24v8h11.3c-1.1 3-3.1 5.5-5.9 7.1l6.1 5C39.3 36.5 44 30.8 44 24c0-1.3-.1-2.7-.4-3.5z"
            />
          </svg>
          Continue with Google
        </button>

        {/* Footer */}
        <p className="text-xs text-center text-gray-400 mt-6">
          By continuing, you agree to our Terms & Privacy Policy.
        </p>
      </div>
    </div>
  );
}
