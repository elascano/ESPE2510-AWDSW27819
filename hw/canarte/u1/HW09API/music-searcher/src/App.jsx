import { useState } from 'react'
import './App.css'

function App() {
  const [search, setSearch] = useState('');
  const [artist, setArtist] = useState(null);
  const [topTracks, setTopTracks] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchArtist = async (e) => {
    e.preventDefault()
    if (!search.trim()) return

    setLoading(true)
    try {
      const artistResponse = await fetch(
        `https://corsproxy.io/?${encodeURIComponent(`https://api.deezer.com/search/artist?q=${search}`)}`
      )
      const artistData = await artistResponse.json()
      console.log('=== ENDPOINT 1: Artist Search ===')
      console.log('URL:', `https://api.deezer.com/search/artist?q=${search}`)
      console.log('JSON:', artistData)
      console.log('=====================================\n')

      if (!artistData.data || artistData.data.length === 0){
        alert('The artist was not found')
        setLoading(false)
        return
      }
      const artistFound = artistData.data[0]
      setArtist(artistFound)

      const topTracksResponse = await fetch(
       `https://corsproxy.io/?${encodeURIComponent(`https://api.deezer.com/artist/${artistFound.id}/top?limit=10`)}`
      )

      const tracksData = await topTracksResponse.json()
      console.log('=== ENDPOINT 2: Top Tracks ===')
      console.log('URL:', `https://api.deezer.com/artist/${artistFound.id}/top?limit=10`)
      console.log('JSON:', tracksData)
      console.log('=====================================\n')
      const sortedTracks = tracksData.data.sort((a,b) => b.rank -a.rank)
      setTopTracks(tracksData.data)
    }catch(error){
      alert('There was a problem, try again')
    }
    setLoading(false)
  }

  const defineFormatDuration= (seconds) => {
    const minutes = Math.floor(seconds/60)
    const secs = seconds % 60
    return `${minutes}: ${secs.toString().padStart(2, '0')}`
  }
  return(
    <div className="main">
        <h1> Top 10 Tracks by Artist</h1>

        <form onSubmit={searchArtist}>
          <input type = "text" placeholder='Search an artist ...'
           value ={search} onChange={(e) => setSearch(e.target.value)}></input>
           <button type="submit">Search</button>
        </form>
        {loading && <p className="loading">Loading...</p>}

        {artist && (
          <div className="artist-info">
            <img src={artist.picture_big} alt={artist.name}/>
            <h2>{artist.name}</h2>
            <p className ="followers">
              {artist.nb_fan?.toLocaleString()} fans
            </p>
          </div>
        )}

        {topTracks.length > 0 &&(
          <div className="top-tracks">
            <h3>Top 10 most popular tracks</h3>
            <div className="tracks-list">
              {topTracks.map((track, index) => (
              <div key={track.id} className="track-card">
                <div className="track-number">{index+1}</div>
                <img src={track.album.cover_medium} alt={track.tittle}/>
                <div className="track-info">
                  <h4>{track.title}</h4>
                  <p className="album">{track.album.title}</p>
                  <div className ="track-stats">
                    <span>{track.rank?.toLocaleString()} streams </span>
                    <span>{defineFormatDuration(track.duration)}</span>
                    </div>
                    <audio controls>
                      <source src={track.preview} type="audio/mpeg" />
                    </audio>
                </div>
              </div>
              ))}
            </div>
          </div>
        )}
    </div>
  )
}

export default App
