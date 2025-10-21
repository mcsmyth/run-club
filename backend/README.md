# Run Club Backend API

This backend API handles sign-up form submissions and writes data to Google Sheets.

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Google Sheets Setup

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google Sheets API
4. Create a service account:
   - Go to "IAM & Admin" > "Service Accounts"
   - Click "Create Service Account"
   - Give it a name like "run-club-api"
   - Create and download the JSON key file
5. Create a Google Sheet and share it with the service account email (found in the JSON file)
6. Copy the sheet ID from the URL (the long string between `/d/` and `/edit`)

### 3. Environment Configuration

#### Development Setup
1. Create a `.env` file in the backend directory
2. Fill in the following variables:
   - `GOOGLE_SHEET_ID`: Your Google Sheet ID
   - `SHEET_NAME`: Name of the sheet tab (default: "Sign-ups")
   - `GOOGLE_CREDENTIALS_FILE`: Path to your service account JSON file
   - `PORT`: Server port (default: 3001)

#### Production Setup (Recommended)
For production deployment, use environment variables instead of credential files:

```bash
# Required variables
GOOGLE_SHEET_ID=your_google_sheet_id
SHEET_NAME=Sign-ups
PORT=3001

# Authentication (choose one)
# Method 1: JSON credentials as environment variable (SECURE)
GOOGLE_CREDENTIALS_JSON={"type":"service_account","project_id":"your-project",...}

# Method 2: File path (less secure)
# GOOGLE_CREDENTIALS_FILE=/path/to/credentials.json
```

See [PRODUCTION-DEPLOYMENT.md](../PRODUCTION-DEPLOYMENT.md) for detailed deployment instructions.

### 4. Run the Server

Development:
```bash
npm run dev
```

Production:
```bash
npm start
```

## API Endpoints

- `POST /api/signup` - Submit a sign-up form
- `GET /api/health` - Health check

## Form Data Format

The sign-up endpoint expects:
```json
{
  "firstName": "John",
  "email": "john@example.com",
  "eventTitle": "Track Training Session",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

## Security Requirements

⚠️ **CRITICAL SECURITY NOTES:**

- **NEVER commit `credentials.json` or `.env` files to version control**
- Use environment variables for all sensitive configuration
- Rotate Google Cloud service account keys regularly
- Use least-privilege access for service accounts
- Consider implementing rate limiting for production use
- Add input validation and sanitization for production
- Use HTTPS in production environments
- Monitor API usage and implement logging

### Environment Setup
1. Create a `.env` file with your configuration
2. Ensure `.env` and `credentials.json` are in `.gitignore`
3. For production, use your hosting platform's environment variable system
