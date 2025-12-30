# Environment Setup

> [!CAUTION]
> **DATABASE_URL Configuration**: CodeBlitz requires a valid MongoDB connection string. If you are using MongoDB Compass locally, ensure your database is running as a **Replica Set**.

Create a `.env` file in the root directory and add the following variables:

```env
# Option A: MongoDB Atlas (Recommended)
# DATABASE_URL="mongodb+srv://<username>:<password>@<your-cluster>.mongodb.net/codeblitz"

# Option B: Local MongoDB (Compass)
# format: mongodb://localhost:27017/dbname
DATABASE_URL="mongodb://localhost:27017/codeblitz"
```

## Local MongoDB (Compass) Setup

If you are using MongoDB Compass locally, Prisma **requires** a Replica Set. If you get a "Prisma needs a replica set" error:

1.  Locate your `mongod` installation (usually `C:\Program Files\MongoDB\Server\<version>\bin`).
2.  Run MongoDB with the replica set flag in your terminal:
    ```bash
    mongod --replSet rs0 --port 27017
    ```
3.  In a separate terminal (`mongosh`), initialize the replica set:
    ```javascript
    rs.initiate()
    ```
4.  Update your `.env` to: `DATABASE_URL="mongodb://localhost:27017/codeblitz?replicaSet=rs0"`

# Email Configuration for OTP (Using Resend)
# Get your API key from: https://resend.com/api-keys
RESEND_API_KEY=re_your_api_key_here

# NextAuth configuration
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-here-at-least-32-chars"

# Clist.by API (for contests)
CLIST_API_KEY="your-clist-api-key"
CLIST_USERNAME="your-clist-username"

# OAuth Providers
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"
```
