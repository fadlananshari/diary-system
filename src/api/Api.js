import axios from 'axios';

const API = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
});

export const register = (data) => API.post('/register', data);
export const login = (data) => API.post('/login', data);
export const logout = (token) => API.post('/logout', {}, { headers: { Authorization: `Bearer ${token}` } });
export const getDiaries = (token) => API.get('/diaries', { headers: { Authorization: `Bearer ${token}` } });
export const getDiaryById = (id, token) => API.get(`/diaries/${id}`, { headers: { Authorization: `Bearer ${token}` }});
export const addDiary = (data, token) => API.post('/diaries', data, { headers: { Authorization: `Bearer ${token}` } });
export const editDiary = (id, data, token) => API.put(`/diaries/${id}`, data, { headers: { Authorization: `Bearer ${token}` } });
export const deleteDiary = (id, token) => API.delete(`/diaries/${id}`, { headers: { Authorization: `Bearer ${token}` } });
