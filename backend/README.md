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

1. Copy `env.example` to `.env`
2. Fill in the following variables:
   - `GOOGLE_SHEET_ID`: Your Google Sheet ID
   - `SHEET_NAME`: Name of the sheet tab (default: "Sign-ups")
   - `GOOGLE_CREDENTIALS_FILE`: Path to your service account JSON file
   - `PORT`: Server port (default: 3001)

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
