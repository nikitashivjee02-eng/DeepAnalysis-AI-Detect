# DeepAnalysis --- AI-Generated Content Detection System

DeepAnalysis is a web application designed to help users analyze digital
content and estimate whether it may be AI-generated. It brings content
analysis, user authentication, a dashboard, and detection history into
one interface.

> **Deployment status:** Image and audio detection have been tested on
> the deployed application. Video detection is currently unavailable on
> the free Render deployment because the video model exceeds the
> available memory limit.

## Live Demo

-   **Web application:** https://deepanalysis-ai-detect.onrender.com

## Features

-   **User authentication:** Sign up, log in, and log out.
-   **Image detection:** Submit an image for AI-generated-content
    analysis.
-   **Audio detection:** Submit an audio file for analysis.
-   **Dashboard:** View analysis statistics and recent activity.
-   **Detection history:** Review saved image and audio analysis
    results.
-   **Video detection:** Included in the project interface, but
    currently unavailable in the free hosted deployment.
-   **Responsive web interface:** Access the application through a
    modern web browser.

## Technology Stack

### Frontend

-   Next.js
-   React
-   JavaScript
-   CSS

### Backend and APIs

-   Python
-   Flask
-   REST API endpoints

### Detection and Machine Learning

-   Hugging Face Transformers / VideoMAE for the video detection service
-   Image and audio detection models integrated through separate backend
    services
-   Supporting Python ML/audio libraries as specified in each detector's
    requirements

### Database and Hosting

-   SQLite is used by the current authentication backend
-   Render for hosting the frontend and backend services

## System Architecture

The application uses a frontend with separate backend services:

``` text
User
  |
  v
Next.js Frontend
  |
  +---- Authentication API (Flask)
  |
  +---- Image Detection API (Flask)
  |
  +---- Audio Detection API (Flask)
  |
  +---- Video Detection API (Flask - currently unavailable on free hosting)
```

The frontend calls each service through environment-based API URLs. The
detection services are kept separate so each modality can be developed
and deployed independently.

## Project Structure

The repository is organized around a frontend and separate backend
services. The main folders include:

``` text
DeepAnalysis/
├── frontend/                  # Next.js web application
├── backend/
│   ├── auth/                  # Authentication and history API
│   ├── Image-detector/        # Image detection API
│   ├── audio-detector/        # Audio detection API
│   └── video-detector/        # Video detection API
└── README.md
```

*Note: File names may vary slightly depending on the current repository
version.*

## Local Development Setup

### Prerequisites

Install the following before running the project:

-   Node.js and npm
-   Python 3.10 or a compatible version supported by the backend
    dependencies
-   Git

### 1. Clone the repository

``` bash
git clone https://github.com/nikitashivjee02-eng/DeepAnalysis-AI-Detect.git
cd DeepAnalysis-AI-Detect
```

### 2. Install frontend dependencies

``` bash
cd frontend
npm install
```

### 3. Configure frontend environment variables

Create a `.env.local` file inside the `frontend` folder. Use the actual
local ports and URLs configured by your backend services:

``` env
NEXT_PUBLIC_AUTH_API_URL=http://localhost:5003
NEXT_PUBLIC_IMAGE_API_URL=http://127.0.0.1:5002
NEXT_PUBLIC_AUDIO_API_URL=http://127.0.0.1:5001
NEXT_PUBLIC_VIDEO_API_URL=http://127.0.0.1:5000
```

These are example local development URLs based on the project's service
configuration. If a service uses a different port, update the matching
value. Do not put private credentials or secret keys in `NEXT_PUBLIC_`
variables because frontend variables may be exposed to the browser.

### 4. Install backend dependencies

Install each backend service's dependencies using the requirements file
present in that service folder. For example, in PowerShell:

``` powershell
cd ..\backend\auth
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

Repeat the dependency installation for `Image-detector`,
`audio-detector`, and `video-detector` using each folder's own
`requirements.txt`.

If PowerShell blocks virtual-environment activation, you can run the
environment's Python executable directly or follow your system's
standard Python environment setup instructions.

### 5. Configure backend environment variables

Set the required variables for the authentication service in your local
environment or a private `.env` file supported by that service. At
minimum, configure a strong `FLASK_SECRET_KEY`. Configure the allowed
frontend origin if required by the service.

Never commit `.env` files, API keys, passwords, database URLs, or secret
keys to GitHub.

### 6. Run the services

Run each Flask service from its own terminal using the entry point
configured for that service. For example:

``` bash
python app.py
```

Start the frontend in another terminal:

``` bash
cd frontend
npm run dev
```

Open the local URL printed by Next.js in your terminal. Check each
backend's health endpoint if available before testing detection.

## Deployment

The current public frontend is hosted on Render:

-   Frontend: https://deepanalysis-ai-detect.onrender.com

Backend service URLs are configured through Render environment
variables. If deploying your own copy:

1.  Deploy each backend service separately.
2.  Set the correct frontend API URL environment variables.
3.  Set `FRONTEND_ORIGIN` on the authentication service to your deployed
    frontend origin.
4.  Configure a strong `FLASK_SECRET_KEY` and the appropriate
    secure-cookie settings.
5.  Redeploy the frontend after changing `NEXT_PUBLIC_` variables.
6.  Test signup, login, logout, image detection, audio detection, and
    history.

### Important deployment limitations

-   **Video detection:** The current video model requires more memory
    than the free Render instance provides, so its deployment fails due
    to memory exhaustion. The frontend is configured not to fall back to
    a localhost video service in production.
-   **Authentication and history persistence:** The current
    authentication backend uses SQLite. A database stored on a free web
    service's temporary filesystem may be lost after restarts or
    redeployments. Configure durable database storage before relying on
    long-term accounts or history.
-   **Machine-learning resources:** Image, audio, and especially video
    models may require significant memory and startup time. Test the
    selected hosting plan against the resource requirements of each
    model.

## API Endpoints

The backend services expose endpoints similar to the following, based on
the current service configuration:

  -----------------------------------------------------------------------
  Service                 Endpoint                Purpose
  ----------------------- ----------------------- -----------------------
  Authentication          `GET /api/health`       Check authentication
                                                  service health

  Authentication          `POST /api/signup`      Register an account

  Authentication          `POST /api/login`       Log in

  Authentication          `GET /api/me`           Check the current
                                                  session

  Authentication          `POST /api/logout`      Log out

  Authentication          `GET /api/history`      Retrieve saved
                                                  detection history

  Authentication          `GET /api/stats`        Retrieve dashboard
                                                  statistics

  Image                   `GET /api/health`       Check image service
                                                  health

  Image                   `POST /api/image`       Analyze an image

  Audio                   `GET /api/health`       Check audio service
                                                  health

  Audio                   `POST /api/audio`       Analyze audio

  Video                   `GET /api/health`       Check video service
                                                  health

  Video                   `POST /api/video`       Analyze video when the
                                                  service is available
  -----------------------------------------------------------------------

Confirm request fields and response formats in each backend's source
code before integrating another client.

## Security Notes

-   Do not commit secret keys, passwords, access tokens, or database
    connection strings.
-   Use environment variables for deployment configuration.
-   Use HTTPS for deployed services.
-   Keep CORS origins restricted to the frontend domains you trust.
-   AI-detection results are estimates and should not be treated as
    definitive proof of authorship.

## Current Project Status

  Component                         Status
  --------------------------------- ----------------------------------
  Frontend deployment               Deployed
  Signup and login                  Tested successfully
  Image detection                   Tested successfully
  Audio detection                   Tested successfully
  Dashboard and history             Tested with image/audio results
  Logout and protected dashboard    Tested successfully
  Video detection on free hosting   Unavailable due to memory limits
  Durable database persistence      Still needs to be addressed

## Future Improvements

-   Deploy video detection on a host with sufficient memory or optimize
    model inference without changing the intended detection workflow.
-   Move authentication and detection history to durable database
    storage.
-   Improve automated testing and error reporting.
-   Add clear explanations of model confidence and limitations.

## Disclaimer

DeepAnalysis is an academic project intended for learning and
experimentation. AI-content detectors can produce false positives and
false negatives. Results should be interpreted cautiously and should not
be used as the sole basis for consequential decisions.

## Author
#Nikita ShivJee Yadav
Developed as an academic project.
