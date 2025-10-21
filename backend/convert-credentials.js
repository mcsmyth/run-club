#!/usr/bin/env node

/**
 * Convert credentials.json to environment variable format
 * 
 * Usage:
 * node convert-credentials.js [path-to-credentials.json]
 * 
 * This script helps convert your Google Cloud service account
 * credentials.json file to a format suitable for environment variables.
 */

const fs = require('fs');
const path = require('path');

// Get credentials file path from command line or use default
const credentialsPath = process.argv[2] || './credentials.json';

try {
  // Check if credentials file exists
  if (!fs.existsSync(credentialsPath)) {
    console.error(`❌ Credentials file not found: ${credentialsPath}`);
    console.log('\nUsage: node convert-credentials.js [path-to-credentials.json]');
    process.exit(1);
  }

  // Read and parse the credentials file
  const credentials = JSON.parse(fs.readFileSync(credentialsPath, 'utf8'));
  
  // Convert to single-line JSON string
  const credentialsJson = JSON.stringify(credentials);
  
  console.log('🔐 Google Cloud Credentials Environment Variable:');
  console.log('=' .repeat(80));
  console.log(`GOOGLE_CREDENTIALS_JSON='${credentialsJson}'`);
  console.log('=' .repeat(80));
  
  console.log('\n📋 Next Steps:');
  console.log('1. Copy the above environment variable');
  console.log('2. Set it in your production environment:');
  console.log('   - Heroku: heroku config:set GOOGLE_CREDENTIALS_JSON="..."');
  console.log('   - Vercel: Set in dashboard under Environment Variables');
  console.log('   - Railway: Set in dashboard under Variables');
  console.log('   - DigitalOcean: Set in App Platform environment variables');
  
  console.log('\n⚠️  Security Notes:');
  console.log('- Never commit this environment variable to version control');
  console.log('- Use your hosting platform\'s secure environment variable system');
  console.log('- Consider rotating your service account keys regularly');
  
  console.log('\n🧪 Test Locally:');
  console.log(`export GOOGLE_CREDENTIALS_JSON='${credentialsJson}'`);
  console.log('npm start');
  
} catch (error) {
  console.error('❌ Error processing credentials file:', error.message);
  process.exit(1);
}
