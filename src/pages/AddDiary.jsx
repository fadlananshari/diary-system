import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addDiary } from '../api/Api';

const AddDiary = () => {
  const [form, setForm] = useState({ title: '', detail: '', date: '', image: null });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setForm({ ...form, image: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('detail', form.detail);
    formData.append('date', form.date);
    if (form.image) formData.append('image', form.image);

    const token = localStorage.getItem('token');
    await addDiary(formData, token);
    navigate('/diaries');

    console.log([...formData]);
  };

  return (
    <div className="w-screen">
      <div className="px-5 max-w-screen-xl mx-auto">
        <div className="pt-20">
          <h1 className="text-2xl font-bold">Tambah Catatan</h1>
          <form onSubmit={handleSubmit} className="mt-4 space-y-2">
            <input type="text" name="title" placeholder="Judul" onChange={handleChange} className="p-2 border rounded w-full" required />
            <textarea name="detail" placeholder="Isi Catatan" onChange={handleChange} className="p-2 border rounded w-full" required />
            <input type="date" name="date" onChange={handleChange} className="p-2 border rounded w-full" required />
            <input type="file" name="image" accept="image/*" onChange={handleChange} className="p-2 border rounded w-full" />
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
              Simpan
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddDiary;
