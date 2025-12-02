# HECAS Admin Panel

A simple admin dashboard for monitoring IoT devices with analytics and location tracking.

## Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Add your API endpoints and admin password:
   ```env
   NEXT_API_DEVICES=https://your-api.amazonaws.com/devices
   NEXT_API_TODAY_STATS=https://your-api.amazonaws.com/today-stats
   NEXT_API_WEEKLY_STATS=https://your-api.amazonaws.com/weekly-stats
   ADMIN_PASSWORD=your_secure_password_here
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Open browser**
   Navigate to [http://localhost:3000](http://localhost:3000)
   
   Enter the admin password when prompted (default: `admin`)

## Password Protection

The admin panel has simple password protection. 

Set your password in the `.env` file:
```env
ADMIN_PASSWORD=your_secure_password_here
```

If no password is set in the environment, it defaults to `admin`.

Once you enter the correct password, you get full access to the admin panel until you close the browser tab.

## Deployment

```bash
npm run build
npm start
```

Set environment variables in your deployment platform.

## Features

- Device listing and monitoring
- Real-time analytics dashboard
- Location tracking with address resolution
- Weekly statistics and trends
- Responsive design
- Simple password protection

Built with Next.js, TypeScript, and Tailwind CSS.