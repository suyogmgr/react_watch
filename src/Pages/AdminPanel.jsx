// src/pages/AdminPanel.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WatchForm from '../components/WatchForm';
import defaultWatches from '../data/watches.json';

const AdminPanel = () => {
  const navigate = useNavigate();

  // AUTH
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('loggedInUser'));
    if (!user || user.email !== 'admin@example.com') {
      alert('Access denied!');
      navigate('/login');
    }
  }, [navigate]);

  // USERS
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [editEmail, setEditEmail] = useState('');
  const [editPassword, setEditPassword] = useState('');

  // PRODUCTS
  const [watches, setWatches] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingWatch, setEditingWatch] = useState(null);
  const [activeTab, setActiveTab] = useState('users');

  // LOAD DATA
  useEffect(() => {
    const u = JSON.parse(localStorage.getItem('users')) || [];
    setUsers(u);

    const w = JSON.parse(localStorage.getItem('watches')) || defaultWatches;
    setWatches(w);
  }, []);

  // USER CRUD
  const startEditUser = (i) => {
    setEditingUser(i);
    setEditEmail(users[i].email);
    setEditPassword(users[i].password);
  };
  const cancelEditUser = () => {
    setEditingUser(null);
    setEditEmail('');
    setEditPassword('');
  };
  const saveUser = (i) => {
    const updated = [...users];
    updated[i] = { ...updated[i], email: editEmail, password: editPassword };
    setUsers(updated);
    localStorage.setItem('users', JSON.stringify(updated));
    cancelEditUser();
  };
  const deleteUser = (i) => {
    const updated = users.filter((_, idx) => idx !== i);
    setUsers(updated);
    localStorage.setItem('users', JSON.stringify(updated));
  };

  // PRODUCT CRUD
  const saveWatch = (form) => {
    let updated;
    if (editingWatch !== null) {
      updated = watches.map((w, i) => (i === editingWatch ? form : w));
    } else {
      updated = [...watches, form];
    }
    setWatches(updated);
    localStorage.setItem('watches', JSON.stringify(updated));
    setShowForm(false);
    setEditingWatch(null);
  };
  const startEditWatch = (i) => {
    setEditingWatch(i);
    setShowForm(true);
  };
  const deleteWatch = (i) => {
    const updated = watches.filter((_, idx) => idx !== i);
    setWatches(updated);
    localStorage.setItem('watches', JSON.stringify(updated));
  };
  const cancelForm = () => {
    setShowForm(false);
    setEditingWatch(null);
  };

  return (
    <div className="p-10 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Panel</h1>

      <div className="flex gap-4 mb-6 justify-center">
        <button
          onClick={() => setActiveTab('users')}
          className={`px-6 py-2 rounded ${activeTab === 'users' ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}
        >
          Users
        </button>
        <button
          onClick={() => setActiveTab('products')}
          className={`px-6 py-2 rounded ${activeTab === 'products' ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}
        >
          Products
        </button>
      </div>

      {/* USERS TAB */}
      {activeTab === 'users' && (
        <div>
          {users.length === 0 ? (
            <p className="text-center">No users.</p>
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
                {users.map((u, i) => (
                  <tr key={i} className="odd:bg-white even:bg-gray-100">
                    <td className="border border-gray-400 px-4 py-2">{i + 1}</td>
                    <td className="border border-gray-400 px-4 py-2">
                      {editingUser === i ? (
                        <input
                          type="email"
                          value={editEmail}
                          onChange={(e) => setEditEmail(e.target.value)}
                          className="border rounded px-2 py-1 w-full"
                        />
                      ) : (
                        u.email
                      )}
                    </td>
                    <td className="border border-gray-400 px-4 py-2">
                      {editingUser === i ? (
                        <input
                          type="text"
                          value={editPassword}
                          onChange={(e) => setEditPassword(e.target.value)}
                          className="border rounded px-2 py-1 w-full"
                        />
                      ) : (
                        '••••••'
                      )}
                    </td>
                    <td className="border border-gray-400 px-4 py-2 flex gap-2">
                      {editingUser === i ? (
                        <>
                          <button onClick={() => saveUser(i)} className="bg-green-600 text-white px-3 py-1 rounded">
                            Save
                          </button>
                          <button onClick={cancelEditUser} className="bg-gray-600 text-white px-3 py-1 rounded">
                            Cancel
                          </button>
                        </>
                      ) : (
                        <button onClick={() => startEditUser(i)} className="bg-blue-600 text-white px-3 py-1 rounded">
                          Edit
                        </button>
                      )}
                      <button onClick={() => deleteUser(i)} className="bg-red-600 text-white px-3 py-1 rounded">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* PRODUCTS TAB */}
      {activeTab === 'products' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Watches</h2>
            <button
              onClick={() => setShowForm(true)}
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              + Add Watch
            </button>
          </div>

          {showForm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg w-full max-w-md">
                <h3 className="text-xl font-bold mb-4">
                  {editingWatch !== null ? 'Edit Watch' : 'Add New Watch'}
                </h3>
                <WatchForm
                  watch={editingWatch !== null ? watches[editingWatch] : null}
                  onSave={saveWatch}
                  onCancel={cancelForm}
                />
              </div>
            </div>
          )}

          {watches.length === 0 ? (
            <p className="text-center">No watches.</p>
          ) : (
            <table className="w-full border-collapse border border-gray-400 text-left">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-400 px-4 py-2">Img</th>
                  <th className="border border-gray-400 px-4 py-2">Model</th>
                  <th className="border border-gray-400 px-4 py-2">ID</th>
                  <th className="border border-gray-400 px-4 py-2">Price</th>
                  <th className="border border-gray-400 px-4 py-2">Stock</th>
                  <th className="border border-gray-400 px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {watches.map((w, i) => (
                  <tr key={w.id} className="odd:bg-white even:bg-gray-50">
                    <td className="border border-gray-400 p-2">
                      <img src={w.img} alt={w.id} className="h-16 w-16 object-cover rounded" />
                    </td>
                    <td className="border border-gray-400 px-4 py-2">{w.model}</td>
                    <td className="border border-gray-400 px-4 py-2">{w.id}</td>
                    <td className="border border-gray-400 px-4 py-2">{w.price}</td>
                    <td className="border border-gray-400 px-4 py-2">{w.stock}</td>
                    <td className="border border-gray-400 px-4 py-2 flex gap-2">
                      <button
                        onClick={() => startEditWatch(i)}
                        className="bg-blue-600 text-white px-3 py-1 rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteWatch(i)}
                        className="bg-red-600 text-white px-3 py-1 rounded"
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
      )}
    </div>
  );
};

export default AdminPanel;