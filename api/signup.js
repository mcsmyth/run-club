const { google } = require('googleapis');

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

// Initialize Google Sheets Auth
function getAuth() {
  if (process.env.GOOGLE_CREDENTIALS_JSON) {
    const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS_JSON);
    return new google.auth.GoogleAuth({
      credentials: credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
  }
  throw new Error('GOOGLE_CREDENTIALS_JSON environment variable not set');
}

module.exports = async (req, res) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).json({});
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { firstName, email, eventTitle, timestamp } = req.body;

    // Validate required fields
    if (!firstName || !email || !eventTitle) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Initialize Google Sheets
    const auth = getAuth();
    const sheets = google.sheets({ version: 'v4', auth });

    const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID;
    const SHEET_NAME = process.env.SHEET_NAME || 'Sign-ups';

    // Add the sign-up data to the sheet
    const range = `${SHEET_NAME}!A:D`;
    const values = [[firstName, email, eventTitle, timestamp]];

    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: range,
      valueInputOption: 'RAW',
      requestBody: {
        values: values,
      },
    });

    res.status(200).json({
      success: true,
      message: 'Sign-up recorded successfully'
    });
  } catch (error) {
    console.error('Error recording sign-up:', error);
    res.status(500).json({
      error: 'Failed to record sign-up',
      details: error.message
    });
  }
};
