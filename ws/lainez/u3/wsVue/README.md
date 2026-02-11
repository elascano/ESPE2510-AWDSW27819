# PLOS Articles Application

Full-stack application for browsing and exporting scientific articles from PLOS (Public Library of Science).

## 📋 Project Overview

This application consists of two main parts:
- **Backend**: Express.js REST API (MVC architecture)
- **Frontend**: Vue 3 single-page application

## 🏗️ Architecture

### Backend (Express.js + MVC)
- **Model**: Data structures and business logic (services)
- **View**: JSON API responses
- **Controller**: Request handling and orchestration

### Frontend (Vue 3)
- Component-based architecture
- Composition API
- Reactive state management
- Service layer for API communication

## ✨ Features

- ✅ Browse scientific articles from PLOS API
- ✅ Pagination with customizable page sizes
- ✅ Export articles to PDF format
- ✅ Double-click DOI to visit article page
- ✅ Responsive design for all devices
- ✅ Error handling and loading states
- ✅ Clean code principles applied

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Start the server
npm run dev
```

Backend will run on: `http://localhost:3000`

### Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

Frontend will run on: `http://localhost:5173`

## 📁 Project Structure

```
wsVue/
├── backend/
│   ├── src/
│   │   ├── config/              # Configuration files
│   │   ├── controllers/         # Request handlers (Controller)
│   │   ├── services/            # Business logic (Model)
│   │   ├── routes/              # API routes
│   │   ├── middleware/          # Express middleware
│   │   └── server.js            # Application entry point
│   ├── .env                     # Environment variables
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/          # Vue components
    │   │   ├── ArticlesTable.vue
    │   │   ├── PaginationControls.vue
    │   │   ├── LoadingSpinner.vue
    │   │   └── ErrorMessage.vue
    │   ├── services/            # API and business logic
    │   │   ├── apiClient.js
    │   │   ├── articleService.js
    │   │   └── pdfService.js
    │   ├── config/              # Configuration
    │   │   └── constants.js
    │   ├── App.vue              # Root component
    │   └── main.js              # Application entry
    ├── index.html
    └── package.json
```

## 🔌 API Endpoints

### GET /api/articles
Fetch articles with pagination

**Query Parameters:**
- `query` (string): Search query (default: "title:university")
- `page` (number): Page number (default: 1)
- `pageSize` (number): Items per page (default: 10, max: 50)

**Response:**
```json
{
  "success": true,
  "data": {
    "articles": [
      {
        "id": "10.1371/journal.pone.0123456",
        "title": "Article Title",
        "journal": "PLOS ONE",
        "publicationDate": "Jan 15, 2024",
        "doi": "10.1371/journal.pone.0123456"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "pageSize": 10,
      "totalResults": 100,
      "totalPages": 10,
      "hasNextPage": true,
      "hasPreviousPage": false
    }
  }
}
```

## 🎯 Usage

1. **Start Backend**: Run the backend server first
2. **Start Frontend**: Run the frontend development server
3. **Browse Articles**: View scientific articles in the table
4. **Navigate Pages**: Use pagination controls to browse results
5. **Export to PDF**: Click "Export to PDF" to download current page
6. **Visit Article**: Double-click any DOI to open the article

## 🛠️ Technologies

### Backend
- **Express.js**: Fast, minimalist web framework
- **Axios**: Promise-based HTTP client
- **CORS**: Enable cross-origin requests
- **dotenv**: Environment variable management

### Frontend
- **Vue 3**: Progressive JavaScript framework
- **Vite**: Next-generation build tool
- **Axios**: HTTP client for API requests
- **jsPDF**: Client-side PDF generation
- **jsPDF-AutoTable**: Table plugin for jsPDF

## 🧹 Clean Code Principles Applied

- **Single Responsibility**: Each class/function has one clear purpose
- **Separation of Concerns**: Backend (MVC), Frontend (Component/Service layers)
- **Meaningful Names**: Clear, descriptive variable and function names
- **Small Functions**: Functions are concise and focused
- **DRY (Don't Repeat Yourself)**: Reusable components and services
- **Error Handling**: Comprehensive error handling throughout
- **Comments**: JSDoc comments for documentation
- **Consistent Formatting**: Uniform code style

## 📝 Why JavaScript for Both?

Using JavaScript/Node.js for both backend and frontend offers:
- **Single Language**: No context switching between languages
- **Code Sharing**: Share types, utilities, and validation logic
- **Ecosystem**: Access to npm packages on both sides
- **Developer Experience**: Faster development, easier onboarding
- **Modern Features**: ES6+ features available everywhere

## 📄 License

This project is created for educational purposes.

## 👨‍💻 Author

Created with ❤️ for ESPE - Programación Web Avanzada
