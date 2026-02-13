import axios from 'axios';

// Configuración de la URL base del API
// En desarrollo usa el proxy de Vite, en producción usa la URL de Render
const API_BASE_URL = import.meta.env.PROD 
  ? 'https://hmbusinessrules.onrender.com'
  : '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para manejar errores globalmente
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Servicios de estudiantes
export const studentService = {
  getAge: (studentId) => api.get(`/students/${studentId}/age`),
  getStudyTime: (studentId) => api.get(`/students/${studentId}/study-time`),
  getBirthdayCountdown: (studentId) => api.get(`/students/${studentId}/birthday-countdown`),
  getGuardians: (studentId) => api.get(`/students/${studentId}/guardians`),
};

// Servicios de tutores
export const guardianService = {
  getStudents: (guardianId) => api.get(`/guardians/${guardianId}/students`),
};

// Health check
export const healthCheck = () => api.get('/health');

export default api;
