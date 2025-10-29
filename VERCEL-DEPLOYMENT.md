# Vercel Deployment Guide

This guide will walk you through deploying your Run Club app to Vercel.

## What is Vercel?

Vercel is a cloud platform for static sites and serverless functions, optimized for frontend frameworks like React. It offers:
- Fast global CDN
- Automatic HTTPS
- Easy Git integration
- Generous free tier
- Serverless function support

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **GitHub Account**: Your code should be in a GitHub repository
3. **Google Cloud Setup**: Have your Google Sheets API credentials ready

## Architecture Overview

Your app has been configured for Vercel with:
- **Frontend**: React app served from global CDN
- **Backend**: Serverless functions in `/api` directory
  - `/api/signup.js` - Handles event sign-ups
  - `/api/health.js` - Health check endpoint

## Deployment Methods

### Method 1: Deploy via Vercel Dashboard (Recommended)

This is the easiest method with continuous deployment from GitHub.

#### Step 1: Import Your Project

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click "Import Project"
3. Select "Import Git Repository"
4. Choose your GitHub repository: `mcsmyth/run-club`
5. Select the branch: `claude/prepare-deployment-011CUajXE4s3oG1WWMCh3vA9`

#### Step 2: Configure Project Settings

Vercel will auto-detect your project. Verify:
- **Framework Preset**: Create React App
- **Root Directory**: `./` (leave as root)
- **Build Command**: `cd frontend && npm install && npm run build`
- **Output Directory**: `frontend/build`

Click "Continue" to proceed.

#### Step 3: Set Environment Variables

Before deploying, add these environment variables:

| Name | Value | Description |
|------|-------|-------------|
| `GOOGLE_SHEET_ID` | Your sheet ID | From your Google Sheet URL |
| `SHEET_NAME` | `Sign-ups` | The tab name in your sheet |
| `GOOGLE_CREDENTIALS_JSON` | `{"type":"service_account",...}` | Your service account credentials (single line) |

**How to add environment variables:**
1. In the project configuration screen, scroll to "Environment Variables"
2. Add each variable name and value
3. Select all environments (Production, Preview, Development)
4. Click "Add" for each variable

**Getting your credentials JSON:**
```bash
# If you have credentials.json
cat backend/credentials.json | tr -d '\n' | tr -d ' '
```

#### Step 4: Deploy

1. Click "Deploy"
2. Wait for the build to complete (2-3 minutes)
3. Your app will be live at `https://your-project-name.vercel.app`

#### Step 5: Test Your Deployment

Visit your deployment URL and test:
- Homepage loads correctly
- Navigation works
- Event sign-up form submits successfully

Test the API health endpoint:
```bash
curl https://your-project-name.vercel.app/api/health
```

Expected response:
```json
{
  "status": "OK",
  "message": "Run Club API is running on Vercel",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "platform": "Vercel Serverless"
}
```

### Method 2: Deploy via Vercel CLI

For more control, you can use the Vercel CLI.

#### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

#### Step 2: Login to Vercel

```bash
vercel login
```

This will prompt you to verify via email.

#### Step 3: Navigate to Your Project

```bash
cd /path/to/run-club
```

#### Step 4: Set Environment Variables

Create a `.env` file (don't commit this):
```bash
GOOGLE_SHEET_ID=your_sheet_id
SHEET_NAME=Sign-ups
GOOGLE_CREDENTIALS_JSON={"type":"service_account",...}
```

Or set them via CLI:
```bash
vercel env add GOOGLE_SHEET_ID
# Enter value when prompted

vercel env add SHEET_NAME
# Enter value when prompted

vercel env add GOOGLE_CREDENTIALS_JSON
# Paste the entire JSON when prompted
```

#### Step 5: Deploy

For preview deployment:
```bash
vercel
```

For production deployment:
```bash
vercel --prod
```

Follow the prompts:
- Set up and deploy? **Y**
- Which scope? Select your account
- Link to existing project? **N** (first time) or **Y** (subsequent)
- What's your project's name? Enter a name or use default
- In which directory is your code located? `./`

#### Step 6: View Your Deployment

After deployment completes, Vercel will provide:
- Preview URL: `https://your-project-name-xxxxx.vercel.app`
- Production URL: `https://your-project-name.vercel.app`

## Continuous Deployment

Once connected to GitHub, Vercel will automatically:
- Deploy every push to `main` branch (production)
- Create preview deployments for pull requests
- Show deployment status in GitHub

### Enable Automatic Deployments

1. Go to your Vercel project dashboard
2. Settings → Git
3. Ensure "Automatic deployments" is enabled
4. Select your production branch

## Environment Variables Management

### View Environment Variables

**Via Dashboard:**
1. Go to your project on Vercel
2. Settings → Environment Variables
3. View/Edit variables

**Via CLI:**
```bash
vercel env ls
```

### Add/Update Environment Variables

**Via Dashboard:**
1. Settings → Environment Variables
2. Click "Add New"
3. Enter name, value, and select environments

**Via CLI:**
```bash
vercel env add VARIABLE_NAME
```

### Remove Environment Variables

**Via Dashboard:**
1. Settings → Environment Variables
2. Click the trash icon next to the variable

**Via CLI:**
```bash
vercel env rm VARIABLE_NAME
```

## Custom Domain Setup

### Add a Custom Domain

1. Go to your Vercel project
2. Settings → Domains
3. Enter your domain name
4. Follow DNS configuration instructions
5. Vercel automatically provisions SSL certificate

### DNS Configuration

For a custom domain like `runclub.com`:

**Option A: Vercel Nameservers (Recommended)**
1. Point your domain's nameservers to Vercel
2. Vercel manages all DNS records

**Option B: CNAME Record**
1. Add CNAME record pointing to `cname.vercel-dns.com`
2. For root domain, use A record pointing to Vercel's IP

## Monitoring and Logs

### View Deployment Logs

**Via Dashboard:**
1. Go to your project
2. Click on a deployment
3. View build logs and function logs

**Via CLI:**
```bash
vercel logs
```

### Function Logs

View serverless function logs:
```bash
vercel logs --follow
```

### Analytics

Vercel provides free analytics:
1. Go to your project
2. Click "Analytics" tab
3. View page views, performance metrics, etc.

## Troubleshooting

### Common Issues

#### 1. Build Failed

**Cause**: Missing dependencies or build errors.

**Solution:**
- Check build logs in Vercel dashboard
- Ensure `frontend/package.json` has all dependencies
- Test build locally: `cd frontend && npm run build`

#### 2. API Routes Not Working (404)

**Cause**: Incorrect API route configuration.

**Solution:**
- Ensure files are in `/api` directory
- Check `vercel.json` rewrites configuration
- Verify function exports: `module.exports = async (req, res) => {...}`

#### 3. Google Sheets API Error

**Cause**: Missing or invalid credentials.

**Solution:**
- Verify `GOOGLE_CREDENTIALS_JSON` is set correctly
- Check the JSON is valid (single line, no extra spaces)
- Ensure service account has access to the sheet
- Verify `GOOGLE_SHEET_ID` matches your sheet

#### 4. CORS Errors

**Cause**: API not sending proper CORS headers.

**Solution:**
- CORS headers are already configured in serverless functions
- If using custom domain, ensure it's properly configured
- Check browser console for specific CORS error

#### 5. Environment Variables Not Working

**Cause**: Variables not set for correct environment.

**Solution:**
- Ensure variables are set for Production, Preview, and Development
- Redeploy after adding environment variables
- Check variable names match exactly (case-sensitive)

### Debug Steps

1. **Check Build Logs**
   ```bash
   vercel logs --follow
   ```

2. **Test API Locally**
   ```bash
   # Install Vercel CLI
   npm install -g vercel

   # Run locally
   vercel dev
   ```
   This runs your app locally with serverless functions.

3. **Check Environment Variables**
   ```bash
   vercel env ls
   ```

4. **Redeploy**
   ```bash
   vercel --prod --force
   ```

## Local Development with Vercel

### Run Vercel Dev Server

```bash
# Install dependencies
cd frontend && npm install
cd ../api && npm install
cd ..

# Start Vercel dev server
vercel dev
```

This will:
- Run your React app
- Simulate serverless functions locally
- Use local environment variables

### Set Local Environment Variables

Create `.env` in project root:
```
GOOGLE_SHEET_ID=your_sheet_id
SHEET_NAME=Sign-ups
GOOGLE_CREDENTIALS_JSON={"type":"service_account",...}
```

## Vercel CLI Commands Reference

```bash
# Login
vercel login

# Deploy (preview)
vercel

# Deploy (production)
vercel --prod

# View deployments
vercel ls

# View logs
vercel logs

# View environment variables
vercel env ls

# Add environment variable
vercel env add VARIABLE_NAME

# Remove environment variable
vercel env rm VARIABLE_NAME

# Link project
vercel link

# Run locally
vercel dev

# View project info
vercel inspect

# Remove deployment
vercel rm <deployment-url>
```

## Project Structure

Your Vercel-ready project structure:

```
run-club/
├── api/                      # Serverless API functions
│   ├── health.js            # Health check endpoint
│   ├── signup.js            # Sign-up endpoint
│   └── package.json         # API dependencies
├── frontend/                 # React application
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── build/               # Generated by build
├── vercel.json              # Vercel configuration
├── .env.example             # Environment variable template
└── VERCEL-DEPLOYMENT.md     # This file
```

## Cost Information

**Free Tier Includes:**
- Unlimited deployments
- 100GB bandwidth per month
- Automatic HTTPS
- Preview deployments
- Serverless function executions (limited)

**Paid Plans:**
- **Pro**: $20/month - More bandwidth, longer build times
- **Enterprise**: Custom pricing - SLA, support, custom limits

Most small to medium apps fit comfortably in the free tier.

## Security Best Practices

1. **Never commit credentials**
   - Keep `.env` in `.gitignore`
   - Use environment variables only

2. **Rotate credentials regularly**
   - Update Google service account keys quarterly
   - Update in Vercel settings → Environment Variables

3. **Use environment-specific variables**
   - Different credentials for preview vs production
   - Test with non-production data in previews

4. **Monitor function usage**
   - Check Vercel analytics regularly
   - Set up usage alerts

5. **Keep dependencies updated**
   ```bash
   npm audit
   npm update
   ```

## Comparison: Vercel vs Heroku

| Feature | Vercel | Heroku |
|---------|--------|--------|
| Free Tier | Yes (generous) | No (as of 2022) |
| Deployment | Git-based | Git-based |
| Backend | Serverless functions | Full Node.js app |
| Scaling | Automatic | Manual/Automatic |
| Best For | Frontend + API | Full-stack apps |
| Build Time | Fast | Moderate |
| CDN | Global (included) | Add-on |

## Next Steps

After successful deployment:

1. ✅ Set up custom domain (optional)
2. ✅ Enable Web Analytics
3. ✅ Set up GitHub integration for automatic deployments
4. ✅ Configure preview deployments for pull requests
5. ✅ Add monitoring/error tracking (Sentry, LogRocket, etc.)
6. ✅ Test thoroughly in production
7. ✅ Document API endpoints
8. ✅ Set up automated testing in CI/CD

## Support Resources

- **Vercel Documentation**: [vercel.com/docs](https://vercel.com/docs)
- **Vercel Support**: [vercel.com/support](https://vercel.com/support)
- **Community**: [github.com/vercel/vercel/discussions](https://github.com/vercel/vercel/discussions)
- **Status Page**: [vercel-status.com](https://www.vercel-status.com)

## Additional Resources

- [Vercel Serverless Functions](https://vercel.com/docs/functions)
- [Environment Variables Guide](https://vercel.com/docs/projects/environment-variables)
- [Custom Domains](https://vercel.com/docs/custom-domains)
- [Deployment Configuration](https://vercel.com/docs/build-output-api/v3)
- [React on Vercel](https://vercel.com/guides/deploying-react-with-vercel)

---

**Quick Start Summary:**

1. Push code to GitHub
2. Import project on [vercel.com/new](https://vercel.com/new)
3. Add environment variables
4. Deploy
5. Visit your live app! 🚀
