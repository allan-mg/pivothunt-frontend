# PivotHunt

PivotHunt is a React job-search application created as part of the TripleTen Web Development final project.

The application helps users explore job opportunities, search by keyword, view job details, save jobs, and manage their job-search activity.

## Features

- Search job opportunities by keyword
- Load job data from The Muse API
- Display a preloader while API requests are in progress
- Show an error message if the API request fails
- Show a "No results" state when no jobs are found
- Display three jobs initially
- Load three additional jobs with the "Show more" button
- Save job data in localStorage
- Responsive layout for desktop, tablet, and mobile devices
- Prevent empty searches
- Disable the save button for users who are not signed in
- Show a tooltip asking users to sign in before saving jobs

## Technologies

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

## Project Structure

```text
src/
├── components/
├── images/
├── utils/
├── vendor/
└── index.css
```

The project uses separate React components for the main interface, navigation, search form, job cards, job lists, modals, preloader, and other interface sections.
API requests are stored separately inside the utils directory.
Third-Party API
PivotHunt uses The Muse API to retrieve job opportunities.
API documentation:
https://www.themuse.com/developers/api/v2
The API key is stored in an environment variable:

VITE_THE_MUSE_API_KEY

The API key itself is not committed to the repository.
Installation
Clone the repository:

git clone https://github.com/allan-mg/pivothunt-frontend.git

Move into the project directory:
cd pivothunt-frontend

Install dependencies:
npm install

Create a .env file in the project root and add:
VITE_THE_MUSE_API_KEY=your_api_key_here

Start the development server:
npm run dev

Scripts
Run the development server:
npm run dev

Check the project with ESLint:
npm run lint

Build the production version:
npm run build

Responsive Design
The application is designed to work across desktop, tablet, and mobile screen sizes.
The layout has been tested at:

- 320px
- 768px
- 1280px and above
  The interface adapts without horizontal scrolling.
  Fonts
  The project uses local WOFF font files connected with @font-face:
- Inter
- Roboto Slab
  System fonts are included as fallbacks.
  Deployment
  The application will be deployed together with the full-stack version of PivotHunt in a later stage of the final project.
  Deployment URL:
  To be added after deployment.
  Repository
  Frontend repository:
  https://github.com/allan-mg/pivothunt-frontend

  Author
  Allan Martínez González

Deployment URL:
_To be added after deployment._
