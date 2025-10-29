const { google } = require('googleapis');

// Google Sheets setup
function getAuth() {
  if (process.env.GOOGLE_CREDENTIALS_JSON) {
    // Production: Use environment variable with JSON credentials
    const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS_JSON);
    return new google.auth.GoogleAuth({
      credentials: credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
  }
  throw new Error('GOOGLE_CREDENTIALS_JSON environment variable not set');
}

const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID;
const SHEET_NAME = process.env.SHEET_NAME || 'Sign-ups';

module.exports = async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle OPTIONS request for CORS preflight
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST method
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { firstName, email, eventTitle, timestamp } = req.body;

    if (!firstName || !email || !eventTitle) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const auth = getAuth();
    const sheets = google.sheets({ version: 'v4', auth });

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
    res.status(500).json({ error: 'Failed to record sign-up', details: error.message });
  }
};
