# Resend Email Setup Guide

## What is Resend?

Resend is a modern email API service that's much simpler and more secure than using Gmail. You only need an API key - no personal email credentials required!

## Quick Setup (5 minutes)

### Step 1: Create a Free Resend Account

1. Go to https://resend.com/signup
2. Sign up with your email (or GitHub)
3. Verify your email address

### Step 2: Get Your API Key

1. After logging in, go to **API Keys** in the sidebar
2. Click **Create API Key**
3. Name it "CodeBlitz" (or anything you like)
4. Select **Full Access** permission
5. Click **Add**
6. **Copy the API key** (it starts with `re_...`)

### Step 3: Add to Your `.env` File

Open your `.env` file and add this line:

```env
RESEND_API_KEY=re_your_actual_api_key_here
```

Replace `re_your_actual_api_key_here` with the key you copied.

### Step 4: Restart Your Server

```bash
# Stop the current server (Ctrl+C)
npm run dev
```

### Step 5: Test It!

1. Go to your signup page
2. Enter any email address (including your own)
3. Click "Next"
4. Check the email inbox - you should receive the OTP!

## Free Tier Limits

- **3,000 emails per month** for free
- Perfect for development and small projects
- No credit card required

## Using a Custom Domain (Optional)

By default, emails come from `onboarding@resend.dev`. To use your own domain:

1. Add your domain in Resend dashboard
2. Add the DNS records they provide
3. Update the `from` field in `send-otp/route.ts`:
   ```typescript
   from: 'CodeBlitz <noreply@yourdomain.com>'
   ```

## Troubleshooting

### "Development Mode" message appears
- Your `RESEND_API_KEY` is not set or is still a placeholder
- Make sure you added it to `.env` and restarted the server

### Email not received
- Check spam folder
- Verify the API key is correct
- Check Resend dashboard for delivery logs

### Rate limit errors
- Free tier: 3,000 emails/month
- Upgrade to paid plan if needed

## Why Resend > Gmail?

✅ No personal credentials needed  
✅ Simple API key authentication  
✅ Better deliverability  
✅ Professional email templates  
✅ Detailed delivery logs  
✅ No 2FA setup required  
✅ Safe to commit to private repos  
