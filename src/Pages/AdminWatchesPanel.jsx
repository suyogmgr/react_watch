// src/pages/AdminWatchesPanel.jsx
import React, { useState, useEffect, useRef } from "react";

const AdminWatchesPanel = () => {
  const [watches, setWatches] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ model: "", id: "", price: "", stock: "", img: "" });
  const fileInputRef = useRef(null);

  // Load watches
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("watches")) || [];
    setWatches(stored);
  }, []);

  const saveToStorage = (updated) => {
    localStorage.setItem("watches", JSON.stringify(updated));
    setWatches(updated);
  };

  // Image → Base64
  const handleImageChange = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setForm((prev) => ({ ...prev, img: reader.result })); // base64 string
    };
    reader.readAsDataURL(file);
  };

  // Drag & Drop
  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      handleImageChange(file);
    }
  };

  const startAdd = () => {
    setIsAdding(true);
    setEditingId(null);
    setForm({ model: "", id: "", price: "", stock: "", img: "" });
  };

  const startEdit = (watch) => {
    setEditingId(watch.id);
    setIsAdding(false);
    setForm({ ...watch });
  };

  const cancel = () => {
    setIsAdding(false);
    setEditingId(null);
    setForm({ model: "", id: "", price: "", stock: "", img: "" });
  };

  const save = () => {
    if (!form.model || !form.id || !form.price || !form.stock || !form.img) {
      alert("All fields are required, including image.");
      return;
    }

    const updated = isAdding
      ? [...watches, { ...form, stock: Number(form.stock) }]
      : watches.map((w) => (w.id === editingId ? form : w));

    saveToStorage(updated);
    cancel();
  };

  const deleteWatch = (id) => {
    if (window.confirm("Delete this watch?")) {
      saveToStorage(watches.filter((w) => w.id !== id));
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Watches Inventory</h2>
        <button
          onClick={startAdd}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500"
        >
          + Add Watch
        </button>
      </div>

      {/* Form */}
      {(isAdding || editingId) && (
        <div className="bg-gray-50 p-6 rounded-lg mb-6 border">
          <h3 className="text-lg font-semibold mb-4">
            {isAdding ? "Add New Watch" : "Edit Watch"}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              placeholder="Model"
              value={form.model}
              onChange={(e) => setForm({ ...form, model: e.target.value })}
              className="border p-2 rounded"
            />
            <input
              placeholder="ID (unique)"
              value={form.id}
              onChange={(e) => setForm({ ...form, id: e.target.value })}
              className="border p-2 rounded"
            />
            <input
              placeholder="Price"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              className="border p-2 rounded"
            />
            <input
              type="number"
              placeholder="Stock"
              value={form.stock}
              onChange={(e) => setForm({ ...form, stock: e.target.value })}
              className="border p-2 rounded"
            />
          </div>

          {/* Image Upload */}
          <div className="mt-4">
            <label className="block font-medium mb-2">Image</label>
            <div
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-gray-400 rounded-lg p-6 text-center cursor-pointer hover:border-blue-500 transition"
            >
              {form.img ? (
                <img src={form.img} alt="preview" className="mx-auto h-32 object-contain" />
              ) : (
                <p className="text-gray-500">Drop image here or click to select</p>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(e.target.files[0])}
              className="hidden"
            />
          </div>

          <div className="mt-4 flex gap-2">
            <button
              onClick={save}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500"
            >
              Save
            </button>
            <button
              onClick={cancel}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Table */}
      {watches.length === 0 ? (
        <p className="text-center text-gray-500">No watches yet. Add one!</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-3 text-left">#</th>
                <th className="border p-3 text-left">Image</th>
                <th className="border p-3 text-left">Model</th>
                <th className="border p-3 text-left">ID</th>
                <th className="border p-3 text-left">Price</th>
                <th className="border p-3 text-left">Stock</th>
                <th className="border p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {watches.map((w, i) => (
                <tr key={w.id} className="hover:bg-gray-50">
                  <td className="border p-3">{i + 1}</td>
                  <td className="border p-3">
                    <img src={w.img} alt={w.model} className="h-12 w-12 object-cover rounded" />
                  </td>
                  <td className="border p-3">{w.model}</td>
                  <td className="border p-3 font-mono text-sm">{w.id}</td>
                  <td className="border p-3">{w.price}</td>
                  <td className="border p-3">{w.stock}</td>
                  <td className="border p-3">
                    <button
                      onClick={() => startEdit(w)}
                      className="bg-blue-600 text-white px-3 py-1 rounded text-sm mr-2 hover:bg-blue-500"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteWatch(w.id)}
                      className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-500"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminWatchesPanel;