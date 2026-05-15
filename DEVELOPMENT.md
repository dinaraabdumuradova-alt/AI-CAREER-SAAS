# AI-CAREER-SAAS Development Guide

## Prerequisites

- Node.js 18+
- Python 3.10+
- PostgreSQL 14+ (or Docker)
- npm or yarn

## Quick Start with Docker

```bash
docker-compose up -d
```

This will start:
- PostgreSQL on port 5432
- Backend on port 3001
- Frontend on port 3000
- AI Service on port 8000

## Manual Setup

### 1. Backend Setup

```bash
cd apps/server

# Install dependencies
npm install

# Create .env.local
cat > .env.local << EOF
NODE_ENV=development
PORT=3001
DATABASE_URL=postgresql://user:password@localhost:5432/ai_career_db
JWT_SECRET=your-secret-key-here
AI_SERVICE_URL=http://localhost:8000
EOF

# Run migrations
npx prisma migrate dev

# Start dev server
npm run dev
```

Backend runs on `http://localhost:3001`

### 2. Frontend Setup

```bash
cd apps/web

# Install dependencies
npm install

# Create .env.local
cat > .env.local << EOF
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_AI_SERVICE_URL=http://localhost:8000
EOF

# Start dev server
npm run dev
```

Frontend runs on `http://localhost:3000`

### 3. AI Service Setup

```bash
cd apps/ai-service

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create .env
cat > .env << EOF
FASTAPI_ENV=development
PORT=8000
BACKEND_URL=http://localhost:3001
EOF

# Start service
python main.py
```

AI Service runs on `http://localhost:8000`

## Database

### Initialize Database

```bash
cd packages/database
npx prisma migrate dev --name init
```

### View Database

```bash
npx prisma studio
```

Opens Prisma Studio at `http://localhost:5555`

### Reset Database

```bash
npx prisma migrate reset
```

## Project Structure

```
AI-CAREER-SAAS/
├── apps/
│   ├── web/                          # Next.js 14 Frontend
│   │   ├── app/
│   │   ├── components/
│   │   ├── lib/
│   │   ├── styles/
│   │   ├── package.json
│   │   └── tsconfig.json
│   ├── server/                       # Express Backend
│   │   ├── src/
│   │   │   ├── routes/
│   │   │   ├── middleware/
│   │   │   ├── controllers/
│   │   │   ├── models/
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   └── ai-service/                   # Python FastAPI
│       ├── main.py
│       ├── models/
│       ├── routes/
│       ├── services/
│       ├── requirements.txt
│       └── .env
└── packages/
    ├── database/                     # Prisma Schema
    │   └── schema.prisma
    └── shared/                       # Shared Types
        └── types.ts
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout
- `GET /api/auth/me` - Get current user

### Profile
- `GET /api/profile` - Get user profile
- `PUT /api/profile` - Update profile
- `POST /api/profile/cv` - Upload CV

### Jobs
- `GET /api/jobs` - List all jobs
- `GET /api/jobs/:id` - Get job details
- `POST /api/jobs` - Create job (admin)

### Applications
- `POST /api/applications` - Apply for job
- `GET /api/applications` - Get my applications
- `GET /api/applications/:id` - Get application details

### AI Service
- `POST /api/ai/parse-cv` - Parse CV and extract skills
- `POST /api/ai/match-jobs` - Get job recommendations

## Development Workflow

### Creating a Feature

1. Create feature branch
   ```bash
   git checkout -b feature/feature-name
   ```

2. Make changes in relevant app (frontend, backend, or AI service)

3. Test locally

4. Commit and push
   ```bash
   git add .
   git commit -m "feat: add feature description"
   git push origin feature/feature-name
   ```

5. Create Pull Request

### Database Changes

1. Modify `packages/database/schema.prisma`

2. Create migration
   ```bash
   npx prisma migrate dev --name migration_description
   ```

3. The migration is automatically applied

## Debugging

### Backend
```bash
cd apps/server
npm run dev  # Includes ts-node with watch
```

### Frontend
Open http://localhost:3000 and use browser DevTools

### AI Service
```bash
cd apps/ai-service
python -m debugpy --listen 5678 --wait-for-client main.py
```

### Database
```bash
npx prisma studio  # Opens GUI at localhost:5555
```

## Testing

### Backend
```bash
cd apps/server
npm run test
```

### Frontend
```bash
cd apps/web
npm run test
```

### AI Service
```bash
cd apps/ai-service
pytest
```

## Deployment

### Frontend (Vercel)
```bash
cd apps/web
vercel deploy
```

### Backend (Railway/Render)
```bash
# Set environment variables on platform
# Push to main branch - auto-deploys
```

### AI Service (Railway/Render)
```bash
# Similar setup as backend
```

## Troubleshooting

### Port already in use
```bash
# Find and kill process
lsof -ti:3000 | xargs kill -9  # Frontend
lsof -ti:3001 | xargs kill -9  # Backend
lsof -ti:8000 | xargs kill -9  # AI Service
```

### Database connection error
- Check PostgreSQL is running
- Verify DATABASE_URL in .env
- Run `npx prisma db push`

### Module not found
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## Useful Commands

```bash
# Full stack
docker-compose up -d

# Individual services
docker-compose up -d postgres          # Database only
docker-compose up backend              # Backend (foreground)

# Logs
docker-compose logs -f backend         # Stream backend logs
docker-compose logs -f ai-service      # Stream AI service logs

# Stop all
docker-compose down

# Reset everything
docker-compose down -v
```

## Next Steps

1. Complete Phase 1: Authentication & CV Upload
2. Implement CV parsing with AI
3. Build job matching algorithm
4. Create application tracking
5. Add analytics dashboard

See README.md for full roadmap.
