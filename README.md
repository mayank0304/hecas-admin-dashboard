# HECAS - Hybrid Edge Computing Analytics System
## Admin Portal

This is the admin dashboard for HECAS (Hybrid Edge Computing Analytics System), a cloud computing lab project that demonstrates a complete IoT data pipeline and analytics system.

## Project Overview

HECAS is a comprehensive system for collecting and analyzing GPS location data from mobile devices:

- **Mobile App** (Expo/React Native) - Collects GPS coordinates from user devices
- **Cloud Infrastructure** (AWS) - Processes and stores data using Lambda, API Gateway, and DynamoDB
- **Admin Portal** (This Project) - Web dashboard for monitoring and analytics

## System Architecture

```
Mobile App → AWS API Gateway → AWS Lambda → DynamoDB
                                              ↓
                                        Admin Portal
```

## Tech Stack

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS 4** - Modern styling
- **Lucide React** - Professional icons
- **AWS Integration** - API Gateway endpoints for data retrieval

## Features

- **Device Management** - View all connected mobile devices
- **Real-time Analytics** - Today's distance traveled, speed metrics, and data points
- **Location Intelligence** - GPS coordinates converted to readable addresses
- **Weekly Statistics** - Visual trends and progress tracking
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Admin Authentication** - Simple password protection

## Data Flow

1. Mobile app collects GPS coordinates
2. Data sent to AWS API Gateway
3. AWS Lambda processes the data
4. Processed data stored in DynamoDB
5. Admin portal retrieves data for visualization and analytics

Built with Next.js, TypeScript, and Tailwind CSS for a Cloud Computing Lab project.