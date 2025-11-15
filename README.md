# User Authentication Project

This is a simple user authentication project using **HTML, CSS,
JavaScript**, and **JSON Server** as a fake backend.\
Users can register, log in, view their profile, and the first registered
user becomes an admin.

## Features

- Register new users\
- Login with email & password\
- LocalStorage session\
- Profile page\
- Admin page (only for the first registered user)\
- JSON Server as fake API\
- CRUD operations for users

## Installation

### 1. Install JSON Server

```bash
npm install -g json-server
```

### 2. Start the server

```bash
json-server --watch db.json --port 5000
```

## Project Structure

    index.html
    login.html
    register.html
    profile.html
    admin.html
    db.json
    /js files
    /css files

## How It Works

- First registered user → **admin**
- Others → **user**
- Logged-in user data is saved in **localStorage**

## API Endpoint

    http://localhost:5000/users

## Live Demo

👉 https://asi-hadian.github.io/login-form/login.html

## note:
This project uses JSON Server as a local backend.
GitHub Pages does not support backend APIs, so the login and user management features only work locally.
