import { useState } from 'react';
import { guardianService } from '../services/api';
import './Component.css';

function GuardianStudents() {
  const [guardianId, setGuardianId] = useState('1');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const response = await guardianService.getStudents(guardianId);
      setData(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Error al obtener los estudiantes');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="component">
      <h2>👦 Estudiantes del Tutor</h2>
      <p className="description">
        Lista todos los estudiantes asociados a un tutor o responsable.
      </p>

      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="guardianId">ID del Tutor:</label>
          <input
            type="number"
            id="guardianId"
            value={guardianId}
            onChange={(e) => setGuardianId(e.target.value)}
            placeholder="Ej: 1"
            required
            min="1"
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Buscando...' : 'Buscar Estudiantes'}
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
            <h3>Estudiantes Encontrados</h3>
            <span className="badge">{data.length} {data.length === 1 ? 'Estudiante' : 'Estudiantes'}</span>
          </div>
          
          {data.length === 0 ? (
            <div className="empty-state">
              <span className="empty-icon">🎓</span>
              <p>No se encontraron estudiantes para este tutor</p>
            </div>
          ) : (
            <div className="cards-grid">
              {data.map((student, index) => (
                <div key={student.StudentID || index} className="person-card">
                  <div className="person-avatar student-avatar">
                    {student.FirstName.charAt(0)}{student.LastName.charAt(0)}
                  </div>
                  <div className="person-info">
                    <h4>{student.FirstName} {student.LastName}</h4>
                    <p className="person-role">{student.Relationship}</p>
                    <div className="person-details">
                      <span className="person-id">ID: {student.StudentID}</span>
                      {student.GradeID && <span className="person-grade">Grado: {student.GradeID}</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default GuardianStudents;
