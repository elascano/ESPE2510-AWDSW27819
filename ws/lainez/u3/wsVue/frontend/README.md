# PLOS Articles Frontend

Vue 3 frontend application for browsing and exporting scientific articles from PLOS (Public Library of Science).

## Features

- 📊 **Articles Table**: Display scientific articles with title, journal, publication date, and DOI
- 📄 **PDF Export**: Export current page of articles to PDF format
- 🔗 **DOI Navigation**: Double-click on any DOI to visit the article's page
- 📖 **Pagination**: Navigate through results with customizable page sizes
- 🎨 **Responsive Design**: Works on desktop and mobile devices
- ⚡ **Real-time Loading**: Loading states and error handling

## Architecture

Built with Vue 3 using the Composition API and clean code principles:

```
frontend/
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── ArticlesTable.vue
│   │   ├── PaginationControls.vue
│   │   ├── LoadingSpinner.vue
│   │   └── ErrorMessage.vue
│   ├── services/          # Business logic and API calls
│   │   ├── apiClient.js
│   │   ├── articleService.js
│   │   └── pdfService.js
│   ├── config/            # Configuration constants
│   │   └── constants.js
│   ├── App.vue            # Main application component
│   └── main.js            # Application entry point
├── index.html
├── vite.config.js
└── package.json
```

## Installation

```bash
cd frontend
npm install
```

## Running the Application

Make sure the backend is running on `http://localhost:3000` first.

**Development mode** (with hot-reload):
```bash
npm run dev
```

The application will start on `http://localhost:5173`

**Build for production**:
```bash
npm run build
```

**Preview production build**:
```bash
npm run preview
```

## Usage

1. **Browse Articles**: The table displays scientific articles from PLOS
2. **Pagination**: Use the navigation buttons to move between pages
3. **Change Page Size**: Select different items per page from the dropdown
4. **Export to PDF**: Click the "Export to PDF" button to download current page
5. **Visit Article**: Double-click on any DOI to open the article in a new tab

## Technologies

- **Vue 3**: Progressive JavaScript framework
- **Vite**: Next-generation frontend tooling
- **Axios**: HTTP client for API requests
- **jsPDF**: PDF generation library
- **jsPDF-AutoTable**: Table plugin for jsPDF

## Configuration

Edit [src/config/constants.js](src/config/constants.js) to change:
- API base URL
- Default page size
- DOI base URL

## Components

### ArticlesTable
Displays articles in a table format with export and DOI navigation capabilities.

### PaginationControls
Navigation controls for browsing through paginated results.

### LoadingSpinner
Visual feedback during data fetching.

### ErrorMessage
Displays error messages with retry functionality.
