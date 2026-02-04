# Albumify — Spotify Album Finder

Albumify is a React-based web application that allows users to search for an artist and instantly view their albums using the Spotify Web API. The app fetches real-time data and provides direct links to open albums on Spotify.


##  Live Demo
🔗 https://albumify-app.netlify.app


## Tech Stack
- Frontend: React (Vite)
- Styling: React-Bootstrap + custom CSS
- API: Spotify Web API
- Deployment: Netlify
- Version Control: Git & GitHub


##  Features
- Search artists by name
- Fetch albums dynamically from Spotify
- Display album cover, title, and release date
- Direct link to open albums on Spotify


##  Security
Spotify API credentials are stored securely using environment variables and are **not exposed** in the repository.  
The `.env` file is ignored via `.gitignore`.


## Learning & Implementation Notes
This project was built using a starter template and then extended with custom logic, UI components, Spotify Web API integration, and deployment configuration as part of a hands-on learning project.



## Installation (Local Setup)

```bash
git clone https://github.com/annie-waik123/albumify.git
cd albumify
npm install
npm run dev
