import { useAuth } from "../context/AuthProvider";

const LogoutModal = ({ setConfirm }: { setConfirm: any }) => {
  const { logout } = useAuth();
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
      <div className="bg-white rounded-2xl shadow-2xl p-6 w-80 animate-in zoom-in-95 duration-150">
        <h2 className="text-lg font-semibold mb-2">Confirm Logout</h2>
        <p className="text-sm text-gray-600 mb-6">
          Are you sure you want to logout?
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={() => setConfirm(false)}
            className="px-4 py-2 text-sm rounded-lg bg-gray-200 hover:bg-gray-300 transition cursor-pointer"
          >
            Cancel
          </button>

          <button
            onClick={logout}
            className="px-4 py-2 text-sm rounded-lg bg-red-500 text-white hover:bg-red-600 transition cursor-pointer shadow-sm"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
