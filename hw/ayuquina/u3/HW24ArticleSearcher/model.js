class Paper {
    constructor(data) {
        this.id = data.id || '';
        this.titleDisplay = data.title_display || 'Sin título';
        this.journal = data.journal || 'N/A';
        this.eissn = data.eissn || 'N/A';
        this.publicationDate = data.publication_date || null;
        this.articleType = data.article_type || 'N/A';
        this.authorDisplay = data.author_display || [];
        this.abstract = data.abstract || [];
        this.score = data.score || 0;
    }

    getFormattedDate() {
        if (!this.publicationDate) return 'N/A';
        const date = new Date(this.publicationDate);
        return date.toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    getAbstractSummary(maxLength = 200) {
        if (!this.abstract || this.abstract.length === 0) return 'No disponible';
        const fullAbstract = this.abstract[0];
        if (fullAbstract.length <= maxLength) return fullAbstract;
        return fullAbstract.substring(0, maxLength) + '...';
    }

    getDoiUrl() {
        return `https://doi.org/${this.id}`;
    }

    getFormattedScore() {
        return this.score ? this.score.toFixed(2) : 'N/A';
    }

    static fromApiData(apiData) {
        return new Paper(apiData);
    }
}
