import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editEmail, setEditEmail] = useState("");
  const [editPassword, setEditPassword] = useState("");   // <-- NEW
  const navigate = useNavigate();

  /* --------------------------------------------------------------
     Load users & protect route
     -------------------------------------------------------------- */
  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

    if (!loggedInUser || loggedInUser.email !== "admin@example.com") {
      alert("Access denied! Admins only.");
      navigate("/login");
      return;
    }

    const registeredUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(registeredUsers);
  }, [navigate]);

  /* --------------------------------------------------------------
     Delete
     -------------------------------------------------------------- */
  const handleDelete = (index) => {
    const updated = users.filter((_, i) => i !== index);
    setUsers(updated);
    localStorage.setItem("users", JSON.stringify(updated));
  };

  /* --------------------------------------------------------------
     Start editing
     -------------------------------------------------------------- */
  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditEmail(users[index].email);
    setEditPassword(users[index].password);   // <-- load current password
  };

  /* --------------------------------------------------------------
     Cancel editing
     -------------------------------------------------------------- */
  const handleCancel = () => {
    setEditingIndex(null);
    setEditEmail("");
    setEditPassword("");
  };

  /* --------------------------------------------------------------
     Save changes (email + password)
     -------------------------------------------------------------- */
  const handleSave = (index) => {
    const updated = [...users];
    updated[index] = {
      ...updated[index],
      email: editEmail,
      password: editPassword,                 // <-- update password
    };
    setUsers(updated);
    localStorage.setItem("users", JSON.stringify(updated));
    handleCancel();
  };

  return (
    <div className="p-10 min-h-[100vh] bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Panel</h1>

      {users.length === 0 ? (
        <p className="text-center">No registered users found.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-400 text-left">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-400 px-4 py-2">#</th>
              <th className="border border-gray-400 px-4 py-2">Email</th>
              <th className="border border-gray-400 px-4 py-2">Password</th>
              <th className="border border-gray-400 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr key={idx} className="odd:bg-white even:bg-gray-100">
                <td className="border border-gray-400 px-4 py-2">{idx + 1}</td>

                {/* ---------- EMAIL ---------- */}
                <td className="border border-gray-400 px-4 py-2">
                  {editingIndex === idx ? (
                    <input
                      type="email"
                      value={editEmail}
                      onChange={(e) => setEditEmail(e.target.value)}
                      className="border border-gray-300 rounded px-2 py-1 w-full"
                    />
                  ) : (
                    user.email
                  )}
                </td>

                {/* ---------- PASSWORD ---------- */}
                <td className="border border-gray-400 px-4 py-2">
                  {editingIndex === idx ? (
                    <input
                      type="text"               // change to "password" if you want hidden input
                      value={editPassword}
                      onChange={(e) => setEditPassword(e.target.value)}
                      className="border border-gray-300 rounded px-2 py-1 w-full"
                      placeholder="New password"
                    />
                  ) : (
                    "••••••"
                  )}
                </td>

                {/* ---------- ACTIONS ---------- */}
                <td className="border border-gray-400 px-4 py-2 flex gap-2">
                  {editingIndex === idx ? (
                    <>
                      <button
                        onClick={() => handleSave(idx)}
                        className="bg-green-600 px-3 py-1 rounded text-white hover:bg-green-400"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancel}
                        className="bg-gray-600 px-3 py-1 rounded text-white hover:bg-gray-400"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => handleEdit(idx)}
                      className="bg-blue-600 px-3 py-1 rounded text-white hover:bg-blue-400"
                    >
                      Edit
                    </button>
                  )}

                  <button
                    onClick={() => handleDelete(idx)}
                    className="bg-red-600 px-3 py-1 rounded text-white hover:bg-red-400"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminPanel;