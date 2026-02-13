class PapersService {
    constructor() {
        this.apiUrl = 'https://api.plos.org/search';
    }

    async searchPapers(query) {
        if (!query || !query.trim()) {
            throw new Error('El término de búsqueda no puede estar vacío');
        }

        const encodedQuery = encodeURIComponent(query);
        const url = `${this.apiUrl}?q=title:${encodedQuery}&wt=json&rows=20`;
        
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        const data = await response.json();
        
        if (data.response && data.response.docs) {
            return data.response.docs.map(doc => Paper.fromApiData(doc));
        }
        
        return [];
    }
}
