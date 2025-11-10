import React, { useState, useEffect } from 'react';

const WatchForm = ({ watch, onSave, onCancel }) => {
  const [form, setForm] = useState({
    id: '',
    model: '',
    price: '',
    stock: 0,
    img: '',
  });

  useEffect(() => {
    if (watch) setForm(watch);
  }, [watch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setForm((prev) => ({ ...prev, img: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const submit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <input
        name="id"
        placeholder="Model ID"
        value={form.id}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />
      <input
        name="model"
        placeholder="Model (Baby-G / G-Shock)"
        value={form.model}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />
      <input
        name="price"
        placeholder="Price (e.g. $130.00)"
        value={form.price}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />
      <input
        type="number"
        name="stock"
        placeholder="Stock"
        value={form.stock}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />
      <div>
        <label className="block mb-1">Image</label>
        <input type="file" accept="image/*" onChange={handleFile} />
        {form.img && (
          <img src={form.img} alt="preview" className="mt-2 h-32 object-cover rounded" />
        )}
      </div>

      <div className="flex gap-2">
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          {watch ? 'Update' : 'Add'} Watch
        </button>
        <button type="button" onClick={onCancel} className="bg-gray-600 text-white px-4 py-2 rounded">
          Cancel
        </button>
      </div>
    </form>
  );
};

export default WatchForm;