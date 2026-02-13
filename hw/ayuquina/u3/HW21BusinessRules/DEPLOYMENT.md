# Deployment Guide

## Local Development

### Prerequisites
- Node.js 18+ installed
- Access to the Supabase database

### Setup Steps

1. **Clone/Download the project**

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   - Copy `.env.example` to `.env`
   - Update with your Supabase credentials if different

4. **Run the server**
   
   Development mode (with auto-reload):
   ```bash
   npm run dev
   ```
   
   Production mode:
   ```bash
   npm start
   ```

5. **Test the API**
   - Open http://localhost:3001/health
   - Open http://localhost:3001/api for documentation

## Production Deployment

### Option 1: Render.com

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Configure:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment Variables**:
     - `SUPABASE_URL`: Your Supabase URL
     - `SUPABASE_ANON_KEY`: Your Supabase anon key
     - `PORT`: 3001 (or let Render assign automatically)
     - `NODE_ENV`: production

### Option 2: Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Configure environment variables in Vercel dashboard

### Option 3: Heroku

1. Install Heroku CLI
2. Create app: `heroku create your-app-name`
3. Set environment variables:
   ```bash
   heroku config:set SUPABASE_URL=your_url
   heroku config:set SUPABASE_ANON_KEY=your_key
   ```
4. Deploy: `git push heroku main`

### Option 4: Railway

1. Connect GitHub repository to Railway
2. Add environment variables in Railway dashboard
3. Deploy automatically on push

### Option 5: DigitalOcean App Platform

1. Create new app from GitHub
2. Configure build and run commands
3. Add environment variables
4. Deploy

## Environment Variables

Required variables for production:

```bash
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your_anon_key_here
PORT=3001
NODE_ENV=production
```

## CORS Configuration

The API is configured to accept requests from any origin. In production, you may want to restrict this:

Edit `src/server.js`:

```javascript
// Restrictive CORS
app.use(cors({
  origin: ['https://yourdomain.com', 'https://www.yourdomain.com'],
  credentials: true
}));
```

## Health Checks

Most deployment platforms support health checks. Use:
- **Endpoint**: `/health`
- **Expected Response**: `200 OK` with JSON `{"status": "ok"}`

## Monitoring

Consider adding:
- Application monitoring (e.g., Sentry, LogRocket)
- Performance monitoring
- Error tracking
- Uptime monitoring (e.g., UptimeRobot, Pingdom)

## Database Connection

The application uses Supabase's connection pooling automatically. No additional configuration needed for most use cases.

For high-traffic scenarios, consider:
- Using Supabase's connection pooler (built-in)
- Implementing caching (Redis)
- Rate limiting

## Scaling Considerations

1. **Horizontal Scaling**: Deploy multiple instances behind a load balancer
2. **Caching**: Implement Redis for frequently accessed data
3. **Rate Limiting**: Add rate limiting middleware
4. **CDN**: Use a CDN for static assets if any

## Security Checklist

- [ ] Use HTTPS in production
- [ ] Set secure CORS policy
- [ ] Keep dependencies updated
- [ ] Use environment variables (never commit secrets)
- [ ] Implement rate limiting
- [ ] Add request validation
- [ ] Enable security headers (helmet.js)
- [ ] Regular security audits (`npm audit`)

## Troubleshooting

### Database Connection Fails
- Check Supabase URL and key
- Verify network connectivity
- Check Supabase dashboard for status

### Server Won't Start
- Check if port 3001 is available
- Verify all dependencies are installed
- Check Node.js version (18+)

### CORS Errors
- Update CORS configuration
- Check client request headers
- Verify origin is allowed
