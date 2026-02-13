import { useState } from 'react';
import { studentService } from '../services/api';
import './Component.css';

function StudentAge() {
  const [studentId, setStudentId] = useState('1');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const response = await studentService.getAge(studentId);
      setData(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Error al obtener la edad del estudiante');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="component">
      <h2>🎂 Edad del Estudiante</h2>
      <p className="description">
        Calcula la edad exacta del estudiante en años, meses y días desde su fecha de nacimiento.
      </p>

      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="studentId">ID del Estudiante:</label>
          <input
            type="number"
            id="studentId"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            placeholder="Ej: 1"
            required
            min="1"
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Calculando...' : 'Calcular Edad'}
        </button>
      </form>

      {error && (
        <div className="alert alert-error">
          <span className="alert-icon">⚠️</span>
          {error}
        </div>
      )}

      {data && (
        <div className="result-card">
          <div className="result-header">
            <h3>Resultado</h3>
            <span className="badge">ID: {data.studentId}</span>
          </div>
          
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-value">{data.years}</div>
              <div className="stat-label">Años</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">{data.months}</div>
              <div className="stat-label">Meses</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">{data.days}</div>
              <div className="stat-label">Días</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">{data.totalDays}</div>
              <div className="stat-label">Total Días</div>
            </div>
          </div>

          <div className="info-list">
            <div className="info-item">
              <span className="info-label">Fecha de Nacimiento:</span>
              <span className="info-value">{new Date(data.birthDate).toLocaleDateString('es-ES')}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Calculado al:</span>
              <span className="info-value">{new Date(data.asOf).toLocaleDateString('es-ES')}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StudentAge;
