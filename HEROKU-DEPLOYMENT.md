# Heroku Deployment Guide

This guide will walk you through deploying your Run Club app to Heroku.

## Prerequisites

1. **Heroku Account**: Sign up at [heroku.com](https://heroku.com)
2. **Heroku CLI**: Install from [devcenter.heroku.com/articles/heroku-cli](https://devcenter.heroku.com/articles/heroku-cli)
3. **Git**: Ensure git is installed and your project is in a git repository
4. **Google Cloud Setup**: Have your Google Sheets API credentials ready

## Step 1: Install Heroku CLI

```bash
# macOS
brew tap heroku/brew && brew install heroku

# Windows
# Download installer from heroku.com

# Ubuntu/Debian
curl https://cli-assets.heroku.com/install.sh | sh
```

Verify installation:
```bash
heroku --version
```

## Step 2: Login to Heroku

```bash
heroku login
```

This will open a browser window to complete authentication.

## Step 3: Create a Heroku App

```bash
# Create a new Heroku app (replace 'your-app-name' with your desired name)
heroku create your-app-name

# Or let Heroku generate a random name
heroku create
```

This will create a new app and add a git remote named `heroku`.

## Step 4: Prepare Google Sheets Credentials

You need to convert your `credentials.json` file to a single-line string for Heroku.

### Option A: Using Command Line (Mac/Linux)

```bash
# Navigate to your project directory
cd /path/to/run-club

# Convert credentials.json to single line (if you have the file)
cat backend/credentials.json | tr -d '\n' | tr -d ' '
```

Copy the output (it will be a long JSON string).

### Option B: Manual Conversion

1. Open `backend/credentials.json`
2. Copy the entire content
3. Remove all newlines and extra spaces to make it a single line
4. It should look like: `{"type":"service_account","project_id":"...",...}`

## Step 5: Set Environment Variables

Set the required environment variables on Heroku:

```bash
# Set Google Sheet ID (get this from your Google Sheet URL)
# URL format: https://docs.google.com/spreadsheets/d/SHEET_ID/edit
heroku config:set GOOGLE_SHEET_ID=your_actual_sheet_id

# Set Sheet Name (the tab name in your Google Sheet)
heroku config:set SHEET_NAME=Sign-ups

# Set Google Credentials (paste the single-line JSON from Step 4)
heroku config:set GOOGLE_CREDENTIALS_JSON='{"type":"service_account","project_id":"your-project",...}'

# Set Node Environment to production
heroku config:set NODE_ENV=production
```

### Verify your config:

```bash
heroku config
```

You should see:
- `GOOGLE_CREDENTIALS_JSON`
- `GOOGLE_SHEET_ID`
- `SHEET_NAME`
- `NODE_ENV`

## Step 6: Deploy to Heroku

Ensure you're on the correct branch and deploy:

```bash
# Check current branch
git branch

# Make sure all changes are committed
git status
git add .
git commit -m "Prepare for Heroku deployment"

# Deploy to Heroku (push from current branch to Heroku's main)
git push heroku claude/prepare-deployment-011CUajXE4s3oG1WWMCh3vA9:main
```

**Important**: Since you're working on a feature branch, you need to specify which local branch to push:
```bash
git push heroku <your-branch-name>:main
```

## Step 7: Monitor Deployment

Watch the build logs:
```bash
heroku logs --tail
```

The deployment process will:
1. Install dependencies
2. Run `heroku-postbuild` script (builds the React frontend)
3. Start the server with the `Procfile`

## Step 8: Open Your App

```bash
heroku open
```

Or visit: `https://your-app-name.herokuapp.com`

## Step 9: Test Your Deployment

### Test the Health Endpoint

```bash
curl https://your-app-name.herokuapp.com/api/health
```

Expected response:
```json
{"status":"OK","message":"Run Club API is running"}
```

### Test the Frontend

Visit your app URL in a browser and verify that:
- The React app loads correctly
- You can navigate between pages
- The event sign-up form works

## Troubleshooting

### View Logs

```bash
# View recent logs
heroku logs

# Stream logs in real-time
heroku logs --tail

# View specific number of lines
heroku logs -n 200
```

### Common Issues

#### 1. Application Error / H10 Error

**Cause**: The app failed to start.

**Solution**:
- Check logs: `heroku logs --tail`
- Verify all environment variables are set: `heroku config`
- Ensure `Procfile` is correct

#### 2. Build Failed

**Cause**: Issue during the build process.

**Solution**:
- Check that `package.json` scripts are correct
- Ensure all dependencies are listed in `package.json`
- Run build locally first: `npm run build`

#### 3. Google Sheets API Error

**Cause**: Invalid credentials or sheet not found.

**Solution**:
- Verify `GOOGLE_CREDENTIALS_JSON` is set correctly
- Check that the service account has access to the sheet
- Confirm `GOOGLE_SHEET_ID` matches your sheet

#### 4. Cannot GET /api/signup

**Cause**: API routes not working.

**Solution**:
- Ensure backend is running: check logs
- Verify `NODE_ENV=production` is set
- Check that CORS is properly configured

#### 5. Blank Page / React App Not Loading

**Cause**: Static files not being served.

**Solution**:
- Verify the build completed successfully in logs
- Check that `frontend/build` directory exists
- Ensure `NODE_ENV=production` is set

### Restart the App

```bash
heroku restart
```

### Run Commands on Heroku

```bash
# Open a bash shell on Heroku
heroku run bash

# Check if build directory exists
heroku run ls -la frontend/build
```

## Updating Your App

After making changes to your code:

```bash
# Commit your changes
git add .
git commit -m "Your commit message"

# Push to Heroku
git push heroku <your-branch-name>:main

# Watch the deployment
heroku logs --tail
```

## Environment Variables Reference

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `NODE_ENV` | Yes | Environment mode | `production` |
| `GOOGLE_SHEET_ID` | Yes | Google Sheet ID from URL | `1a2b3c4d5e6f...` |
| `SHEET_NAME` | Yes | Sheet tab name | `Sign-ups` |
| `GOOGLE_CREDENTIALS_JSON` | Yes | Service account credentials | `{"type":"service_account",...}` |
| `PORT` | No | Server port (set by Heroku) | `3001` |

## Useful Heroku Commands

```bash
# View app info
heroku info

# View config variables
heroku config

# Set a config variable
heroku config:set KEY=value

# Unset a config variable
heroku config:unset KEY

# Open app in browser
heroku open

# View logs
heroku logs --tail

# Restart app
heroku restart

# Run one-off commands
heroku run <command>

# Access bash shell
heroku run bash

# Scale dynos
heroku ps:scale web=1

# View running dynos
heroku ps
```

## Heroku Dashboard

You can also manage your app through the web dashboard:
1. Visit [dashboard.heroku.com](https://dashboard.heroku.com)
2. Click on your app
3. Access Settings, Resources, Logs, and more

## Cost Information

- **Free Tier**: Heroku no longer offers a free tier as of November 2022
- **Eco Dynos**: $5/month for basic apps (sleeps after 30 min of inactivity)
- **Basic Dynos**: $7/month (doesn't sleep)
- **Standard Dynos**: Starting at $25/month

Choose the appropriate plan based on your needs.

## Security Best Practices

1. **Never commit credentials**: Keep `credentials.json` out of git
2. **Use environment variables**: Always use env vars for sensitive data
3. **Rotate credentials**: Regularly rotate service account keys
4. **Monitor access**: Review Google Cloud audit logs
5. **Use HTTPS**: Heroku provides HTTPS by default
6. **Keep dependencies updated**: Run `npm audit` regularly

## Next Steps

After successful deployment:

1. Set up a custom domain (optional)
2. Configure SSL certificate (automatic with Heroku)
3. Set up monitoring and alerts
4. Configure automatic backups for your Google Sheet
5. Consider adding authentication for admin features
6. Set up CI/CD with GitHub integration

## GitHub Integration (Alternative Deployment)

Instead of using git push, you can connect your GitHub repository:

1. Go to Heroku Dashboard > Your App > Deploy
2. Select "GitHub" as deployment method
3. Connect your repository
4. Enable "Automatic Deploys" for continuous deployment
5. Choose your branch (e.g., `main` or your feature branch)

This will automatically deploy whenever you push to the selected branch.

## Support

- Heroku Documentation: [devcenter.heroku.com](https://devcenter.heroku.com)
- Heroku Support: [help.heroku.com](https://help.heroku.com)
- Run Club Issues: [GitHub Issues](https://github.com/your-repo/issues)

## Additional Resources

- [Heroku Node.js Guide](https://devcenter.heroku.com/articles/getting-started-with-nodejs)
- [Heroku Environment Variables](https://devcenter.heroku.com/articles/config-vars)
- [Heroku Logs](https://devcenter.heroku.com/articles/logging)
- [Heroku Deployment](https://devcenter.heroku.com/articles/git)
