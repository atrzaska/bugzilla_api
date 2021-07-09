# Welcome to Bugzilla API

This project is a dummy Node.js API for Bugzilla Vue SPA https://github.com/atrzaska/bugzilla_vue.

It doesn't use a database. Everything is stored in memory for now.

## Endpoints

- login
- register
- password reset
- forgot password
- resend confirmation email
- refresh access token
- REST API for projects
- REST API for stories
- REST API for comments
- REST API for tasks
- REST API for members

## Functionalities

- JWT access token + refresh token in HttpOnly cookie
- authentication
- authorization
- Pagination
- Sorting
- Filtering
- returning only selected fields
- Yup validation
- bcrypt password hashing
- activerecord like API for fetching data from memory
- factory for creating dummy data in memory
