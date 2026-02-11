# PLOS Articles Backend API

Backend API for fetching and displaying scientific articles from PLOS (Public Library of Science).

## Architecture

This project follows the **MVC (Model-View-Controller)** pattern:

- **Models**: Data structures and business logic (services)
- **Views**: JSON responses (handled by Express)
- **Controllers**: Request handling and response coordination

## Structure

```
backend/
├── src/
│   ├── config/          # Configuration files
│   │   ├── environment.js
│   │   └── constants.js
│   ├── controllers/     # Request handlers
│   │   └── articleController.js
│   ├── services/        # Business logic
│   │   └── articleService.js
│   ├── routes/          # API routes
│   │   └── articleRoutes.js
│   ├── middleware/      # Custom middleware
│   │   └── common.js
│   └── server.js        # Application entry point
├── .env                 # Environment variables
└── package.json
```

## Installation

```bash
cd backend
npm install
```

## Running the Application

**Development mode** (with auto-reload):
```bash
npm run dev
```

**Production mode**:
```bash
npm start
```

The server will start on `http://localhost:3000`

## API Endpoints

### Get Articles
```
GET /api/articles?query=title:university&page=1&pageSize=10
```

**Query Parameters:**
- `query` (optional): Search query (default: "title:university")
- `page` (optional): Page number (default: 1)
- `pageSize` (optional): Items per page (default: 10, max: 50)

**Response:**
```json
{
  "success": true,
  "data": {
    "articles": [...],
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

### Health Check
```
GET /health
```

## Technologies

- **Express.js**: Web framework
- **Axios**: HTTP client for API requests
- **CORS**: Cross-origin resource sharing
- **dotenv**: Environment variable management
