# CodeBlitz ⚡

**CodeBlitz** is a high-performance, full-stack platform designed for competitive programming enthusiasts. It serves as a unified hub for tracking contests, solving problems across multiple platforms, and following structured learning paths (Ladders).

![CodeBlitz Banner](/C:/Users/DILEEP/.gemini/antigravity/brain/45a8e5d5-1e07-47bb-817d-67e057c82024/cp_portal_home_mockup_1766924225009.png)

## 🚀 Key Features

- **Unified Contest Calendar**: Real-time updates from Codeforces, AtCoder, LeetCode, CodeChef, and more.
- **Smart Practice Suite**: Integrated problem sets with advanced filtering and difficulty-based color-coding.
- **Curated Ladders**: Structured progression paths (Beginner to Grandmaster) to level up your skills.
- **Global Leaderboard**: Compete with others and track your rank globally.
- **Personalized Dashboard**: Track your solving streaks, milestones, and recent activity.
- **Robust Authentication**: Secure login with Credentials, Google, and GitHub.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router)
- **Database**: [MongoDB](https://www.mongodb.com/)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Authentication**: [NextAuth.js](https://next-auth.js.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)

## 🏁 Getting Started

### Prerequisites

- Node.js 20+
- MongoDB instance (Local or Atlas)

### Installation

1. **Clone the repository**:
   ```bash
   git clone [your-repo-url]
   cd cp-portal
   ```

2. **Install dependencies**:
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Set up environment variables**:
   Create a `.env` file based on `ENVIRONMENT_SETUP.md`.

4. **Initialize Prisma**:
   ```bash
   npx prisma generate
   ```

5. **Run the development server**:
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📄 License

This project is licensed under the MIT License.
