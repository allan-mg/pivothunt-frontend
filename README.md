# PivotHunt

PivotHunt is a full-stack job-search application developed as part of the TripleTen Web Development final project.

The platform allows users to explore job opportunities, search by keyword, view job details, save jobs, manage applications, and maintain a personal profile.

The frontend is built with React and Vite and communicates with a production backend deployed on Render. Job opportunities are retrieved from The Muse API, while authenticated user data is stored in MongoDB.

## Features

- Search job opportunities by keyword
- Retrieve job data from The Muse API
- Display a preloader while job data is loading
- Show user-facing error messages when API requests fail
- Show a "No results" state when no matching jobs are found
- Display three jobs initially
- Load additional jobs using the "Show more" button
- View detailed information for individual job opportunities
- Register a new user account
- Sign in and maintain an authenticated session using JWT
- Restore the authenticated session after refreshing the browser
- Protect authenticated routes with React Router
- Save and remove job opportunities
- Persist saved jobs in MongoDB
- Display the current user's saved-job count dynamically
- Manage job applications
- Persist application data in MongoDB
- View and edit the authenticated user's profile
- Display authenticated navigation options only when a user is signed in
- Open the sign-in flow when a guest attempts to save a job
- Show visible feedback when saving or removing a job fails
- Prevent empty searches
- Responsive layout for desktop, tablet, and mobile devices
- Support direct navigation to React Router routes in production

## Technologies

### Frontend

- React
- Vite
- JavaScript
- HTML5
- CSS3
- React Router
- Fetch API
- Local Storage
- The Muse API
- ESLint

### Backend Integration

- Node.js
- Express
- MongoDB
- Mongoose
- JWT authentication
- Celebrate / Joi validation

## Project Structure

```text
src/
├── components/
├── contexts/
├── images/
├── utils/
├── vendor/
└── index.css
```

The application is organized into reusable React components for navigation, search, job cards, job lists, saved jobs, profile management, applications, authentication modals, loading states, and other interface sections.
Reusable API modules are stored in the utils directory, while authenticated user data is shared through CurrentUserContext.

## Third-Party API

PivotHunt uses The Muse API to retrieve job opportunities.
API documentation:
https://www.themuse.com/developers/api/v2
The API key is stored in an environment variable:
VITE_THE_MUSE_API_KEY

The API key itself is not committed to the repository.

## Backend API

The frontend communicates with the PivotHunt backend for authentication, user profiles, saved jobs, and application management.
The backend base URL is configured through:
VITE_API_BASE_URL

Production backend:
https://pivothunt-backend.onrender.com

## Environment Variables

Create a .env file in the project root with:
VITE_THE_MUSE_API_KEY=your_api_key_here
VITE_API_BASE_URL=http://localhost:3000

For production, the backend URL is configured through the deployment platform environment settings.

## Installation

Clone the repository:
git clone https://github.com/allan-mg/pivothunt-frontend.git

Move into the project directory:
cd pivothunt-frontend

Install dependencies:
npm install

Create a .env file in the project root and add the required environment variables.
Start the development server:
npm run dev

## Scripts

Run the development server:
npm run dev

Check the project with ESLint:
npm run lint

Build the production version:
npm run build

## Authentication

PivotHunt uses JWT-based authentication.
After signing in, the token is stored in localStorage and used to authorize protected API requests.
The application restores the user's session when the browser is refreshed and protects authenticated routes such as:
/saved-jobs
/profile
/applications

## Responsive Design

The application is designed to work across desktop, tablet, and mobile screen sizes.
The layout has been tested at:

- 320px
- 768px
- 1280px and above
  The interface adapts without horizontal scrolling.

  ## Fonts

  The project uses local WOFF font files connected with @font-face.
  Primary fonts:

- Inter
- Roboto Slab
  System fonts are included as fallbacks.

  ## Deployment

  The frontend is deployed on Vercel.
  Frontend:
  https://pivothunt-frontend.vercel.app
  The backend API is deployed on Render.
  Backend:
  https://pivothunt-backend.onrender.com
  The frontend includes a Vercel rewrite configuration so React Router routes can be opened directly in production.

  ## Repository

  Frontend repository:
  https://github.com/allan-mg/pivothunt-frontend
  Backend repository:
  https://github.com/allan-mg/pivothunt-backend

  ## Author

  Allan Martínez González
