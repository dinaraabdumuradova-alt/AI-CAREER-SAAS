from fastapi import FastAPI, HTTPException, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import os
import logging
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(level=os.getenv("LOG_LEVEL", "INFO"))
logger = logging.getLogger(__name__)

# Initialize FastAPI app
app = FastAPI(
    title="AI Career SAAS - AI Service",
    description="AI service for CV parsing and job matching",
    version="1.0.0"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Health check
@app.get("/health")
async def health_check():
    return {"status": "ok"}

# Test endpoint
@app.get("/api/test")
async def test():
    return {"message": "AI Service is running!", "version": "1.0.0"}

# Parse CV endpoint (placeholder)
@app.post("/api/ai/parse-cv")
async def parse_cv(file: UploadFile = File(...)):
    """
    Parse CV and extract skills, experience, and summary
    """
    try:
        # Placeholder implementation
        return {
            "skills": ["Python", "JavaScript", "React"],
            "experience": "2 years",
            "summary": "Placeholder CV parsing result"
        }
    except Exception as e:
        logger.error(f"Error parsing CV: {str(e)}")
        raise HTTPException(status_code=500, detail="Error parsing CV")

# Job matching endpoint (placeholder)
@app.post("/api/ai/match-jobs")
async def match_jobs(cv_id: str, top_k: int = 10):
    """
    Get job recommendations based on CV
    """
    try:
        # Placeholder implementation
        return {
            "matches": [
                {"job_id": "1", "title": "Software Engineer", "score": 0.95},
                {"job_id": "2", "title": "Data Scientist", "score": 0.87}
            ]
        }
    except Exception as e:
        logger.error(f"Error matching jobs: {str(e)}")
        raise HTTPException(status_code=500, detail="Error matching jobs")

# Skill extraction endpoint (placeholder)
@app.post("/api/ai/extract-skills")
async def extract_skills(text: str):
    """
    Extract skills from text
    """
    try:
        # Placeholder implementation
        return {
            "skills": ["Python", "JavaScript", "React", "Node.js"]
        }
    except Exception as e:
        logger.error(f"Error extracting skills: {str(e)}")
        raise HTTPException(status_code=500, detail="Error extracting skills")

if __name__ == "__main__":
    import uvicorn
    
    port = int(os.getenv("PORT", 8000))
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=port,
        reload=os.getenv("FASTAPI_ENV") == "development"
    )
