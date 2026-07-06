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

  // ORDERS
  const [orders, setOrders] = useState([]);

  // PRODUCTS
  const [watches, setWatches] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingWatch, setEditingWatch] = useState(null);
  const [activeTab, setActiveTab] = useState('orders');

  // LOAD DATA
  useEffect(() => {
    const u = JSON.parse(localStorage.getItem('users')) || [];
    setUsers(u);

    const o = JSON.parse(localStorage.getItem('orders')) || [];
    setOrders(o);

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

  // ORDER CRUD
  const [orderFilter, setOrderFilter] = useState('all');

  const verifyOrder = (i) => {
    const updated = orders.map((o, idx) => idx === i ? { ...o, status: 'completed' } : o);
    setOrders(updated);
    localStorage.setItem('orders', JSON.stringify(updated));
  };
  const deleteOrder = (i) => {
    const updated = orders.filter((_, idx) => idx !== i);
    setOrders(updated);
    localStorage.setItem('orders', JSON.stringify(updated));
  };

  const filteredOrders = orderFilter === 'all' ? orders : orders.filter(o => o.status === orderFilter);
  const pendingCount = orders.filter(o => o.status === 'pending').length;

  return (
    <div className="p-10 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Panel</h1>

      <div className="flex gap-3 mb-8 justify-center">
        {['orders', 'users', 'products'].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`relative px-6 py-2.5 rounded-lg font-medium text-sm transition-all ${
              activeTab === tab
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                : 'bg-white text-gray-600 border border-gray-200 hover:border-blue-300 hover:text-blue-600'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
            {tab === 'orders' && pendingCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">{pendingCount}</span>
            )}
          </button>
        ))}
      </div>

      {/* ORDERS TAB */}
      {activeTab === 'orders' && (
        <div className="max-w-5xl mx-auto">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {[
              { label: 'Total Orders', count: orders.length, color: 'bg-blue-50 text-blue-700 border-blue-200' },
              { label: 'Pending', count: pendingCount, color: 'bg-yellow-50 text-yellow-700 border-yellow-200' },
              { label: 'Completed', count: orders.filter(o => o.status === 'completed').length, color: 'bg-green-50 text-green-700 border-green-200' },
            ].map(s => (
              <div key={s.label} className={`${s.color} border rounded-xl p-4 text-center`}>
                <p className="text-2xl font-bold">{s.count}</p>
                <p className="text-sm font-medium opacity-80">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Filter */}
          <div className="flex gap-2 mb-6">
            {['all', 'pending', 'completed'].map(f => (
              <button key={f} onClick={() => setOrderFilter(f)}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  orderFilter === f
                    ? 'bg-gray-800 text-white shadow'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-400'
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>

          {filteredOrders.length === 0 ? (
            <p className="text-center text-gray-400 py-16 bg-white rounded-xl">No {orderFilter !== 'all' ? orderFilter : ''} orders found.</p>
          ) : (
            <div className="space-y-4">
              {filteredOrders.map((o, i) => {
                const realIdx = orders.indexOf(o);
                return (
                <div key={i} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                  {/* Header */}
                  <div className={`px-6 py-4 flex items-center justify-between ${o.status === 'completed' ? 'bg-gradient-to-r from-green-50 to-white' : 'bg-gradient-to-r from-yellow-50 to-white'}`}>
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${o.status === 'completed' ? 'bg-green-500' : 'bg-yellow-500'}`} />
                      <span className={`px-3 py-0.5 rounded-full text-xs font-semibold ${o.status === 'completed' ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'}`}>
                        {o.status === 'completed' ? 'Completed' : 'Pending'}
                      </span>
                      <span className="text-xs text-gray-400">{new Date(o.orderedAt).toLocaleString()}</span>
                    </div>
                    <div className="flex gap-2">
                      {o.status === 'pending' && (
                        <button onClick={() => verifyOrder(realIdx)}
                          className="bg-green-600 hover:bg-green-500 text-white px-4 py-1.5 rounded-lg text-xs font-semibold transition-all active:scale-95 flex items-center gap-1.5">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                          Verify
                        </button>
                      )}
                      <button onClick={() => deleteOrder(realIdx)}
                        className="bg-red-500 hover:bg-red-400 text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition-all active:scale-95 flex items-center gap-1.5">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        Delete
                      </button>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-6">
                    <div className="grid md:grid-cols-3 gap-6">
                      {/* Customer */}
                      <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                          Customer
                        </p>
                        <p className="font-semibold text-gray-900">{o.name}</p>
                        <a href={`mailto:${o.email}`} className="text-sm text-blue-600 hover:underline block">{o.email}</a>
                        <a href={`tel:${o.phone}`} className="text-sm text-gray-600 block mt-0.5">{o.phone}</a>
                        <p className="text-sm text-gray-500 mt-2 leading-relaxed">{o.address}</p>
                      </div>

                      {/* Items */}
                      <div className="md:col-span-2">
                        <p className="text-xs text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
                          {o.items ? 'Items' : 'Product'}
                        </p>
                        {o.items ? (
                          <div className="divide-y divide-gray-100">
                            {o.items.map((item, j) => (
                              <div key={j} className="flex justify-between items-center py-2 first:pt-0 last:pb-0">
                                <div>
                                  <p className="font-medium text-gray-900">{item.model}</p>
                                  <p className="text-xs text-gray-400">{item.id} × {item.quantity}</p>
                                </div>
                                <span className="font-semibold text-gray-800">Rs. {(parseFloat(String(item.price).replace(/Rs\.\s*/gi, '').replace(/,/g, '')) * item.quantity).toLocaleString('en-IN')}</span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="font-medium text-gray-900">{o.productModel || o.model}</p>
                              <p className="text-xs text-gray-400">{o.productId || o.id} × {o.quantity}</p>
                            </div>
                            <span className="font-semibold text-gray-800">Rs. {Math.round(Number(o.total)).toLocaleString('en-IN')}</span>
                          </div>
                        )}

                        {/* Total & Ref */}
                        <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                          <div>
                            {o.refId && <p className="text-xs text-gray-400">Ref: <span className="font-mono">{o.refId}</span></p>}
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-500">Total</span>
                            <span className="text-lg font-bold text-gray-900">Rs. {Math.round(Number(o.total)).toLocaleString('en-IN')}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )})}
            </div>
          )}
        </div>
      )}

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
                      <img src={w.img.startsWith('data:') ? w.img : import.meta.env.BASE_URL.replace(/\/+$/, '') + '/' + w.img.replace(/^\//, '')} alt={w.id} className="h-16 w-16 object-cover rounded" />
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