# MVC Architecture Explanation

## Project Overview

Full-stack MVC architecture:
- **Backend:** Node.js + Express.js (JavaScript)
- **Frontend:** Angular 21 (TypeScript)
- **API:** PLOS Search API integration

---

## Backend Structure

```
backend/src/
├── controllers/articlesController.js  ← CONTROLLER
├── services/plosService.js            ← MODEL
├── routes/articlesRoutes.js
└── server.js
```

---

## 1️⃣ CONTROLLER (Backend)

**File:** `backend/src/controllers/articlesController.js`

**Purpose:** Handle HTTP requests and responses

```javascript
class ArticlesController {
  async searchArticles(req, res, next) {
    try {
      const { q, page = 1, pageSize = 10 } = req.query;
      
      if (!q) {
        return res.status(400).json({
          success: false,
          error: 'Search query (q) is required'
        });
      }

      const result = await plosService.searchArticles(q, parseInt(page), parseInt(pageSize));
      
      res.json({
        success: true,
        data: result
      });
    } catch (error) {
      next(error);
    }
  }
}
```

**Responsibilities:**
- Receive HTTP requests
- Validate parameters
- Call Model/Service
- Send responses

---

## 2️⃣ MODEL (Backend)

**File:** `backend/src/services/plosService.js`

**Purpose:** Business logic and data manipulation

```javascript
class PlosService {
  async searchArticles(query, page = 1, pageSize = 10) {
    const start = (page - 1) * pageSize;
    const sanitizedQuery = this._sanitizeQuery(query);

    const params = {
      q: sanitizedQuery,
      start: start,
      rows: pageSize,
      fl: 'id,title,journal,publication_date,author',
      wt: 'json',
      api_key: this.apiKey
    };

    const response = await axios.get(this.baseUrl, { params });
    const { docs, numFound } = response.data.response;
    
    return {
      articles: this._mapArticles(docs),
      pagination: {
        currentPage: page,
        pageSize,
        totalResults: numFound,
        totalPages: Math.ceil(numFound / pageSize)
      }
    };
  }

  _mapArticles(docs) {
    return docs.map(doc => ({
      doi: doc.id || 'N/A',
      title: doc.title || 'No Title',
      journal: doc.journal || 'Unknown Journal',
      publicationDate: this._formatDate(doc.publication_date),
      authors: doc.author || []
    }));
  }
}
```

**Responsibilities:**
- Business logic
- External API calls
- Data transformation
- Input sanitization

---

## Frontend Structure

```
frontend/src/app/
├── models/article.model.ts                ← MODEL (Data)
├── services/article.service.ts            ← MODEL (HTTP)
└── components/articles-list/
    ├── articles-list.component.ts         ← CONTROLLER
    └── articles-list.component.html       ← VIEW
```

---

## 3️⃣ MODEL (Frontend - Interface)

**File:** `frontend/src/app/models/article.model.ts`

**Purpose:** Define data structures

```typescript
export interface Article {
  doi: string;
  title: string;
  journal: string;
  publicationDate: string;
  authors: string[];
}

export interface PaginationInfo {
  currentPage: number;
  pageSize: number;
  totalResults: number;
  totalPages: number;
}

export interface ApiResponse {
  success: boolean;
  data: {
    articles: Article[];
    pagination: PaginationInfo;
  };
  error?: string;
}
```

---

## 4️⃣ MODEL (Frontend - Service)

**File:** `frontend/src/app/services/article.service.ts`

**Purpose:** HTTP communication with backend

```typescript
@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private readonly apiUrl = 'https://plot-doi-backend.onrender.com/api/articles';

  searchArticles(query: string, page: number, pageSize: number): Observable<ApiResponse> {
    const params = new HttpParams()
      .set('q', query)
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<ApiResponse>(`${this.apiUrl}/search`, { params })
      .pipe(
        map(response => this.validateResponse(response)),
        catchError(error => this.handleError(error))
      );
  }

  getArticleUrl(doi: string): string {
    return `https://doi.org/${doi}`;
  }
}
```

**Responsibilities:**
- HTTP requests
- Response validation
- Error handling

---

## 5️⃣ CONTROLLER (Frontend)

**File:** `frontend/src/app/components/articles-list/articles-list.component.ts`

**Purpose:** Manage view logic and user interactions

```typescript
@Component({
  selector: 'app-articles-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.css']
})
export class ArticlesListComponent implements OnInit {
  articles: Article[] = [];
  pagination: PaginationInfo | null = null;
  searchQuery: string = 'title:university';
  isLoading: boolean = false;

  constructor(
    private articleService: ArticleService,
    private pdfService: PdfService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadArticles();
  }

  loadArticles(): void {
    this.isLoading = true;
    
    this.articleService.searchArticles(this.searchQuery, this.currentPage, this.pageSize)
      .subscribe({
        next: (response) => {
          this.articles = response.data.articles;
          this.pagination = response.data.pagination;
          this.isLoading = false;
          this.cdr.detectChanges();
        },
        error: (error) => {
          this.errorMessage = error.message;
          this.isLoading = false;
        }
      });
  }

  onSearch(): void {
    this.currentPage = 1;
    this.loadArticles();
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.loadArticles();
  }

  onDoiDoubleClick(doi: string): void {
    const url = this.articleService.getArticleUrl(doi);
    window.open(url, '_blank');
  }
}
```

**Responsibilities:**
- Component state
- User interactions
- Call services
- Update view  

---

## MVC Flow Diagram

```
User → View (HTML) → Controller (Component) → Model (Service) → Backend API → PLOS API
```

---

## Run Commands

**Backend:**
```bash
cd backend
npm install
npm start
```

**Frontend:**
```bash
cd frontend
npm install
npx ng serve
```

Open: `http://localhost:4200`

---

## Summary

| Layer | Backend | Frontend |
|-------|---------|----------|
| **Model** | `plosService.js` | `article.model.ts` + `article.service.ts` |
| **View** | N/A | `articles-list.component.html` |
| **Controller** | `articlesController.js` | `ArticlesListComponent` |

**Key Features:**
- Separation of Concerns
- Dependency Injection
- Type Safety (TypeScript)
- Error Handling
- Clean Code
