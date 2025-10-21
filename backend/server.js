const express = require('express');
const cors = require('cors');
const { google } = require('googleapis');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Google Sheets setup
const auth = new google.auth.GoogleAuth({
  keyFile: process.env.GOOGLE_CREDENTIALS_FILE || './credentials.json',
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });

// Environment variables
const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID;
const SHEET_NAME = process.env.SHEET_NAME || 'Sign-ups';

// Initialize the sheet with headers if it doesn't exist
async function initializeSheet() {
  try {
    // Check if the sheet exists
    const response = await sheets.spreadsheets.get({
      spreadsheetId: SPREADSHEET_ID,
    });
    
    const sheetExists = response.data.sheets.some(sheet => sheet.properties.title === SHEET_NAME);
    
    if (!sheetExists) {
      // Create the sheet
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId: SPREADSHEET_ID,
        requestBody: {
          requests: [{
            addSheet: {
              properties: {
                title: SHEET_NAME
              }
            }
          }]
        }
      });
    }
    
    // Add headers if the sheet is empty
    const range = `${SHEET_NAME}!A1:D1`;
    const values = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: range,
    });
    
    if (!values.data.values || values.data.values.length === 0) {
      await sheets.spreadsheets.values.update({
        spreadsheetId: SPREADSHEET_ID,
        range: range,
        valueInputOption: 'RAW',
        requestBody: {
          values: [['First Name', 'Email', 'Event Title', 'Timestamp']]
        }
      });
    }
  } catch (error) {
    console.error('Error initializing sheet:', error);
  }
}

// API endpoint to handle sign-ups
app.post('/api/signup', async (req, res) => {
  try {
    const { firstName, email, eventTitle, timestamp } = req.body;
    
    if (!firstName || !email || !eventTitle) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    // Add the sign-up data to the sheet
    const range = `${SHEET_NAME}!A:D`;
    const values = [[firstName, email, eventTitle, timestamp]];
    
    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: range,
      valueInputOption: 'RAW',
      requestBody: {
        values: values
      }
    });
    
    res.json({ success: true, message: 'Sign-up recorded successfully' });
  } catch (error) {
    console.error('Error recording sign-up:', error);
    res.status(500).json({ error: 'Failed to record sign-up' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Run Club API is running' });
});

// Initialize the sheet when the server starts
initializeSheet();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});
