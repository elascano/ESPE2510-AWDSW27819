class PapersController {
    constructor(service) {
        this.service = service;
    }

    createAppConfig() {
        const service = this.service;

        return {
            data() {
                return {
                    searchQuery: 'software',
                    papers: [],
                    loading: false,
                    error: null,
                    searched: false,
                    currentPage: 1,
                    itemsPerPage: 10
                };
            },
            computed: {
                totalPages() {
                    return Math.ceil(this.papers.length / this.itemsPerPage);
                },
                paginatedPapers() {
                    const start = (this.currentPage - 1) * this.itemsPerPage;
                    const end = start + this.itemsPerPage;
                    return this.papers.slice(start, end);
                }
            },
            mounted() {
                this.searchPapers();
            },
            methods: {
                async searchPapers() {
                    if (!this.searchQuery.trim()) {
                        this.error = 'Por favor ingrese un término de búsqueda';
                        return;
                    }

                    this.loading = true;
                    this.error = null;
                    this.searched = true;

                    try {
                        this.papers = await service.searchPapers(this.searchQuery);
                        this.currentPage = 1; // Reset a la primera página
                    } catch (err) {
                        this.error = `Error al buscar papers: ${err.message}`;
                        this.papers = [];
                    } finally {
                        this.loading = false;
                    }
                },
                formatDate(paper) {
                    return paper.getFormattedDate();
                },
                getAbstract(paper) {
                    return paper.getAbstractSummary();
                },
                getScore(paper) {
                    return paper.getFormattedScore();
                },
                getDoiUrl(paper) {
                    return paper.getDoiUrl();
                },
                goToPage(page) {
                    if (page >= 1 && page <= this.totalPages) {
                        this.currentPage = page;
                    }
                },
                previousPage() {
                    if (this.currentPage > 1) {
                        this.currentPage--;
                    }
                },
                nextPage() {
                    if (this.currentPage < this.totalPages) {
                        this.currentPage++;
                    }
                }
            }
        };
    }
}
