// Health check endpoint for Vercel deployment

module.exports = async (req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).json({});
  }

  // Return health status
  res.status(200).json({
    status: 'OK',
    message: 'Run Club API is running on Vercel',
    timestamp: new Date().toISOString(),
    platform: 'Vercel Serverless'
  });
};
