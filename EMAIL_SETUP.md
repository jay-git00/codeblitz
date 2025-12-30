# Email Configuration for OTP Delivery

To enable actual email delivery for OTP verification, you need to configure Gmail credentials.

## Step 1: Create a Gmail App Password

1. Go to your Google Account: https://myaccount.google.com/
2. Click on **Security** in the left sidebar
3. Under "How you sign in to Google", enable **2-Step Verification** (if not already enabled)
4. After enabling 2-Step Verification, go back to **Security**
5. Under "How you sign in to Google", click on **App passwords**
6. Select **Mail** as the app and **Other (Custom name)** as the device
7. Enter "CodeBlitz" as the custom name
8. Click **Generate**
9. Copy the 16-character password (it will look like: `xxxx xxxx xxxx xxxx`)

## Step 2: Update Your .env File

Add these two lines to your `.env` file:

```env
# Email Configuration for OTP
EMAIL_USER="your-gmail@gmail.com"
EMAIL_PASSWORD="your-16-char-app-password"
```

Replace:
- `your-gmail@gmail.com` with your actual Gmail address
- `your-16-char-app-password` with the app password you generated (remove spaces)

## Step 3: Restart Your Server

After updating the `.env` file, restart your development server:

```bash
# Stop the current server (Ctrl+C)
npm run dev
```

## Testing

1. Go to the Signup page
2. Enter your details and click "Next"
3. Check the email inbox you entered
4. You should receive an email with a 6-digit OTP
5. Enter the OTP to complete registration

## Troubleshooting

If emails are not being sent:
1. Verify your Gmail credentials are correct in `.env`
2. Make sure 2-Step Verification is enabled on your Google account
3. Check the terminal for error messages
4. Ensure you're using an App Password, not your regular Gmail password
