import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editEmail, setEditEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

    if (!loggedInUser || loggedInUser.email !== "admin@example.com") {
      alert("Access denied! Admins only.");
      navigate("/login");
    } else {
      const registeredUsers = JSON.parse(localStorage.getItem("users")) || [];
      setUsers(registeredUsers);
    }
  }, [navigate]);

  const handleDelete = (index) => {
    const updatedUsers = [...users];
    updatedUsers.splice(index, 1);
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditEmail(users[index].email);
  };

  const handleSave = (index) => {
    const updatedUsers = [...users];
    updatedUsers[index].email = editEmail;
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setEditingIndex(null);
    setEditEmail("");
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
              <th className="border border-gray-400 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index} className="odd:bg-white even:bg-gray-100">
                <td className="border border-gray-400 px-4 py-2">{index + 1}</td>
                <td className="border border-gray-400 px-4 py-2">
                  {editingIndex === index ? (
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
                <td className="border border-gray-400 px-4 py-2 flex gap-2">
                  {editingIndex === index ? (
                    <button
                      onClick={() => handleSave(index)}
                      className="bg-green-600 px-3 py-1 rounded text-white hover:bg-green-400"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEdit(index)}
                      className="bg-blue-600 px-3 py-1 rounded text-white hover:bg-blue-400"
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(index)}
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
