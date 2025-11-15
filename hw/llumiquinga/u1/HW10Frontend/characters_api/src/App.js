//compenete App.s

import { useFetch } from "./useFetch";
import { useState } from "react";
import './App.css';

function App() {
  const { data, loading, error } = useFetch("https://dragonball-api.com/api/planets");
  const { data: data2, loading: loading2, error: error2 } = useFetch("https://dragonball-api.com/api/characters");
  
  // Estado para el buscador
  const [searchTerm, setSearchTerm] = useState("");
  
  // Estado para el modal de detalles
  const [selectedItem, setSelectedItem] = useState(null);
  const [showJson, setShowJson] = useState(false);

  // Función para filtrar elementos por nombre
  const filterItems = (items, searchTerm) => {
    if (!searchTerm) return items;
    return items.filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  // Función para abrir el modal con detalles
  const openDetails = (item, type) => {
    setSelectedItem({ ...item, type });
    setShowJson(false);
  };

  // Función para cerrar el modal
  const closeDetails = () => {
    setSelectedItem(null);
    setShowJson(false);
  };
  

  return (
    <div className="App">
      {/* Buscador */}
      <div className="search-container">
        <h1>Dragon Ball - Planets and Characters</h1>
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      {/* Planetas */}
      <section className="section">
        <h2>Planets</h2>
        {loading && <p>Loading planets...</p>}
        {error && <p>Error: {error.message}</p>}
        <div className="cards-container">
          {data?.items && filterItems(data.items, searchTerm).map((planet) => (
            <div key={planet.id} className="card" onClick={() => openDetails(planet, 'planet')}>
              <h3>{planet.name}</h3>
              <img src={planet.image} alt={planet.name} className="card-image" />
              <p>{planet.description}</p>
            </div>
          ))}
        </div>
        {data?.items && filterItems(data.items, searchTerm).length === 0 && searchTerm && (
          <p>No planets found with that name.</p>
        )}
      </section>

      {/* Personajes */}
      <section className="section">
        <h2>Characters</h2>
        {loading2 && <p>Loading characters...</p>}
        {error2 && <p>Error: {error2.message}</p>}
        <div className="cards-container">
          {data2?.items && filterItems(data2.items, searchTerm).map((character) => (
            <div key={character.id} className="card" onClick={() => openDetails(character, 'character')}>
              <h3>{character.name}</h3>
              <img src={character.image} alt={character.name} className="card-image" />
              <p><strong>Race:</strong> {character.race}</p>
              <p><strong>Ki:</strong> {character.ki}</p>
            </div>
          ))}
        </div>
        {data2?.items && filterItems(data2.items, searchTerm).length === 0 && searchTerm && (
          <p>No characters found with that name.</p>
        )}
      </section>

      {/* Modal de detalles */}
      {selectedItem && (
        <div className="modal-overlay" onClick={closeDetails}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={closeDetails}>×</button>
            
            <div className="modal-header">
              <h2>{selectedItem.name}</h2>
              <div className="modal-tabs">
                <button 
                  className={!showJson ? "tab active" : "tab"} 
                  onClick={() => setShowJson(false)}
                >
                  Details
                </button>
                <button 
                  className={showJson ? "tab active" : "tab"} 
                  onClick={() => setShowJson(true)}
                >
                  JSON
                </button>
              </div>
            </div>

            {!showJson ? (
              <div className="modal-body">
                <div className="modal-image">
                  <img src={selectedItem.image} alt={selectedItem.name} />
                </div>
                <div className="modal-details">
                  {selectedItem.type === 'planet' ? (
                    <>
                      <h3>Planet Information</h3>
                      <p><strong>ID:</strong> {selectedItem.id}</p>
                      <p><strong>Name:</strong> {selectedItem.name}</p>
                      <p><strong>Description:</strong> {selectedItem.description}</p>
                      <p><strong>Is Destroyed:</strong> {selectedItem.isDestroyed ? 'Yes' : 'No'}</p>
                      {selectedItem.characters && (
                        <p><strong>Characters:</strong> {selectedItem.characters.length} associated characters</p>
                      )}
                    </>
                  ) : (
                    <>
                      <h3>Character Information</h3>
                      <p><strong>ID:</strong> {selectedItem.id}</p>
                      <p><strong>Name:</strong> {selectedItem.name}</p>
                      <p><strong>Race:</strong> {selectedItem.race}</p>
                      <p><strong>Gender:</strong> {selectedItem.gender}</p>
                      <p><strong>Ki:</strong> {selectedItem.ki}</p>
                      <p><strong>Max Ki:</strong> {selectedItem.maxKi}</p>
                      <p><strong>Affiliation:</strong> {selectedItem.affiliation}</p>
                      <p><strong>Description:</strong> {selectedItem.description}</p>
                      {selectedItem.originPlanet && (
                        <p><strong>Origin Planet:</strong> {selectedItem.originPlanet.name}</p>
                      )}
                      {selectedItem.transformations && selectedItem.transformations.length > 0 && (
                        <p><strong>Transformations:</strong> {selectedItem.transformations.length} available</p>
                      )}
                    </>
                  )}
                </div>
              </div>
            ) : (
              <div className="json-container">
                <pre>{JSON.stringify(selectedItem, null, 2)}</pre>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

