const API_BASE = 'https://musicbrainz.org/ws/2/';
        const APP_NAME = 'MusicBrainzExplorer/1.0';

        function switchTab(tabName) {
            document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
            
            event.target.classList.add('active');
            document.getElementById(tabName).classList.add('active');
        }

        function handleKeyPress(event, functionName) {
            if (event.key === 'Enter') {
                window[functionName]();
            }
        }

        async function searchArtists() {
            const query = document.getElementById('artistSearch').value.trim();
            const resultsDiv = document.getElementById('artistResults');
            
            if (!query) {
                resultsDiv.innerHTML = '<div class="error">Por favor ingresa un nombre de artista</div>';
                return;
            }

            resultsDiv.innerHTML = '<div class="loading">Buscando artistas...</div>';

            try {
                const response = await fetch(`${API_BASE}artist/?query=${encodeURIComponent(query)}&fmt=json&limit=10`, {
                    headers: { 'User-Agent': APP_NAME }
                });
                
                const data = await response.json();
                
                    if (data.artists && data.artists.length > 0) {
                        // Prepare JSON payload for console and download
                        const jsonData = {
                            query,
                            fetchedAt: new Date().toISOString(),
                            count: data.artists.length,
                            artists: data.artists
                        };

                        // Log nicely formatted JSON to console
                        console.log('Artists JSON:', JSON.stringify(jsonData, null, 2));

                        // Create a blob URL for the JSON file and a safe filename
                        const safeQuery = query.replace(/[^a-z0-9\-_]/gi, '_') || 'search';
                        const filename = `artists-${safeQuery}-${Date.now()}.json`;
                        const blob = new Blob([JSON.stringify(jsonData, null, 2)], { type: 'application/json' });
                        const url = URL.createObjectURL(blob);

                        // Build results HTML with a download link (user must click to save)
                        const downloadHtml = `<div style="margin-bottom:12px"><a href="${url}" download="${filename}" onclick="setTimeout(()=>URL.revokeObjectURL('${url}'),1500)" style="display:inline-flex;align-items:center;gap:8px;padding:8px 12px;border-radius:8px;background:var(--c-accent);color:white;text-decoration:none"><i class="fa-solid fa-download"></i> Descargar JSON</a></div>`;

                        resultsDiv.innerHTML = downloadHtml + '<div class="results">' +
                            data.artists.map(artist => `
                                <div class="card">
                                    <h3>${artist.name}</h3>
                                    <div class="card-info">
                                        ${artist.type ? `<div class="info-row"><span class="info-label">Tipo:</span> <span class="badge">${artist.type}</span></div>` : ''}
                                        ${artist.country ? `<div class="info-row"><span class="info-label">País:</span> ${artist.country}</div>` : ''}
                                        ${artist['life-span'] && artist['life-span'].begin ? `<div class="info-row"><span class="info-label">Activo desde:</span> ${artist['life-span'].begin}${artist['life-span'].end ? ' - ' + artist['life-span'].end : ' - Presente'}</div>` : ''}
                                        ${artist.disambiguation ? `<div class="info-row"><span class="info-label">Info:</span> ${artist.disambiguation}</div>` : ''}
                                        ${artist.tags ? `<div class="info-row"><span class="info-label">Géneros:</span> ${artist.tags.slice(0, 5).map(tag => `<span class="badge">${tag.name}</span>`).join('')}</div>` : ''}
                                    </div>
                                    <button class="album-button" onclick="loadArtistAlbums('${artist.id}', '${artist.name.replace(/'/g, "\\'")}')"><i class="fa-solid fa-compact-disc"></i> Ver Álbumes</button>
                                </div>
                            `).join('') + '</div>';
                    } else {
                        resultsDiv.innerHTML = '<div class="no-results">No se encontraron artistas</div>';
                    }
            } catch (error) {
                resultsDiv.innerHTML = '<div class="error">Error al buscar: ' + error.message + '</div>';
            }
        }

        async function searchAlbums() {
            const query = document.getElementById('albumSearch').value.trim();
            const resultsDiv = document.getElementById('albumResults');
            
            if (!query) {
                resultsDiv.innerHTML = '<div class="error">Por favor ingresa un nombre de artista</div>';
                return;
            }

            resultsDiv.innerHTML = '<div class="loading">Buscando artista...</div>';

            try {
                const response = await fetch(`${API_BASE}artist/?query=${encodeURIComponent(query)}&fmt=json&limit=1`, {
                    headers: { 'User-Agent': APP_NAME }
                });
                
                const data = await response.json();
                
                if (data.artists && data.artists.length > 0) {
                    await loadArtistAlbums(data.artists[0].id, data.artists[0].name, resultsDiv);
                } else {
                    resultsDiv.innerHTML = '<div class="no-results">No se encontró el artista</div>';
                }
            } catch (error) {
                resultsDiv.innerHTML = '<div class="error">Error al buscar: ' + error.message + '</div>';
            }
        }

        async function loadArtistAlbums(artistId, artistName, targetDiv) {
            const resultsDiv = targetDiv || document.getElementById('albumResults');
            resultsDiv.innerHTML = '<div class="loading">Cargando álbumes...</div>';

            try {
                const response = await fetch(`${API_BASE}release-group?artist=${artistId}&type=album|ep&fmt=json&limit=20`, {
                    headers: { 'User-Agent': APP_NAME }
                });
                
                const data = await response.json();
                
                if (data['release-groups'] && data['release-groups'].length > 0) {
                    resultsDiv.innerHTML = `<h3 style="margin-bottom: 20px; color: #667eea;">Álbumes de ${artistName}</h3><div class="results">` + 
                        data['release-groups'].map(album => `
                            <div class="card">
                                <h3>${album.title}</h3>
                                <div class="card-info">
                                    <div class="info-row"><span class="info-label">Tipo:</span> <span class="badge">${album['primary-type']}</span></div>
                                    ${album['first-release-date'] ? `<div class="info-row"><span class="info-label">Lanzamiento:</span> ${album['first-release-date']}</div>` : ''}
                                    ${album['secondary-types'] && album['secondary-types'].length > 0 ? `<div class="info-row"><span class="info-label">Categoría:</span> ${album['secondary-types'].map(type => `<span class="badge">${type}</span>`).join('')}</div>` : ''}
                                </div>
                            </div>
                        `).join('') + '</div>';
                } else {
                    resultsDiv.innerHTML = '<div class="no-results">No se encontraron álbumes</div>';
                }
            } catch (error) {
                resultsDiv.innerHTML = '<div class="error">Error al cargar álbumes: ' + error.message + '</div>';
            }

            if (!targetDiv) {
                switchTab('albums');
            }
        }

        async function searchSongs() {
            const query = document.getElementById('songSearch').value.trim();
            const resultsDiv = document.getElementById('songResults');
            
            if (!query) {
                resultsDiv.innerHTML = '<div class="error">Por favor ingresa el nombre de una canción</div>';
                return;
            }

            resultsDiv.innerHTML = '<div class="loading">Buscando canciones...</div>';

            try {
                const response = await fetch(`${API_BASE}recording/?query=${encodeURIComponent(query)}&fmt=json&limit=15`, {
                    headers: { 'User-Agent': APP_NAME }
                });
                
                const data = await response.json();
                
                if (data.recordings && data.recordings.length > 0) {
                    resultsDiv.innerHTML = '<div class="results">' + 
                        data.recordings.map(song => `
                            <div class="card">
                                <h3>${song.title}</h3>
                                <div class="card-info">
                                    ${song['artist-credit'] ? `<div class="info-row"><span class="info-label">Artista:</span> ${song['artist-credit'].map(credit => credit.name).join(', ')}</div>` : ''}
                                    ${song.length ? `<div class="info-row"><span class="info-label">Duración:</span> ${Math.floor(song.length / 60000)}:${String(Math.floor((song.length % 60000) / 1000)).padStart(2, '0')}</div>` : ''}
                                    ${song['first-release-date'] ? `<div class="info-row"><span class="info-label">Lanzamiento:</span> ${song['first-release-date']}</div>` : ''}
                                    ${song.releases && song.releases.length > 0 ? `<div class="info-row"><span class="info-label">Álbum:</span> ${song.releases[0].title}</div>` : ''}
                                    ${song.tags ? `<div class="info-row"><span class="info-label">Tags:</span> ${song.tags.slice(0, 4).map(tag => `<span class="badge">${tag.name}</span>`).join('')}</div>` : ''}
                                </div>
                            </div>
                        `).join('') + '</div>';
                } else {
                    resultsDiv.innerHTML = '<div class="no-results">No se encontraron canciones</div>';
                }
            } catch (error) {
                resultsDiv.innerHTML = '<div class="error">Error al buscar: ' + error.message + '</div>';
            }
        }