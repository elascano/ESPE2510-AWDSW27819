import { useState } from 'react';
import './App.css';
import StudentAge from './components/StudentAge';
import StudentStudyTime from './components/StudentStudyTime';
import BirthdayCountdown from './components/BirthdayCountdown';
import StudentGuardians from './components/StudentGuardians';
import GuardianStudents from './components/GuardianStudents';

function App() {
  const [activeTab, setActiveTab] = useState('age');

  const tabs = [
    { id: 'age', label: 'Edad del Estudiante', icon: '🎂' },
    { id: 'study-time', label: 'Tiempo de Estudio', icon: '📚' },
    { id: 'birthday', label: 'Cuenta Regresiva', icon: '🎉' },
    { id: 'guardians', label: 'Tutores', icon: '👨‍👩‍👧' },
    { id: 'students', label: 'Estudiantes de Tutor', icon: '👦' },
  ];

  return (
    <div className="app">
      <header className="app-header">
        <h1>🏫 Nice Kids Center</h1>
        <p>Sistema de Gestión Académica - Business Rules</p>
      </header>

      <nav className="tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="tab-icon">{tab.icon}</span>
            <span className="tab-label">{tab.label}</span>
          </button>
        ))}
      </nav>

      <main className="content">
        {activeTab === 'age' && <StudentAge />}
        {activeTab === 'study-time' && <StudentStudyTime />}
        {activeTab === 'birthday' && <BirthdayCountdown />}
        {activeTab === 'guardians' && <StudentGuardians />}
        {activeTab === 'students' && <GuardianStudents />}
      </main>

      <footer className="app-footer">
        <p>© 2026 Nice Kids Center | Desarrollo Web Avanzado</p>
      </footer>
    </div>
  );
}

export default App;
