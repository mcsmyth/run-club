# Production Deployment Guide

This guide covers secure deployment of the Run Club API to production environments.

## 🔐 Security-First Approach

### Environment Variables Setup

The application now supports two authentication methods:

1. **Development**: File-based credentials (`credentials.json`)
2. **Production**: Environment variable-based credentials (recommended)

### Production Environment Variables

Set these environment variables in your hosting platform:

```bash
# Required
GOOGLE_SHEET_ID=your_google_sheet_id_here
SHEET_NAME=Sign-ups
PORT=3001

# Authentication (choose one method)
# Method 1: JSON credentials as environment variable (RECOMMENDED)
GOOGLE_CREDENTIALS_JSON={"type":"service_account","project_id":"your-project",...}

# Method 2: File path (less secure)
# GOOGLE_CREDENTIALS_FILE=/path/to/credentials.json
```

## 🚀 Deployment Platforms

### Heroku

1. **Set Environment Variables**:
   ```bash
   heroku config:set GOOGLE_SHEET_ID=your_sheet_id
   heroku config:set SHEET_NAME=Sign-ups
   heroku config:set GOOGLE_CREDENTIALS_JSON='{"type":"service_account",...}'
   ```

2. **Deploy**:
   ```bash
   git push heroku main
   ```

### Vercel

1. **Set Environment Variables** in Vercel dashboard:
   - `GOOGLE_SHEET_ID`
   - `SHEET_NAME`
   - `GOOGLE_CREDENTIALS_JSON`

2. **Deploy**:
   ```bash
   vercel --prod
   ```

### Railway

1. **Set Environment Variables** in Railway dashboard
2. **Deploy**:
   ```bash
   railway deploy
   ```

### DigitalOcean App Platform

1. **Set Environment Variables** in App Platform dashboard
2. **Deploy** via GitHub integration

## 🔧 Converting credentials.json to Environment Variable

### Step 1: Get Your Credentials JSON
```bash
# If you have credentials.json locally
cat backend/credentials.json
```

### Step 2: Convert to Single Line
```bash
# Remove all newlines and spaces
cat backend/credentials.json | tr -d '\n' | tr -d ' '
```

### Step 3: Set Environment Variable
```bash
# For local testing
export GOOGLE_CREDENTIALS_JSON='{"type":"service_account",...}'

# For production (use your platform's method)
# Heroku: heroku config:set GOOGLE_CREDENTIALS_JSON='...'
# Vercel: Set in dashboard
# Railway: Set in dashboard
```

## 🛡️ Security Best Practices

### 1. Credential Management
- ✅ Use environment variables for production
- ✅ Never commit credentials to version control
- ✅ Rotate service account keys regularly
- ✅ Use least-privilege access

### 2. Service Account Setup
1. Create a dedicated service account for production
2. Grant only necessary permissions (Google Sheets API)
3. Use a separate Google Cloud project for production
4. Enable audit logging

### 3. Network Security
- Use HTTPS in production
- Implement rate limiting
- Add request validation
- Monitor API usage

## 📋 Pre-Deployment Checklist

- [ ] Environment variables configured
- [ ] Google Cloud service account created
- [ ] Google Sheets API enabled
- [ ] Sheet shared with service account
- [ ] HTTPS enabled
- [ ] Domain configured (if needed)
- [ ] Monitoring set up
- [ ] Error logging configured

## 🧪 Testing Production Setup

### Local Testing with Environment Variables
```bash
# Set environment variables
export GOOGLE_CREDENTIALS_JSON='{"type":"service_account",...}'
export GOOGLE_SHEET_ID=your_sheet_id
export SHEET_NAME=Sign-ups

# Start server
cd backend
npm start

# Test API
curl -X POST http://localhost:3001/api/signup \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Test","email":"test@example.com","eventTitle":"Test Event","timestamp":"2024-01-01T00:00:00.000Z"}'
```

### Production Testing
```bash
# Test health endpoint
curl https://your-app.herokuapp.com/api/health

# Test signup endpoint
curl -X POST https://your-app.herokuapp.com/api/signup \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Test","email":"test@example.com","eventTitle":"Test Event","timestamp":"2024-01-01T00:00:00.000Z"}'
```

## 🔍 Troubleshooting

### Common Issues

1. **"Invalid credentials" error**
   - Check GOOGLE_CREDENTIALS_JSON format
   - Ensure JSON is properly escaped
   - Verify service account has correct permissions

2. **"Sheet not found" error**
   - Verify GOOGLE_SHEET_ID is correct
   - Check sheet is shared with service account
   - Ensure Google Sheets API is enabled

3. **CORS errors**
   - Configure CORS for your frontend domain
   - Check if frontend URL is in allowed origins

### Debug Commands
```bash
# Check environment variables
heroku config  # For Heroku
vercel env ls  # For Vercel

# View logs
heroku logs --tail  # For Heroku
vercel logs  # For Vercel
```

## 📊 Monitoring

### Recommended Monitoring
- API response times
- Error rates
- Google Sheets API quota usage
- Service account usage

### Logging
- Enable Google Cloud logging
- Set up application monitoring
- Configure alerts for errors

## 🔄 Maintenance

### Regular Tasks
- Rotate service account keys (quarterly)
- Monitor API usage and costs
- Update dependencies
- Review security settings

### Backup Strategy
- Export Google Sheets data regularly
- Backup environment configurations
- Document deployment procedures
