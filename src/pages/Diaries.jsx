import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { deleteDiary, getDiaries, logout } from '../api/Api';
import Swal from 'sweetalert2';
import Home from './Home';

const Diaries = () => {
  const [diaries, setDiaries] = useState([]);

  const token = localStorage.getItem('token');

  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const response = await logout(token);
      console.log(response.data.message);
      localStorage.removeItem('token');
      navigate('/diaries');
    } catch (error) {
      console.error('Logout gagal', error);
    }
  };

  useEffect(() => {
    const fetchDiaries = async () => {
      const token = localStorage.getItem('token');
      const response = await getDiaries(token);
      setDiaries(response.data);
      console.log(response);
    };
    fetchDiaries();
  }, []);

  const submit = async (id) => {
    await deleteDiary(id, token);
    window.location.reload();
  };

  const handleSubmit = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        submit(id);
      }
    });
  };

  return (
    <>
      {!token ? (
        <Home />
      ) : (
        <div className="w-screen">
          <div className="px-5 max-w-screen-xl mx-auto">
            <div className="pt-20">
              <h1 className="text-2xl font-bold">Daftar Catatan</h1>
              <div className="flex justify-between">
                <Link to="/diaries/add" className="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded">
                  Tambah Catatan
                </Link>
                <button onClick={handleLogout} className="mt-4 inline-block px-4 py-2 bg-red-500 text-white rounded">
                  Logout
                </button>
              </div>

              <div className="mt-4 grid gap-4">
                {diaries.map((diary) => (
                  <div key={diary.id} className="p-4 border rounded shadow">
                    {diary.image ? <img src={`http://127.0.0.1:8000/api/images/${diary.image}`} className="h-32" alt="" /> : <></>}

                    <h2 className="text-xl font-semibold">{diary.title}</h2>
                    <p>{diary.detail}</p>
                    <p>{diary.date}</p>
                    <div className="flex space-x-4">
                      <Link to={`/diaries/edit/${diary.id}`} className="text-blue-500">
                        Edit
                      </Link>
                      <button onClick={() => handleSubmit(diary.id)} className="text-red-500">
                        Hapus
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Diaries;
