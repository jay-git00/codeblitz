# Deploy CodeBlitz to Vercel

Follow these steps to deploy your website and share it with friends!

## Prerequisites

1. A GitHub account
2. Your code pushed to a GitHub repository

## Step 1: Push to GitHub (if not already done)

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Ready for deployment"

# Create a new repository on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/codeblitz.git
git branch -M main
git push -u origin main
```

## Step 2: Deploy to Vercel

1. **Go to Vercel**: https://vercel.com/signup
2. **Sign up** with your GitHub account
3. **Import Project**:
   - Click "Add New..." → "Project"
   - Select your CodeBlitz repository
4. **Configure Project**:
   - Framework Preset: **Next.js** (auto-detected)
   - Root Directory: `./` (leave as is)
5. **Add Environment Variables**:
   Click "Environment Variables" and add:
   
   ```
   DATABASE_URL=your_mongodb_atlas_connection_string
   NEXTAUTH_URL=https://your-app-name.vercel.app
   NEXTAUTH_SECRET=your_secret_key_here
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   GITHUB_CLIENT_ID=your_github_client_id
   GITHUB_CLIENT_SECRET=your_github_client_secret
   ```

6. **Deploy**: Click "Deploy"

## Step 3: Get Your Public URL

After deployment (takes 2-3 minutes):
- Your site will be live at: `https://your-app-name.vercel.app`
- Share this URL with your friends!

## Important: Update MongoDB Atlas

In MongoDB Atlas, update your IP whitelist:
1. Go to Network Access
2. Add `0.0.0.0/0` to allow Vercel servers to connect

## Important: Update NextAuth Callback URLs

For Google OAuth:
1. Go to Google Cloud Console
2. Add `https://your-app-name.vercel.app/api/auth/callback/google`

For GitHub OAuth:
1. Go to GitHub OAuth Apps settings
2. Add `https://your-app-name.vercel.app/api/auth/callback/github`

## Automatic Deployments

Every time you push to GitHub, Vercel will automatically redeploy your site!

```bash
# Make changes
git add .
git commit -m "Update feature"
git push

# Vercel automatically deploys!
```

## Custom Domain (Optional)

Want a custom domain like `codeblitz.com`?
1. Buy a domain (Namecheap, GoDaddy, etc.)
2. In Vercel dashboard → Settings → Domains
3. Add your custom domain
4. Update DNS records as instructed

## Troubleshooting

### Build fails
- Check the build logs in Vercel dashboard
- Make sure all dependencies are in `package.json`
- Verify environment variables are set

### Database connection fails
- Verify `DATABASE_URL` is correct
- Check MongoDB Atlas IP whitelist includes `0.0.0.0/0`

### OAuth not working
- Update callback URLs in Google/GitHub
- Verify `NEXTAUTH_URL` matches your Vercel URL

## Share Your Site!

Once deployed, share this with friends:
`https://your-app-name.vercel.app`

They can:
- Sign up and create accounts
- Browse problems
- View contests
- Track their progress
- Compete on the leaderboard!
