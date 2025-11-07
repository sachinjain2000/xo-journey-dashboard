# XO Journey Dashboard

User Experience Analysis & Optimization dashboard for XO Launchpad deployment flows.

## Features

- **4 User Journeys**: Template, GitHub Repository, Website Builders, and Local Build
- **Interactive Flowcharts**: Step-by-step visualization of each deployment journey
- **Pain Points & Solutions**: Detailed analysis of UX issues and proposed improvements
- **Task 2**: Signup Strategy presentation with 5 growth targets

## Tech Stack

- React 18
- TypeScript
- Vite
- Framer Motion (animations)
- Lucide React (icons)

## Local Development

### Prerequisites

- Node.js 22+
- pnpm

### Setup

```bash
# Install dependencies
pnpm install

# Start development server
pnpm run dev
```

The app will be available at `http://localhost:5173`

## Deployment to XO Launchpad

### Option 1: GitHub Repository Deployment

1. Push this repository to GitHub
2. Go to [XO Launchpad](https://launchpad.xo.builders/)
3. Create new deployment → Select "GitHub Repository"
4. Enter repository URL and configure settings
5. Deploy!

### Option 2: Local Build Deployment

1. **Prerequisites**: Install Docker Desktop

2. **Login to XO Registry**:
   ```bash
   docker login registry.xo.builders -u 'your-robot-name' -p 'your-robot-secret'
   ```

3. **Build Docker Image**:
   ```bash
   docker build --platform linux/amd64,linux/arm64 -t registry.xo.builders/your-project/xo-journey-dashboard:latest .
   ```

4. **Push to Registry**:
   ```bash
   docker push registry.xo.builders/your-project/xo-journey-dashboard:latest
   ```

5. **Deploy**: Go to XO Launchpad dashboard and click "Deploy" button

### Option 3: Template Deployment

1. Go to [XO Launchpad](https://launchpad.xo.builders/)
2. Select "Explore Templates"
3. Choose a suitable template (e.g., N8N, Phi-3-mini-4k-instruct)
4. Configure and deploy

## Project Structure

```
xo-journey-dashboard/
├── src/
│   ├── App.tsx              # Main application with all journeys
│   ├── SignupStrategy.tsx   # Task 2: Signup strategy presentation
│   └── main.tsx            # Entry point
├── public/
│   └── images/             # Screenshots and assets
├── Dockerfile              # Multi-stage Docker build
├── nginx.conf              # Nginx configuration for production
├── package.json            # Dependencies and scripts
└── README.md              # This file
```

## Environment Variables

This application does not require any environment variables. It's a static frontend dashboard with no backend dependencies.

## Build for Production

```bash
# Build the app
pnpm run build

# Preview production build locally
pnpm run preview
```

The production build will be in the `dist/` directory.

## Docker Build Details

The Dockerfile uses a multi-stage build:

1. **Builder stage**: Installs dependencies and builds the React app
2. **Production stage**: Serves the built files with Nginx

The final image is optimized and lightweight (~25MB).

## License

Proprietary - XO Internal Use Only

## Support

For issues or questions, contact the XO team.

