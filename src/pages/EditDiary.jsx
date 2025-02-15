import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getDiaryById, editDiary } from '../api/Api';

const EditDiary = () => {
  const { id } = useParams();
  const [form, setForm] = useState({ title: '', detail: '', date: '' });
  const [existingImage, setExistingImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDiary = async () => {
      const token = localStorage.getItem('token');
      const data = await getDiaryById(id, token);
      if (data) {
        setForm({ title: data.data.title, detail: data.data.detail, date: data.data.date });
        setExistingImage(data.data.image);
      }
      //   console.log(data);
    };
    fetchDiary();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    await editDiary(id, form, token);
    navigate('/diaries');
  };

  return (
    <div className="w-screen">
      <div className="px-5 max-w-screen-xl mx-auto">
        <div className="pt-20">
          <h1 className="text-2xl font-bold">Edit Catatan</h1>
          <form onSubmit={handleSubmit} className="mt-4 space-y-2">
            {existingImage && <img src={`http://127.0.0.1:8000/api/images/${existingImage}`} alt="Diary" className="w-32 h-32 object-cover" />}
            <input type="text" name="title" value={form.title} onChange={handleChange} placeholder="Judul" className="p-2 border rounded w-full" required />
            <textarea name="detail" value={form.detail} onChange={handleChange} placeholder="Isi Catatan" className="p-2 border rounded w-full" required />
            <input type="date" name="date" value={form.date} onChange={handleChange} className="p-2 border rounded w-full" required />
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
              Simpan Perubahan
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditDiary;
