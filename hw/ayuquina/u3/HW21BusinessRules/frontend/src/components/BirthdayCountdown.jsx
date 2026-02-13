import { useState } from 'react';
import { studentService } from '../services/api';
import './Component.css';

function BirthdayCountdown() {
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
      const response = await studentService.getBirthdayCountdown(studentId);
      setData(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Error al obtener la cuenta regresiva');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="component">
      <h2>🎉 Cuenta Regresiva de Cumpleaños</h2>
      <p className="description">
        Calcula cuántos días faltan para el próximo cumpleaños del estudiante.
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
          {loading ? 'Calculando...' : 'Ver Cuenta Regresiva'}
        </button>
      </form>

      {error && (
        <div className="alert alert-error">
          <span className="alert-icon">⚠️</span>
          {error}
        </div>
      )}

      {data && (
        <div className="result-card birthday-card">
          <div className="result-header">
            <h3>Resultado</h3>
            <span className="badge">ID: {data.studentId}</span>
          </div>
          
          <div className="birthday-countdown">
            <div className="countdown-circle">
              <div className="countdown-number">{data.daysUntil}</div>
              <div className="countdown-label">
                {data.daysUntil === 1 ? 'día' : 'días'}
              </div>
            </div>
            <div className="birthday-message">
              {data.daysUntil === 0 && '🎂 ¡Hoy es su cumpleaños!'}
              {data.daysUntil === 1 && '🎈 ¡Su cumpleaños es mañana!'}
              {data.daysUntil > 1 && data.daysUntil <= 7 && '🎁 ¡Su cumpleaños está muy cerca!'}
              {data.daysUntil > 7 && '📅 Para el próximo cumpleaños'}
            </div>
          </div>

          <div className="info-list">
            <div className="info-item">
              <span className="info-label">Próximo Cumpleaños:</span>
              <span className="info-value">{new Date(data.nextBirthday).toLocaleDateString('es-ES', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</span>
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

export default BirthdayCountdown;
