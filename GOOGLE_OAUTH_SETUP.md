# Google OAuth Setup Guide for SocialEcho

This guide will help you set up Google Sign-In functionality for your SocialEcho application.

## Prerequisites

1. A Google Cloud Console account
2. Node.js and npm installed
3. MongoDB running locally or MongoDB Atlas account

## Step 1: Google Cloud Console Setup

### 1.1 Create a Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API and Google Identity API

### 1.2 Create OAuth 2.0 Credentials
1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth 2.0 Client IDs"
3. Choose "Web application" as the application type
4. Add authorized JavaScript origins:
   - `http://localhost:3000` (for development)
   - `https://yourdomain.com` (for production)
5. Add authorized redirect URIs:
   - `http://localhost:3000` (for development)
   - `https://yourdomain.com` (for production)
6. Copy the Client ID

## Step 2: Environment Variables Setup

### 2.1 Server Environment Variables
Create a `.env` file in the `server` directory with the following variables:

```bash
# JWT Authentication - REQUIRED for server to start
SECRET=your_jwt_secret_key_here_make_it_long_and_secure
REFRESH_SECRET=your_refresh_jwt_secret_key_here_make_it_long_and_secure

# MongoDB Connection - REQUIRED for database connection
MONGODB_URI=mongodb://localhost:27017/socialecho

# Server Configuration
PORT=4000

# Crypto Key for Encryption - REQUIRED for context-based authentication
CRYPTO_KEY=your_crypto_key_here_32_characters_long

# Client URL for CORS and redirects
CLIENT_URL=http://localhost:3000

# Google OAuth Configuration - REQUIRED for Google Sign-In
GOOGLE_CLIENT_ID=your_google_client_id_from_step_1

# Email Configuration (optional - for context-based authentication features)
EMAIL=your_email@gmail.com
PASSWORD=your_app_password
EMAIL_SERVICE=gmail

# Content Moderation APIs (optional - for content moderation features)
PERSPECTIVE_API_KEY=your_perspective_api_key
PERSPECTIVE_API_DISCOVERY_URL=https://commentanalyzer.googleapis.com/$discovery/rest?version=v1alpha1

# Alternative Content Moderation APIs (choose one or use Flask server)
TEXTRAZOR_API_KEY=your_textrazor_api_key
TEXTRAZOR_API_URL=https://api.textrazor.com

# OR use Hugging Face Interface API
INTERFACE_API_KEY=your_huggingface_api_key
INTERFACE_API_URL=https://api-inference.huggingface.co/models/facebook/bart-large-mnni

# Flask Classifier Server URL (if running locally)
CLASSIFIER_API_URL=http://localhost:5000/classify
```

### 2.2 Client Environment Variables
Create a `.env` file in the `client` directory with the following variables:

```bash
# Google OAuth Configuration - REQUIRED for Google Sign-In
REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id_from_step_1

# API Configuration
REACT_APP_API_URL=http://localhost:4000
```

## Step 3: Install Dependencies

### 3.1 Server Dependencies
The server dependencies are already installed:
- `googleapis` (already in package.json)
- `google-auth-library` (already installed)

### 3.2 Client Dependencies
The client dependencies are already installed:
- `@react-oauth/google` (already installed)

## Step 4: Start the Application

### 4.1 Start the Server
```bash
cd server
npm start
```

### 4.2 Start the Client
```bash
cd client
npm start
```

## Step 5: Test Google Sign-In

1. Open your browser and go to `http://localhost:3000`
2. Navigate to the Sign In or Sign Up page
3. Click the "Continue with Google" button
4. Complete the Google OAuth flow
5. You should be redirected to the dashboard upon successful authentication

## Features Implemented

✅ **Google Sign-In Button**: Added to both login and registration pages
✅ **OAuth 2.0 Implementation**: Secure authentication via Google accounts
✅ **Backend Integration**: Connected to the existing authentication system
✅ **UI/UX**: Seamless and intuitive sign-in process
✅ **Error Handling**: Proper error messages for authentication issues
✅ **Account Linking**: Existing users can link their Google accounts
✅ **Automatic Registration**: New users are automatically created
✅ **Role Assignment**: Moderator role assignment based on email domain

## Security Features

- JWT token verification
- Google ID token validation
- Secure token storage
- Account linking protection
- Role-based access control

## Troubleshooting

### Common Issues

1. **"JwtStrategy requires a secret or key"**
   - Make sure you have `SECRET` and `REFRESH_SECRET` in your server `.env` file

2. **"Google authentication failed"**
   - Verify your `GOOGLE_CLIENT_ID` is correct
   - Check that the Google+ API is enabled in Google Cloud Console
   - Ensure your authorized origins and redirect URIs are correct

3. **CORS errors**
   - Verify `CLIENT_URL` is set correctly in your server `.env` file

4. **Database connection issues**
   - Make sure MongoDB is running
   - Verify your `MONGODB_URI` is correct

### Getting Help

If you encounter any issues:
1. Check the browser console for client-side errors
2. Check the server console for backend errors
3. Verify all environment variables are set correctly
4. Ensure all dependencies are installed

## Next Steps

After successful setup, you can:
1. Customize the Google Sign-In button styling
2. Add additional OAuth providers (Facebook, GitHub, etc.)
3. Implement account unlinking functionality
4. Add Google profile picture synchronization
5. Implement Google account deletion handling
