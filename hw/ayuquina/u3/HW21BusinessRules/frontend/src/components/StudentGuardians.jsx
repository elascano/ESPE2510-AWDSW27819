import { useState } from 'react';
import { studentService } from '../services/api';
import './Component.css';

function StudentGuardians() {
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
      const response = await studentService.getGuardians(studentId);
      setData(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Error al obtener los tutores');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="component">
      <h2>👨‍👩‍👧 Tutores del Estudiante</h2>
      <p className="description">
        Lista todos los tutores o responsables asociados a un estudiante.
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
          {loading ? 'Buscando...' : 'Buscar Tutores'}
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
            <h3>Tutores Encontrados</h3>
            <span className="badge">{data.length} {data.length === 1 ? 'Tutor' : 'Tutores'}</span>
          </div>
          
          {data.length === 0 ? (
            <div className="empty-state">
              <span className="empty-icon">👤</span>
              <p>No se encontraron tutores para este estudiante</p>
            </div>
          ) : (
            <div className="cards-grid">
              {data.map((guardian, index) => (
                <div key={guardian.GuardianID || index} className="person-card">
                  <div className="person-avatar">
                    {guardian.FirstName.charAt(0)}{guardian.LastName.charAt(0)}
                  </div>
                  <div className="person-info">
                    <h4>{guardian.FirstName} {guardian.LastName}</h4>
                    <p className="person-role">{guardian.Relationship}</p>
                    <p className="person-id">ID: {guardian.GuardianID}</p>
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

export default StudentGuardians;
