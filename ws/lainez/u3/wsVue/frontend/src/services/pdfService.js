import jsPDF from 'jspdf';
import 'jspdf-autotable';

/**
 * Service for PDF export functionality
 */
class PdfService {
  /**
   * Export articles to PDF
   * @param {Array} articles - Array of article objects
   * @param {Object} options - Export options
   */
  exportArticlesToPdf(articles, options = {}) {
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(18);
    doc.text('PLOS Articles', 14, 22);
    
    // Add metadata
    doc.setFontSize(10);
    doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 30);
    doc.text(`Total Articles: ${articles.length}`, 14, 36);
    
    // Prepare table data
    const tableData = articles.map(article => [
      this.truncateText(article.title, 50),
      this.truncateText(article.journal, 30),
      article.publicationDate,
      article.doi
    ]);
    
    // Generate table
    doc.autoTable({
      head: [['Title', 'Journal', 'Publication Date', 'DOI']],
      body: tableData,
      startY: 45,
      styles: {
        fontSize: 8,
        cellPadding: 3
      },
      headStyles: {
        fillColor: [41, 128, 185],
        textColor: 255,
        fontStyle: 'bold'
      },
      columnStyles: {
        0: { cellWidth: 60 },
        1: { cellWidth: 45 },
        2: { cellWidth: 35 },
        3: { cellWidth: 45 }
      },
      margin: { top: 45 }
    });
    
    // Save PDF
    const filename = options.filename || `plos-articles-${Date.now()}.pdf`;
    doc.save(filename);
  }
  
  /**
   * Truncate text to specified length
   * @param {string} text - Text to truncate
   * @param {number} maxLength - Maximum length
   * @returns {string} Truncated text
   */
  truncateText(text, maxLength) {
    if (!text) return 'N/A';
    return text.length > maxLength ? text.substring(0, maxLength - 3) + '...' : text;
  }
}

export default new PdfService();
