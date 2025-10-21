# Run Club Sign-up System Setup Guide

This guide will help you set up the complete sign-up system with Google Sheets integration.

## Overview

The system includes:
- A React frontend with contact form modals
- A Node.js backend API
- Google Sheets integration for data storage
- Sign-up tracking for events

## Frontend Setup

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Start the Frontend
```bash
npm start
```

The frontend will run on `http://localhost:3000` with a proxy to the backend API.

## Backend Setup

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Google Sheets API Setup

#### Step 1: Create a Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google Sheets API:
   - Go to "APIs & Services" > "Library"
   - Search for "Google Sheets API"
   - Click "Enable"

#### Step 2: Create a Service Account
1. Go to "IAM & Admin" > "Service Accounts"
2. Click "Create Service Account"
3. Name it "run-club-api"
4. Click "Create and Continue"
5. Skip role assignment for now
6. Click "Done"

#### Step 3: Generate Service Account Key
1. Click on the created service account
2. Go to "Keys" tab
3. Click "Add Key" > "Create new key"
4. Choose "JSON" format
5. Download the JSON file
6. Rename it to `credentials.json` and place it in the `backend` folder

#### Step 4: Create Google Sheet
1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "Run Club Sign-ups" (or any name you prefer)
4. Copy the Sheet ID from the URL (the long string between `/d/` and `/edit`)
5. Share the sheet with the service account email (found in the JSON file)
   - Click "Share" button
   - Add the service account email
   - Give "Editor" permissions

### 3. Environment Configuration
1. Copy `env.example` to `.env` in the backend folder
2. Fill in the following variables:
   ```
   GOOGLE_SHEET_ID=your_google_sheet_id_here
   SHEET_NAME=Sign-ups
   GOOGLE_CREDENTIALS_FILE=./credentials.json
   PORT=3001
   ```

### 4. Start the Backend
```bash
npm start
```

The backend will run on `http://localhost:3001`

## Testing the System

### 1. Start Both Services
In separate terminals:
```bash
# Terminal 1 - Backend
cd backend
npm start

# Terminal 2 - Frontend  
cd frontend
npm start
```

### 2. Test the Sign-up Flow
1. Open `http://localhost:3000`
2. Click any "Join Event" button
3. Fill out the form with:
   - First Name
   - Email Address
4. Click "Join Event"
5. Check your Google Sheet for the new entry

### 3. Verify Data in Google Sheets
The sheet should have columns:
- First Name
- Email
- Event Title
- Timestamp

## File Structure

```
run-club/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── ContactModal.tsx    # Contact form modal
│   │   └── pages/
│   │       ├── Home.tsx            # Updated with modal integration
│   │       └── Events.tsx         # Updated with modal integration
│   └── package.json               # Updated with proxy
├── backend/
│   ├── server.js                  # Express API server
│   ├── package.json               # Backend dependencies
│   ├── credentials.json           # Google service account key
│   └── .env                       # Environment variables
└── SETUP.md                       # This guide
```

## Features

### Contact Modal
- Clean, responsive design
- Form validation
- Loading states
- Success/error feedback
- Auto-close on success

### Google Sheets Integration
- Automatic sheet creation
- Header row setup
- Real-time data writing
- Error handling

### API Endpoints
- `POST /api/signup` - Submit sign-up form
- `GET /api/health` - Health check

## Troubleshooting

### Common Issues

1. **"Failed to record sign-up" error**
   - Check that the service account has access to the sheet
   - Verify the Google Sheet ID is correct
   - Ensure the credentials.json file is in the backend folder

2. **Modal not opening**
   - Check browser console for JavaScript errors
   - Verify the ContactModal component is imported correctly

3. **CORS errors**
   - Make sure the backend is running on port 3001
   - Check that the proxy is configured in frontend/package.json

### Debug Steps
1. Check backend logs for API errors
2. Verify Google Sheets permissions
3. Test API endpoints directly with tools like Postman
4. Check browser network tab for failed requests

## Production Deployment

For production deployment, you'll need to:
1. Set up environment variables on your hosting platform
2. Configure CORS for your production domain
3. Set up a production Google Cloud project
4. Update the API URL in the frontend if needed

## Security Notes

- Never commit the `credentials.json` file to version control
- Use environment variables for sensitive configuration
- Consider implementing rate limiting for production use
- Add input validation and sanitization for production
