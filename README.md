This is a SSR Express project using EJS for dynamic rendering.

# Getting Started

## Setup

### Step 1
First you must run 
```
npm install
```
To install all the necessary dependencies. Here is a list of dependencies outlined in package.json
```
  "dependencies": {
    "bcrypt": "^6.0.0",
    "cookie-parser": "^1.4.7",
    "cors": "^2.8.5",
    "dotenv": "^17.2.3",
    "ejs": "^3.1.10",
    "express": "^5.1.0",
    "express-validator": "^7.2.1",
    "jsonwebtoken": "^9.0.2",
    "mongoose": "^8.18.3",
    "npm": "^11.6.1",
    "passport": "^0.7.0",
    "passport-jwt": "^4.0.1",
    "path": "^0.12.7"
  },
```

### Step 2
You will need a `.env` file for Auth secret. The variable is called `secret`. This file should be located in the root of the project folder like so:

```
/noteTaking
    /src
    .env <--- New .env file
    package-lock.json
    package.json
    postcss.config.js
    tailwind.config.js
    README.md
```

## Start server
To start the server simply run
```
npm run dev
```
or 
```
npm start
```

This will start the project on http://localhost:3000 with the dev environment using `nodemon`

# MongoDB Config
The mongodb is configured to use the default port on
```
mongodb://localhost:27017/noteTakingApp
```
Ensure that mongodb is running on this port.
